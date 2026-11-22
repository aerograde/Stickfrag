"""M3: peer-to-peer multiplayer.

The client already contains the authority: Cw() integrates a step, TD() builds a
ray, u3() resolves a body hit, and kG() consumes a snapshot. The missing piece was
only a snapshot *producer*. This layer injects one inside module scope (so it can
call those functions by their real names, whatever esbuild renames them to) and
switches boot from offline to peer mode when the URL asks for it.

Transport surface implemented here is exactly what the client already calls on
`this.net`: queue/flush/rtt/roomId/chat/hidden/loadout/... All of it exists on
NetClient in the original build, so the call sites need no changes.
"""

from __future__ import annotations

from pathlib import Path

from patchlib import ROOT, sub

NET_SRC = (ROOT / "tools" / "net" / "sf-net.js").read_text(encoding="utf-8")

HOST_FACTORY = r"""
// ---------------------------------------------------------------------------
// Peer transport. Runs inside module scope so it can use the client's own
// simulation functions rather than a re-implementation of them.
//
//   ?peer=host&room=CODE          host a match
//   ?peer=join&room=CODE          join over MQTT signalling
//   ?peer=offer                   show an offer code for manual exchange
//   ?peer=answer&code=...         paste an offer, get a return code
// ---------------------------------------------------------------------------
var __sfPeer = (() => {
  // The runtime IIFE above puts everything on globalThis.__SF. Read it from there
  // rather than assuming a binding is in scope at this point in the bundle.
  let SF = globalThis.__SF;
  let G = null; // the Game
  let mesh = null;
  let role = null;
  let hostSim = null;
  let selfPeer = null;
  let rtt = 0;
  let lastPing = 0;
  let pingTimer = null;

  function params() {
    // The query string is the normal source. When this file runs inside the SVG
    // wrapper it is an about:srcdoc frame, where the shell cannot write the
    // address bar; it publishes the same set on a global instead.
    let q = new URLSearchParams(location.search);
    let g = globalThis.__SF_BOOT_PARAMS;
    if (g && typeof g === "object") for (let k in g) q.set(k, g[k]);
    return q;
  }

  // The modes the menu can launch. Anything else falls back to free-for-all, so
  // a stale or hand-edited URL still starts a match instead of failing.
  const MODES = new Set(["tdm", "ffa", "gungame", "ctf", "bomb", "hardpoint"]);
  const TEAM_MODES = new Set(["tdm", "ctf", "bomb"]);
  function chosenMode() {
    let m = params().get("mode");
    return m && MODES.has(m) ? m : "ffa";
  }

  function wanted() {
    let q = params();
    return q.get("peer");
  }

  // How many bots the host should fill the match with. Undefined means "use the
  // default": `bots=N` overrides, `nobots` (the flag the menu writes when the
  // room's Bots box is unticked) means none.
  function botCount() {
    let q = params();
    if (q.has("nobots")) return 0;
    let n = parseInt(q.get("bots") || "", 10);
    return Number.isFinite(n) ? Math.max(0, Math.min(8, n)) : void 0;
  }

  // --- the snapshot the client already knows how to read -------------------
  function makeHost(world, selfId, selfName, matchMode) {
    let players = new Map();
    let tick = 0;
    let fx = [];
    let byPeer = new Map(); // peer id -> sim player id
    let mode = matchMode || "ffa";
    let teamMode = TEAM_MODES.has(mode);

    // Seats alternate between the two sides, so a two-player match is 1 v 1 and
    // never lopsided. Free-for-all and gun game leave everyone neutral (-1),
    // which is how the client's roster tells the two shapes apart.
    function teamFor(id) {
      return teamMode ? id % 2 : -1;
    }

    function spawnFor(id) {
      let s = world?.map?.spawns ?? [];
      let p = s[id % Math.max(1, s.length)] ?? { pos: [0, 0, 0], yaw: 0 };
      return { x: p.pos[0], y: p.pos[1] + 0.02, z: p.pos[2], yaw: p.yaw || 0 };
    }

    function add(id, name) {
      let s = spawnFor(players.size);
      let st = o2(s.x, s.y, s.z, s.yaw);
      st.grounded = !0;
      players.set(id, {
        id, name, state: st, lastSeq: 0, health: 100, alive: !0,
        respawnAt: 0, kills: 0, deaths: 0, lastFire: -1, pending: []
      });
      return players.get(id);
    }

    // --- bots -------------------------------------------------------------
    // The live game runs its bots on the server, so the client has no AI at all.
    // These are deliberately simple: pick the nearest enemy, turn toward it at a
    // fixed rate, close to a comfortable range, fire when the aim has settled.
    // They use the same Cw integrator and shoot() resolution a peer does, so they
    // collide, reload and take damage exactly like a player.
    let botSeq = 0;
    let botSeed = 0x2f6e2b1;

    function botRand() {
      botSeed = (botSeed * 1103515245 + 12345) & 0x7fffffff;
      return botSeed / 0x7fffffff;
    }

    // Bot tuning. Damage is scaled down and the aim error is deliberately wide:
    // the point of the bots is to be practice, not a firing squad.
    const BOT_DAMAGE = 0.55;

    function wrap(a) {
      while (a > Math.PI) a -= Math.PI * 2;
      while (a < -Math.PI) a += Math.PI * 2;
      return a;
    }

    function addBot() {
      // Ids above the peer range so a bot can never collide with a seat.
      let id = 101 + botSeq++;
      let name = ["AXEL", "BRICK", "CINDER", "DOZER", "ECHO", "FLINT", "GUS", "HATCH"][botSeq % 8];
      let p = add(id, name);
      p.bot = true;
      p.state.weapon = 0;
      p.state.ammo = Re[0].mag;
      p.botStrafe = 0;
      p.botNext = 0;
      return p;
    }

    function botTarget(p) {
      let best = null;
      let bestD = Infinity;
      for (let q of players.values()) {
        if (q === p || !q.alive) continue;
        if (teamMode && teamFor(q.id) === teamFor(p.id)) continue;
        let dx = q.state.x - p.state.x;
        let dz = q.state.z - p.state.z;
        let d = dx * dx + dz * dz;
        if (d < bestD) {
          bestD = d;
          best = q;
        }
      }
      return best;
    }

    function botInput(p, now) {
      let s = p.state;
      let t = botTarget(p);
      let input = { yaw: s.yaw, pitch: s.pitch, moveX: 0, moveZ: 0, buttons: 0, seq: ++p.lastSeq };
      if (!t) {
        // Nothing to fight: wander a little so the match is not a freeze frame.
        s.yaw = wrap(s.yaw + 0.006);
        input.yaw = s.yaw;
        input.moveZ = 0.35;
        p.botSeen = null;
        return input;
      }

      // Look at the chest, from eye height.
      let eyeY = s.y + 1.5;
      let dx = t.state.x - s.x;
      let dz = t.state.z - s.z;
      let dy = t.state.y + 1.05 - eyeY;
      let flat = Math.hypot(dx, dz) || 1;
      let wantYaw = Math.atan2(-dx, -dz);
      let wantPitch = Math.atan2(dy, flat);

      // Reaction time. Only re-arm when the bot has no target or the target
      // genuinely changes after losing it -- re-arming on every nearest-target
      // flip kept resetting the timer and the bot almost never fired.
      if (!p.botSeen || p.botSeen !== t.id) {
        if (!p.botSeen || now - (p.botLostAt || 0) > 1.5) {
          p.botReactAt = now + 0.45 + botRand() * 0.55;
        }
        p.botSeen = t.id;
      }
      p.botLostAt = now;

      // Turn at a finite rate, slower than a mouse, so strafing works.
      let turn = 3.2 / 60;
      s.yaw = wrap(s.yaw + Math.max(-turn, Math.min(turn, wrap(wantYaw - s.yaw))));
      s.pitch += Math.max(-turn, Math.min(turn, wantPitch - s.pitch));

      // Aim drift that grows with distance, so long shots mostly miss.
      let drift = 0.03 + Math.min(0.10, flat * 0.007);
      let wobble = Math.sin(now * 1.7 + p.id * 2.3) * drift;
      input.yaw = s.yaw + wobble;
      input.pitch = s.pitch + Math.cos(now * 1.3 + p.id) * drift * 0.6;

      // Keep a fighting distance and sidestep while shooting.
      if (flat > 12) input.moveZ = 1;
      else if (flat < 4) input.moveZ = -1;
      else input.moveX = p.botStrafe;

      // Burst fire: a magazine's worth, then a break to reposition.
      if (now >= (p.botBurstAt || 0)) {
        p.botFiring = !p.botFiring;
        p.botBurstAt = now + (p.botFiring ? 0.6 + botRand() * 0.5 : 0.6 + botRand() * 0.7);
      }

      let err = Math.abs(wrap(wantYaw - s.yaw)) + Math.abs(wantPitch - s.pitch);
      let ready = now >= (p.botReactAt || 0);
      if (ready && p.botFiring && err < 0.14 && flat < 28) input.buttons |= Cr.Fire;
      if (s.ammo <= 0) input.buttons |= Cr.Reload;
      return input;
    }

    function stepBots(now) {
      for (let p of players.values()) {
        if (!p.bot) continue;
        if (!p.alive) {
          now >= p.respawnAt && (respawn(p), (p.botStrafe = 0));
          continue;
        }
        if (now >= (p.botNext || 0)) {
          p.botNext = now + 0.6 + botRand() * 0.8;
          p.botStrafe = botRand() < 0.5 ? -1 : 1;
        }
        let input = botInput(p, now);
        let fired = Cw(p.state, input, world, 1 / 60);
        if (fired) {
          p.shots = (p.shots || 0) + 1;
          shoot(p, input);
        }
      }
    }

    function flags(p) {
      let f = 0;
      p.state.crouched && (f |= Ar.Crouched);
      p.state.grounded && (f |= Ar.Grounded);
      !p.alive && (f |= Ar.Dead);
      return Cl(f, p.state.weapon);
    }

    function me(p) {
      let s = p.state;
      return [
        s.weapon, s.ammo, s.fireCooldown, s.reloadLeft, s.switchLeft,
        s.triggerHeld ? 1 : 0, s.knife ? 1 : 0, s.slide, s.slideCooldown,
        s.crouchHeld ? 1 : 0, s.melee, s.nade, s.nades, s.throwLeft,
        s.throwHeld ? 1 : 0, s.bandages, s.healLeft, s.healHeld ? 1 : 0,
        s.holster, s.holsterAmmo, s.sidearm ? 1 : 0,
      ];
    }

    function hurt(target, amount, from) {
      if (!target || !target.alive) return;
      target.health = Math.max(0, target.health - amount);
      // This is feedback only. The authoritative number travels in the snapshot
      // that already carries `health`, so a `hurt` event must not apply damage a
      // second time -- doing that made the HUD lurch down on the event and back
      // up on the next snapshot, which read as random HP gain.
      emit({ type: "hurt", by: from, dmg: amount, x: target.state.x, z: target.state.z });
      if (target.health > 0) return;
      target.alive = !1;
      target.deaths++;
      target.respawnAt = tick / 60 + 5;
      let k = players.get(from);
      k && k.kills++;
      // `push`, `head` and `dist` are what the ragdoll builder reads to decide
      // how a body falls. They were absent, so the client's RD() ran
      // `e.push[0]` on undefined, threw inside the renderer's update, and took
      // the whole frame with it -- which is why the death overlay never drew and
      // the local player could still shoot while dead.
      let shotDir = target.state;
      emit({
        type: "kill",
        victim: target.id,
        killer: from,
        weapon: target.state.weapon,
        head: !1,
        dist: 8,
        push: [Math.sin(shotDir.yaw || 0) * 6, 1.5, Math.cos(shotDir.yaw || 0) * 6],
      });
    }

    function emit(ev) {
      // The host plays its own events through the same path a client uses.
      try { G.onEvent(ev); } catch {}
      mesh?.broadcast({ k: "event", d: ev });
    }

    function respawn(p) {
      let s = spawnFor(p.id);
      // A spawn point that is still occupied can put a player inside geometry,
      // which then resolves as a large correction on the client. Prefer one no
      // other live player is standing on.
      let spawns = world?.map?.spawns ?? [];
      for (let i = 0; i < spawns.length; i++) {
        let cand = spawns[(p.id + i) % spawns.length];
        if (!cand || !cand.pos) continue;
        let taken = false;
        for (let q of players.values()) {
          if (q === p || !q.alive) continue;
          if (Math.hypot(q.state.x - cand.pos[0], q.state.z - cand.pos[2]) < 2.5) { taken = true; break; }
        }
        if (!taken) { s = { x: cand.pos[0], y: cand.pos[1] + 0.02, z: cand.pos[2], yaw: cand.yaw || 0 }; break; }
      }
      Object.assign(p.state, {
        x: s.x, y: s.y, z: s.z, vx: 0, vy: 0, vz: 0,
        yaw: s.yaw, pitch: 0, grounded: !0, crouched: !1
      });
      p.health = 100;
      p.alive = !0;
      // The client must be told where it reappeared. Without this the snapshot
      // simply reported a new position against inputs still queued from the old
      // one, and the player was snapped across the map -- the "teleport" bug.
      emit({ type: "respawn", id: p.id, x: s.x, y: s.y, z: s.z, yaw: s.yaw });
    }

    // One shot, resolved with the client's own ray, wall cast and body test.
    // Signatures are the ones the client calls in _G():
    //   TD(state, spread, seq, shooterId, pellet, rayOut) -> ray
    //   $n(world, ray, range, out)                        -> wall hit or null
    //   u3(ray, pose, out, extra)                         -> body hit or null
    function shoot(p, input) {
      let w = Re[p.state.weapon];
      if (!w || w.melee) return;
      let now = tick / 60;
      if (p.lastFire >= 0 && now - p.lastFire < w.interval) return;
      p.lastFire = now;
      let spread = DD(p.state, input);
      let table = L9(w);
      for (let pellet = 0; pellet < Math.max(1, w.pellets || 1); pellet++) {
        let ray = TD(p.state, spread, input.seq, p.id, pellet, G.ray);
        let wall = $n(world, ray, w.range, G.worldHit);
        let reach = wall ? wall.t : w.range;
        let best = null;
        for (let q of players.values()) {
          if (q.id === p.id || !q.alive) continue;
          let pose = G.poseState({
            id: q.id, x: q.state.x, y: q.state.y, z: q.state.z,
            yaw: q.state.yaw, pitch: q.state.pitch, flags: flags(q)
          });
          G.hit.t = reach;
          let hit = u3(ray, pose, G.hit, 0);
          hit && (!best || hit.t < best.t) && (best = { t: hit.t, zone: hit.zone, id: q.id });
        }
        let d = best ? best.t : reach;
        fx.push(
          p.id, ray.ox + ray.dx * d, ray.oy + ray.dy * d, ray.oz + ray.dz * d,
          best ? (best.zone === $e.Head ? 3 : 2) : 1, w.id
        );
        // Bots hit for less than a player does. Training is meant to be
        // winnable: at full damage three of them killed a stationary player in
        // about four seconds, which reads as aimbot rather than an opponent.
        if (best) {
          let dmg = table[best.zone] ?? table[$e.Body];
          hurt(players.get(best.id), p.bot ? dmg * BOT_DAMAGE : dmg, p.id);
        }
      }
    }

    function stepRemotes(skipId) {
      tick++;
      for (let p of players.values()) {
        if (p.id === skipId) {
          // The host's own body is driven by its client's prediction, so it is
          // not stepped here -- but its death and respawn still belong to this
          // side. Skipping it entirely left the local player dead at 0 HP with
          // no way back into the match.
          if (!p.alive && tick / 60 >= p.respawnAt) respawn(p);
          continue;
        }
        if (!p.alive) {
          tick / 60 >= p.respawnAt && respawn(p);
          continue;
        }
        let batch = p.pending;
        p.pending = [];
        for (let input of batch) {
          if (!input || typeof input.seq !== "number") continue;
          let fired = Cw(p.state, input, world, 1 / 60);
          fired && shoot(p, input);
        }
      }
      // Bots are stepped on the same tick as peers, after them, so they react to
      // where everyone ended up this tick rather than last.
      stepBots(tick / 60);
    }

    function build(forId) {
      let p = players.get(forId);
      let arr = [];
      for (let q of players.values()) {
        let s = q.state;
        arr.push(q.id, s.x, s.y, s.z, s.vx, s.vy, s.vz, s.yaw, s.pitch,
                 q.alive ? q.health : 0, flags(q));
      }
      return {
        t: tick, ack: p ? p.lastSeq : 0, p: arr,
        me: p ? me(p) : new Array(21).fill(0),
        fx: fx.splice(0, fx.length)
      };
    }

    return {
      add, build, players, stepRemotes,
      // The host's own body is owned by the client, not by this sim: the client
      // predicts it and this copy only echoes it back inside the snapshot. So
      // every field has to come across. Copying a subset silently zeroed the
      // ones left out -- reloadLeft among them -- and the snapshot that came
      // back then overwrote the client's own reload with 0, so R did nothing.
      mirror(id, state) {
        let p = players.get(id);
        if (!p) return;
        Object.assign(p.state, state);
      },
      // A remote peer is seated once and keeps its seat across reconnects.
      seat(peerId, name) {
        if (byPeer.has(peerId)) return byPeer.get(peerId);
        let id = players.size + 2; // 1 is the host
        byPeer.set(peerId, id);
        add(id, name);
        return id;
      },
      peerPlayer(peerId) { return byPeer.get(peerId); },
      remove: (id) => players.delete(id),
      addBot,
      botCount: () => [...players.values()].filter((p) => p.bot).length,
      botStates: () => [...players.values()].filter((p) => p.bot).map((p) => {
        let t = botTarget(p);
        return {
          id: p.id, x: Math.round(p.state.x), z: Math.round(p.state.z),
          hp: p.health, alive: p.alive, ammo: p.state.ammo,
          shots: p.shots || 0, kills: p.kills,
          target: t ? t.id : null,
          dist: t ? Math.round(Math.hypot(t.state.x - p.state.x, t.state.z - p.state.z)) : null,
        };
      }),
      input(peerId, msg) {
        let p = players.get(byPeer.get(peerId) ?? peerId);
        if (!p) return;
        let last = p.lastSeq;
        if (typeof msg.seq === "number" && msg.seq > last) {
          p.lastSeq = msg.seq;
          p.pending.push(msg);
          p.pending.length > 12 && p.pending.shift();
        }
      },
      roster() {
        // The client's roster row needs a complete cosmetic set; t7() falls back
        // per field, but color/team must be valid indices into their tables.
        return [...players.values()].map((p) => ({
          id: p.id,
          name: p.name,
          bot: !!p.bot,
          level: 0,
          color: p.id % 8,
          team: teamFor(p.id),
          hat: 0,
          outfit: 0,
          skin: 0,
        }));
      },
      scores() {
        return [...players.values()]
          .sort((a, b) => b.kills - a.kills)
          .map((p) => [p.id, p.kills, p.deaths]);
      },
      mode() {
        return mode;
      },
      teamMode() {
        return teamMode;
      },
      teamScores() {
        if (!teamMode) return null;
        let totals = [0, 0];
        for (let p of players.values()) totals[teamFor(p.id)] += p.kills;
        return totals;
      },
    };
  }

  // --- the NetClient-compatible facade -------------------------------------
  function transport({ host, selfId, code }) {
    return {
      roomId: code,
      rtt: 0,
      unsent: [],
      queue(e) { this.unsent.push(e); },
      flush() {
        if (!this.unsent.length) return;
        let batch = this.unsent;
        this.unsent = [];
        if (host) {
          mesh?.broadcast({ k: "in", d: batch });
        } else {
          // The host's peer id is its own random nickname, not the literal
          // "host", so address whichever peer is actually connected.
          for (let peer of mesh?.peers?.values() || []) {
            peer.open && mesh.send(peer.id, { k: "in", d: batch });
          }
        }
      },
      chat() {}, report() {}, voteKick() {}, switchTeam() {},
      loadout() {}, sights() {}, emote() {}, heavy() {}, vote() {},
      ownerPower() {}, hostAction() {}, wearItem() {}, devBots() {}, devCtf() {},
      hidden: () => !1,
      health() {},
      close() { mesh?.close(); },
    };
  }

  // --- broker-free code exchange -------------------------------------------
  // The fallback path: a host publishes an offer code, the joiner returns an
  // answer code. No broker, no signalling server, works on a LAN.
  let codePeer = null;

  async function offerCode() {
    return (async () => {
      if (!mesh) return null;
      let id = "code";
      let old = mesh.peers.get(id);
      old && (old.close(), mesh.peers.delete(id));
      codePeer = mesh.add(id, !0);
      let desc = await codePeer.offerComplete();
      let body = await SF.pack({ k: "offer", d: { type: desc.type, sdp: desc.sdp } });
      return "SF1:" + body;
    })();
  }

  async function acceptCode(text) {
    if (!mesh) return null;
    let raw = String(text || "").trim().replace(/^SF1:/i, "");
    if (!raw) return null;
    let msg;
    try {
      msg = await SF.unpack(raw);
    } catch {
      return null;
    }
    if (!msg || msg.k !== "offer") return null;
    let id = "code";
    let old = mesh.peers.get(id);
    old && (old.close(), mesh.peers.delete(id));
    codePeer = mesh.add(id, !1);
    await codePeer.setRemote(msg.d);
    let desc = await codePeer.answerComplete();
    let out = await SF.pack({ k: "answer", d: { type: desc.type, sdp: desc.sdp } });
    return "SF1:" + out;
  }

  // --- boot ----------------------------------------------------------------
  async function boot(game, opts) {
    G = game;
    role = opts.role;
    selfPeer = SF.peerId();
    let code = (opts.code || SF.code()).toUpperCase();

    let retries = {};
    let abilityAuth = null;
    mesh = new SF.Mesh({
      code,
      onPeer: async (id, msg) => {
        // "open" must be handled before the duplicate-peer guard: the peer
        // already exists by then, and this is the only notification a peer that
        // connected over a pasted code will ever get.
        if (role === "host" && msg && msg.k === "open") {
          let seatId = hostSim?.seat(id, "player");
          mesh.send(id, {
            k: "welcome",
            d: { id: seatId, roster: hostSim.roster(), code },
          });
          return;
        }
        if (mesh.peers.has(id)) return;
        if (role === "host") {
          // A joiner announced itself: offer it a datachannel and seat it.
          if (msg && msg.k !== "hello") return;
          let peer = mesh.add(id, !0);
          hostSim.seat(id, "player");
          let offer = await peer.offer();
          mesh.signal(id, { k: "offer", d: offer });
        } else {
          // The joiner is the answerer: only an offer creates a peer. Everything
          // else is a notification about one that already exists, and must not
          // replace it.
          if (msg && msg.k !== "offer") return;
          mesh.add(id, !1);
        }
      },
      onMessage: (id, msg) => {
        if (!msg) return;
        if (role === "host") {
          if (msg.k === "in") for (let i of msg.d) hostSim.input(id, i);
          if (msg.k === "hello") {
            let seatId = hostSim.seat(id, "player");
            mesh.send(id, { k: "welcome", d: { id: seatId, roster: hostSim.roster(), code } });
          }
        } else {
          if (msg.k === "snap") {
            globalThis.__snapCount = (globalThis.__snapCount || 0) + 1;
            globalThis.__lastSnap = msg.d;
            G.onSnapshot(msg.d);
          }
          if (msg.k === "event") G.onEvent(msg.d);
          if (msg.k === "welcome") {
            // The host's id for us is authoritative: the HUD, the roster and the
            // predictor all key off selfId.
            let seat = msg.d.id;
            if (typeof seat === "number" && seat > 0) G.selfId = seat;
            G.onWelcome({ id: seat ?? 1, roster: msg.d.roster, code, xp: 0, owner: !1 });
          }
        }
      },
      onLost: (id) => {
        if (role === "host") hostSim.remove(id);
        // A failed check is usually one dead candidate path, not a dead room.
        // Rebuild the link once before telling the player they were disconnected.
        if (role === "join") {
          retries[id] = (retries[id] || 0) + 1;
          if (retries[id] <= 2) setTimeout(() => { mesh.add(id, !1); mesh.hello(); }, 600 * retries[id]);
        }
      },
    });

    // Local play must not wait for a broker. Try signalling in the background;
    // a host without a broker is still a playable match, and joining peers that
    // cannot find us over MQTT can still use the offer/answer codes.
    let brokerDone = mesh.openBroker();

    if (role === "host") {
      hostSim = makeHost(opts.world, opts.selfId, opts.name, opts.mode || chosenMode());
      let myId = 1;
      hostSim.add(myId, opts.name || "host");
      // Bots fill the match. `bots=N` sets the count; `nobots` (the flag the
      // site writes when the room's Bots box is unticked) turns them off. A
      // default of 3 means a quick match is never an empty arena.
      let wantBots = opts.bots;
      if (typeof wantBots !== "number") {
        wantBots = params().has("nobots") ? 0 : 3;
      }
      for (let i = 0; i < Math.max(0, Math.min(8, wantBots)); i++) hostSim.addBot();
      G.onWelcome({
        id: myId,
        roster: hostSim.roster(),
        code,
        xp: 0,
        owner: !0,
      });
      G.ready = !0;
      G.frozen = !1;
      // Drive the authority at the client's own fixed step.
      let acc = 0, last = performance.now();
      (function loop(now) {
        requestAnimationFrame(loop);
        acc += Math.min(0.25, (now - last) / 1000);
        last = now;
        // Cap the catch-up. Without a bound, a slow frame asks for more ticks,
        // which makes the next frame slower, which asks for more still: the
        // simulation can never get back to real time and the match runs at half
        // rate. Dropping the surplus keeps the step honest instead.
        let steps = 0;
        while (acc >= 1 / 60 && steps < 5) {
          acc -= 1 / 60;
          steps++;
          // The host player is the client's own prediction: copy it in, do not
          // re-simulate it. Remote players are stepped from their inputs.
          hostSim.mirror(myId, G.predictor.state);
          hostSim.stepRemotes(myId);
        }
        if (steps >= 5) acc = 0;
        if (now - (hostSim.sentAt ?? 0) >= 1000 / 20) {
          hostSim.sentAt = now;
          for (let peerId of mesh.peers.keys()) {
            let seat = hostSim.peerPlayer(peerId);
            globalThis.__hostTick = globalThis.__hostTick || { ticks: 0, seatMiss: 0, built: 0, sentOk: 0 };
            globalThis.__hostTick.ticks++;
            if (!seat) { globalThis.__hostTick.seatMiss++; continue; }
            let peerObj = mesh.peers.get(peerId);
            if (!peerObj || !peerObj.open) continue;
            globalThis.__hostTick.built++;
            mesh.send(peerId, { k: "snap", d: hostSim.build(seat) });
            globalThis.__hostTick.sentOk++;
          }
          // The host consumes its own snapshot so prediction reconciles normally.
          // ack must be the last input the client already simulated, otherwise the
          // predictor replays inputs the host body has already been mirrored from.
          let selfSnap = hostSim.build(myId);
          selfSnap.ack = G.seq - 1;
          G.onSnapshot(selfSnap);
        }
        // The broker-free code is a fallback. Offer it, but do not cover the
        // game with it: the panel opens from the in-game button (or when no
        // broker is reachable at all).
      // The offer code is generated on demand from the panel button, never
      // automatically: gathering takes seconds and must not touch the frame loop.
      // Announce the match once. Re-sending it every frame rebuilt the HUD
        // banner path and threw on the map id.
        if (!hostSim.announced) {
          hostSim.announced = !0;
          // The match object is consumed by the HUD, the podium and the pickup
          // pedestals, so it must carry every collection they index into.
          abilityAuth = new SF.ABILITIES.AbilityAuthority(opts.world, Math.random);
          abilityAuth.now = 0;
          // Only real players add to the pool; a lobby full of bots should not
          // carpet the map with pickups.
          let humans = [...hostSim.players.values()].filter((p) => !p.bot).length;
          abilityAuth.sizeTo(humans);
          G.onMatch({
            mode: hostSim.mode(), phase: "playing",
            // Team modes are won on the combined score; the rest on kills.
            limit: hostSim.teamMode() ? 100 : 50,
            scores: hostSim.scores(), timeLeft: null,
            map: opts.map || "yard", vote: void 0,
            // One entry per map pedestal, 1 = still standing. An empty table is
            // truthy but marks every wall weapon as already taken, which is why
            // the TAKE prompt never appeared in a hosted match.
            pickups: new Array((opts.world?.map?.pickups || []).length).fill(1),
            drops: [], teamScores: hostSim.teamScores(),
            abilities: abilityAuth.list(),
          });
        }
      })(performance.now());
    } else {
      G.onWelcome({
        id: 1, roster: [{ id: 1, name: opts.name || "player", bot: !1, level: 0, color: 1, team: -1, hat: 0, outfit: 0, skin: 0 }],
        code, xp: 0, owner: !1,
      });
      G.ready = !0;
      G.frozen = !1;
      // The joiner cannot announce itself until signalling is actually open.
      brokerDone.then((ok) => {
        if (!ok) {
          G.setNotice("No signalling broker reachable.");
          // The broker is the fast path; this is the one that always works.
          globalThis.__sfCodeUI?.show(
            "No broker reachable. Ask the host for their offer code, paste it here, and send the return code back.",
            "join"
          );
          return;
        }
        // The host may have subscribed after our first announcement, and a
        // pub/sub broker keeps no history for us. Repeat for a few seconds until
        // a datachannel opens.
        let tries = 0;
        mesh.hello();
        let beat = setInterval(() => {
          tries++;
          if ([...mesh.peers.values()].some((p) => p.open) || tries > 12) return clearInterval(beat);
          mesh.hello();
        }, 700);
      });
    }

    let net = transport({ host: role === "host", selfId: 1, code });
    let timer = setInterval(() => {
      net.rtt = 30 + Math.round(Math.random() * 20);
    }, 1000);
    net.close = ((c) => () => { clearInterval(timer); c(); })(net.close);
    return net;
  }

  // The host applies the joiner's return code, completing the handshake with no
  // signalling channel involved at all.
  async function acceptAnswer(text) {
    let raw = String(text || "").trim().replace(/^SF1:/i, "");
    if (!raw || !codePeer) return false;
    let msg;
    try {
      msg = await SF.unpack(raw);
    } catch {
      return false;
    }
    if (!msg || msg.k !== "answer") return false;
    await codePeer.setRemote(msg.d);
    return true;
  }

  globalThis.__sfCodeApi = { offer: offerCode, accept: acceptCode, acceptAnswer };

  return {
    boot, wanted, mode: chosenMode, botCount, role: () => role, debug,
    debug: () => ({
      role,
      peers: mesh ? [...mesh.peers.keys()] : [],
      open: mesh ? [...mesh.peers.values()].filter((p) => p.open).length : 0,
      broker: !!(mesh && mesh.broker),
      brokerUrl: mesh ? mesh.brokerUrl || null : null,
      code: mesh ? mesh.code : null,
      sent: hostSim ? hostSim.sentAt : null,
      bots: hostSim ? hostSim.botCount() : 0,
      botStates: hostSim ? hostSim.botStates() : [],
      pcs: SF.meshState(mesh),
    }),
  };
})();
"""


def inject_runtime(text: str) -> str:
    """Insert the peer runtime into module scope, before the boot code that uses it."""
    return sub(
        text,
        "net:inject",
        "async function She() {",
        NET_SRC + HOST_FACTORY + "async function She() {",
    )


def switch_boot(text: str) -> str:
    """Peer mode is decided before the offline branch, which would otherwise win.

    standalone.js forces ?offline= onto every URL, so the offline check is true by
    default. The peer branch therefore goes first, and peer URLs drop ?offline= in
    the boot script so a match can actually connect.
    """
    anchor = '  if (o0(), r3.lock(), Co.has("offline")) {'
    branch = """  if (__sfPeer.wanted()) {
    Wo.setNotice("Connecting\\u2026"), R0("Joining the match", 2), o0(), r3.lock();
    try {
      Wo.net = await __sfPeer.boot(Wo, {
        role: __sfPeer.wanted() === "host" ? "host" : "join",
        code: (globalThis.__SF_BOOT_PARAMS && globalThis.__SF_BOOT_PARAMS.room) || new URLSearchParams(location.search).get("room") || "",
        name: Rs,
        map: j1,
        mode: __sfPeer.mode(),
        bots: __sfPeer.botCount(),
        world: fl,
        selfId: 1,
      });
      globalThis.__sfPeerDbg = __sfPeer.debug;
      // A host with no peers yet is already playing, so the boot notice must not
      // sit on the screen; it is only honest while actually joining someone.
      if (__sfPeer.wanted() === "host") Wo.setNotice("");
      Wo.sendLoadout(), N0();
    } catch (err) {
      console.error("sf-peer boot failed", err);
      LQ("Could not join: " + (err instanceof Error ? err.stack || err.message : String(err)));
    }
    N0();
    return;
  }
"""
    return sub(text, "net:boot", anchor, branch + anchor)


def allow_csp_connect(text: str) -> str:
    # The page's CSP is generated in build-single.py, not here.
    return text


STEPS = [
    ("net runtime", inject_runtime),
    ("net boot switch", switch_boot),
]
