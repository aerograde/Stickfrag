// ---------------------------------------------------------------------------
// StickFrag peer layer.
//
// Connections are a full WebRTC mesh; simulation is host-authoritative. Peers
// send inputs up to the host, the host runs the same fixed-step simulation the
// offline client runs and sends snapshots down. That keeps the client's existing
// prediction/reconciliation untouched: it only needed a snapshot producer.
//
// Signalling is code-only. No broker, no signalling server:
//   * the joining player creates a JOIN code: an SDP offer gathered to
//     completion over STUN;
//   * the host pastes it and sends back an ANSWER code: the answering SDP;
//   * the joining player pastes the answer and the datachannel opens.
// For a third and later player, the host relays the offer/answer/ICE messages
// between the joiners over the host datachannels, so every pair gets a direct
// link (a full mesh) without any further codes.
//
// Nothing here imports anything; it is prepended to the bundle as one IIFE.
// ---------------------------------------------------------------------------
(() => {
  const SF = (globalThis.__SF = globalThis.__SF || {});
  const TICK = 60;
  const DT = 1 / TICK;
  const SNAP_HZ = 20;

  const CODES = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1

  const put = (k, v) => Object.defineProperty(SF, k, { value: v, writable: !0, configurable: !0 });

  put("code", (n = 6) => {
    const b = crypto.getRandomValues(new Uint8Array(n));
    return Array.from(b, (v) => CODES[v % CODES.length]).join("");
  });

  function peerId() {
    if (!SF._pid) SF._pid = (crypto.randomUUID?.() || String(Math.random())).slice(0, 8);
    return SF._pid;
  }
  put("peerId", peerId);

  // ------------------------------------------------------- code encoding ----
  // An offer or answer plus its ICE candidates, as one pasteable string.
  const pack = async (obj) => {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    let out = bytes;
    if (typeof CompressionStream === "function") {
      try {
        const cs = new CompressionStream("deflate-raw");
        const stream = new Blob([bytes]).stream().pipeThrough(cs);
        out = new Uint8Array(await new Response(stream).arrayBuffer());
      } catch {}
    }
    let bin = "";
    for (const b of out) bin += String.fromCharCode(b);
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };

  const unpack = async (text) => {
    const b64 = text.trim().replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    let raw = bytes;
    if (typeof DecompressionStream === "function") {
      try {
        const ds = new DecompressionStream("deflate-raw");
        const stream = new Blob([bytes]).stream().pipeThrough(ds);
        raw = new Uint8Array(await new Response(stream).arrayBuffer());
      } catch {}
    }
    return JSON.parse(new TextDecoder().decode(raw));
  };

  put("pack", pack);
  put("unpack", unpack);

  const ICE = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.cloudflare.com:3478" },
    ],
  };

  // ------------------------------------------------------------- peer ------
  class Peer {
    constructor(host, id, initiator) {
      this.host = host; // the Mesh that owns this peer
      this.id = id;
      this.pc = new RTCPeerConnection(ICE);
      this.data = null;
      this.open = false;
      this.pendingIce = [];
      this.remoteSet = false;
      this.pc.onicecandidate = (e) => {
        if (e.candidate) this.host.onIce(this, e.candidate);
      };
      if (initiator) {
        this.data = this.pc.createDataChannel("sf", { ordered: true });
        this._wire();
      } else {
        this.pc.ondatachannel = (e) => {
          this.data = e.channel;
          this._wire();
        };
      }
      this.pc.onconnectionstatechange = () => {
        const s = this.pc.connectionState;
        if (s === "failed" || s === "closed") this.host.onLost(this);
      };
    }
    queueIce(cand) {
      if (this.remoteSet) this.pc.addIceCandidate(cand).catch(() => {});
      else this.pendingIce.push(cand);
    }
    async setRemote(desc) {
      await this.pc.setRemoteDescription(desc);
      this.remoteSet = true;
      for (const c of this.pendingIce) this.pc.addIceCandidate(c).catch(() => {});
      this.pendingIce.length = 0;
    }
    _wire() {
      this.data.onopen = () => {
        this.open = true;
        globalThis.__openAt = performance.now();
        this.host.onOpen(this);
      };
      this.data.onmessage = (e) => {
        globalThis.__recv = (globalThis.__recv || 0) + 1;
        try {
          const parsed = JSON.parse(e.data);
          globalThis.__recvKinds = globalThis.__recvKinds || {};
          globalThis.__recvKinds[parsed.k] = (globalThis.__recvKinds[parsed.k] || 0) + 1;
          if (parsed.k === "snap") globalThis.__recvSnapSample = parsed.d && Object.keys(parsed.d);
          if (parsed.k === "welcome") globalThis.__recvWelcome = parsed.d;
        } catch {}
        this.host.onMessage(this, e.data);
      };
      this.data.onclose = () => this.host.onLost(this);
    }
    async offer() {
      const o = await this.pc.createOffer();
      await this.pc.setLocalDescription(o);
      await this.host.iceDone(this);
      return this.pc.localDescription;
    }
    async answer() {
      const a = await this.pc.createAnswer();
      await this.pc.setLocalDescription(a);
      await this.host.iceDone(this);
      return this.pc.localDescription;
    }
    // Full gathering, for a description that will be copied and pasted by hand
    // and therefore cannot be followed by trickled candidates.
    async offerComplete(budget = 10000) {
      const o = await this.pc.createOffer();
      await this.pc.setLocalDescription(o);
      await this.host.iceDone(this, budget);
      return this.pc.localDescription;
    }
    async answerComplete(budget = 10000) {
      const a = await this.pc.createAnswer();
      await this.pc.setLocalDescription(a);
      await this.host.iceDone(this, budget);
      return this.pc.localDescription;
    }
    send(obj) {
      if (!this.open) { globalThis.__sendDropped = (globalThis.__sendDropped || 0) + 1; return; }
      globalThis.__sent = (globalThis.__sent || 0) + 1;
      globalThis.__sentKinds = globalThis.__sentKinds || {};
      globalThis.__sentKinds[obj.k] = (globalThis.__sentKinds[obj.k] || 0) + 1;
      try { this.data.send(JSON.stringify(obj)); }
      catch (e) { globalThis.__sendErr = e.message; }
    }
    close() {
      try {
        this.data?.close();
        this.pc.close();
      } catch {}
    }
  }

  // -------------------------------------------------------------- mesh -----
  // Owns a set of peers. The host is the authority; joiners are all directly
  // linked to the host and, through host relayed signalling, to each other.
  class Mesh {
    constructor({ code, onMessage, onPeer, onLost, host = false }) {
      this.code = code;
      this.peers = new Map();
      this.onMessageCb = onMessage;
      this.onPeerCb = onPeer;
      this.onLostCb = onLost;
      this.isHost = !!host;
      this.hostPeer = null;
    }

    // Send a signalling message. Direct when the pair already has an open
    // datachannel; otherwise a joiner asks the host to relay it to the target.
    // The initial host<->joiner offer/answer travels in the pasteable codes.
    signal(to, msg) {
      const p = this.peers.get(to);
      if (p && p.open) { p.send({ k: "sig", d: msg }); return true; }
      if (!this.isHost && this.hostPeer && to !== this.hostPeer) {
        const via = this.peers.get(this.hostPeer);
        if (via && via.open) { via.send({ k: "relay", to, d: msg }); return true; }
      }
      return false;
    }

    onSignal(msg) {
      if (msg.k === "ice" && !this.peers.has(msg.from)) {
        // Hold it and stop: the peer does not exist yet, so there is nothing to
        // apply it to. It is replayed when the offer/answer creates the peer.
        (this.earlyIce || (this.earlyIce = [])).push(msg);
        return;
      }
      let peer = this.peers.get(msg.from);
      if (!peer) {
        this.onPeerCb?.(msg.from, msg);
        peer = this.peers.get(msg.from);
        if (!peer) return;
        if (this.earlyIce) {
          for (const m of this.earlyIce) if (m.from === msg.from) peer.queueIce(m.d);
          this.earlyIce = this.earlyIce.filter((m) => m.from !== msg.from);
        }
      }
      if (msg.k === "answer") peer.setRemote(msg.d);
      if (msg.k === "offer") {
        peer.setRemote(msg.d).then(() => peer.answer()).then((a) => {
          this.signal(msg.from, { k: "answer", d: a });
        });
      }
      if (msg.k === "ice") peer.queueIce(msg.d);
    }

    async iceDone(peer, budget = 900) {
      await new Promise((resolve) => {
        if (peer.pc.iceGatheringState === "complete") return resolve();
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          clearTimeout(timer);
          peer.pc.removeEventListener("icegatheringstatechange", onChange);
          resolve();
        };
        const onChange = () => peer.pc.iceGatheringState === "complete" && finish();
        const timer = setTimeout(finish, budget);
        peer.pc.addEventListener("icegatheringstatechange", onChange);
      });
    }

    onIce(peer, cand) {
      this.signal(peer.id, { k: "ice", d: cand.toJSON ? cand.toJSON() : cand });
    }

    add(id, initiator) {
      const old = this.peers.get(id);
      if (old) {
        old.close();
        this.peers.delete(id);
      }
      const p = new Peer(this, id, initiator);
      this.peers.set(id, p);
      return p;
    }

    // A joining player's offer starts under a temporary id; once the host's
    // answer arrives we key it by the host's peer id.
    rename(oldId, newId) {
      const p = this.peers.get(oldId);
      if (!p) return null;
      this.peers.delete(oldId);
      p.id = newId;
      this.peers.set(newId, p);
      return p;
    }

    onOpen(peer) {
      this.onPeerCb?.(peer.id, { k: "open" });
    }

    onLost(peer) {
      try { peer.pc.close(); } catch {}
      if (this.peers.get(peer.id) === peer) this.peers.delete(peer.id);
      this.onLostCb?.(peer.id);
    }

    onMessage(peer, raw) {
      let msg;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }
      if (msg.k === "sig") {
        this.onSignal({ ...msg.d, from: peer.id });
        return;
      }
      if (msg.k === "relay") {
        if (this.isHost) {
          const target = this.peers.get(msg.to);
          if (target && target.open) target.send({ k: "relay", from: peer.id, d: msg.d });
        } else {
          // A joiner receives the host's relay of another joiner's signal.
          this.onSignal({ ...msg.d, from: msg.from || peer.id });
        }
        return;
      }
      this.onMessageCb?.(peer.id, msg);
    }

    broadcast(obj) {
      for (const p of this.peers.values()) p.send(obj);
    }
    send(id, obj) {
      this.peers.get(id)?.send(obj);
    }
    close() {
      for (const p of this.peers.values()) p.close();
    }
  }

  const meshState = (m) => {
    if (!m) return null;
    return [...m.peers.values()].map((p) => ({
      id: p.id,
      open: p.open,
      ice: p.pc.iceConnectionState,
      conn: p.pc.connectionState,
      sig: p.pc.signalingState,
      remoteSet: p.remoteSet,
      pendingIce: p.pendingIce.length,
      earlyIce: (m.earlyIce || []).length,
      localCand: (p.pc.localDescription?.sdp || "").match(/a=candidate/g)?.length || 0,
      remoteCand: (p.pc.remoteDescription?.sdp || "").match(/a=candidate/g)?.length || 0,
    }));
  };
  put("meshState", meshState);
  put("Peer", Peer);
  put("Mesh", Mesh);
  put("ICE", ICE);
})();
