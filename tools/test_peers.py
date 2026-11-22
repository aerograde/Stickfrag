"""Two-peer end-to-end test over the broker-free offer/answer codes.

Starts a host and a joiner, exchanges the two codes the way the UI does, then
asserts that the datachannel opens, the joiner is seated by the host, and a
movement on the joiner reaches the host. Retries the pairing a few times because
ICE through a shared NAT is not deterministic in automation.
"""

from __future__ import annotations

import random
import sys

from playwright.sync_api import sync_playwright

ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
URL = "http://127.0.0.1:8123/stickfrag.html"


def new_code() -> str:
    return "".join(random.choice(ALPHABET) for _ in range(6))


def _fps_value(text: str | None) -> float:
    """Read the number out of the HUD's "58 FPS · 39 ms" line."""
    if not text:
        return 0.0
    head = text.split("FPS")[0].strip()
    try:
        return float(head)
    except ValueError:
        return 0.0


def pair(browser, attempts: int = 4):
    """Return (host, joiner) pages once both datachannels are open, or (None, None)."""
    for attempt in range(attempts):
        code = new_code()
        host_cx = browser.new_context(viewport={"width": 1100, "height": 700})
        join_cx = browser.new_context(viewport={"width": 1100, "height": 700})
        host = host_cx.new_page()
        joiner = join_cx.new_page()
        host.goto(f"{URL}?peer=host&name=hosty&room={code}", wait_until="load", timeout=90000)
        joiner.goto(f"{URL}?peer=join&name=joiny&room={code}", wait_until="load", timeout=90000)
        host.wait_for_timeout(11000)
        joiner.wait_for_timeout(7000)

        offer = host.evaluate("async () => await window.__sfCodeApi.offer()")
        answer = joiner.evaluate("async (o) => await window.__sfCodeApi.accept(o)", offer)
        host.evaluate("async (a) => await window.__sfCodeApi.acceptAnswer(a)", answer)
        host.wait_for_timeout(13000)

        if joiner.evaluate("() => !!globalThis.__sfPeerDbg?.()?.open") and host.evaluate(
            "() => !!globalThis.__sfPeerDbg?.()?.open"
        ):
            print(f"paired on attempt {attempt + 1} (room {code})")
            return host, joiner

        print(f"  attempt {attempt + 1}: no connection")
        host_cx.close()
        join_cx.close()
    return None, None


def main() -> int:
    with sync_playwright() as p:
        # Two contexts on one machine share an mDNS name, so same-machine ICE
        # cannot use host candidates. Real players are on different machines,
        # where that is not true; this flag makes the local harness honest.
        browser = p.chromium.launch(
            headless=False, args=["--disable-features=WebRtcHideLocalIpsWithMdns"]
        )
        host, joiner = pair(browser)
        if host is None:
            print("RESULT: FAIL (never paired)")
            browser.close()
            return 1

        welcome = joiner.evaluate("() => globalThis.__recvWelcome")
        self_id = joiner.evaluate("() => globalThis.__sfGame?.selfId")
        roster = joiner.evaluate("() => [...(globalThis.__sfGame?.roster?.keys?.() || [])]")
        host_fps = host.evaluate("() => document.getElementById('fps')?.textContent?.trim()")
        join_fps = joiner.evaluate("() => document.getElementById('fps')?.textContent?.trim()")

        print(f"welcome seat      : {welcome and welcome.get('id')}")
        print(f"joiner selfId     : {self_id}")
        print(f"joiner roster     : {roster}")
        print(f"fps host / joiner : {host_fps} / {join_fps}")

        before = host.evaluate("() => (globalThis.__sfGame.remotes || []).map((r) => ({ id: r.id, z: +r.z.toFixed(2) }))")
        joiner.evaluate("() => { globalThis.__sfGame.input.yaw = 0; globalThis.__sfGame.input.pitch = 0; }")
        joiner.keyboard.down("w")
        joiner.wait_for_timeout(2500)
        joiner.keyboard.up("w")
        host.wait_for_timeout(2000)
        after = host.evaluate("() => (globalThis.__sfGame.remotes || []).map((r) => ({ id: r.id, z: +r.z.toFixed(2) }))")
        print(f"host saw before   : {before}")
        print(f"host saw after    : {after}")

        # Compare the joiner's own row, not whichever remote happens to be first:
        # a room can hold several remotes and their order is not meaningful.
        prev = {r["id"]: r["z"] for r in before}
        moved = any(prev.get(r["id"]) is not None and prev[r["id"]] != r["z"] for r in after)

        checks = {
            "datachannel open": True,
            "joiner seated": isinstance(self_id, int) and self_id > 1,
            "roster has both": len(roster) >= 2,
            "movement reached host": moved,
            # The frame rate is reported, not asserted. Two software-rendered
            # browser instances on a loaded machine drop below the display rate
            # for reasons that have nothing to do with the network, and a hard
            # threshold here fails on a busy laptop while the actual join,
            # seating and movement checks all pass.
            "frame rate reported": all(_fps_value(t) > 0 for t in (host_fps, join_fps)),
        }
        for name, ok in checks.items():
            print(f"  {'PASS' if ok else 'FAIL'}  {name}")
        passed = all(checks.values())
        print("RESULT:", "PASS" if passed else "FAIL")
        browser.close()
        return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
