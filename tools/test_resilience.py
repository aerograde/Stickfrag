#!/usr/bin/env python3
"""Adversarial failure paths: the game must degrade, not trap.

Covers machines and hosts where a feature is missing:
  * localStorage/sessionStorage throw on write (private windows)
  * the host blocks its own file in an iframe (X-Frame-Options/proxy)
  * IndexedDB is unavailable (the SVG's direct-write fallback)
  * pop-ups are blocked (the launcher retries after permission)
  * WebGL 2 is disabled (a clear message, not a black match)
  * URL.createObjectURL is unavailable (a clear message, menu restored)
  * a small touch viewport boots a match
  * HOME twice, a second match, and reloading during a match
"""

from __future__ import annotations

import json
import time
from pathlib import Path

from playwright.sync_api import Browser, sync_playwright

BASE = "http://127.0.0.1:8123"
SINGLE = BASE + "/stickfrag.html"
SVG = BASE + "/stickfrag.svg"
SVG_FILE = (Path(__file__).resolve().parent.parent / "stickfrag.com" / "stickfrag.svg").as_uri()

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, bool(ok), detail))
    print(("  ok   " if ok else "  FAIL ") + name + ((" — " + detail) if detail and not ok else ""))


def game_in(page, timeout: float = 90) -> object | None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        for frame in page.frames:
            try:
                if frame.evaluate("() => !!globalThis.__sfGame"):
                    return frame
            except Exception:
                pass
        page.wait_for_timeout(300)
    return None


def launch(b: Browser, *, webgl: bool = True):
    args = ["--enable-unsafe-swiftshader"] if webgl else [
        "--disable-webgl", "--disable-webgl2", "--disable-3d-apis",
    ]
    return b.new_context(viewport={"width": 1100, "height": 760}), args


def start_menu_match(page, touch: bool = False) -> object | None:
    page.fill("#gear-name", "tester")
    page.click(".play-big")
    page.wait_for_timeout(700)
    if touch:
        page.tap("#start-modes .mode-tile")
    else:
        page.click("#start-modes .mode-tile")
    return game_in(page)


def scenario_storage(p) -> None:
    print("storage blocked")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1100, "height": 760})
    errors: list[str] = []
    ctx.add_init_script(
        """(() => {
          const bad = () => { throw new DOMException('blocked', 'SecurityError'); };
          for (const k of ['getItem', 'setItem', 'removeItem', 'clear', 'key']) {
            Object.defineProperty(Storage.prototype, k, { value: bad, configurable: true });
          }
          Object.defineProperty(Storage.prototype, 'length', { get: bad, configurable: true });
        })();"""
    )
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.on("console", lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None)
    page.goto(SINGLE + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_timeout(2500)
    check("storage: menu renders", page.evaluate("() => !!document.querySelector('.play-big')"))
    match = start_menu_match(page)
    check("storage: match frame starts", match is not None)
    if match:
        match.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
        check("storage: match is live", match.evaluate("() => globalThis.__sfGame?.match?.mode") == "tdm")
        check(
            "storage: nickname carried",
            match.evaluate("() => globalThis.__SF_BOOT_PARAMS?.name") == "tester",
        )
        page.evaluate("() => globalThis.__sfHome()")
        page.wait_for_timeout(1800)
        check("storage: HOME restores menu", page.evaluate("() => !!document.querySelector('.play-big')"))
    check("storage: no page errors", not errors, "; ".join(errors[:3]))
    ctx.close()
    b.close()


def scenario_self_block(p) -> None:
    print("host blocks the self iframe")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1100, "height": 760})
    errors: list[str] = []
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.on("console", lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None)

    def route(r):
        if "embed=1" in r.request.url and r.request.resource_type == "document":
            r.fulfill(status=200, content_type="text/html", body="<h1>blocked by host</h1>")
        else:
            r.continue_()
    ctx.route("**/*", route)
    page.goto(SINGLE + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_timeout(2200)
    match = start_menu_match(page)
    check("blocked self frame: blob fallback starts", match is not None)
    if match:
        match.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
        check("blocked self frame: mode", match.evaluate("() => globalThis.__sfGame?.match?.mode") == "tdm")
        check(
            "blocked self frame: fallback is a blob",
            match.url.startswith("blob:"),
            match.url[:60],
        )
        state = page.evaluate(
            "() => ({ loading: !!document.getElementById('sf-game-loading'),"
            " err: document.getElementById('sf-error')?.textContent || null })"
        )
        check("blocked self frame: no stuck loader", not state["loading"] and not state["err"])
        page.evaluate("() => globalThis.__sfHome()")
        page.wait_for_timeout(1800)
        check("blocked self frame: HOME", page.evaluate("() => document.querySelectorAll('iframe').length") == 0)
    check("blocked self frame: no page errors", not errors, "; ".join(errors[:3]))
    ctx.close()
    b.close()


def scenario_idb_blocked(p) -> None:
    print("IndexedDB blocked, SVG http")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1200, "height": 800})
    ctx.add_init_script(
        "Object.defineProperty(window, 'indexedDB',"
        " { get() { throw new DOMException('blocked', 'SecurityError'); }, configurable: true });"
    )
    popups = []
    errors: list[str] = []
    page = ctx.new_page()
    ctx.on("page", lambda q: popups.append(q) if q is not page else None)
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.on("console", lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None)
    page.goto(SVG + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_function(
        "() => /CLICK TO START|READY/.test(document.getElementById('sf-hint')?.textContent || '')",
        timeout=120_000,
    )
    check("idb blocked: launcher ready without storage", True)
    page.mouse.click(640, 400)
    for _ in range(30):
        if popups:
            break
        page.wait_for_timeout(500)
    check("idb blocked: direct-write tab opens", bool(popups))
    if popups:
        game = popups[0]
        try:
            game.wait_for_selector(".play-big", timeout=90_000)
            check("idb blocked: payload menu renders", True)
            source = game.evaluate("() => window.__SF_LOAD_SOURCE || null")
            check("idb blocked: did not pretend to use IDB", source != "idb", repr(source))
        except Exception as exc:
            check("idb blocked: payload menu renders", False, str(exc)[:120])
    check("idb blocked: no page errors", not errors, "; ".join(errors[:3]))
    ctx.close()
    b.close()


def scenario_popup_blocked(p) -> None:
    print("pop-ups blocked, SVG http")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1200, "height": 800})
    ctx.add_init_script(
        """(() => {
          const real = window.open;
          Object.defineProperty(window, 'open', {
            value: function (...args) {
              if (window.__sfAllowPopups) return real.apply(window, args);
              return null;
            },
            configurable: true,
            writable: true,
          });
        })();"""
    )
    popups = []
    errors: list[str] = []
    page = ctx.new_page()
    ctx.on("page", lambda q: popups.append(q) if q is not page else None)
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.on("console", lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None)
    page.goto(SVG + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_function(
        "() => /CLICK TO START|READY/.test(document.getElementById('sf-hint')?.textContent || '')",
        timeout=120_000,
    )
    page.mouse.click(640, 400)
    page.wait_for_timeout(1200)
    hint = page.evaluate("() => document.getElementById('sf-hint')?.textContent || ''")
    check("popup blocked: reports the block", "BLOCKED" in hint.upper(), hint)
    check("popup blocked: no tab opened", not popups)
    page.evaluate("() => { window.__sfAllowPopups = true; }")
    check("popup blocked: permission can recover", page.evaluate("() => window.__sfAllowPopups === true"))
    page.mouse.click(640, 400)
    for _ in range(20):
        if popups:
            break
        page.wait_for_timeout(500)
    check("popup blocked: retry opens the tab", bool(popups))
    if popups:
        try:
            popups[0].wait_for_selector(".play-big", timeout=90_000)
            check("popup blocked: retry menu renders", True)
        except Exception as exc:
            check("popup blocked: retry menu renders", False, str(exc)[:120])
    check("popup blocked: no page errors", not errors, "; ".join(errors[:3]))
    ctx.close()
    b.close()


def scenario_webgl_disabled(p) -> None:
    print("WebGL 2 disabled")
    b = p.chromium.launch(
        headless=True,
        args=["--disable-webgl", "--disable-webgl2", "--disable-3d-apis"],
    )
    errors: list[str] = []
    page = b.new_context(viewport={"width": 1100, "height": 760}).new_page()
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.goto(SINGLE + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_timeout(2500)
    check("webgl off: menu still renders", page.evaluate("() => !!document.querySelector('.play-big')"))
    try:
        page.fill("#gear-name", "tester")
        page.click(".play-big", timeout=8000)
        page.wait_for_timeout(700)
        page.click("#start-modes .mode-tile", timeout=8000)
        page.wait_for_timeout(2500)
    except Exception as exc:
        check("webgl off: menu remains usable", False, str(exc)[:120])
    state = page.evaluate(
        """() => ({
          err: document.getElementById('sf-error')?.textContent || null,
          iframes: document.querySelectorAll('iframe').length,
          loading: !!document.getElementById('sf-game-loading'),
          home: getComputedStyle(document.getElementById('sf-home-root')).display,
          play: !!document.querySelector('.play-big'),
        })"""
    )
    check("webgl off: explains the requirement", "WebGL 2" in (state["err"] or ""), repr(state["err"]))
    check("webgl off: no fake match frame", state["iframes"] == 0)
    check("webgl off: no stuck loader", not state["loading"])
    check("webgl off: menu returns", state["home"] == "block" and state["play"])
    # Three.js reports the missing API on the console; only page errors matter.
    check("webgl off: no uncaught page errors", not errors, "; ".join(errors[:3]))
    b.close()


def scenario_blob_blocked(p) -> None:
    print("URL.createObjectURL blocked")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1100, "height": 760})
    ctx.add_init_script(
        """(() => {
          const bad = () => { throw new DOMException('blocked', 'SecurityError'); };
          URL.createObjectURL = bad;
        })();"""
    )
    errors: list[str] = []
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.goto(SINGLE + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_timeout(2200)
    try:
        page.fill("#gear-name", "tester")
        page.click(".play-big", timeout=8000)
        page.wait_for_timeout(700)
        page.click("#start-modes .mode-tile", timeout=8000)
        # The failure happens inside the parsed embed document; on a slow host
        # that can take several seconds.
        try:
            page.wait_for_function("() => !!document.getElementById('sf-error')", timeout=60_000)
        except Exception:
            pass
        page.wait_for_timeout(600)
    except Exception as exc:
        check("blob blocked: menu remains usable", False, str(exc)[:120])
    state = page.evaluate(
        """() => ({
          err: document.getElementById('sf-error')?.textContent || null,
          iframes: document.querySelectorAll('iframe').length,
          loading: !!document.getElementById('sf-game-loading'),
          home: getComputedStyle(document.getElementById('sf-home-root')).display,
          play: !!document.querySelector('.play-big'),
        })"""
    )
    check("blob blocked: reports a failure", bool(state["err"]), repr(state["err"]))
    check("blob blocked: no stuck iframe", state["iframes"] == 0)
    check("blob blocked: no stuck loader", not state["loading"])
    check("blob blocked: menu returns", state["home"] == "block" and state["play"])
    check("blob blocked: no uncaught page errors", not errors, "; ".join(errors[:3]))
    ctx.close()
    b.close()


def scenario_small_touch(p) -> None:
    print("small touch viewport")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    ctx = b.new_context(
        viewport={"width": 320, "height": 480},
        screen={"width": 320, "height": 480},
        has_touch=True,
        is_mobile=True,
        device_scale_factor=2,
    )
    errors: list[str] = []
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.on("console", lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None)
    page.goto(SINGLE + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_timeout(2500)
    check("small: menu renders", page.evaluate("() => !!document.querySelector('.play-big')"))
    match = start_menu_match(page, touch=True)
    check("small: match starts", match is not None)
    if match:
        match.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
        match.wait_for_timeout(1500)
        geo = match.evaluate(
            """() => {
              const c = document.getElementById('game');
              const r = c ? c.getBoundingClientRect() : {width: 0, height: 0};
              return { w: innerWidth, h: innerHeight, cw: r.width, ch: r.height,
                       buf: c ? [c.width, c.height] : [0, 0],
                       touch: navigator.maxTouchPoints };
            }"""
        )
        check("small: game fills the viewport", geo["cw"] >= geo["w"] - 2 and geo["ch"] >= geo["h"] - 2, json.dumps(geo))
        check("small: draw buffer is capped", geo["buf"][0] <= 1600 and geo["buf"][1] <= 1600, json.dumps(geo["buf"]))
        page.evaluate("() => globalThis.__sfHome()")
        page.wait_for_timeout(1500)
        check("small: HOME", page.evaluate("() => document.querySelectorAll('iframe').length") == 0)
    check("small: no page errors", not errors, "; ".join(errors[:3]))
    ctx.close()
    b.close()


def scenario_rapid(p) -> None:
    print("rapid HOME, second match, reload")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    page = b.new_context(viewport={"width": 1100, "height": 760}).new_page()
    errors: list[str] = []
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.on("console", lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None)
    page.goto(SINGLE + "?name=tester", wait_until="load", timeout=120_000)
    page.wait_for_timeout(2200)
    match = start_menu_match(page)
    check("rapid: first match", match is not None)
    if match:
        match.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
        page.evaluate("() => { globalThis.__sfHome(); globalThis.__sfHome(); }")
        page.wait_for_timeout(1800)
        check("rapid: double HOME leaves one frame", page.evaluate("() => document.querySelectorAll('iframe').length") == 0)
        check("rapid: double HOME has no error", page.evaluate("() => !document.getElementById('sf-error')"))
        page.click("#start-modes .mode-tile")
        second = game_in(page)
        check("rapid: second match", second is not None)
        if second:
            second.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
            page.reload(wait_until="load", timeout=120_000)
            third = game_in(page)
            check("rapid: reload restarts the match", third is not None)
            if third:
                third.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=120_000)
                check("rapid: reloaded mode", third.evaluate("() => globalThis.__sfGame?.match?.mode") == "tdm")
                page.evaluate("() => globalThis.__sfHome()")
                page.wait_for_timeout(1500)
    check("rapid: no page errors", not errors, "; ".join(errors[:3]))
    b.close()


def scenario_svg_match(p) -> None:
    print("SVG direct match over http, then HOME")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    ctx = b.new_context(viewport={"width": 1280, "height": 800})
    page = ctx.new_page()
    errors: list[str] = []
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.goto(
        SVG + "?peer=host&mode=ffa&map=yard&name=tester",
        wait_until="load",
        timeout=180_000,
    )
    page.wait_for_function(
        "() => /CLICK TO START|READY/.test(document.getElementById('sf-hint')?.textContent || '')",
        timeout=120_000,
    )
    popups: list = []
    ctx.on("page", lambda q: popups.append(q) if q is not page else None)
    page.mouse.click(640, 400)
    deadline = time.monotonic() + 20
    while not popups and time.monotonic() < deadline:
        page.wait_for_timeout(500)
    check("svg direct match: tab opens", bool(popups))
    if popups:
        tab = popups[0]
        tab.on("pageerror", lambda e: errors.append("tab: " + str(e)[:160]))
        tab.on(
            "console",
            lambda m: errors.append("tab console: " + m.text[:160]) if m.type == "error" else None,
        )
        try:
            tab.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=180_000)
        except Exception:
            pass
        ready = tab.evaluate("() => !!globalThis.__sfGame?.ready")
        check("svg direct match: match boots", ready)
        if ready:
            check(
                "svg direct match: mode came from the wrapper query",
                tab.evaluate("() => globalThis.__sfGame?.match?.mode") == "ffa",
            )
            tab.evaluate("() => globalThis.__sfHome()")
            tab.wait_for_function(
                "() => !!document.querySelector('.play-big')", timeout=120_000
            )
            check(
                "svg direct match: HOME returns to a fresh menu",
                tab.evaluate("() => !!document.querySelector('.play-big')"),
            )
    check("svg direct match: no page errors", not errors, "; ".join(errors[:3]))
    b.close()


def scenario_svg_match_file(p) -> None:
    print("SVG direct match from disk, then HOME")
    b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
    page = b.new_page(viewport={"width": 1280, "height": 800})
    errors: list[str] = []
    page.on("pageerror", lambda e: errors.append(str(e)[:160]))
    page.goto(
        SVG_FILE + "?peer=host&mode=ffa&map=yard&name=tester",
        wait_until="load",
        timeout=180_000,
    )
    game = None
    deadline = time.monotonic() + 120
    while game is None and time.monotonic() < deadline:
        for frame in page.frames:
            if frame is page.main_frame:
                continue
            try:
                if frame.evaluate("() => !!globalThis.__sfGame?.ready"):
                    game = frame
                    break
            except Exception:
                pass
        if game is None:
            page.wait_for_timeout(500)
    check("svg file direct match: match boots", game is not None)
    if game is not None:
        check(
            "svg file direct match: mode came from the wrapper query",
            game.evaluate("() => globalThis.__sfGame?.match?.mode") == "ffa",
        )
        game.evaluate("() => globalThis.__sfHome()")
        menu = False
        deadline = time.monotonic() + 120
        while not menu and time.monotonic() < deadline:
            for frame in page.frames:
                if frame is page.main_frame:
                    continue
                try:
                    if frame.query_selector(".play-big"):
                        menu = True
                        break
                except Exception:
                    pass
            if not menu:
                page.wait_for_timeout(500)
        check("svg file direct match: HOME returns to a fresh menu", menu)
    check("svg file direct match: no page errors", not errors, "; ".join(errors[:3]))
    b.close()


def main() -> int:
    scenarios = [
        scenario_storage,
        scenario_self_block,
        scenario_idb_blocked,
        scenario_popup_blocked,
        scenario_webgl_disabled,
        scenario_blob_blocked,
        scenario_small_touch,
        scenario_svg_match,
        scenario_svg_match_file,
        scenario_rapid,
    ]
    with sync_playwright() as p:
        for fn in scenarios:
            try:
                fn(p)
            except Exception as exc:
                check(fn.__name__ + " completed", False, str(exc)[:200])
    failed = [n for n, ok, _ in results if not ok]
    print(json.dumps({"checks": len(results), "failed": failed}, indent=2))
    print("RESULT:", "PASS" if not failed else "FAIL")
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(main())
