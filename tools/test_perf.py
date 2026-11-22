"""Measure frame cost with the in-client profiler (?prof) and count DOM writes.

Usage: python tools/test_perf.py [--baseline]
--baseline rebuilds from readable/main.lean.js first, so the two runs are comparable.
"""

from __future__ import annotations

import json
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
BASE = "http://127.0.0.1:8123/play/"


def run(label: str, query: str) -> dict:
    url = BASE + "?" + query
    out: dict = {"label": label, "url": url}
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--use-gl=angle",
                "--use-angle=swiftshader",
                "--enable-unsafe-swiftshader",
                "--ignore-gpu-blocklist",
                "--disable-frame-rate-limit",
            ],
        )
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.goto(url, wait_until="load", timeout=90000)

        # Enter the match: the game only simulates after the canvas takes a click.
        page.wait_for_timeout(6000)
        try:
            page.mouse.click(640, 360)
        except Exception:
            pass
        page.wait_for_timeout(2500)

        # Count DOM mutations for 3 s of live play.
        page.evaluate(
            """() => {
              window.__mut = 0;
              window.__mo = new MutationObserver(ms => { window.__mut += ms.length; });
              window.__mo.observe(document.body, {attributes:true, childList:true, subtree:true, characterData:true});
              window.__t0 = performance.now();
            }"""
        )
        page.wait_for_timeout(3000)
        stat = page.evaluate(
            """() => {
              const now = performance.now();
              const dt = (now - window.__t0) / 1000;
              window.__mo.disconnect();
              const dbg = document.getElementById('debug');
              return {
                mutations: window.__mut,
                mutationsPerSec: Math.round(window.__mut / dt),
                debugText: dbg ? dbg.textContent : null,
                fps: (document.getElementById('fps')||{}).textContent || null,
                scoreboardHidden: (document.getElementById('scoreboard')||{}).hidden,
              };
            }"""
        )
        out.update(stat)
        browser.close()
    out["errors"] = errors[:10]
    return out


def main() -> int:
    if "--baseline" in sys.argv:
        subprocess.run(
            ["npx", "--yes", "esbuild@0.25", "readable/main.lean.js", "--bundle", "--minify",
             "--format=esm", "--target=esnext", "--legal-comments=inline", "--outfile=build/main.js"],
            cwd=ROOT, check=True, capture_output=True,
        )
        subprocess.run(["cp", "build/main.js", "stickfrag.com/play/main.js"], cwd=ROOT, check=True)

    results = [run("measure", "name=tester&offline&map=yard&prof&debug")]
    for r in results:
        print(json.dumps(r, indent=2)[:2000])
    bad = [e for r in results for e in r["errors"]]
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main())
