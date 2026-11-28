"""Deterministic test of the broker-free mesh signalling relay.

The host<->joiner pair uses the pasteable JOIN/ANSWER codes. For a third and
later player there are no more codes: the host relays WebRTC offers/answers/ICE
between the joiners over its data channels until each pair has a direct link.

This test exercises that routing with fake peers, so it does not depend on
loopback ICE. The real datachannel path is covered by test_peers.py.
"""

from __future__ import annotations

import json
import sys

from playwright.sync_api import sync_playwright

from test_entry import open_game

SCRIPT = r"""
async () => {
  const SF = globalThis.__SF;
  if (!SF || !SF.Mesh) return { error: "no SF.Mesh" };
  const out = {};
  const hostSent = [];
  const A = { id: "A", open: true, send: (o) => hostSent.push({ to: "A", o }) };
  const B = { id: "B", open: true, send: (o) => hostSent.push({ to: "B", o }) };
  const host = new SF.Mesh({ code: "MESH", host: true, onMessage: () => {} });
  host.peers.set("A", A);
  host.peers.set("B", B);
  host.onMessage(
    A,
    JSON.stringify({ k: "relay", to: "B", from: "forged", d: { k: "offer", sdp: "OFFER" } })
  );
  out.hostRelay = hostSent;

  const via = [];
  const H = { id: "H", open: true, send: (o) => via.push(o) };
  const slow = { id: "B", open: false, send: () => {} };
  const client = new SF.Mesh({ code: "MESH", host: false, onMessage: () => {} });
  client.peers.set("H", H);
  client.peers.set("B", slow);
  client.hostPeer = "H";
  out.clientRouted = client.signal("B", { k: "ice", d: { candidate: "c1" } });
  out.clientVia = via;

  const host2Sent = [];
  const host2 = { id: "H", open: true, send: (o) => host2Sent.push(o) };
  let peerC = null;
  const client2 = new SF.Mesh({
    code: "MESH",
    host: false,
    onMessage: () => {},
    onPeer: (id) => {
      if (client2.peers.has(id)) return;
      peerC = {
        id,
        open: false,
        pendingIce: [],
        remoteSet: false,
        setRemote: async () => { peerC.remoteSet = true; },
        answer: async () => ({ type: "answer", sdp: "ANSWER" }),
        queueIce: () => {},
        send: () => {},
        close: () => {},
      };
      client2.peers.set(id, peerC);
    },
  });
  client2.peers.set("H", host2);
  client2.hostPeer = "H";
  client2.onMessage(
    host2,
    JSON.stringify({
      k: "relay",
      from: "C",
      d: { k: "offer", d: { type: "offer", sdp: "OFFER" } },
    })
  );
  await new Promise((r) => setTimeout(r, 30));
  out.clientOffer = {
    remoteSet: !!(peerC && peerC.remoteSet),
    hostRelay: host2Sent,
  };

  out.noBroker =
    typeof SF.BROKERS === "undefined" &&
    typeof SF.Mesh.prototype.openBroker === "undefined" &&
    typeof SF.Mesh.prototype.hello === "undefined";
  out.stunOnly = ((SF.ICE && SF.ICE.iceServers) || []).every((s) =>
    String(s.urls || "").startsWith("stun:"));
  return out;
}
"""


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
        page = browser.new_page(viewport={"width": 1000, "height": 650})
        try:
            game = open_game(page, "&peer=host&nobots")
            r = game.evaluate(SCRIPT)
            print(json.dumps(r, indent=2)[:4000])
            relay = r.get("hostRelay") or []
            via = r.get("clientVia") or []
            offer = r.get("clientOffer") or {}
            relayed = (
                len(relay) == 1
                and relay[0].get("to") == "B"
                and relay[0]["o"].get("k") == "relay"
                and relay[0]["o"].get("from") == "A"
                and relay[0]["o"].get("d", {}).get("sdp") == "OFFER"
            )
            client_routed = (
                r.get("clientRouted") is True
                and len(via) == 1
                and via[0].get("k") == "relay"
                and via[0].get("to") == "B"
                and via[0].get("d", {}).get("d", {}).get("candidate") == "c1"
            )
            offer_ok = (
                offer.get("remoteSet") is True
                and len(offer.get("hostRelay") or []) == 1
                and (offer["hostRelay"][0].get("d") or {}).get("d", {}).get("sdp") == "ANSWER"
            )
            checks = {
                "host relays to the target": relayed,
                "joining client relays via host": client_routed,
                "joiner answers a relayed offer via host": offer_ok,
                "broker API is gone": r.get("noBroker") is True,
                "STUN only (no TURN)": r.get("stunOnly") is True,
            }
            for name, ok in checks.items():
                print(f"  {'PASS' if ok else 'FAIL'}  {name}")
            passed = all(checks.values())
            print("RESULT:", "PASS" if passed else "FAIL")
            return 0 if passed else 1
        finally:
            browser.close()


if __name__ == "__main__":
    sys.exit(main())
