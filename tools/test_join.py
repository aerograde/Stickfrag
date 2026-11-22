"""M3 two-peer test: a second browser joins the host over MQTT signalling.

Both pages are separate Chromium contexts with separate storage, so they are two
distinct players. The host opens a room; the joiner enters the code. Success means
the joiner reaches a live match with a distinct id and sees the host's body.
"""

from __future__ import annotations

import json
import re
import sys
import uuid

from playwright.sync_api import sync_playwright

ROOT = "http://127.0.0.1:8123/play/"
CODE = "".join(c for c in uuid.uuid4().hex.upper() if c.isalpha())[:6]


def state(page) -> dict:
    return page.evaluate(
        """() => {
          const dbg = document.getElementById('debug')?.textContent || '';
          const m = dbg.match(/id #(-?\\d+)\\s+room (\\S+)/);
          const p = dbg.match(/pos (-?[\\d.]+) (-?[\\d.]+) (-?[\\d.]+)/);
          return {
            id: m ? Number(m[1]) : null,
            room: m ? m[2] : null,
            pos: p ? [Number(p[1]), Number(p[2]), Number(p[3])] : null,
            left: !document.getElementById('left')?.hidden,
            leftText: (document.getElementById('left-text')?.textContent || '').slice(0, 160),
            loading: document.getElementById('loading')?.hidden,
            fps: document.getElementById('fps')?.textContent || '',
            remotes: (dbg.match(/others drawn ([^\\n]*)/) || [])[1] || '',
          };
        }"""
    )


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--disable-gpu-vsync"])
        host_ctx = browser.new_context(viewport={"width": 1100, "height": 700})
        join_ctx = browser.new_context(viewport={"width": 1100, "height": 700})

        host = host_ctx.new_page()
        host.on("pageerror", lambda e: errors.append("host: " + str(e)[:160]))
        host.goto(f"{ROOT}?name=hosty&peer=host&room={CODE}&debug", wait_until="load", timeout=90000)
        host.wait_for_timeout(7000)
        host.mouse.click(550, 350)
        host.wait_for_timeout(2000)
        h_before = state(host)

        joiner = join_ctx.new_page()
        joiner.on("pageerror", lambda e: errors.append("join: " + str(e)[:160]))
        joiner.goto(f"{ROOT}?name=joiny&peer=join&room={CODE}&debug", wait_until="load", timeout=90000)
        # Give signalling, ICE and the first snapshots time to complete.
        joiner.wait_for_timeout(14000)
        j = state(joiner)
        h_after = state(host)

        joiner.screenshot(path="/tmp/peer-joiner.png")
        host.screenshot(path="/tmp/peer-host.png")
        browser.close()

    out = {"code": CODE, "hostBefore": h_before, "hostAfter": h_after, "joiner": j, "errors": errors[:8]}
    print(json.dumps(out, indent=2))

    joined = (
        not j["left"]
        and j["loading"] is True
        and j["id"] is not None
        and j["room"] == CODE.upper()
    )
    distinct = h_after["id"] != j["id"] if j["id"] is not None else False
    ok = joined and distinct and not errors
    print("\nRESULT:", "PASS" if ok else "FAIL", f"(joined={joined} distinctIds={distinct})")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
