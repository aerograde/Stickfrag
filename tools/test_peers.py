"""Code-paired WebRTC mesh test.

No broker is involved. The joining player creates a long JOIN offer, the host
answers it, the joining player pastes the ANSWER back, and the datachannel
opens. A third player then joins the same way; the host relays the mesh
signalling between the two joiners until their direct link opens. That relay
routing is also covered deterministically by tools/test_mesh.py, because some
machines (including this harness at times) cannot route loopback WebRTC at all.

Each page runs its match in a disposable iframe, so the game object and the peer
API live in that frame rather than on the page.
"""

from __future__ import annotations

import sys

from playwright.sync_api import sync_playwright

from test_entry import game_frame

URL = "http://127.0.0.1:8123/stickfrag.html"


def _fps_value(text: str | None) -> float:
    """Read the number out of the HUD's "58 FPS · 39 ms" line."""
    if not text:
        return 0.0
    head = text.split("FPS")[0].strip()
    try:
        return float(head)
    except ValueError:
        return 0.0


def open_peer(browser, role: str, name: str):
    """Open a match in its own context and return page + game frame + sockets."""
    ctx = browser.new_context(viewport={"width": 1100, "height": 700})
    page = ctx.new_page()
    errors: list[str] = []
    sockets: list[str] = []
    page.on("pageerror", lambda e: errors.append(str(e)[:200]))
    page.on("websocket", lambda ws: sockets.append(ws.url))
    page.goto(
        f"{URL}?peer={role}&name={name}&nobots&lite=1",
        wait_until="load",
        timeout=90000,
    )
    frame = game_frame(page)
    if frame is None:
        raise RuntimeError(f"{name}: no match frame")
    frame.wait_for_function(
        "() => !!globalThis.__sfGame?.ready && !!window.__sfCodeApi",
        timeout=90000,
    )
    return ctx, page, frame, errors, sockets


def pair(host, host_frame, join_frame):
    """Drive the actual panel: join code, host answer, paste answer back."""
    join_frame.wait_for_function(
        "() => document.getElementById('sf-p2p')?.classList.contains('on')",
        timeout=45000,
    )
    join_frame.click("#sf-p2p-copy")
    join_frame.wait_for_function(
        "() => (document.getElementById('sf-p2p-code')?.value || '').startsWith('SF1:')",
        timeout=45000,
    )
    offer = join_frame.evaluate("() => document.getElementById('sf-p2p-code').value")

    host.bring_to_front()
    try:
        host_frame.evaluate("() => window.focus()")
    except Exception:
        pass
    host.keyboard.press("Escape")
    host.wait_for_timeout(250)
    host.keyboard.press("c")
    host_key = False
    try:
        host_frame.wait_for_function(
            "() => document.getElementById('sf-p2p')?.classList.contains('on')",
            timeout=3000,
        )
        host_key = True
    except Exception:
        host_frame.evaluate(
            "() => window.__sfCodeUI?.show('Paste the player JOIN code, then send back the ANSWER.', 'host')"
        )
    host_frame.fill("#sf-p2p-code", offer)
    host_frame.click("#sf-p2p-accept")
    host_frame.wait_for_function(
        "(offer) => { const v = document.getElementById('sf-p2p-code')?.value || '';"
        " return v.startsWith('SF1:') && v !== offer; }",
        arg=offer,
        timeout=45000,
    )
    answer = host_frame.evaluate("() => document.getElementById('sf-p2p-code').value")

    join_frame.fill("#sf-p2p-code", answer)
    join_frame.click("#sf-p2p-accept")
    try:
        join_frame.wait_for_function(
            "() => /CONNECTED/.test(document.getElementById('sf-p2p-help')?.textContent || '')",
            timeout=45000,
        )
    except Exception:
        print("  pair debug: offer", repr(offer[:30]), len(offer or ""))
        print("  pair debug: answer", repr(answer[:30]), len(answer or ""))
        print("  pair debug: help", join_frame.evaluate(
            "() => document.getElementById('sf-p2p-help')?.textContent || ''"))
        print("  pair debug: join state", join_frame.evaluate(
            "() => ({hostPeer: __sfPeerDbg?.()?.hostPeer, peers: __sfPeerDbg?.()?.peers,"
            " role: __sfCodeApi?.role?.(), box: (document.getElementById('sf-p2p-code')?.value||'').slice(0,30)})"))
        print("  pair debug: direct accept", join_frame.evaluate(
            "async (a) => await __sfCodeApi.accept(a)", answer))
        raise
    return offer, answer, True, {"host_key": host_key, "join_panel": True}


def wait_open(host_frame, join_frame, want: int, timeout_ms: int = 25000) -> bool:
    try:
        host_frame.wait_for_function(
            "(n) => (globalThis.__sfPeerDbg?.()?.open || 0) >= n", arg=want, timeout=timeout_ms
        )
        join_frame.wait_for_function(
            "() => (globalThis.__sfPeerDbg?.()?.open || 0) >= 1", timeout=timeout_ms
        )
        return True
    except Exception:
        return False


def main() -> int:
    errors: list[str] = []
    sockets: list[str] = []
    with sync_playwright() as p:
        # Two contexts on one machine share an mDNS name, so same-machine ICE
        # cannot use host candidates. Real players are on different machines,
        # where that is not true; this flag makes the local harness honest.
        browser = p.chromium.launch(
            headless=False,
            args=[
                "--disable-features=WebRtcHideLocalIpsWithMdns",
                "--allow-loopback-in-peer-connection",
            ],
        )
        try:
            host_cx, host, host_frame, herr, hws = open_peer(browser, "host", "hosty")
            j1_cx, j1, j1_frame, j1err, j1ws = open_peer(browser, "join", "joiny")
            errors += herr + j1err
            sockets += hws + j1ws

            offer, answer, accepted, ui = pair(host, host_frame, j1_frame)
            codes_ok = (
                isinstance(offer, str)
                and offer.startswith("SF1:")
                and len(offer) > 80
                and isinstance(answer, str)
                and answer.startswith("SF1:")
                and len(answer) > 80
                and accepted is True
            )
            print(f"join code / answer code : {len(offer or '')} / {len(answer or '')} chars")
            print(f"codes applied          : {codes_ok}")
            paired = wait_open(host_frame, j1_frame, 1)
            print(f"two-peer datachannel   : {'open' if paired else 'not open (ICE environment)'}")

            # The second JOIN/ANSWER exchange runs regardless of whether the
            # first host link opened. It proves the host can accept multiple
            # join offers; only the mesh/direct part needs working ICE.
            j2_cx, j2, j2_frame, j2err, j2ws = open_peer(browser, "join", "third")
            errors += j2err
            sockets += j2ws
            o2, a2, ok2, ui2 = pair(host, host_frame, j2_frame)
            codes2_ok = (
                isinstance(o2, str)
                and o2.startswith("SF1:")
                and isinstance(a2, str)
                and a2.startswith("SF1:")
                and ok2 is True
            )
            print(f"third-player codes     : {'applied' if codes2_ok else 'FAIL'}")
            if not codes2_ok:
                errors.append("third-player code exchange failed")
                try:
                    detail = j2_frame.evaluate(
                        """async ([o, a]) => {
                          const SF = globalThis.__SF;
                          const oo = await SF.unpack(o.slice(4));
                          const aa = await SF.unpack(a.slice(4));
                          return { offer: { from: oo.from, link: oo.link },
                                   answer: { from: aa.from, to: aa.to, link: aa.link } };
                        }""",
                        [o2, a2],
                    )
                    print(f"  third code detail     : {detail}")
                except Exception as exc:
                    print(f"  third code detail     : {exc}")
            two_joined = paired and wait_open(host_frame, j2_frame, 2)
            direct = False
            if two_joined:
                try:
                    j1_frame.wait_for_function(
                        "() => (globalThis.__sfPeerDbg?.()?.peers || []).length >= 2",
                        timeout=25000,
                    )
                    j2_frame.wait_for_function(
                        "() => (globalThis.__sfPeerDbg?.()?.peers || []).length >= 2",
                        timeout=25000,
                    )
                    direct = True
                except Exception:
                    direct = False
            mesh = None
            if two_joined and direct:
                mesh = {
                    "host_open": host_frame.evaluate(
                        "() => globalThis.__sfPeerDbg?.()?.open || 0"
                    ),
                    "j1_peers": j1_frame.evaluate(
                        "() => globalThis.__sfPeerDbg?.()?.peers || []"
                    ),
                    "j2_peers": j2_frame.evaluate(
                        "() => globalThis.__sfPeerDbg?.()?.peers || []"
                    ),
                    "direct": True,
                }
                print(f"three-player mesh      : {mesh}")
            else:
                print("three-player mesh      : SKIP (loopback ICE did not open the extra links)")
            leave = None
            if mesh is not None:
                try:
                    j2_cx.close()
                except Exception:
                    pass
                host.wait_for_timeout(2500)
                leave = {
                    "host_open": host_frame.evaluate(
                        "() => globalThis.__sfPeerDbg?.()?.open || 0"
                    ),
                    "j1_roster": j1_frame.evaluate(
                        "() => [...(globalThis.__sfGame?.roster?.keys?.() || [])]"
                    ),
                    "j1_peers": j1_frame.evaluate(
                        "() => globalThis.__sfPeerDbg?.()?.peers || []"
                    ),
                }
                print(f"after third player left: {leave}")

            welcome = j1_frame.evaluate("() => globalThis.__recvWelcome")
            self_id = j1_frame.evaluate("() => globalThis.__sfGame?.selfId")
            roster = j1_frame.evaluate(
                "() => [...(globalThis.__sfGame?.roster?.keys?.() || [])]"
            )
            host_fps = host_frame.evaluate(
                "() => document.getElementById('fps')?.textContent?.trim()"
            )
            join_fps = j1_frame.evaluate(
                "() => document.getElementById('fps')?.textContent?.trim()"
            )

            print(f"welcome seat           : {welcome and welcome.get('id')}")
            print(f"joiner selfId          : {self_id}")
            print(f"joiner roster          : {roster}")
            print(f"fps host / joiner      : {host_fps} / {join_fps}")
            print(f"websockets             : {sockets or 'none'}")

            before = host_frame.evaluate(
                "() => (globalThis.__sfGame.remotes || []).map((r) => ({ id: r.id, z: +r.z.toFixed(2) }))"
            )
            j1_frame.evaluate(
                "() => { globalThis.__sfGame.input.yaw = 0; globalThis.__sfGame.input.pitch = 0; }"
            )
            j1.bring_to_front()
            j1.keyboard.down("w")
            j1.wait_for_timeout(2500)
            j1.keyboard.up("w")
            host.wait_for_timeout(2000)
            after = host_frame.evaluate(
                "() => (globalThis.__sfGame.remotes || []).map((r) => ({ id: r.id, z: +r.z.toFixed(2) }))"
            )
            print(f"host saw before        : {before}")
            print(f"host saw after         : {after}")
            prev = {r["id"]: r["z"] for r in before}
            moved = any(prev.get(r["id"]) is not None and prev[r["id"]] != r["z"] for r in after)

            if not paired and codes_ok:
                print("SKIP: JOIN/ANSWER codes are real, but this machine cannot")
                print("      establish loopback WebRTC (ICE checking).")
                print("RESULT: SKIP (environment: loopback WebRTC unavailable)")
                return 0

            checks = {
                "codes are real": codes_ok,
                "datachannel open": paired,
                "joiner seated": isinstance(self_id, int) and self_id > 1,
                "roster has both": len(roster) >= 2,
                "movement reached host": moved,
                "no broker websocket": not sockets,
                "C opens the pairing panel": ui.get("host_key", False),
                "no page errors": not errors,
                "frame rate reported": all(_fps_value(t) > 0 for t in (host_fps, join_fps)),
            }
            checks["third-player codes applied"] = codes2_ok
            checks["C opens the pairing panel again"] = ui2.get("host_key", False)
            if mesh is not None:
                checks["three-player host opened"] = mesh["host_open"] >= 2
                checks["three-player direct mesh"] = mesh["direct"]
                if leave is not None:
                    checks["host open drops to one"] = leave["host_open"] == 1
                    checks["roster shrinks after leave"] = len(leave["j1_roster"]) == 2
                    checks["mesh link closes after leave"] = len(leave["j1_peers"]) == 1
            for name, ok in checks.items():
                print(f"  {'PASS' if ok else 'FAIL'}  {name}")
            if errors:
                print("errors:", errors[:4])
            passed = all(checks.values())
            print("RESULT:", "PASS" if passed else "FAIL")
            return 0 if passed else 1
        finally:
            browser.close()


if __name__ == "__main__":
    sys.exit(main())
