"""Rigorous A/B: same live-match state in both builds.

Headless SwiftShader runs at ~1 fps, so this uses headed Chromium with the real GPU.
The game caps itself to 20 fps when the window is unfocused, so focus is asserted
before any sample is taken. Both builds must reach a live match (the #fps panel has
text) before measurement, otherwise the run is discarded.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PLAY = ROOT / "stickfrag.com" / "play" / "main.js"
ESBUILD = [
    "npx", "--yes", "esbuild@0.25", "--bundle", "--minify", "--format=esm",
    "--target=esnext", "--legal-comments=inline", "--outfile=build/main.js",
]
QUERY = "name=tester&offline&map=yard"
SAMPLE_MS = 6000


def build(src: str) -> None:
    subprocess.run(ESBUILD + [src], cwd=ROOT, check=True, capture_output=True)
    shutil.copy(ROOT / "build" / "main.js", PLAY)


def measure(prof: bool) -> dict:
    errors: list[str] = []
    url = "http://127.0.0.1:8123/play/?" + QUERY + ("&prof" if prof else "")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=False,
            # Unlock from vsync so headroom (not the display) is what we measure.
            args=["--disable-gpu-vsync", "--disable-frame-rate-limit"],
        )
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.goto(url, wait_until="load", timeout=90000)
        page.bring_to_front()
        page.wait_for_timeout(4500)

        # Get into a live match: needs a real gesture for pointer lock.
        live = False
        for _ in range(4):
            page.mouse.click(640, 400)
            page.wait_for_timeout(1200)
            live = page.evaluate(
                "() => { const f = document.getElementById('fps'); return !!f && !f.hidden && /\\d/.test(f.textContent); }"
            )
            if live:
                break
        focused = page.evaluate("() => document.hasFocus()")
        page.evaluate("() => window.focus()")
        page.wait_for_timeout(800)

        page.evaluate(
            """() => {
              window.__mut = 0; window.__hot = {};
              window.__frames = 0; window.__lastT = 0; window.__deltas = [];
              window.__mo = new MutationObserver(ms => {
                window.__mut += ms.length;
                for (const m of ms) {
                  const t = m.target;
                  const key = (m.type === 'characterData'
                    ? (t.parentElement && (t.parentElement.id || t.parentElement.className))
                    : (t.id || t.className)) || t.nodeName;
                  const k = String(key).split(' ')[0] || 'unknown';
                  window.__hot[k] = (window.__hot[k] || 0) + 1;
                }
              });
              window.__mo.observe(document.body, {attributes:true, childList:true, subtree:true, characterData:true});
              const tick = (ts) => {
                if (window.__lastT) window.__deltas.push(ts - window.__lastT);
                window.__lastT = ts; window.__frames++;
                requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
              // keep the profiler reports that stream in
              window.__profs = [];
              const d = document.getElementById('debug');
              if (d) {
                window.__po = new MutationObserver(() => {
                  const m = (d.textContent || '').match(/prof n\\d+[^\\n]*/g);
                  if (m) window.__profs = m;
                });
                window.__po.observe(d, {childList:true, characterData:true, subtree:true});
              }
            }"""
        )
        page.wait_for_timeout(SAMPLE_MS)

        stat = page.evaluate(
            """() => {
              window.__mo.disconnect();
              window.__po && window.__po.disconnect();
              const d = window.__deltas.slice().sort((a,b)=>a-b);
              const q = (f) => d.length ? +d[Math.floor(f * (d.length-1))].toFixed(2) : null;
              const hot = Object.entries(window.__hot).sort((a,b)=>b[1]-a[1]).slice(0,8);
              return {
                frames: window.__frames,
                fps: +(window.__frames / 6).toFixed(1),
                p50: q(0.5), p95: q(0.95), p99: q(0.99),
                mutations: window.__mut,
                mutationsPerSec: +(window.__mut / 6).toFixed(1),
                hotMutations: hot,
                prof: window.__profs.length ? window.__profs[window.__profs.length-1] : null,
                fpsText: (document.getElementById('fps')||{}).textContent || '',
              };
            }"""
        )
        stat["live"] = live
        stat["focused"] = focused
        browser.close()
    stat["errors"] = errors[:6]
    return stat


def main() -> int:
    out = {}
    for label, src, prof in (
        ("baseline", "readable/main.lean.js", False),
        ("patched", "readable/main.stickfrag.js", True),
    ):
        build(src)
        out[label] = measure(prof)
        print(f"measured {label}", file=sys.stderr)
    print(json.dumps(out, indent=2))
    ok = all(out[k]["live"] and not out[k]["errors"] for k in out)
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
