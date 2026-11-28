"""Five PLAY/HOME cycles: the match frame must be destroyed every time."""

from __future__ import annotations

import gc
import json

from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8123/stickfrag.html?name=tester"


def heap(page) -> int | None:
    return page.evaluate(
        "() => { if (globalThis.gc) gc(); return performance.memory ? performance.memory.usedJSHeapSize : null; }"
    )


def main() -> int:
    out = {}
    errors: list[str] = []
    failures: list[str] = []
    with sync_playwright() as p:
        b = p.chromium.launch(
            headless=True,
            args=[
                "--enable-unsafe-swiftshader",
                "--js-flags=--expose-gc",
                "--enable-precise-memory-info",
            ],
        )
        page = b.new_context(viewport={"width": 1100, "height": 760}).new_page()
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        page.on(
            "console",
            lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None,
        )
        page.goto(URL, wait_until="load", timeout=90_000)
        page.wait_for_timeout(2500)
        out["menu"] = {
            "heap": heap(page),
            "iframes": page.evaluate("() => document.querySelectorAll('iframe').length"),
            "canvases": page.evaluate("() => document.querySelectorAll('canvas').length"),
        }

        for i in range(5):
            if i == 0:
                page.fill("#gear-name", "tester")
                page.click(".play-big")
                page.wait_for_timeout(700)
            page.click("#start-modes .mode-tile")
            page.wait_for_timeout(800)
            game = [f for f in page.frames if "embed=1" in f.url]
            if not game:
                out[f"cycle{i}"] = {"error": "no frame"}
                break
            game[0].wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=90_000)
            game[0].wait_for_timeout(1200)
            live = {
                "frames": len(page.frames),
                "iframes": page.evaluate("() => document.querySelectorAll('iframe').length"),
                "topHeap": heap(page),
                "mode": game[0].evaluate("() => globalThis.__sfGame?.match?.mode"),
            }
            # Playwright keeps a handle (and with it the frame's heap) alive
            # while the Python object exists. A real player's browser has no
            # such reference, so drop it before measuring the menu. The handle
            # sits in a reference cycle, so an explicit collect is required.
            game = None
            gc.collect()
            page.evaluate("() => globalThis.__sfHome()")
            page.wait_for_timeout(3000)
            live["afterHome"] = {
                "frames": len(page.frames),
                "iframes": page.evaluate("() => document.querySelectorAll('iframe').length"),
                "topHeap": heap(page),
                "canvases": page.evaluate("() => document.querySelectorAll('canvas').length"),
                "home": page.evaluate(
                    "() => getComputedStyle(document.getElementById('sf-home-root')).display"
                ),
                "play": page.evaluate("() => !!document.querySelector('.play-big')"),
            }
            if live["mode"] != "tdm":
                failures.append(f"cycle{i}: mode {live['mode']!r}")
            after = live["afterHome"]
            if after["frames"] != 1:
                failures.append(f"cycle{i}: {after['frames']} frames after HOME")
            if after["iframes"] != 0:
                failures.append(f"cycle{i}: {after['iframes']} iframes after HOME")
            if after["home"] != "block":
                failures.append(f"cycle{i}: home display {after['home']!r}")
            if after["canvases"] != out["menu"]["canvases"]:
                failures.append(
                    f"cycle{i}: {after['canvases']} canvases, menu had {out['menu']['canvases']}"
                )
            out[f"cycle{i}"] = live
            # The landing page keeps its step; the mode tiles are still there.
            page.wait_for_timeout(300)

        out["errors"] = errors[:8]
        out["failures"] = failures[:8]
        b.close()
    print(json.dumps(out, indent=2))
    ok = not errors and not failures and all(
        "error" not in v for v in out.values() if isinstance(v, dict)
    )
    print("RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
