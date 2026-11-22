// ---------------------------------------------------------------------------
// StickFrag peer layer.
//
// Connections are a full WebRTC mesh; simulation is host-authoritative. Peers
// send inputs up to the host, the host runs the same fixed-step simulation the
// offline client runs and sends snapshots down. That keeps the client's existing
// prediction/reconciliation untouched: it only needed a snapshot producer.
//
// Signaling, in order of preference:
//   1. MQTT over WebSocket on a free anonymous broker ("sf(code)")
//   2. an offer/answer code pair pasted by hand ("code")
//   3. the same code pair on a LAN, where mDNS host candidates resolve
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

  // ---------------------------------------------------------------- MQTT ----
  // A deliberately small MQTT 3.1.1 client: CONNECT, SUBSCRIBE, PUBLISH (QoS 0),
  // PINGREQ. That is the whole protocol surface signaling needs.
  const BROKERS = [
    "wss://broker.emqx.io:8084/mqtt",
    "wss://broker.hivemq.com:8884/mqtt",
    "wss://test.mosquitto.org:8081/mqtt",
  ];

  class Topic {
    constructor(url) {
      this.url = url;
      this.ws = null;
      this.buffer = new Uint8Array(0);
      this.waiters = new Map();
      this.seq = 1;
      this.handlers = new Set();
      this.ready = false;
    }
    static encodeString(s) {
      const b = new TextEncoder().encode(s);
      const out = new Uint8Array(b.length + 2);
      new DataView(out.buffer).setUint16(0, b.length);
      out.set(b, 2);
      return out;
    }
    static remainingLength(n) {
      const out = [];
      do {
        let d = n % 128;
        n = Math.floor(n / 128);
        if (n > 0) d |= 0x80;
        out.push(d);
      } while (n > 0);
      return Uint8Array.from(out);
    }
    static packet(type, flags, body) {
      const head = Uint8Array.from([(type << 4) | flags]);
      const len = Topic.remainingLength(body.length);
      const out = new Uint8Array(head.length + len.length + body.length);
      out.set(head, 0);
      out.set(len, head.length);
      out.set(body, head.length + len.length);
      return out;
    }
    send(pkt) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(pkt);
    }
    connect(clientId) {
      return new Promise((resolve, reject) => {
        let settled = false;
        let timer = null;
        const ws = new WebSocket(this.url, "mqtt");
        ws.binaryType = "arraybuffer";
        this.ws = ws;

        const fail = (e) => {
          if (settled) return;
          settled = true;
          if (timer) clearTimeout(timer);
          try { ws.close(); } catch {}
          reject(e instanceof Error ? e : new Error(String(e)));
        };
        // Arm the timeout only after `fail` exists: referring to it in the
        // setTimeout call site would hit its temporal dead zone.
        timer = setTimeout(() => fail(new Error("timeout")), 6000);

        ws.onopen = () => {
          // Variable header: protocol name (encodeString already writes its 2-byte
          // length), protocol level 4, connect flags 0x02 (clean session), keepalive.
          const parts = [];
          parts.push(Topic.encodeString("MQTT"), Uint8Array.from([4, 0x02]));
          parts.push(Uint8Array.from([0, 30])); // keepalive 30s
          parts.push(Topic.encodeString(clientId));
          const body = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
          let o = 0;
          for (const p of parts) (body.set(p, o), (o += p.length));
          this.send(Topic.packet(1, 0, body));
        };

        ws.onmessage = (ev) => {
          this._onData(new Uint8Array(ev.data));
          if (!settled && this.ready) (settled = true, clearTimeout(timer), (this._err = null), resolve(this));
        };
        ws.onerror = () => fail(new Error("broker unreachable"));
        ws.onclose = () => fail(new Error("broker closed"));

        this._err = fail;
        this._ping = setInterval(() => this.send(Uint8Array.from([0xc0, 0])), 25000);
      });
    }
    _onData(chunk) {
      const merged = new Uint8Array(this.buffer.length + chunk.length);
      merged.set(this.buffer, 0);
      merged.set(chunk, this.buffer.length);
      this.buffer = merged;
      for (;;) {
        if (this.buffer.length < 2) return;
        const type = this.buffer[0] >> 4;
        let mult = 1,
          len = 0,
          i = 1;
        for (;;) {
          if (i >= this.buffer.length) return;
          const d = this.buffer[i++];
          len += (d & 0x7f) * mult;
          mult *= 128;
          if (!(d & 0x80)) break;
        }
        if (this.buffer.length < i + len) return;
        const body = this.buffer.slice(i, i + len);
        this.buffer = this.buffer.slice(i + len);
        if (type === 2) {
          this.ready = true;
          this._err && (this._err = null);
        } else if (type === 3) {
          const idLen = (body[0] << 8) | body[1];
          const topic = new TextDecoder().decode(body.slice(2, 2 + idLen));
          const payload = body.slice(2 + idLen);
          for (const h of this.handlers) h(topic, payload);
        }
      }
    }
    subscribe(topic) {
      const body = new Uint8Array(2 + 2 + topic.length + 1);
      body[0] = 0;
      body[1] = 1;
      body[2] = (topic.length >> 8) & 0xff;
      body[3] = topic.length & 0xff;
      body.set(new TextEncoder().encode(topic), 4);
      body[body.length - 1] = 0;
      this.send(Topic.packet(8, 2, body));
    }
    publish(topic, obj) {
      const payload = new TextEncoder().encode(JSON.stringify(obj));
      const t = new TextEncoder().encode(topic);
      const body = new Uint8Array(2 + t.length + payload.length);
      body[0] = (t.length >> 8) & 0xff;
      body[1] = t.length & 0xff;
      body.set(t, 2);
      body.set(payload, 2 + t.length);
      this.send(Topic.packet(3, 0, body));
    }
    close() {
      clearInterval(this._ping);
      try {
        this.ws?.close();
      } catch {}
    }
  }

  put("Topic", Topic);
  put("BROKERS", BROKERS);

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
    async offerComplete() {
      const o = await this.pc.createOffer();
      await this.pc.setLocalDescription(o);
      await this.host.iceDone(this, 4000);
      return this.pc.localDescription;
    }
    async answerComplete() {
      const a = await this.pc.createAnswer();
      await this.pc.setLocalDescription(a);
      await this.host.iceDone(this, 4000);
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
  // Owns a set of peers plus whatever signaling channel was chosen. Payloads are
  // plain objects; the host decides what to do with them.
  class Mesh {
    // A stable per-room tag that keeps two rooms sharing one code apart.
    static roomNonce(code) {
      let h = 0x811c9dc5;
      for (let i = 0; i < code.length; i++) h = Math.imul(h ^ code.charCodeAt(i), 0x01000193) >>> 0;
      return h.toString(36);
    }
    constructor({ code, onMessage, onPeer, onLost }) {
      this.code = code;
      this.peers = new Map();
      this.onMessageCb = onMessage;
      this.onPeerCb = onPeer;
      this.onLostCb = onLost;
      this.pendingIce = new Map();
      this.broker = null;
      // Room scope, not peer scope: every peer derives the same value from the
      // code. A per-peer random value made each side reject the other's messages.
      this.nonce = Mesh.roomNonce(code);
    }
    async openBroker() {
      // Try every broker at once: public brokers are individually flaky, and a
      // serial loop costs up to 6 s per dead host before reaching a working one.
      const attempts = BROKERS.map((url) => new Topic(url).connect(`sf-${SF.peerId()}-${Date.now() % 100000}`).then(
        (t) => ({ url, t }),
        () => null
      ));
      const winner = await Promise.race([
        Promise.all(attempts).then((all) => all.find(Boolean) || null),
      ]);
      for (const a of attempts) a.then((r) => r && r !== winner && r.t.close(), () => {});
      if (winner) {
        try {
          const t = winner.t;
          const inbox = `sf1/${this.code}/${SF.peerId()}`;
          t.subscribe(inbox);
          t.subscribe(`sf1/${this.code}/hello`);
          t.handlers.add((topic, payload) => {
            let msg;
            try {
              msg = JSON.parse(new TextDecoder().decode(payload));
            } catch {
              return;
            }
            if (!msg || msg.from === SF.peerId()) return;
            this.onSignal(msg);
          });
          this.broker = t;
          this.inbox = inbox;
          this.brokerUrl = winner.url;
          console.info("[sf] signalling on", winner.url);
          this.hello();
          return true;
        } catch (err) {
          console.info("[sf] subscribe failed", err && err.message);
        }
      }
      return false;
    }
    hello() {
      this.broker?.publish(`sf1/${this.code}/hello`, {
        k: "hello",
        from: SF.peerId(),
        nonce: this.nonce,
        at: Date.now(),
      });
    }
    signal(to, msg) {
      const out = { ...msg, from: SF.peerId(), nonce: this.nonce };
      if (this.broker) {
        this.broker.publish(`sf1/${this.code}/${to}`, out);
      } else {
        // No broker: the offer/answer codes carry this message instead.
        (this.pending || (this.pending = [])).push(out);
      }
    }
    onSignal(msg) {
      if (msg.nonce && msg.nonce !== this.nonce) return; // two rooms, same code
      if (msg.k === "ice" && !this.peers.has(msg.from)) {
        // Hold it and stop: the peer does not exist yet, so there is nothing to
        // apply it to. It is replayed when the offer/answer creates the peer.
        (this.earlyIce || (this.earlyIce = [])).push(msg);
        return;
      }
      if (msg.k === "hello") {
        // A new arrival announces itself; the host answers with an offer.
        this.onPeerCb?.(msg.from, msg);
        return;
      }
      let peer = this.peers.get(msg.from);
      if (!peer) {
        // Let the application create the peer, then apply this message to it.
        this.onPeerCb?.(msg.from, msg);
        peer = this.peers.get(msg.from);
        if (!peer) return;
        // Replay anything that arrived before this peer existed.
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
      // A short settle only. Host (LAN) candidates land in the first few hundred
      // milliseconds; the rest trickle over the signalling channel. Waiting for
      // full gathering here delayed the datachannel by seconds on every join.
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
    onOpen(peer) {
      this.onPeerCb?.(peer.id, { k: "open" });
    }
    onLost(peer) {
      // Close before forgetting: a lost peer still holds a connection.
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
      this.broker?.close();
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
