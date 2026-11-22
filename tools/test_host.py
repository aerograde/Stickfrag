"""M3: verify the host-authoritative match actually simulates and settles.

The host is the authority: it runs the client's own Cw() per tick and feeds itself
the same snapshots a peer would receive. A working match therefore shows a stable
position, a live FPS panel with a room id, no disconnect card, and movement that
survives the prediction/reconciliation round trip.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8123/play/?name=tester&peer=host&room=TEST01&debug"


def parse_debug(text: str) -> dict:
    out = {}
    for line in (text or "").split("\n"):
        if line.startswith("pos "):
            out["pos"] = line[4:]
        if line.startswith("id #"):
            out["id"] = line
    return out


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--disable-gpu-vsync"])
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        page.on("console", lambda m: errors.append(m.text[:200]) if m.type == "error" and "sf-peer" in m.text else None)
        page.goto(URL, wait_until="load", timeout=90000)
        page.wait_for_timeout(8000)
        page.mouse.click(640, 400)
        page.wait_for_timeout(3000)

        before = page.evaluate(
            """() => ({
              fps: document.getElementById('fps')?.textContent || '',
              debug: document.getElementById('debug')?.textContent || '',
              left: !document.getElementById('left')?.hidden,
              health: document.querySelector('#health .num')?.textContent,
              loading: document.getElementById('loading')?.hidden,
            })"""
        )

        # Walk forward for a second and confirm the authoritative position changed.
        page.keyboard.down("KeyW")
        page.wait_for_timeout(1200)
        page.keyboard.up("KeyW")
        page.wait_for_timeout(600)

        after = page.evaluate(
            """() => ({
              debug: document.getElementById('debug')?.textContent || '',
              health: document.querySelector('#health .num')?.textContent,
            })"""
        )
        of = page.evaluate("() => Math.round(window.__sfSV ? 1 : 0)")
        browser.close()

    b, a = parse_debug(before["debug"]), parse_debug(after["debug"])
    moved = b.get("pos") != a.get("pos")
    out = {
        "before": before,
        "posBefore": b.get("pos"),
        "posAfter": a.get("pos"),
        "moved": moved,
        "errors": errors[:6],
    }
    print(json.dumps(out, indent=2))
    ok = (
        not before["left"]
        and before["loading"] is True
        and "FPS" in before["fps"].upper()
        and "room " in before["debug"]
        and "offline" not in before["debug"]
        and moved
        and not errors
    )
    print("\nRESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
