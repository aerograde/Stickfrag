// ---------------------------------------------------------------------------
// StickFrag abilities.
//
// Six pickups, each a real upside paid for by a real downside. The host is the
// only authority: it owns who holds what, applies the stat changes, and tells
// every client. A client never decides it picked something up, it asks.
//
//   count = clamp(ceil(humans / 2), 1, 6)
//
// Lost on death, then back in the rotation after a cooldown at a fresh spot.
// ---------------------------------------------------------------------------
(() => {
  const SF = (globalThis.__SF = globalThis.__SF || {});

  const LIST = [
    {
      id: "feather", name: "FEATHER", colour: "#8fd3ff", shape: "prism",
      up: "+55% jump, +15% air control, no fall damage",
      down: "max HP 80, footsteps twice as loud",
      maxHp: 80, jump: 1.55, air: 1.15, fallImmune: true, footstep: 2,
    },
    {
      id: "iron", name: "IRON", colour: "#b9c2cc", shape: "cube",
      up: "max HP 150, 10% less damage taken",
      down: "18% slower, no slide",
      maxHp: 150, taken: 0.9, speed: 0.82, noSlide: true,
    },
    {
      id: "blur", name: "BLUR", colour: "#7cf5c4", shape: "sphere",
      up: "+22% move speed, slide cooldown halved",
      down: "max HP 65, leaves a dust trail",
      maxHp: 65, speed: 1.22, slide: 0.5, trail: true,
    },
    {
      id: "deadeye", name: "DEADEYE", colour: "#ffc21f", shape: "torus",
      up: "+25% damage",
      down: "20% slower fire rate, scope glint while aiming",
      damage: 1.25, fireRate: 0.8, glint: true,
    },
    {
      id: "leech", name: "LEECH", colour: "#ff5d6c", shape: "teardrop",
      up: "+8 HP per hit, +25 HP per kill",
      down: "max HP 70, bandages do nothing",
      maxHp: 70, leech: 8, leechKill: 25, noBandage: true,
    },
    {
      id: "berserk", name: "BERSERK", colour: "#ff7043", shape: "cube-spin",
      up: "+35% fire rate, +8% speed",
      down: "35% more damage taken, cannot aim down sights",
      fireRate: 1.35, speed: 1.08, taken: 1.35, noAds: true,
    },
  ];

  const BY_ID = new Map(LIST.map((a) => [a.id, a]));

  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

  // How many are in play. Kept deliberately sparse: one pickup is enough to
  // fight over, and a floor littered with them stops reading as a rare thing.
  // Bots do not count -- they are opponents to fight, not players to equip.
  const countFor = (humans) => clamp(Math.ceil(Math.max(1, humans) / 2), 1, 3);

  // --- host-side ownership -------------------------------------------------
  // The host is the single source of truth. Everything here runs on the host.
  class AbilityAuthority {
    constructor(world, rng) {
      this.world = world;
      this.rng = rng || Math.random;
      this.held = new Map();     // playerId -> ability id
      this.spawned = new Map();   // slot -> { id, x, y, z, takenAt, respawnAt }
      this.slots = 0;
      this.humans = 1;
      this.nextRespawn = 0;
    }

    // Recompute the pool when the room size changes. Existing pickups that are
    // still valid stay where they are; extras are dropped, missing ones added.
    sizeTo(humans) {
      this.humans = humans;
      const want = countFor(humans);
      if (want === this.slots) return false;
      this.slots = want;
      for (let slot = 0; slot < want; slot++) {
        if (!this.spawned.has(slot)) {
          const at = this.spot(slot);
          this.spawned.set(slot, {
            id: this.roll(slot), x: at.x, y: at.y, z: at.z, takenAt: 0, respawnAt: 0,
          });
        }
      }
      for (const slot of [...this.spawned.keys()]) if (slot >= want) this.spawned.delete(slot);
      return true;
    }

    // Pick an ability id, preferring ones nobody holds and one per slot.
    roll(slot) {
      const used = new Set(this.held.values());
      for (const s of this.spawned.values()) used.add(s.id);
      const free = LIST.filter((a) => !used.has(a.id));
      const pool = free.length ? free : LIST;
      return pool[(slot + Math.floor(this.rng() * pool.length)) % pool.length].id;
    }

    // Somewhere legal to stand, away from every player. The aim cone in the
    // client measures from the player's feet upward, so a pickup sits at chest
    // height; a floor-level pickup is unreachable by the pick ray.
    spot(slot) {
      const world = this.world;
      const spawns = world?.map?.spawns || [];
      const base = spawns.length ? spawns[slot % spawns.length] : { pos: [0, 0, 0] };
      const jitter = (n) => (this.rng() - 0.5) * n;
      return {
        x: (base.pos?.[0] || 0) + jitter(9),
        y: (base.pos?.[1] || 0) + 0.85,
        z: (base.pos?.[2] || 0) + jitter(9),
      };
    }

    holder(id) { return this.held.get(id) ? BY_ID.get(this.held.get(id)) : null; }

    // The wire form: one row per visible pickup.
    list() {
      const out = [];
      for (const [slot, s] of this.spawned) {
        if (s.takenAt) continue;
        out.push({ slot, id: s.id, x: s.x, y: s.y, z: s.z });
      }
      return out;
    }

    // A player asks to take pickup `slot`. Validate: alive, in range, and the
    // slot is actually there. Returns the ability or null.
    take(playerId, slot, pos) {
      const s = this.spawned.get(slot);
      if (!s || s.takenAt) return null;
      if (s.respawnAt && this.now < s.respawnAt) return null;
      const dx = pos.x - s.x, dy = pos.y - s.y, dz = pos.z - s.z;
      if (dx * dx + dy * dy + dz * dz > 2.4 * 2.4) return null; // 2.4 m reach
      s.takenAt = 1;
      // Return to the pool after a cooldown, somewhere new.
      s.respawnAt = this.now + 25;
      s.releaseAt = this.now + 25;
      const a = BY_ID.get(s.id);
      this.held.set(playerId, a.id);
      return a;
    }

    // Death removes it. This is the only way to lose one.
    drop(playerId) {
      const id = this.held.get(playerId);
      if (!id) return null;
      this.held.delete(playerId);
      return BY_ID.get(id);
    }

    // Advance timers: release parked slots and expire stale pickups.
    step(now) {
      this.now = now;
      for (const s of this.spawned.values()) {
        if (s.releaseAt && now >= s.releaseAt) {
          s.releaseAt = 0;
          s.takenAt = 0;
          s.respawnAt = 0;
          s.id = this.roll(0);
          const at = this.spot(0);
          s.x = at.x; s.y = at.y; s.z = at.z;
        }
      }
    }

    // The stat multipliers the host applies when simulating this player.
    mods(playerId) {
      const a = this.holder(playerId);
      if (!a) return null;
      return a;
    }
  }

  SF.ABILITIES = { LIST, BY_ID, countFor, AbilityAuthority };
})();
