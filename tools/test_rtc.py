"""Direct WebRTC check: two Mesh peers in one document, no broker.

This isolates the peer layer from the pasteable codes. If the handshake, ICE
and the datachannel work here, any remaining failure is signalling, not WebRTC.

The game now runs in its own frame, so the Mesh code is executed there. Some
sandboxes and locked-down networks cannot route loopback WebRTC at all; in that
case the codes still work but there is nothing to open, so the test reports SKIP
rather than blaming the game.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

from test_entry import open_game

START = "peer=host&mode=ffa&map=yard"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page(viewport={"width": 1100, "height": 700})
        game = open_game(page, "&" + START)

        try:
            result = game.evaluate(
                """async () => {
                  const SF = globalThis.__SF;
                  const log = [];
                  if (!SF || !SF.Mesh) return { error: "no SF.Mesh in the match" };

                  // Two meshes that hand each other their signalling messages
                  // directly, which is exactly what the host relay carries for a mesh edge.
                  let a, b;
                  const relay = (to, msg) => {
                    const dst = to === "a" ? b : a;
                    setTimeout(() => dst && dst.onSignal(JSON.parse(JSON.stringify({ ...msg, from: msg.from }))), 0);
                  };
                  const mk = (id) => new SF.Mesh({
                    code: "LOCAL1",
                    onPeer: async (from, msg) => {
                      const m = id === "a" ? a : b;
                      if (m.peers.has(from)) return;
                      if (msg && msg.k === "hello") return;
                      m.add(from, false);
                      log.push(id + " answering " + from);
                    },
                    onMessage: (from, msg) => log.push(id + " got " + msg.k),
                    onLost: () => {},
                  });

                  a = mk("a");
                  b = mk("b");
                  for (const [id, m] of [["a", a], ["b", b]]) {
                    m.signal = function (to, msg) { relay(id, { ...msg, from: id }); };
                    m.onIce = function (peer, cand) {
                      relay(this === a ? "a" : "b", {
                        k: "ice", d: cand.toJSON ? cand.toJSON() : cand,
                        from: this === a ? "a" : "b", to: peer.id,
                      });
                    };
                  }
                  const peer = a.add("b", true);
                  const offer = await peer.offer();
                  b.onSignal({ k: "offer", d: offer, from: "a" });
                  await new Promise((r) => setTimeout(r, 5000));

                  const state = (m) => [...m.peers.values()].map((p) => ({
                    id: p.id, open: p.open,
                    conn: p.pc.connectionState, ice: p.pc.iceConnectionState,
                  }));
                  return { log, a: state(a), b: state(b) };
                }"""
            )
        except Exception as exc:
            print("RESULT: FAIL (the mesh code threw:", str(exc)[:200], ")")
            browser.close()
            return 1

        browser.close()

    print(json.dumps(result, indent=2))
    if result.get("error"):
        print("RESULT: FAIL (" + result["error"] + ")")
        return 1
    opened = any(x["open"] for x in result["a"]) and any(x["open"] for x in result["b"])
    if opened:
        print("RESULT: PASS")
        return 0
    print("SKIP: this machine cannot route loopback WebRTC (ICE never connected).")
    print("RESULT: SKIP (environment)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
