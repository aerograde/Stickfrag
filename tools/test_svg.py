"""Test the SVG build over http.

`stickfrag.svg` carries the whole single file and runs it in a nested browsing
context. Which one depends on where the file came from:

* `file://` -- an inline `<iframe>` fed a blob URL, in place. Pointer lock works
  there, which is what makes the game playable. `tools/test_svg_file.py` asserts
  that path end to end.
* `http(s)` -- a new tab. Chromium refuses pointer lock inside a blob document
  served over http, so the popup is the only path that gives a playable match.

What this asserts over http:
  * the SVG page renders its launcher and offers a clickable retry,
  * opening it produces a tab holding the game,
  * the query string survives into that tab, so invite links still resolve,
  * the menu is the whole site and renders the mode tiles,
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
        # The payload is stored first; the launcher then waits for a gesture.
        page.wait_for_function(
            "() => /CLICK TO START|READY/.test(document.getElementById('sf-hint')?.textContent || '')",
            timeout=120_000,
        )
        page.wait_for_timeout(200)

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

        # Browsers refuse window.open on load, so the retry is a click.
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
        game.wait_for_timeout(1500)
        # The launcher keeps the source so HOME in the tab can rewrite the menu.
        page.wait_for_timeout(4000)
        launcher["payloadLeft"] = page.evaluate(
            "() => (document.getElementById('sf-source') || {}).textContent"
            " ? document.getElementById('sf-source').textContent.length : 0"
        )

        stored = page.evaluate(
            """() => new Promise((res) => {
              const req = indexedDB.open('stickfrag', 1);
              req.onerror = () => res(null);
              req.onsuccess = () => {
                const tx = req.result.transaction('files', 'readonly');
                const get = tx.objectStore('files').get('stickfrag.html');
                get.onerror = () => res(null);
                get.onsuccess = () => {
                  const v = get.result;
                  res(v ? { html: v.html && v.html.size, boot: typeof v.boot } : null);
                };
              };
            })"""
        )
        load_source = game.evaluate("() => window.__SF_LOAD_SOURCE || null")

        menu = game.evaluate(
            """() => {
              const root = document.getElementById('sf-home-root');
              const doc = document.scrollingElement;
              return {
                tiles: document.querySelectorAll('#start-modes .mode-tile').length,
                scrolls: doc.scrollHeight > innerHeight + 4,
                page: doc.scrollHeight,
                bar: !!document.querySelector('header.bar'),
                footer: !!document.querySelector('footer'),
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
        game.wait_for_timeout(900)
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
        "launcher keeps the file for HOME": launcher["payloadLeft"] > 0,
        "payload stored in IndexedDB": bool(stored) and stored["html"] > 1_000_000
        and stored["boot"] == "string",
        "tab loaded from IndexedDB": load_source == "idb",
        "query string reaches the tab": "name=tester" in (menu["search"] or ""),
        "boot params carried over": (menu["params"] or {}).get("name") == "tester",
        "menu is the whole site": menu["bar"] and menu["footer"] and menu["page"] > 2000,
        "menu scrolls like the site": menu["scrolls"],
        "menu does not overflow sideways": menu["overflowX"] is False,
        "mode tiles render": menu["tiles"] >= 5,
        "game parked until asked": menu["gameRunning"] is False,
        "PLAY opens the mode list": step == "start",
        "match starts in place": match["selfId"] == 1,
        "chosen mode is applied": match["mode"] == "tdm",
        "team mode has team scores": match["teams"] == [0, 0],
        "frame rate at refresh": fps >= 55,
        "no errors": not errors,
        "no external requests": not external,
    }

    print(json.dumps({"launcher": launcher, "stored": stored, "loadSource": load_source,
                      "menu": menu, "match": match, "fps": fps}, indent=2))
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
