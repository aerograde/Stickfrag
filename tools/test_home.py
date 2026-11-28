"""The single file's home screen: menu, nickname gate, mode list.

The older `/play/` navigation this file used to test belonged to the standalone
site flow. The single file keeps the whole landing page and starts a match in a
disposable frame, so that is what this checks now.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8123/stickfrag.html"


def main() -> int:
    errors: list[str] = []
    external: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--disable-gpu-vsync"])
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        page.on(
            "console",
            lambda m: errors.append(m.text[:160]) if m.type == "error" else None,
        )
        page.on(
            "request",
            lambda r: external.append(r.url[:90])
            if r.url.startswith(("http://", "https://", "ws://", "wss://"))
            and not r.url.startswith("http://127.0.0.1:8123")
            else None,
        )
        page.goto(URL, wait_until="load", timeout=90_000)
        page.wait_for_timeout(3000)

        home = page.evaluate(
            """() => ({
              bar: !!document.querySelector('header.bar'),
              footer: !!document.querySelector('footer'),
              play: !!document.querySelector('.play-big'),
              name: !!document.getElementById('gear-name'),
              game: !!globalThis.__sfGame,
              iframes: document.querySelectorAll('iframe').length,
              wordmark: document.querySelector('.bar .logo')?.textContent?.trim() ?? null,
            })"""
        )

        # PLAY demands a nickname first, then opens the mode list.
        page.click(".play-big")
        page.wait_for_timeout(700)
        gate = page.evaluate("() => document.getElementById('gear-error')?.textContent ?? ''")
        page.fill("#gear-name", "tester")
        page.click(".play-big")
        page.wait_for_timeout(900)
        modes = page.evaluate(
            """() => ({
              step: document.getElementById('gear')?.dataset.step,
              tiles: [...document.querySelectorAll('#start-modes .mode-tile')].length,
              training: !!document.getElementById('start-training'),
            })"""
        )
        page.screenshot(path="/tmp/e2e-home.png")
        browser.close()

    out = {"home": home, "gate": gate, "modes": modes, "errors": errors[:6], "external": external[:4]}
    print(json.dumps(out, indent=2))
    ok = (
        home["bar"]
        and home["footer"]
        and home["play"]
        and home["name"]
        and not home["game"]
        and home["iframes"] == 0
        and "HTML" in (home["wordmark"] or "")
        and "COM" not in (home["wordmark"] or "")
        and bool(gate)
        and modes["step"] == "start"
        and modes["tiles"] >= 5
        and modes["training"]
        and not errors
        and not external
    )
    print("\nRESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
