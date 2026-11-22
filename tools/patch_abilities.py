"""Ability pickups: host authority, client rendering, enemy visibility.

Exact-match patches only, so a moved upstream fails the build loudly.
"""

from patchlib import sub

# --- constants the client already owns --------------------------------------

ABILITY_SPOTS_DECL = "  r.abilitySpots = [], r.abilityState = null, r.abilityOffered = -1,"


def ability_state(text: str) -> str:
    """Give the Game a place to hold the current ability drop list."""
    return sub(
        text,
        "ability:state",
        "  r.pickupSpots = e.map.pickups.map((t) => ({ x: t.pos[0], y: t.pos[1], z: t.pos[2] })),",
        "  r.abilitySpots = [], r.abilityDrop = null,\n"
        "  r.pickupSpots = e.map.pickups.map((t) => ({ x: t.pos[0], y: t.pos[1], z: t.pos[2] })),",
    )


def ability_match_ingest(text: str) -> str:
    """A match carries the current ability drops; keep them in world space."""
    return sub(
        text,
        "ability:ingest",
        "  r.renderer.pickups?.setAvailable(e.pickups);",
        "  r.renderer.pickups?.setAvailable(e.pickups);\n"
        "  // Ability drops are plain world positions, already validated by the host.\n"
        "  let __sfAbilities = e.abilities || [];\n"
        "  r.abilityDrop = __sfAbilities;\n"
        "  r.abilitySpots = __sfAbilities.map((a) => ({ x: a.x, y: a.y, z: a.z }));\n"
        "  r.renderer.abilities?.set(__sfAbilities);",
    )


def ability_renderer_create(text: str) -> str:
    """Mount the ability renderer beside the weapon pedestals."""
    return sub(
        text,
        "ability:create",
        "  r.pickups = new wp(e.map.pickups),\n  r.scene.add(r.pickups.group),",
        "  r.pickups = new wp(e.map.pickups),\n  r.scene.add(r.pickups.group),\n"
        "  r.abilities = new __SFAbilities.Renderer(),\n"
        "  r.abilities.adopt = (g) => r.scene.add(g),\n"
        "  r.abilities.ensure() && r.scene.add(r.abilities.group),",
    )


def ability_renderer_dispose(text: str) -> str:
    return sub(
        text,
        "ability:dispose",
        "  r.pickups && r.scene.remove(r.pickups.group),",
        "  r.pickups && r.scene.remove(r.pickups.group),\n"
        "  r.abilities && (r.scene.remove(r.abilities.group), r.abilities.dispose()),",
    )


def ability_prompt(text: str) -> str:
    """Offer the closest ability in the aim cone, alongside guns and hats."""
    return sub(
        text,
        "ability:prompt",
        "    i = n.index >= 0 ? { kind: \"gun\", weapon: r.dropWeapons[n.index] } : r.pickupItems[t.index];\n  if (!i) return null;",
        "    i = n.index >= 0 ? { kind: \"gun\", weapon: r.dropWeapons[n.index] } : r.pickupItems[t.index];\n"
        "  // Abilities take priority when the crosshair is on one: they are rarer,\n"
        "  // time-limited, and a player aiming at one wants it, not the gun behind it.\n"
        "  let __sfAbilityPick = __SFAbilities.pick(r, e);\n"
        "  if (__sfAbilityPick) return __sfAbilityPick;\n"
        "  // Remember exactly what the prompt is about to offer, so the use key can\n"
        "  // take that same item without re-deriving it. The pedestal index travels\n"
        "  // with it so taking the gun can empty the wall mount.\n"
        "  r.__sfOffer = i ? Object.assign({}, i, { index: n.index >= 0 ? -1 : t.index }) : null;\n"
        "  if (!i) return null;",
    )


def ability_take_input(text: str) -> str:
    """Take the ability on the same key that takes a gun."""
    return sub(
        text,
        "ability:take",
        "  if (r.hud.setPickupPrompt(l ?? (r.ready && !r.death ? Y0e(r, o) : null)), a) {",
        "  let __sfAbilityTake = r.ready && !r.death ? __SFAbilities.offer(r, e) : null;\n"
        "  if (r.hud.setPickupPrompt(l ?? __sfAbilityTake?.prompt ?? (r.ready && !r.death ? Y0e(r, o) : null)), a) {",
    )


def ability_body_token(text: str) -> str:
    """No-op: the token is positioned from the snapshot by the frame hook.

    The stickman renderer paints every body into one shared rig, so there is no
    per-player group to parent a token to. The earlier version attached a single
    mesh to that shared rig and left it at the local origin, which put one token
    in the wrong place for every player. `Renderer.setTokens` handles it now.
    """
    return text


def pedestal_without_match(text: str) -> str:
    """A weapon pedestal is pickable in offline play too.

    The original gates the whole pickup resolver on `match.pickups`, which only a
    server ever fills in. Offline has no match object at all, so every wall
    weapon was display-only. Treat an absent match as "every pedestal is up".
    """
    return sub(
        text,
        "ability:pedestal",
        '  let o = r.match?.pickups;\n  if (!o || r.match?.mode === "gungame") return null;',
        "  // No match means offline: every pedestal stands. A match may mark some\n"
        "  // as already taken, which is the only thing the table controls.\n"
        "  let o = r.match?.pickups ?? __sfAllPedestals(r);\n"
        '  if (r.match?.mode === "gungame") return null;',
    )


def weapon_pickup(text: str) -> str:
    """Make the weapons the prompt offers actually pickable with the use key.

    The original client only ever rendered these; on the live site the grant came
    from the server as a `pickup` event. There is no server here, so the same
    event is raised locally and the weapon is put in the player's hands.
    """
    return sub(
        text,
        "weapon:pickup",
        # Anchor on the flush line, which no earlier step rewrites.
        "  r.net && (r.net.queue(e), (o || r.seq % ZQ === 0) && r.net.flush());",
        # The prompt already resolved which item is under the crosshair; act on
        # exactly that one when the key is pressed.
        "  r.net && (r.net.queue(e), (o || r.seq % ZQ === 0) && r.net.flush());",
    )


def ability_death(text: str) -> str:
    """Drop the victim's ability when the existing kill handler runs.

    This must extend the kill handler, not add another `kill:` key. An object
    literal keeps the LAST entry for a duplicate key, so adding a second `kill`
    silently replaced the client's own death handler: the death overlay, kill
    feed and respawn bookkeeping all stopped running while the match carried on.
    """
    return sub(
        text,
        "ability:death",
        "    kill: (r, e) => {\n      r.dealt.delete(e.victim),",
        "    kill: (r, e) => {\n"
        "      // The victim loses the ability; the killer keeps theirs.\n"
        "      __SFAbilities.clear(r, e.victim);\n"
        "      __SFAbilities.clear(r, e.id);\n"
        "      r.dealt.delete(e.victim),",
    )


def ability_commit(text: str) -> str:
    """Pressing Use on an ability pickup grants it locally (offline) or asks the host.

    Offline and host-authoritative play differ only in who applies the effect:
    offline the game owns it, online the host replies with an event.
    """
    return sub(
        text,
        "ability:commit",
        "  r.net && (r.net.queue(e), (o || r.seq % ZQ === 0) && r.net.flush());",
        # Ask once per key press, not once per frame. This applies in a peer
        # match as well as offline: the ability pool is local state that the
        # host owns and syncs, not something only a sandbox has.
        # A tap has to count: `input.using` is sampled once a frame, so a quick
        # press can land between two samples and vanish. The key event is
        # captured on the way in and consumed here instead. The press is then
        # held for a few frames, because a snapshot can reconcile the aim back
        # to where it was before the player looked at the pickup, and a single
        # frame is enough for that to swallow the take.
        "  let __sfTapSeen = r.__sfTapKeys ? r.__sfTapKeys.delete(io(\"use\")) : !1;\n"
        "  r.__sfTapHold = __sfTapSeen ? 3 : Math.max(0, (r.__sfTapHold || 0) - 1);\n"
        "  let __sfUsing = r.input.using || r.__sfTapHold > 0;\n"
        "  if (__sfUsing && !r.__sfUseHeld) {\n"
        "    let __sfTaken = __SFAbilities.takeLocal(r, r.predictor.state);\n"
        "    __sfTaken && r.onEvent({ type: \"ability\", id: r.selfId, ability: __sfTaken.id });\n"
        "    // One press takes one thing: an ability if it was there, else the\n"
        "    // weapon or gear the prompt is offering.\n"
        "    if (!__sfTaken) {\n"
        "      let __sfItem = __SFAbilities.takeWeapon(r);\n"
        "      // Gear (grenades, bandages, hats) applies locally and has no weapon id\n"
        "      // to announce; only a gun needs the pickup event.\n"
        "      __sfItem && __sfItem.weapon != null && r.onEvent({ type: \"pickup\", weapon: __sfItem.weapon, id: r.selfId });\n"
        "    }\n"
        "  }\n"
        "  r.__sfUseHeld = __sfUsing;\n"
        "  r.net && (r.net.queue(e), (o || r.seq % ZQ === 0) && r.net.flush());",
    )


def ability_event(text: str) -> str:
    """The event table needs an `ability` row so toasts and state stay in sync."""
    return sub(
        text,
        "ability:event",
        "    pickup: (r, e) => {",
        "    ability: (r, e) => {\n"
        "      let a = __SFAbilities.byId(e.ability);\n"
        "      if (!a) return;\n"
        "      r.abilityState = r.abilityState || { held: {} };\n"
        "      r.abilityState.held[e.id] = a.id;\n"
        "      r.sound.pickup();\n"
        "      e.id === r.selfId && r.hud.feed.toast(`${a.name} \xB7 ${a.down}`);\n"
        "    },\n"
        "    pickup: (r, e) => {",
    )


def ability_frame(text: str) -> str:
    """Animate the pickups from the renderer's own per-frame update."""
    return sub(
        text,
        "ability:frame",
        "  r.renderer.updateSmoke(o), r.renderer.drops.update(t);",
        "  r.renderer.updateSmoke(o), r.renderer.drops.update(t),\n"
        "  r.renderer.abilities?.set(r.abilityDrop || []),\n"
        "  r.renderer.abilities?.setTokens(__SFAbilities.tokens(r)),\n"
        "  r.renderer.abilities?.frame(t),\n"
        "  __SFAbilities.pedestals(r, t);",
    )


def ability_game_handle(text: str) -> str:
    """Expose the live Game instance for verification and support."""
    return sub(
        text,
        "ability:handle",
        "  start() {\n    requestAnimationFrame((e) => this.frame(e));\n  }",
        "  start() {\n    globalThis.__sfGame = this;\n    requestAnimationFrame((e) => this.frame(e));\n  }",
    )


def ability_pickup_reach(text: str) -> str:
    """Make the use-key target cover how a player actually looks at a pickup.

    `zw` tests the aim ray against a sphere at (spot.x, spot.y + D8, spot.z)
    with radius MM. At the original 0.3 / 0.55 a gun on a floor mount was only
    reachable by aiming down at roughly 30 degrees: a level look passed about
    0.8 m above the sphere. The sphere now spans roughly knee to head height, so
    looking at the gun, or just looking where you are going, both work. The
    existing line-of-sight test still stops anything being taken through a wall.
    """
    return sub(
        text,
        "ability:pickup-reach",
        "var hw = 2.6,\n  MM = 0.55,\n  D8 = 0.3;",
        "var hw = 2.6,\n  MM = 0.8,\n  D8 = 0.55;",
    )


def ability_pedestal_height(text: str) -> str:
    """Lift a floor mount's pick point to the gun, not the floor.

    A map `pos` for a wall/pedestal mount is the point on the ground, but the
    weapon is drawn on a stand roughly half a metre above it. The aim sphere was
    therefore at ankle height, so a player looking at the gun -- which is what
    everyone does -- had the ray pass well over it and never saw a prompt.
    """
    return sub(
        text,
        "ability:pedestal-height",
        "  r.pickupSpots = e.map.pickups.map((t) => ({ x: t.pos[0], y: t.pos[1], z: t.pos[2] })),",
        "  // Floor mounts get a ground `pos`; wall racks are already at gun height.\n"
        "  r.pickupSpots = e.map.pickups.map((t) => ({\n"
        "    x: t.pos[0], y: t.pos[1] + (t.wall === void 0 ? 0.45 : 0), z: t.pos[2],\n"
        "  })),",
    )


def ability_self_hp(text: str) -> str:
    """Max HP comes from the held ability, so the HUD reads the effective value."""
    text = sub(
        text,
        "ability:maxhp",
        "function Y0e(r, e) {",
        "function __sfAllPedestals(r) {\n"
        "  // Every pedestal is available when no match says otherwise.\n"
        "  return (r.pickupSpots || []).map(() => 1);\n"
        "}\n"
        "function __sfMaxHp(r, id) {\n"
        "  let a = __SFAbilities.heldBy(r, id);\n"
        "  return a && a.maxHp ? a.maxHp : 100;\n"
        "}\n"
        "function Y0e(r, e) {",
    )
    return sub(
        text,
        "ability:pedestal-open",
        "zw(e, r.pickupSpots, (s) => o[s] === 1, r.world)",
        "zw(e, r.pickupSpots, (s) => __SFAbilities.pedestalOpen(r, s), r.world)",
    )


STEPS = [
    ("ability state", ability_state),
    ("ability ingest", ability_match_ingest),
    ("ability renderer", ability_renderer_create),
    ("ability dispose", ability_renderer_dispose),
    ("ability pedestal", pedestal_without_match),
    ("ability pickup reach", ability_pickup_reach),
    ("ability pedestal height", ability_pedestal_height),
    ("ability prompt", ability_prompt),
    ("ability take", ability_take_input),
    ("ability token", ability_body_token),
    ("ability maxhp", ability_self_hp),
    ("ability death", ability_death),
    ("weapon pickup", weapon_pickup),
    ("ability commit", ability_commit),
    ("ability event", ability_event),
    ("ability frame", ability_frame),
    ("ability handle", ability_game_handle),
]
