"""Headless smoke test: load the game, wait, report console errors and that it rendered.

Usage: python tools/test_smoke.py [url-querystring]
"""

from __future__ import annotations

import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
URL = "http://127.0.0.1:8123/play/?name=tester&offline&map=yard"
if len(sys.argv) > 1:
    URL += "&" + sys.argv[1]

errors: list[str] = []
logs: list[str] = []


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--use-gl=angle",
                "--use-angle=swiftshader",
                "--enable-unsafe-swiftshader",
                "--ignore-gpu-blocklist",
            ],
        )
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.on(
            "console",
            lambda m: (
                errors.append(f"{m.type}: {m.text}")
                if m.type == "error"
                else logs.append(f"{m.type}: {m.text}")
            ),
        )
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))

        page.goto(URL, wait_until="load", timeout=60000)
        # Let the boot chain, map build and a few hundred frames run.
        page.wait_for_timeout(9000)

        info = page.evaluate(
            """() => {
            const fps = document.getElementById('fps');
            const loading = document.getElementById('loading');
            const boot = document.getElementById('boot-fail');
            const canvas = document.getElementById('game');
            const gl = canvas && (canvas.getContext('webgl2') || canvas.getContext('webgl'));
            return {
              title: document.title,
              loadingHidden: loading ? loading.hidden || !!loading.classList.contains('done') : null,
              bootFailHidden: boot ? boot.hidden : null,
              fps: fps ? fps.textContent.trim() : null,
              fpsHidden: fps ? fps.hidden : null,
              canvas: canvas ? [canvas.width, canvas.height] : null,
              hasWebgl: !!gl,
              status: (document.getElementById('status')||{}).textContent || null,
              prof: (document.getElementById('debug')||{}).textContent || null,
              // proof the sim is running, not just a loaded page
              bodyChildren: document.body.childElementCount,
            };
          }"""
        )
        shot = Path("/tmp/stickfrag-smoke.png")
        page.screenshot(path=str(shot))
        browser.close()

    print("URL:", URL)
    for k, v in info.items():
        print(f"  {k}: {v}")
    print("screenshot:", shot)

    if errors:
        print(f"\nCONSOLE ERRORS ({len(errors)}):")
        for e in errors[:40]:
            print("  ", e)
        return 1
    print("\nno console errors")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
