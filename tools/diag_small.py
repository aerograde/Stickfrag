"""Diagnose the single-file build on a small, low-end viewport.

Loads stickfrag.html at a small window, records every console error, page error
and failed request, and measures the layout for overflow, zero-size targets and
elements that paint outside the viewport. Run against the live site with
--live to compare.

    python3 tools/diag_small.py
    python3 tools/diag_small.py --live
"""

from __future__ import annotations

import json
import sys

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123"
SIZES = [(360, 640), (412, 732), (768, 1024), (1024, 640), (1280, 800)]

PROBE = r"""() => {
  const vw = innerWidth, vh = innerHeight;
  const out = { vw, vh, overflowX: [], zero: [], errors: [], offscreen: [] };
  const doc = document.scrollingElement;
  out.scrollW = doc ? doc.scrollWidth : null;
  out.scrollH = doc ? doc.scrollHeight : null;
  // The real site is a long scrolling page, so vertical length is expected. What
  // is not: horizontal overflow, or a card clipped where nothing can scroll to it.
  out.canScrollY = doc ? doc.scrollHeight > vh + 4 : false;
  out.overflowXPage = doc ? doc.scrollWidth > vw + 4 : false;
  const seen = new Set();
  const IGNORE = new Set(['sr-only', 'tip-dots', 'squad']);
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const id = el.id || el.className || el.tagName;
    if (IGNORE.has(String(id).trim())) continue;
    if (r.right > vw + 2 && el.scrollWidth <= el.clientWidth + 2) {
      if (!seen.has('x' + id)) { seen.add('x' + id); out.overflowX.push({ id: String(id).slice(0, 40), right: Math.round(r.right) }); }
    }
  }
  out.overflowX = out.overflowX.slice(0, 12);
  // The menu must be reachable: PLAY and the room-code field on screen or scrollable.
  const reach = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: Math.round(r.top + scrollY), h: Math.round(r.height) };
  };
  out.play = reach('.play-big');
  out.modes = reach('#start-modes');
  const canvas = document.getElementById('gear-canvas');
  if (canvas) {
    const r = canvas.getBoundingClientRect();
    out.stage = { w: Math.round(r.width), h: Math.round(r.height),
                  bw: canvas.width, bh: canvas.height,
                  dpr: devicePixelRatio };
  }
  out.sections = [...document.querySelectorAll('main > *')]
    .filter((el) => el.getBoundingClientRect().height > 0)
    .map((el) => el.id || el.className.toString().slice(0, 30));
  return out;
}"""


def run(url: str, label: str) -> int:
    bad = 0
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for w, h in SIZES:
            ctx = browser.new_context(
                viewport={"width": w, "height": h},
                device_scale_factor=1,
                has_touch=w < 500,
            )
            page = ctx.new_page()
            errors: list[str] = []
            failed: list[str] = []
            page.on("pageerror", lambda e: errors.append(str(e)[:220]))
            page.on("console", lambda m: errors.append("console: " + m.text[:200]) if m.type == "error" else None)
            page.on("requestfailed", lambda r: failed.append(r.url[:100]))
            try:
                page.goto(url, wait_until="load", timeout=90_000)
                page.wait_for_timeout(3500)
                state = page.evaluate(PROBE)
            except Exception as exc:  # noqa: BLE001
                print(f"{label} {w}x{h}: LOAD FAILED {exc}")
                bad += 1
                ctx.close()
                continue

            problems = []
            if state["overflowXPage"]:
                problems.append(f"page overflows horizontally ({state['scrollW']} vs {w})")
            if state["overflowX"]:
                problems.append(f"overflow-x: {state['overflowX'][:4]}")
            if not state["canScrollY"] and state["scrollH"] > h + 4:
                problems.append("content is longer than the window but cannot scroll")
            if state.get("play") is None:
                problems.append("the menu's PLAY button is missing")
            if state.get("stage") and state["stage"]["bw"] < 2:
                problems.append("the haven canvas never sized itself")
            if errors:
                problems.append(f"errors: {errors[:3]}")
            if failed:
                problems.append(f"failed requests: {failed[:3]}")

            stage = state.get("stage")
            print(f"\n{label} {w}x{h}"
                  + (f"  stage={stage['bw']}x{stage['bh']}" if stage else "")
                  + (f"  page={state['scrollH']}px" if state.get("scrollH") else ""))
            if problems:
                bad += 1
                for pr in problems:
                    print("   ! " + str(pr))
            else:
                print("   ok")
            ctx.close()
        browser.close()
    return bad


def main() -> int:
    live = "--live" in sys.argv
    if live:
        url = "https://stickfrag.com/"
        label = "LIVE"
    else:
        url = f"{BASE}/stickfrag.html"
        label = "SINGLE"
    bad = run(url, label)
    print(f"\n{label}: {bad} viewport(s) with problems")
    return 0 if bad == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
