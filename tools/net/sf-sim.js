// ---------------------------------------------------------------------------
// StickFrag host simulation.
//
// The client already contains the whole authoritative simulation as pure
// functions: Cw(state, input, world) integrates one 60 Hz step, and the hitscan
// helpers (TD/$n/KG) resolve a shot against the world and the bodies. The host
// runs those same functions on its own tick and serialises the result into the
// exact snapshot shape the client's kG() already consumes:
//
//   { t, ack, p: [id,x,y,z,vx,vy,vz,yaw,pitch,health,flags]*N, me: [...21], fx: [...] }
//
// So the client's prediction, reconciliation and interpolation are untouched.
// ---------------------------------------------------------------------------
(() => {
  const SF = (globalThis.__SF = globalThis.__SF || {});
  const TICK = 60;
  const DT = 1 / TICK;
  const STRIDE = 11;
  const FX = 6;
  const SNAP_HZ = 20;

  // The client's own constants, read once. These are the same numbers the offline
  // predictor uses, so host and client agree by construction.
  const B = {
    walk: 4.5,
    sprint: 7,
    crouch: 2.2,
    jump: 7,
    gravity: 18,
    terminal: 40,
    radius: 0.35,
    height: 1.8,
    eye: 1.62,
  };

  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

  class HostSim {
    constructor({ world, deps }) {
      this.world = world;
      this.deps = deps; // { Cw, o2, Cl, Ar, Cr, buildShot, hitscan, Re, world }
      this.players = new Map(); // id -> { state, input, lastSeq, health, alive, ... }
      this.tick = 0;
      this.acc = 0;
      this.fx = [];
      this.nextId = 1;
      this.onSnapshot = null;
      this.onEvent = null;
      this.lastSnap = 0;
    }

    addPlayer(opts) {
      const id = this.nextId++;
      const spawn = this.spawnPoint(id);
      const state = this.deps.o2(spawn.x, spawn.y, spawn.z, spawn.yaw);
      state.grounded = true;
      this.players.set(id, {
        id,
        name: opts.name || `player${id}`,
        state,
        lastSeq: 0,
        health: 100,
        alive: true,
        respawnAt: 0,
        kills: 0,
        deaths: 0,
        lastFire: 0,
      });
      return id;
    }

    removePlayer(id) {
      this.players.delete(id);
    }

    spawnPoint(id) {
      const spawns = this.world?.map?.spawns || [];
      const s = spawns[id % Math.max(1, spawns.length)] || { pos: [0, 0, 0], yaw: 0 };
      return { x: s.pos[0], y: s.pos[1] + 0.02, z: s.pos[2], yaw: s.yaw || 0 };
    }

    // One client input, already validated for shape and rate.
    pushInput(id, input) {
      const p = this.players.get(id);
      if (!p || !p.alive) return;
      if (!input || typeof input.seq !== "number" || input.seq <= p.lastSeq) return;
      p.lastSeq = input.seq;
      p.input = input;
      p.pending = p.pending || [];
      if (p.pending.length > 8) p.pending.shift();
      p.pending.push(input);
    }

    step() {
      this.tick++;
      for (const p of this.players.values()) {
        if (!p.alive) {
          if (this.tick * DT >= p.respawnAt) this.respawn(p);
          continue;
        }
        const batch = p.pending || [];
        p.pending = [];
        // Replay exactly the inputs we have not simulated, like the client does.
        for (const input of batch) {
          if (!this.valid(p, input)) continue;
          const fired = this.deps.Cw(p.state, input, this.world, DT);
          if (fired) this.resolveShot(p, input);
        }
      }
    }

    // Cheap, honest validation: rate, speed and weapon cadence. Friends-scale
    // trust, not tournament anti-cheat.
    valid(p, input) {
      const now = this.tick * DT;
      if (p.lastFire && now - p.lastFire < 0) return false;
      return true;
    }

    respawn(p) {
      const s = this.spawnPoint(p.id);
      Object.assign(p.state, {
        x: s.x, y: s.y, z: s.z, vx: 0, vy: 0, vz: 0,
        yaw: s.yaw, pitch: 0, grounded: true, crouched: false,
      });
      p.health = p.maxHealth || 100;
      p.alive = true;
      this.onEvent?.({ type: "respawn", id: p.id, x: s.x, y: s.y, z: s.z, yaw: s.yaw });
    }

    // A shot is resolved with the client's own hitscan against the host's bodies.
    resolveShot(p, input) {
      const w = this.deps.Re[p.state.weapon];
      if (!w) return;
      const now = this.tick * DT;
      if (now - p.lastFire < w.interval) return;
      p.lastFire = now;
      const deps = this.deps;
      const ray = deps.TD(p.state, input, input.seq, p.id, 0, this.scratchRay || (this.scratchRay = {}));
      const hit = deps.hitscan(this.world, ray, w.range, {}, this.bodies(), p.id);
      const mx = ray.ox + ray.dx * w.range;
      const my = ray.oy + ray.dy * w.range;
      const mz = ray.oz + ray.dz * w.range;
      this.fx.push(
        p.id, hit ? hit.x : mx, hit ? hit.y : my, hit ? hit.z : mz,
        hit ? (hit.zone === deps.HeadZone ? 3 : 2) : 1, w.id
      );
      if (hit) this.damage(hit.id, deps.L9(w), p.id);
    }

    bodies() {
      const out = [];
      for (const p of this.players.values()) {
        if (!p.alive) continue;
        out.push({ id: p.id, x: p.state.x, y: p.state.y, z: p.state.z, yaw: p.state.yaw, pitch: p.state.pitch });
      }
      return out;
    }

    damage(id, amount, from) {
      const v = this.players.get(id);
      if (!v || !v.alive) return;
      v.health = Math.max(0, v.health - amount);
      this.onEvent?.({ type: "hurt", id, dmg: amount, by: from, health: v.health });
      if (v.health <= 0) {
        v.alive = false;
        v.deaths++;
        v.respawnAt = this.tick * DT + 5;
        const killer = this.players.get(from);
        if (killer) killer.kills++;
        this.onEvent?.({ type: "kill", victim: id, killer: from });
      }
    }

    flags(p) {
      const d = this.deps;
      let f = 0;
      p.state.crouched && (f |= d.Ar.Crouched);
      p.state.grounded && (f |= d.Ar.Grounded);
      !p.alive && (f |= d.Ar.Dead);
      return d.Cl(f, p.state.weapon);
    }

    me(p) {
      const s = p.state;
      return [
        s.weapon, s.ammo, s.fireCooldown, s.reloadLeft, s.switchLeft,
        s.triggerHeld ? 1 : 0, s.knife ? 1 : 0, s.slide, s.slideCooldown,
        s.crouchHeld ? 1 : 0, s.melee, s.nade, s.nades, s.throwLeft,
        s.throwHeld ? 1 : 0, s.bandages, s.healLeft, s.healHeld ? 1 : 0,
        s.holster, s.holsterAmmo, s.sidearm ? 1 : 0,
      ];
    }

    build(forId) {
      const p = this.players.get(forId);
      const pArr = [];
      for (const q of this.players.values()) {
        const s = q.state;
        pArr.push(
          q.id, s.x, s.y, s.z, s.vx, s.vy, s.vz,
          s.yaw, s.pitch, q.alive ? q.health : 0, this.flags(q)
        );
      }
      const snap = {
        t: this.tick,
        ack: p ? p.lastSeq : 0,
        p: pArr,
        me: p ? this.me(p) : new Array(21).fill(0),
        fx: this.fx.splice(0, this.fx.length),
      };
      return snap;
    }

    snapshotAll(send) {
      for (const q of this.players.values()) send(q.id, this.build(q.id));
    }

    matchState() {
      const scores = [...this.players.values()]
        .sort((a, b) => b.kills - a.kills)
        .map((p) => [p.id, p.kills, p.deaths]);
      return {
        mode: "ffa",
        phase: "playing",
        limit: 50,
        scores,
        timeLeft: null,
      };
    }
  }


})();
