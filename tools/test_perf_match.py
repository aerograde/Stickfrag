#!/usr/bin/env python3
"""Frame pacing in a busy match.

The game must hold the display's refresh rate with characters on the map, not
just on an empty server. This measures a hosted free-for-all with bots and
asserts the 90th-percentile frame time is within one refresh interval.

The first seconds after a match starts are excluded: shader compilation and the
first touch of each material legitimately cost frames there, and counting them
measures the warm-up rather than play. `--strict` keeps them.
"""

import argparse
import json
import sys

from playwright.sync_api import sync_playwright

BENCH = """() => new Promise(res => {
  const rec = [];
  let last = performance.now();
  let n = 0;
  const step = (now) => {
    rec.push(now - last);
    last = now;
    if (++n < 600) requestAnimationFrame(step);
    else {
      const s = [...rec].sort((a, b) => a - b);
      const q = (p) => +s[Math.min(s.length - 1, Math.floor(s.length * p))].toFixed(1);
      res({
        p50: q(0.5), p90: q(0.9), p99: q(0.99),
        slow: rec.filter((v) => v > 20).length,
        n: rec.length,
        refresh: globalThis.__sfRefresh || null,
      });
    }
  };
  requestAnimationFrame(step);
})"""


def measure(page, bots: int, warm: float) -> dict:
    url = (
        "http://127.0.0.1:8123/stickfrag.html"
        f"?peer=host&name=tester&room=PERF23&mode=ffa&bots={bots}&map=yard"
    )
    page.goto(url, wait_until="load", timeout=90000)
    page.wait_for_function(
        "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true", timeout=90000
    )
    page.wait_for_timeout(int(warm * 1000))
    return page.evaluate(BENCH)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--strict", action="store_true", help="include the match warm-up")
    ap.add_argument("--bots", type=int, default=4)
    args = ap.parse_args()

    warm = 1.0 if args.strict else 12.0
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_context(viewport={"width": 1280, "height": 800}).new_page()
        page.on("pageerror", lambda e: errors.append(str(e)[:160]))
        result = measure(page, args.bots, warm)
        browser.close()

    print(f"bots {args.bots}, warm-up {warm:.0f}s:", json.dumps(result))
    print("errors:", errors[:3] or "none")

    ok = True

    def check(label: str, cond: bool) -> None:
        nonlocal ok
        print(("  PASS  " if cond else "  FAIL  ") + label)
        ok = ok and cond

    # One refresh interval at 60 Hz is 16.7 ms; allow a small margin.
    check("p50 within one refresh", result["p50"] <= 18.0)
    check("p90 within one refresh", result["p90"] <= 18.5)
    check("no more than 5% dropped", result["slow"] <= result["n"] * 0.05)
    check("no page errors", not errors)

    print("RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
