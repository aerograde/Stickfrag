"""Test the SVG build.

`stickfrag.svg` is the same single file as `stickfrag.html`, wrapped so a browser
opens it as an image document. An SVG document is XML, so the game cannot run
inside it -- `document.body` is null and `createElement("canvas")` returns an
`SVGElement` with no `getContext`. The wrapper therefore writes the untouched
payload into a fresh `about:blank` tab, which is a real HTML document.

What this asserts:
  * the SVG page renders its launcher and offers a clickable retry,
  * opening it produces a tab holding the game,
  * the query string survives into that tab, so invite links still resolve,
  * the menu renders there with the mode tiles and no top bar,
  * the real flow (nickname, PLAY, mode) starts a match in place,
  * it holds 60 fps and stays free of errors and network requests.
"""

from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123"
SHOT = Path("/tmp/stickfrag-svg.png")


def main() -> int:
    errors: list[str] = []
    external: list[str] = []
    popups = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()
        context.on("page", lambda q: popups.append(q) if q is not page else None)

        for target in (page, context):
            target.on(
                "pageerror",
                lambda e: errors.append(str(e)[:200]) if hasattr(e, "strip") else None,
            )
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        page.on("console", lambda m: errors.append("console: " + m.text[:180]) if m.type == "error" else None)
        page.on(
            "request",
            lambda r: external.append(r.url[:80])
            if r.url.startswith(("http://", "https://")) and not r.url.startswith(BASE)
            else None,
        )

        # A query string must survive into the tab, because that is how an invite
        # link names its room.
        page.goto(f"{BASE}/stickfrag.svg?name=tester&map=yard", wait_until="load", timeout=90_000)
        page.wait_for_timeout(2000)

        launcher = page.evaluate(
            """() => {
              const hint = document.getElementById('sf-hint');
              const button = document.getElementById('sf-button');
              return {
                hint: hint ? hint.textContent : null,
                hasButton: !!button,
                payloadLeft: (document.getElementById('sf-source') || {}).textContent
                  ? document.getElementById('sf-source').textContent.length : 0,
              };
            }"""
        )

        # Browsers usually refuse window.open on load, so the retry is a click.
        if not popups:
            page.mouse.click(640, 400)
            page.wait_for_timeout(1500)

        if not popups:
            print("FAIL: the SVG never opened a tab")
            browser.close()
            return 1

        game = popups[0]
        game.on("pageerror", lambda e: errors.append(str(e)[:200]))
        game.on(
            "console",
            lambda m: errors.append("console: " + m.text[:180]) if m.type == "error" else None,
        )
        game.on(
            "request",
            lambda r: external.append(r.url[:80])
            if r.url.startswith(("http://", "https://")) and not r.url.startswith(BASE)
            else None,
        )

        game.wait_for_selector(".play-big", timeout=60_000)
        game.wait_for_timeout(1200)

        menu = game.evaluate(
            """() => {
              const root = document.getElementById('sf-home-root');
              return {
                tiles: document.querySelectorAll('#start-modes .mode-tile').length,
                scrolls: document.documentElement.scrollHeight > document.documentElement.clientHeight + 2,
                bar: !!document.querySelector('header.bar'),
                gameRunning: !!window.__sfGame,
                search: location.search,
                params: window.__SF_BOOT_PARAMS || null,
                overflowX: root ? root.scrollWidth > root.clientWidth + 2 : null,
              };
            }"""
        )

        game.evaluate(
            """() => {
              const n = document.getElementById('gear-name');
              if (n && !n.hidden) {
                n.value = 'tester';
                n.dispatchEvent(new Event('input', { bubbles: true }));
              }
              document.querySelector('.play-big').click();
            }"""
        )
        game.wait_for_timeout(700)
        step = game.evaluate("() => document.getElementById('gear').dataset.step")

        game.evaluate("() => document.querySelector('#start-modes .mode-tile').click()")
        game.wait_for_function("() => window.__sfGame && window.__sfGame.ready", timeout=90_000)
        match = game.evaluate(
            """() => {
              const g = window.__sfGame;
              return {
                mode: g.match ? g.match.mode : null,
                selfId: g.selfId,
                teams: g.match && g.match.teamScores ? g.match.teamScores : null,
              };
            }"""
        )

        game.wait_for_timeout(4000)
        fps = game.evaluate(
            """() => new Promise((res) => {
              let n = 0;
              const t0 = performance.now();
              const loop = () => {
                n++;
                if (performance.now() - t0 < 6000) requestAnimationFrame(loop);
                else res(+(n / ((performance.now() - t0) / 1000)).toFixed(1));
              };
              requestAnimationFrame(loop);
            })"""
        )

        SHOT.parent.mkdir(parents=True, exist_ok=True)
        game.screenshot(path=str(SHOT))
        browser.close()

    checks = {
        "launcher renders": launcher["hasButton"] and launcher["hint"] is not None,
        "launcher released the payload": launcher["payloadLeft"] == 0,
        "query string reaches the tab": "name=tester" in (menu["search"] or ""),
        "boot params carried over": (menu["params"] or {}).get("name") == "tester",
        "menu renders": menu["tiles"] >= 5,
        "menu does not scroll": menu["scrolls"] is False and menu["overflowX"] is False,
        "no top bar": menu["bar"] is False,
        "game parked until asked": menu["gameRunning"] is False,
        "PLAY opens the mode list": step == "start",
        "match starts in place": match["selfId"] == 1,
        "chosen mode is applied": match["mode"] == "tdm",
        "team mode has team scores": match["teams"] == [0, 0],
        "frame rate at refresh": fps >= 55,
        "no errors": not errors,
        "no external requests": not external,
    }

    print(json.dumps({"launcher": launcher, "menu": menu, "match": match, "fps": fps}, indent=2))
    if errors:
        print("errors:", errors[:5])
    if external:
        print("external:", external[:5])
    for name, ok in checks.items():
        print(f"  {'ok  ' if ok else 'FAIL'} {name}")
    good = all(checks.values())
    print(f"RESULT: {'PASS' if good else 'FAIL'}")
    return 0 if good else 1


if __name__ == "__main__":
    raise SystemExit(main())
