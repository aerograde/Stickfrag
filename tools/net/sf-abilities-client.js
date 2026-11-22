// ---------------------------------------------------------------------------
// Ability rendering and the client half of the pickup interaction.
//
// The host owns the truth (sf-abilities.js); this file only draws what the host
// sent and asks for a pickup. Nothing here decides that a pickup succeeded.
//
// Every lookup goes through globalThis at call time, never at load time. The
// bundle hoists and reorders these IIFEs, so capturing a namespace reference
// here would break depending on emission order; reading it per call cannot.
// ---------------------------------------------------------------------------
(() => {
  const AB = (globalThis.__SFAbilities = globalThis.__SFAbilities || {});
  const BY_ID = (id) => {
    const map = globalThis.__SF?.ABILITIES?.BY_ID;
    return (map instanceof Map ? map : new Map()).get(id);
  };
  const THREE3 = () => globalThis.__SFThree;
  const THREE_OK = () => {
    const t = globalThis.__SFThree;
    return !!(t && t.Group && t.Mesh && t.MeshBasicMaterial);
  };

  AB.ready = () => THREE_OK() && !!globalThis.__SF?.ABILITIES;

  AB.heldBy = (game, id) => {
    const held = game?.abilityState?.held;
    if (!held) return null;
    const want = held[id];
    return want ? BY_ID(want) : null;
  };

  // --- drawing -------------------------------------------------------------
  // One shared soft dot, used as the halo behind every pickup. Generated once
  // rather than shipped as an asset: a radial falloff is all it needs to be.
  let glow = null;
  function glowTexture() {
    if (glow) return glow;
    const T = THREE3();
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.4, "rgba(255,255,255,0.45)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    glow = new T.CanvasTexture(c);
    glow.needsUpdate = true;
    return glow;
  }

  AB.Renderer = class Renderer {
    constructor() {
      this.group = null;
      this.nodes = new Map(); // ability id -> pooled meshes
      this.t = 0;
      this.pending = null;
      // Build immediately when three.js is already bound, so the caller can add
      // the group to the scene straight away. The bundle evaluates the three.js
      // shim before any renderer exists, so this is the normal path.
      this.ensure();
    }

    // Lazily built, because the three.js locals are only guaranteed to exist
    // once the rest of the bundle has evaluated.
    ensure() {
      if (this.group || !THREE_OK()) return !!this.group;
      const Group = THREE3().Group;
      this.group = new Group();
      this.group.name = "abilityDrops";
      if (this.pending) {
        const list = this.pending;
        this.pending = null;
        this.set(list);
      }
      return true;
    }

    set(list) {
      if (!this.ensure()) {
        this.pending = list; // replayed once three.js is reachable
        return;
      }
      // The constructor may have run before the scene was ready to take a group;
      // adopt the pending list the first time a real one arrives.
      if (this.group && !this.group.parent && this.adopt) this.adopt(this.group);
      const T = THREE3();
      const { Mesh, MeshBasicMaterial, Color, OctahedronGeometry, BoxGeometry,
              IcosahedronGeometry, TorusGeometry, ConeGeometry, CylinderGeometry,
              Sprite, SpriteMaterial } = T;
      this.group ||= new T.Group();
      const make = {
        prism: () => new OctahedronGeometry(0.26),
        cube: () => new BoxGeometry(0.34, 0.34, 0.34),
        sphere: () => new IcosahedronGeometry(0.25, 0),
        torus: () => new TorusGeometry(0.21, 0.075, 6, 12),
        teardrop: () => new ConeGeometry(0.23, 0.46, 6),
        "cube-spin": () => new BoxGeometry(0.3, 0.3, 0.3),
      };
      const wanted = new Set();
      for (const drop of list || []) {
        wanted.add(drop.id);
        let node = this.nodes.get(drop.id);
        if (!node) {
          const a = BY_ID(drop.id) || { colour: "#ffffff", shape: "cube" };
          const colour = new Color(a.colour);
          const group = new T.Group();
          const geo = make[a.shape] ? make[a.shape]() : make.cube();

          // A small solid token with a soft additive halo and a ring on the
          // floor. The wireframe shell and the 5.5 m light column this replaces
          // both read as programmer art: the column was a translucent tube at
          // eye level and the wireframe made every pickup a tangle of lines.
          const mesh = new Mesh(geo, new MeshBasicMaterial({ color: colour }));
          const halo = new Sprite(
            new SpriteMaterial({
              map: glowTexture(),
              color: colour,
              transparent: true,
              depthWrite: false,
              blending: 2,
            })
          );
          halo.scale.setScalar(1.5);
          const Ring = T.RingGeometry;
          const ring = new Mesh(
            Ring ? new Ring(0.32, 0.44, 28) : geo,
            new MeshBasicMaterial({
              color: colour, transparent: true, opacity: 0.45,
              side: 2, depthWrite: false, blending: 2,
            })
          );
          ring.rotation.x = -Math.PI / 2;
          ring.position.y = -0.8;
          group.add(mesh, halo, ring);
          node = { group, mesh, halo, ring, base: 0, drop: null };
          this.nodes.set(drop.id, node);
          this.group.add(group);
        }
        node.drop = drop;
        node.group.position.set(drop.x, drop.y, drop.z);
        node.group.visible = true;
      }
      for (const [id, node] of this.nodes) {
        if (wanted.has(id)) continue;
        node.group.visible = false;
        node.drop = null;
      }
    }

    // A small spinning token at each carrier's chest, so an enemy can read the
    // loadout before the first shot. Positioned from the snapshot, not parented
    // to a body, because every stickman is batched into one shared rig.
    setTokens(list) {
      if (!this.ensure()) return;
      const T = THREE3();
      if (!this.tokens) this.tokens = new Map();
      const wanted = new Set();
      for (const t of list || []) {
        wanted.add(t.id);
        let node = this.tokens.get(t.id);
        if (!node) {
          node = new T.Mesh(
            new T.OctahedronGeometry(0.13),
            new T.MeshBasicMaterial({ color: new T.Color(t.colour), transparent: true, opacity: 0.95 })
          );
          this.group.add(node);
          this.tokens.set(t.id, node);
        }
        node.material.color.set(t.colour);
        node.position.set(t.x, t.y + 1.3, t.z);
        node.visible = true;
      }
      for (const [id, node] of this.tokens) if (!wanted.has(id)) node.visible = false;
    }

    frame(dt) {
      if (!this.group) return;
      this.t += dt;
      for (const node of this.nodes.values()) {
        if (!node.group.visible) continue;
        const bob = Math.sin(this.t * 2 + node.base) * 0.07;
        node.mesh.rotation.y = this.t * 1.4;
        node.mesh.position.y = bob;
        node.halo.position.y = bob;
        node.halo.material.opacity = 0.55 + Math.sin(this.t * 3) * 0.15;
        node.ring.rotation.z = this.t * 0.9;
        node.ring.material.opacity = 0.3 + Math.sin(this.t * 3) * 0.12;
      }
      if (this.tokens) for (const node of this.tokens.values()) node.rotation.y = this.t * 1.8;
    }

    dispose() {
      for (const node of this.nodes.values()) {
        node.mesh.geometry?.dispose();
        node.mesh.material?.dispose();
        node.halo?.material?.dispose();
        node.ring?.geometry?.dispose();
        node.ring?.material?.dispose();
      }
      this.nodes.clear();
    }
  };

  // --- the interaction -----------------------------------------------------
  // zw() is the client's own aim-cone picker, so reach, cone and line of sight
  // match every other pickup instead of being reimplemented here.
  // Where each carrier is standing, read from the newest snapshot. The stickman
  // renderer batches every body into one rig, so a token cannot simply be
  // parented to a player's body -- it has to be positioned in world space.
  AB.tokens = (game) => {
    const held = game?.abilityState?.held;
    if (!held) return [];
    const snaps = game.snapshots;
    // The buffer is a small ring type with a `latest` accessor, not an array.
    const snap = snaps && snaps.latest ? snaps.latest : null;
    if (!snap || !snap.p) return [];
    const out = [];
    for (const key in held) {
      const a = BY_ID(held[key]);
      if (!a) continue;
      const id = Number(key);
      for (let o = 0; o + 11 <= snap.p.length; o += 11) {
        if (snap.p[o] !== id) continue;
        out.push({ id, x: snap.p[o + 1], y: snap.p[o + 2], z: snap.p[o + 3], colour: a.colour });
        break;
      }
    }
    return out;
  };

  AB.pick = (game, state) => {
    if (!game || !state) return null;
    const drops = game.abilityDrop || [];
    if (!drops.length) return null;
    // Derive the aim targets from the drops themselves. This used to read a
    // separate `abilitySpots` array that only `takeLocal` ever wrote -- after a
    // take -- so it was empty on the first frame and stayed empty, and no
    // ability could ever be picked up.
    const spots = drops.map((d) => ({ x: d.x, y: d.y, z: d.z }));
    game.abilitySpots = spots;
    const find = globalThis.__sfAimPick;
    if (typeof find !== "function") return null;
    const hit = find(state, spots, () => true, game.world);
    if (!hit || hit.index < 0) {
      // Nothing under the crosshair this frame, so the per-frame prompt cache
      // must not keep pointing at a pickup the player has walked away from.
      game.abilityOffered = -1;
      return null;
    }
    const drop = drops[hit.index];
    const a = drop && BY_ID(drop.id);
    if (!a) return null;
    game.abilityOffered = drop.slot;
    return { label: a.name, take: true, info: a.up };
  };

  AB.byId = (id) => BY_ID(id);

  // Death is the only way to lose an ability.
  AB.clear = (game, id) => {
    if (!game?.abilityState?.held) return;
    delete game.abilityState.held[id];
  };

  // Offline and host play share this: apply the pickup the crosshair is on.
  // If the fresh aim misses, fall back to the pickup the HUD was offering on the
  // previous frame. A snapshot can reconcile the body between the frame that
  // drew the prompt and the frame that handles the key, and taking what the
  // player was actually shown is both more reliable and more honest than making
  // them press again.
  AB.takeLocal = (game, state) => {
    // Remember what the HUD was offering before re-aiming, so the fallback below
    // cannot be clobbered by this call resetting the cache.
    const offered = game ? game.abilityOffered : -1;
    let p = AB.pick(game, state);
    if (!p && offered >= 0) {
      const prev = (game.abilityDrop || []).find((d) => d.slot === offered);
      if (prev) {
        const a = BY_ID(prev.id);
        if (a) {
          p = { label: a.name, take: true, info: a.up };
          game.abilityOffered = offered;
        }
      }
    }
    if (!p) return null;
    const drop = (game.abilityDrop || []).find((d) => d.slot === game.abilityOffered);
    if (!drop) return null;
    const a = BY_ID(drop.id);
    if (!a) return null;
    // Remove it from the world and remember who holds it.
    game.abilityDrop = (game.abilityDrop || []).filter((d) => d !== drop);
    game.abilitySpots = game.abilityDrop.map((d) => ({ x: d.x, y: d.y, z: d.z }));
    game.abilityState = game.abilityState || { held: {} };
    game.abilityState.held[game.selfId] = a.id;
    game.renderer?.abilities?.set(game.abilityDrop);
    return a;
  };

  // A wall gun is carried away, so its mount goes empty until it comes back.
  // The taken index lives here rather than in `match.pickups` because that
  // array is replaced by every snapshot the host sends.
  AB.taken = [];
  AB.TAKE_COOLDOWN = 20000;

  AB.pedestalOpen = (game, index) => {
    if (AB.taken.some((t) => t.index === index)) return false;
    const o = game?.match?.pickups;
    return o ? o[index] === 1 : true;
  };

  // Expire empty mounts and keep the pedestal meshes in step with them.
  AB.pedestals = (game, now) => {
    const list = AB.taken;
    if (!list.length) return;
    const t = typeof now === "number" ? now : performance.now();
    let changed = false;
    for (let i = list.length - 1; i >= 0; i--) {
      if (t - list[i].at >= AB.TAKE_COOLDOWN) {
        list.splice(i, 1);
        changed = true;
      }
    }
    if (!changed || !game) return;
    const o = game.match?.pickups;
    if (!o) return;
    game.renderer?.pickups?.setAvailable(o.map((v, i) => (list.some((k) => k.index === i) ? 0 : v)));
  };

  // Take the weapon or gear the prompt resolved, and put it in hand. The offset
  // that the client uses for a weapon's ammo comes from its own table, so the
  // magazine is filled the way the game fills it.
  AB.takeWeapon = (game) => {
    const state = game?.predictor?.state;
    if (!state) return null;
    // Use the item the prompt resolved this frame. It is refreshed every frame by
    // Y0e, so it cannot be stale, and it is exactly what the player is looking at.
    const offer = game.__sfOffer;
    if (!offer) return null;
    // Empty the wall mount for anything that came off a pedestal.
    if (offer.index >= 0) {
      AB.taken.push({ index: offer.index, at: performance.now() });
      const o = game.match?.pickups;
      if (o) game.renderer?.pickups?.setAvailable(o.map((v, i) => (AB.pedestalOpen(game, i) ? v : 0)));
    }

    // Grenades, bandages and hats are offered by the same prompt as guns, so the
    // use key has to claim them too -- otherwise F silently did nothing.
    if (offer.kind === "nade") {
      const caps = globalThis.__sfLimits;
      state.nade = offer.nade;
      state.nades = caps ? caps.nades : Math.max(state.nades || 0, 2);
      return { weapon: null, kind: "nade", nade: offer.nade };
    }
    if (offer.kind === "bandage") {
      const caps = globalThis.__sfLimits;
      state.bandages = caps ? caps.bandages : Math.max(state.bandages || 0, 3);
      return { weapon: null, kind: "bandage" };
    }
    if (offer.kind === "hat") {
      const row = game.roster?.get(game.selfId);
      if (row) row.hat = offer.hat;
      return { weapon: null, kind: "hat", hat: offer.hat };
    }

    const weapon = offer.weapon;
    if (weapon == null) return null;
    const Re = globalThis.__sfWeapons;
    const spec = Re && Re[weapon];
    if (!spec) return null;
    if (spec.melee) {
      state.knife = true;
      state.sidearm = false;
      state.melee = weapon;
      return { weapon };
    }
    state.knife = false;
    state.sidearm = false;
    state.weapon = weapon;
    state.ammo = spec.mag;
    state.reloadLeft = 0;
    return { weapon };
  };

  AB.offer = (game, state) => {
    const p = AB.pick(game, state);
    return p ? { prompt: p } : null;
  };

  // The frame loop samples the use key once per frame, so a quick tap can fall
  // between two samples and vanish. Record the code on the way in; the frame
  // hook consumes it. Typing in a field must not count.
  addEventListener(
    "keydown",
    (e) => {
      const g = globalThis.__sfGame;
      if (!g) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      (g.__sfTapKeys || (g.__sfTapKeys = new Set())).add(e.code);
    },
    true
  );
})();
