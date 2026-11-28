#!/usr/bin/env python3
"""Menu/SVG matrix without starting a match.

The full gameplay matrix needs a GPU. This covers the parts that must work on a
headless Linux box as well: the single file's menu from http and disk, the SVG
launcher's IndexedDB write, and the SVG payload menu from disk. Run it under
STICKFRAG_HEADLESS=1 in CI or the Playwright image.
"""

from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123"
SITE = Path(__file__).resolve().parent.parent / "stickfrag.com"
SINGLE_HTTP = f"{BASE}/stickfrag.html"
SINGLE_FILE = (SITE / "stickfrag.html").as_uri()
SVG_HTTP = f"{BASE}/stickfrag.svg"
SVG_FILE = (SITE / "stickfrag.svg").as_uri() + "?name=tester"
BROWSERS = ["chromium", "firefox", "webkit"]

results: list[tuple[str, bool, str]] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((name, bool(ok), detail))
    print(f"  {'ok  ' if ok else 'FAIL'} {name}" + (f"  ({detail})" if detail and not ok else ""))


def menu_shape(page):
    return page.evaluate(
        """() => ({
          play: !!document.querySelector('.play-big'),
          name: !!document.getElementById('gear-name'),
          game: !!globalThis.__sfGame,
          iframes: document.querySelectorAll('iframe').length,
        })"""
    )


def mode_count(page) -> int:
    return page.evaluate("() => document.querySelectorAll('#start-modes .mode-tile').length")


def read_store(page):
    return page.evaluate(
        """() => new Promise((res) => {
          try {
            const req = indexedDB.open('stickfrag');
            req.onerror = () => res({ok: false, why: 'open'});
            req.onsuccess = () => {
              try {
                const tx = req.result.transaction('files', 'readonly');
                const get = tx.objectStore('files').get('stickfrag.html');
                get.onerror = () => res({ok: false, why: 'get'});
                get.onsuccess = () => {
                  const v = get.result;
                  res({ok: !!v, html: v && v.html ? v.html.size : 0,
                       boot: typeof (v && v.boot)});
                };
              } catch (e) { res({ok: false, why: String(e)}); }
            };
          } catch (e) { res({ok: false, why: String(e)}); }
        })"""
    )


def payload_menu(pg, timeout: int = 90):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        for f in pg.frames:
            try:
                if f.query_selector(".play-big"):
                    return f
            except Exception:
                pass
        pg.wait_for_timeout(300)
    return None


def run_browser(p) -> None:
    engine = getattr(p, BROWSERS_INDEX)
    args = ["--enable-unsafe-swiftshader"] if BROWSERS_INDEX == "chromium" else []
    b = engine.launch(headless=True, args=args)
    ctx = b.new_context(viewport={"width": 1100, "height": 760}, has_touch=True)
    errors: list[str] = []
    external: list[str] = []
    ctx.on(
        "request",
        lambda r: external.append(r.url[:90])
        if r.url.startswith(("http://", "https://")) and not r.url.startswith(BASE)
        else None,
    )
    page = ctx.new_page()
    page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)[:180]))

    # http single file: the menu only.
    page.goto(SINGLE_HTTP + "?name=tester", wait_until="load", timeout=180_000)
    page.wait_for_timeout(2500)
    shape = menu_shape(page)
    check(f"{BROWSERS_INDEX}: http menu", shape["play"] and shape["name"])
    check(f"{BROWSERS_INDEX}: http game parked", not shape["game"] and shape["iframes"] == 0)
    page.fill("#gear-name", "tester")
    page.click(".play-big")
    page.wait_for_timeout(900)
    check(f"{BROWSERS_INDEX}: http mode list", mode_count(page) == 6)

    # file:// single file: the same menu, no server.
    disk = ctx.new_page()
    disk.on("pageerror", lambda e: errors.append("file pageerror: " + str(e)[:180]))
    disk.goto(SINGLE_FILE, wait_until="load", timeout=180_000)
    disk.wait_for_timeout(2500)
    dshape = menu_shape(disk)
    check(f"{BROWSERS_INDEX}: file menu", dshape["play"] and dshape["name"])
    check(f"{BROWSERS_INDEX}: file game parked", not dshape["game"] and dshape["iframes"] == 0)

    # http SVG: store the payload in IndexedDB and launch the tab.
    svg = ctx.new_page()
    popups = []

    def on_popup(q):
        if q is not page and q is not disk and q is not svg:
            popups.append(q)
            q.on("pageerror", lambda e: errors.append("popup pageerror: " + str(e)[:180]))

    ctx.on("page", on_popup)
    svg.on("pageerror", lambda e: errors.append("svg pageerror: " + str(e)[:180]))
    svg.goto(SVG_HTTP + "?name=tester", wait_until="load", timeout=180_000)
    svg.wait_for_function(
        "() => /CLICK TO START|READY/.test(document.getElementById('sf-hint')?.textContent || '')",
        timeout=180_000,
    )
    source = svg.evaluate(
        "() => (document.getElementById('sf-source')?.textContent || '').length"
    )
    store = read_store(svg)
    check(f"{BROWSERS_INDEX}: svg payload present", source > 1_000_000, str(source))
    if BROWSERS_INDEX == "webkit" and not store.get("ok"):
        print("  info  WebKit headless has no IndexedDB here; exercising the direct-write fallback")
    else:
        check(
            f"{BROWSERS_INDEX}: svg stored in IndexedDB",
            store.get("ok") and store.get("html", 0) > 1_000_000,
            json.dumps(store),
        )
    svg.mouse.click(640, 400)
    for _ in range(30):
        if popups:
            break
        svg.wait_for_timeout(500)
    check(f"{BROWSERS_INDEX}: svg tab opens", bool(popups))
    if popups:
        tab = popups[0]
        try:
            tab.wait_for_selector(".play-big", timeout=120_000)
            check(f"{BROWSERS_INDEX}: svg tab menu renders", True)
            load_source = tab.evaluate("() => window.__SF_LOAD_SOURCE || null")
            check(
                f"{BROWSERS_INDEX}: svg tab loads from IDB or direct fallback",
                load_source in ("idb", None),
                repr(load_source),
            )
        except Exception as exc:
            check(f"{BROWSERS_INDEX}: svg tab menu renders", False, str(exc)[:160])

    # file:// SVG: the inline payload menu. Chromium's Linux build refuses the
    # blob frame inside an SVG, so the launcher must expose its tab fallback.
    svg_file = ctx.new_page()
    svg_file.on("pageerror", lambda e: errors.append("svg file pageerror: " + str(e)[:180]))
    svg_file.goto(SVG_FILE, wait_until="load", timeout=180_000)
    menu = payload_menu(svg_file, 30)
    fallback_menu = False
    if menu is None:
        state = svg_file.evaluate(
            """() => ({
              hint: document.getElementById('sf-hint')?.textContent || '',
              note: document.getElementById('sf-note')?.textContent || '',
              frames: [...document.querySelectorAll('iframe')].map(f => f.src.slice(0, 60)),
              holder: document.getElementById('sf-frame-holder')?.getAttribute('style') || '',
            })"""
        )
        print(f"  info  {BROWSERS_INDEX} svg file inline state: {json.dumps(state)}")
        if "COULD NOT START" in state["hint"].upper():
            before = len(popups)
            svg_file.mouse.click(640, 400)
            for _ in range(20):
                if len(popups) > before:
                    break
                svg_file.wait_for_timeout(500)
            if len(popups) > before:
                try:
                    popups[-1].wait_for_function(
                        "() => !!document.querySelector('.play-big')", timeout=120_000
                    )
                    fallback_menu = True
                    check(f"{BROWSERS_INDEX}: svg file tab fallback menu", True)
                except Exception as exc:
                    check(f"{BROWSERS_INDEX}: svg file tab fallback menu", False, str(exc)[:160])
    check(f"{BROWSERS_INDEX}: svg file payload menu", menu is not None or fallback_menu)
    if menu is not None:
        check(f"{BROWSERS_INDEX}: svg file menu usable", menu.evaluate("() => !!document.querySelector('.play-big')"))

    check(f"{BROWSERS_INDEX}: no page errors", not errors, "; ".join(errors[:3]))
    check(f"{BROWSERS_INDEX}: no external requests", not external, "; ".join(external[:3]))
    ctx.close()
    b.close()


def main() -> int:
    global BROWSERS_INDEX
    chosen = sys.argv[1:] or BROWSERS
    with sync_playwright() as p:
        for name in chosen:
            if name not in BROWSERS:
                print("unknown browser", name)
                return 2
            print("=====", name)
            BROWSERS_INDEX = name
            try:
                run_browser(p)
            except Exception as exc:
                check(name + " completed", False, str(exc)[:220])
    failed = [n for n, ok, _ in results if not ok]
    print(json.dumps({"checks": len(results), "failed": failed}, indent=2))
    print("RESULT:", "PASS" if not failed else "FAIL")
    return 0 if not failed else 1


if __name__ == "__main__":
    raise SystemExit(main())
