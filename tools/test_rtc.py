"""Direct WebRTC check: two Mesh peers in ONE page, no broker.

This isolates the peer layer from MQTT entirely. If the handshake, ICE and the
datachannel work here, any remaining failure is signalling, not WebRTC.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8123/stickfrag.html?name=x"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto(URL, wait_until="load", timeout=60000)
        page.wait_for_timeout(1500)

        result = page.evaluate(
            """async () => {
              const SF = globalThis.__SF;
              const log = [];

              // Two meshes that hand each other their signalling messages directly,
              // which is exactly what the broker would relay.
              let a, b;
              const relay = (to, msg) => {
                const dst = to === "a" ? b : a;
                // Same path the broker takes: the Mesh's own onSignal.
                setTimeout(() => dst && dst.onSignal(JSON.parse(JSON.stringify({ ...msg, from: msg.from }))), 0);
              };
              const mk = (id) => new SF.Mesh({
                code: "LOCAL1",
                onPeer: async (from, msg) => {
                  const m = id === "a" ? a : b;
                  if (m.peers.has(from)) return;
                  if (msg && msg.k === "hello") return;
                  const peer = m.add(from, false);
                  log.push(id + " answering " + from);
                },
                onMessage: (from, msg) => log.push(id + " got " + msg.k),
                onLost: () => {},
              });

              a = mk("a");
              b = mk("b");
              // Wire the relay into signal(): intercept publishes.
              for (const [id, m] of [["a", a], ["b", b]]) {
                m.pending = [];
                m.signal = function (to, msg) {
                  relay(id, { ...msg, from: id });
                };
                m.onIce = function (peer, cand) {
                  relay(this === a ? "a" : "b", { k: "ice", d: cand.toJSON ? cand.toJSON() : cand, from: this === a ? "a" : "b", to: peer.id });
                };
              }
              // a is the host/offerer.
              const peer = a.add("b", true);
              const offer = await peer.offer();
              b.onSignal({ k: "offer", d: offer, from: "a" });
              await new Promise((r) => setTimeout(r, 4000));

              const state = (m) => [...m.peers.values()].map((p) => ({
                id: p.id,
                open: p.open,
                conn: p.pc.connectionState,
                ice: p.pc.iceConnectionState,
                gathering: p.pc.iceGatheringState,
              }));
              return { log, a: state(a), b: state(b) };
            }"""
        )
        browser.close()

    print(json.dumps(result, indent=2))
    opened = any(x["open"] for x in result["a"]) and any(x["open"] for x in result["b"])
    print("\nRESULT:", "PASS" if opened else "FAIL")
    return 0 if opened else 1


if __name__ == "__main__":
    raise SystemExit(main())
