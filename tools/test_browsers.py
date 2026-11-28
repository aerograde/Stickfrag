"""Cross-browser end-to-end checks for the single file and the SVG wrapper.

Usage: python3 tools/test_browsers.py [chromium|firefox|webkit]

Covers the two screens, a match in its own frame, HOME returning to the menu,
a second match, the file:// blob-frame path, the SVG inline path and the SVG
about:blank path. Each check prints pass/fail; the exit code is the sum of
failures.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BROWSER = sys.argv[1] if len(sys.argv) > 1 else "chromium"
BASE = "http://127.0.0.1:8123"
SITE = Path(__file__).resolve().parent.parent / "stickfrag.com"
SINGLE_HTTP = f"{BASE}/stickfrag.html"
SINGLE_FILE = (SITE / "stickfrag.html").as_uri()
SVG_HTTP = f"{BASE}/stickfrag.svg"
SVG_FILE = (SITE / "stickfrag.svg").as_uri() + "?name=tester"

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, bool(ok), detail))
    print(f"  {'ok  ' if ok else 'FAIL'} {name}" + (f"  ({detail})" if detail and not ok else ""))


def launch(p):
    engine = getattr(p, BROWSER)
    headless = BROWSER == "chromium" or os.environ.get("STICKFRAG_HEADLESS") == "1"
    args = ["--enable-unsafe-swiftshader"] if BROWSER == "chromium" else []
    return engine.launch(headless=headless, args=args)


def game_in(page, timeout: int = 90_000):
    """The match frame: self URL (embed=1) or a blob game document.

    The http path parses the whole 10 MB single file again inside the frame, so
    WebKit needs a few seconds before the game markup exists. Poll instead of
    sampling once.
    """
    deadline = __import__("time").monotonic() + timeout / 1000
    while __import__("time").monotonic() < deadline:
        for frame in page.frames:
            try:
                if frame.evaluate("() => !!globalThis.__sfGame || !!document.getElementById('game')"):
                    return frame
            except Exception:
                pass
        page.wait_for_timeout(300)
    return None


def menu_flow(page, frame, errors: list[str]):
    """PLAY -> name -> mode list -> first mode. Returns the match context.

    In the SVG wrapper the match starts in the same document (in place), so the
    menu frame itself becomes the match. In the single file it gets a new frame.
    """
    frame.fill("#gear-name", "tester")
    frame.click(".play-big")
    frame.wait_for_timeout(700)
    frame.click("#start-modes .mode-tile")
    deadline = __import__("time").monotonic() + 120
    while __import__("time").monotonic() < deadline:
        candidates = [frame] + [f for f in page.frames if f is not frame]
        for candidate in candidates:
            try:
                if candidate.evaluate("() => !!globalThis.__sfGame"):
                    candidate.wait_for_function(
                        "() => !!globalThis.__sfGame?.ready", timeout=120_000
                    )
                    return candidate
            except Exception:
                pass
        page.wait_for_timeout(300)
    return None


def home(page, match, errors: list[str]):
    """HOME from inside the match frame; the shell must show the menu again."""
    try:
        match.evaluate("() => globalThis.__sfHome && globalThis.__sfHome()")
    except Exception:
        page.evaluate("() => globalThis.__sfHome && globalThis.__sfHome()")
    page.wait_for_timeout(1600)
    iframe_left = page.evaluate("() => document.querySelectorAll('iframe').length")
    return iframe_left, page.evaluate(
        "() => ({ play: !!document.querySelector('.play-big'),"
        " iframes: document.querySelectorAll('iframe').length })"
    )


def http_single(p) -> None:
    print("http single file")
    errors: list[str] = []
    external: list[str] = []
    with launch(p) as b:
        ctx = b.new_context(viewport={"width": 1200, "height": 800})
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)[:200]))
        page.on(
            "console",
            lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None,
        )
        page.on(
            "request",
            lambda r: external.append(r.url[:80])
            if r.url.startswith(("http://", "https://", "ws://", "wss://"))
            and not r.url.startswith(BASE)
            else None,
        )
        page.goto(SINGLE_HTTP, wait_until="load", timeout=120_000)
        page.wait_for_timeout(3000)
        shape = page.evaluate(
            "() => ({ play: !!document.querySelector('.play-big'),"
            " bar: !!document.querySelector('header.bar'), footer: !!document.querySelector('footer'),"
            " game: !!globalThis.__sfGame, iframes: document.querySelectorAll('iframe').length })"
        )
        check("menu renders", shape["play"] and shape["bar"] and shape["footer"])
        check("game parked on the menu", not shape["game"] and shape["iframes"] == 0)

        page.fill("#gear-name", "tester")
        page.click(".play-big")
        page.wait_for_timeout(700)
        page.click("#start-modes .mode-tile")
        match = game_in(page)
        check("match frame appears", match is not None)
        if match is None:
            b.close()
            return
        match.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
        match.wait_for_timeout(2500)
        live = match.evaluate(
            "() => ({ mode: globalThis.__sfGame?.match?.mode,"
            " fps: document.getElementById('fps')?.textContent?.trim() || '',"
            " focus: document.hasFocus(), iframes: document.querySelectorAll('iframe').length })"
        )
        check("chosen mode boots", live["mode"] == "tdm")
        check("frame is focused", live["focus"] is True)
        page.mouse.click(600, 400)
        page.wait_for_timeout(1200)
        playable = match.evaluate(
            "() => ({ locked: !!document.pointerLockElement,"
            " fallback: !!globalThis.__sfGame?.input?.sfFallback,"
            " active: !!globalThis.__sfGame?.input?.active })"
        )
        check(
            "match is playable",
            playable["active"] and (playable["locked"] or playable["fallback"]),
            json.dumps(playable),
        )
        iframes, back = home(page, match, errors)
        check("HOME removes the match frame", iframes == 0)
        check("HOME restores the menu", back["play"])

        page.click("#start-modes .mode-tile")
        second = game_in(page)
        check("second match starts", second is not None)
        if second is not None:
            second.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
            check("second match is live", second.evaluate("() => globalThis.__sfGame.match?.mode") == "tdm")
            home(page, second, errors)
        # Live room links predate the shell and use ?code=. It must survive as
        # the peer layer's room; the short code is a local label now.
        page.goto(
            SINGLE_FILE + "?peer=host&code=CODE123&mode=ffa",
            wait_until="load",
            timeout=120_000,
        )
        legacy = game_in(page)
        check("legacy code link starts", legacy is not None)
        if legacy is not None:
            legacy.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
            params = legacy.evaluate("() => globalThis.__SF_BOOT_PARAMS || {}")
            check("legacy code becomes room", params.get("room") == "CODE123", json.dumps(params))
            home(page, legacy, errors)
        check("no page errors", not errors, "; ".join(errors[:3]))
        check("no external requests", not external, "; ".join(external[:3]))
        ctx.close()


def file_single(p) -> None:
    print("file:// single file")
    errors: list[str] = []
    with launch(p) as b:
        ctx = b.new_context(viewport={"width": 1100, "height": 760})
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)[:200]))
        page.on(
            "console",
            lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None,
        )
        page.goto(SINGLE_FILE, wait_until="load", timeout=120_000)
        page.wait_for_timeout(3000)
        shape = page.evaluate(
            "() => ({ play: !!document.querySelector('.play-big'),"
            " game: !!globalThis.__sfGame, iframes: document.querySelectorAll('iframe').length })"
        )
        check("menu renders from disk", shape["play"])
        check("game parked from disk", not shape["game"] and shape["iframes"] == 0)
        page.fill("#gear-name", "tester")
        page.click(".play-big")
        page.wait_for_timeout(700)
        page.click("#start-modes .mode-tile")
        match = game_in(page)
        check("blob match frame appears", match is not None)
        if match is None:
            b.close()
            return
        match.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
        match.wait_for_timeout(2000)
        check("match boots from disk", match.evaluate("() => globalThis.__sfGame.match?.mode") == "tdm")
        page.mouse.click(550, 380)
        page.wait_for_timeout(1400)
        playable = match.evaluate(
            "() => ({ locked: !!document.pointerLockElement,"
            " fallback: !!globalThis.__sfGame?.input?.sfFallback,"
            " active: !!globalThis.__sfGame?.input?.active })"
        )
        check(
            "disk match is playable",
            playable["active"] and (playable["locked"] or playable["fallback"]),
            json.dumps(playable),
        )
        iframes, back = home(page, match, errors)
        check("HOME removes the blob frame", iframes == 0)
        check("HOME restores the disk menu", back["play"])
        page.click("#start-modes .mode-tile")
        second = game_in(page)
        check("second disk match starts", second is not None)
        if second is not None:
            second.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
            check("second disk match is live", second.evaluate("() => globalThis.__sfGame.match?.mode") == "tdm")
            home(page, second, errors)
        check("no page errors", not errors, "; ".join(errors[:3]))
        ctx.close()


def svg_file(p) -> None:
    print("file:// SVG wrapper")
    errors: list[str] = []
    with launch(p) as b:
        ctx = b.new_context(viewport={"width": 1100, "height": 760})
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)[:200]))
        page.on(
            "console",
            lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None,
        )
        page.goto(SVG_FILE, wait_until="load", timeout=180_000)
        game = None
        for _ in range(120):
            for candidate in [f for f in page.frames if f is not page.main_frame]:
                try:
                    if candidate.query_selector(".play-big"):
                        game = candidate
                        break
                except Exception:
                    pass
            if game is not None:
                break
            page.wait_for_timeout(500)
        check("inline frame opens", game is not None)
        if game is None:
            b.close()
            return
        check("SVG menu renders", True)
        match = menu_flow(page, game, errors)
        check("SVG match starts", match is not None)
        if match is not None:
            match.wait_for_timeout(1500)
            page.mouse.click(550, 380)
            page.wait_for_timeout(1400)
            playable = match.evaluate(
                "() => ({ locked: !!document.pointerLockElement,"
                " fallback: !!globalThis.__sfGame?.input?.sfFallback,"
                " active: !!globalThis.__sfGame?.input?.active })"
            )
            check(
                "SVG file match is playable",
                playable["active"] and (playable["locked"] or playable["fallback"]),
                json.dumps(playable),
            )
            match.evaluate("() => globalThis.__sfHome && globalThis.__sfHome()")
            page.wait_for_timeout(3000)
            returned = False
            for _ in range(40):
                for candidate in [f for f in page.frames if f is not page.main_frame]:
                    try:
                        if candidate.query_selector(".play-big"):
                            returned = True
                            break
                    except Exception:
                        pass
                if returned:
                    break
                page.wait_for_timeout(500)
            check("SVG HOME returns a fresh menu", returned)
        check("no page errors", not errors, "; ".join(errors[:3]))
        ctx.close()


def svg_http(p) -> None:
    print("http SVG wrapper")
    errors: list[str] = []
    with launch(p) as b:
        ctx = b.new_context(viewport={"width": 1200, "height": 800})
        page = ctx.new_page()
        popups = []
        ctx.on("page", lambda q: popups.append(q) if q is not page else None)
        page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)[:200]))
        page.on(
            "console",
            lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None,
        )
        page.goto(SVG_HTTP + "?name=tester", wait_until="load", timeout=180_000)
        page.wait_for_function(
            "() => /CLICK TO START|READY/.test(document.getElementById('sf-hint')?.textContent || '')",
            timeout=120_000,
        )
        check("launcher renders", page.evaluate("() => !!document.getElementById('sf-button')"))
        check("launcher waits for IndexedDB", True)
        page.mouse.click(640, 400)
        for _ in range(20):
            if popups:
                break
            page.wait_for_timeout(500)
        check("launcher opens a tab", bool(popups))
        if not popups:
            check("no page errors", not errors, "; ".join(errors[:3]))
            ctx.close()
            return
        game = popups[0]
        game.bring_to_front()
        game.on("pageerror", lambda e: errors.append("popup: " + str(e)[:200]))
        game.on(
            "console",
            lambda m: errors.append("popup console: " + m.text[:160]) if m.type == "error" else None,
        )
        try:
            game.wait_for_selector(".play-big", timeout=60_000)
        except Exception:
            check("popup menu renders", False, "no .play-big")
            ctx.close()
            return
        check("popup menu renders", True)
        match = menu_flow(page, game, errors)
        check("popup match starts", match is not None)
        if match is not None:
            match.wait_for_timeout(1500)
            match.mouse.click(600, 400)
            match.wait_for_timeout(1400)
            playable = match.evaluate(
                "() => ({ locked: !!document.pointerLockElement,"
                " fallback: !!globalThis.__sfGame?.input?.sfFallback,"
                " active: !!globalThis.__sfGame?.input?.active })"
            )
            check(
                "SVG http match is playable",
                playable["active"] and (playable["locked"] or playable["fallback"]),
                json.dumps(playable),
            )
            match.evaluate("() => globalThis.__sfHome && globalThis.__sfHome()")
            match.wait_for_timeout(4000)
            check("popup HOME returns a fresh menu",
                  match.evaluate("() => !!document.querySelector('.play-big')"))
        check("no page errors", not errors, "; ".join(errors[:3]))
        ctx.close()


def main() -> int:
    with sync_playwright() as p:
        for fn in (http_single, file_single, svg_file, svg_http):
            try:
                fn(p)
            except Exception as exc:
                check(fn.__name__ + " completed", False, str(exc)[:200])
    failed = [name for name, ok, _ in results if not ok]
    print(json.dumps({"browser": BROWSER, "checks": len(results), "failed": failed}, indent=2))
    print("RESULT:", "PASS" if not failed else "FAIL")
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(main())
