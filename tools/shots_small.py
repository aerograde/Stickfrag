"""Capture the single-file build at a small size: menu, mode list, match.

    python3 tools/shots_small.py [w] [h] [dpr] [--live]
"""

from __future__ import annotations

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123"
OUT = Path("/tmp/sf-shots")


def main() -> int:
    w = int(sys.argv[1]) if len(sys.argv) > 1 else 360
    h = int(sys.argv[2]) if len(sys.argv) > 2 else 640
    dpr = float(sys.argv[3]) if len(sys.argv) > 3 else 2
    live = "--live" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    tag = f"{w}x{h}@{dpr:g}" + ("-live" if live else "")

    url = "https://stickfrag.com/" if live else f"{BASE}/stickfrag.html"
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
        ctx = browser.new_context(
            viewport={"width": w, "height": h},
            device_scale_factor=dpr,
            has_touch=w < 500,
        )
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append(str(e)[:250]))
        page.on("console", lambda m: errors.append("console: " + m.text[:200]) if m.type == "error" else None)

        page.goto(url, wait_until="load", timeout=120_000)
        page.wait_for_timeout(6000)
        page.screenshot(path=str(OUT / f"1-menu-{tag}.png"))

        page.click(".play-big")
        page.wait_for_timeout(1200)
        page.screenshot(path=str(OUT / f"2-modename-{tag}.png"))
        try:
            page.fill("#gear-name", "tester")
        except Exception:  # noqa: BLE001
            pass
        page.click(".play-big")
        page.wait_for_timeout(1500)
        page.screenshot(path=str(OUT / f"3-modes-{tag}.png"))

        page.evaluate("() => document.querySelectorAll('#start-modes .mode-tile')[0].click()")
        page.wait_for_function("() => globalThis.__sfGame && globalThis.__sfGame.ready", timeout=120_000)
        page.wait_for_timeout(4000)
        page.screenshot(path=str(OUT / f"4-match-{tag}.png"))
        browser.close()

    print("errors:", errors[:6])
    print("shots in", OUT)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
