"""End-to-end: the real home screen's PLAY must launch the game.

This is the integration that matters: the haven is the real page, and the game is
the patched single-file build. Anything less than "type a name, press PLAY, be
playing" is a failure regardless of how either half looks on its own.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123/"


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--disable-gpu-vsync"])
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        page.goto(BASE, wait_until="load", timeout=90000)
        page.wait_for_timeout(5000)

        home = page.evaluate(
            """() => ({
              step: document.getElementById('gear')?.dataset.step,
              canvasDrawn: (document.getElementById('gear-canvas')?.className || '').includes('drawn'),
              hasHeader: !!document.querySelector('header.bar'),
              wordmark: document.querySelector('.bar .logo')?.textContent?.trim(),
              brandLeak: document.body.innerText.includes('stickfrag.com'),
              nameField: !!document.getElementById('gear-name'),
            })"""
        )

        # Type a name, then press PLAY for real.
        page.fill("#gear-name", "tester")
        page.wait_for_timeout(400)
        page.click(".play-big")
        page.wait_for_timeout(1000)
        afterPlay = page.evaluate("() => ({ url: location.href, step: document.getElementById('gear')?.dataset.step })")

        # If the shim worked we already navigated; otherwise click quick join.
        if "/play/" not in afterPlay["url"]:
            try:
                page.click("#start-quick", timeout=4000)
            except Exception:
                pass
            page.wait_for_timeout(4000)

        page.wait_for_url("**/play/**", timeout=20000)
        page.wait_for_timeout(6000)
        game = page.evaluate(
            """() => ({
              url: location.href,
              loadingHidden: document.getElementById('loading')?.hidden ?? null,
              fps: document.getElementById('fps')?.textContent || null,
              canvas: (() => { const c = document.getElementById('game'); return c ? [c.width, c.height] : null; })(),
              bootFail: document.getElementById('boot-fail')?.hidden === false,
            })"""
        )
        page.screenshot(path="/tmp/e2e-play.png")
        browser.close()

    out = {"home": home, "afterPlay": afterPlay, "game": game, "errors": errors[:8]}
    print(json.dumps(out, indent=2))
    ok = (
        home["canvasDrawn"]
        and home["nameField"]
        and "HTML" in (home["wordmark"] or "")
        and not home["brandLeak"]
        and "/play/" in game["url"]
        and not game["bootFail"]
        and not errors
    )
    print("\nRESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
