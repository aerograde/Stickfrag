"""M2: remove per-frame waste from the client hot path.

Every change here is either (a) a dirty-guard so a DOM write only happens when the
value actually changed, or (b) hoisting an allocation out of the frame/tick loop.
None of them change what is drawn. Anchors are exact fragments; see patchlib.
"""

from __future__ import annotations

import re

from patchlib import ROOT, sub


# --------------------------------------------------------------------------
# 1. Hoist the per-tick key table out of Input.sample (60 allocations/s)
# --------------------------------------------------------------------------
RAWORDER = """function Mde() {
  return [
  [io("jump"), Cr.Jump],
  [io("crouch"), Cr.Crouch],
  [io("sprint"), Cr.Sprint],
  [io("reload"), Cr.Reload],
  [io("use"), Cr.Use],
  [io("throw"), Cr.Throw],
  ["Digit3", Cr.Throw],
  [io("heal"), Cr.Heal],
  ["Digit4", Cr.Heal]];

}"""


def hoist_sample_table(text: str) -> str:
    # Mde() builds a fresh 9-row array of [key, bit] pairs on every call, and it is
    # called once per 60 Hz sim tick from Input.sample. The pairs are constant
    # except for the user's rebindable keys, so cache them and rebuild only when a
    # keybinding actually changes (cP/c9 already funnel every change through d9).
    replacement = """var __sfKeyTable = null;
function __sfBuildKeyTable() {
  let r = [
  [io("jump"), Cr.Jump],
  [io("crouch"), Cr.Crouch],
  [io("sprint"), Cr.Sprint],
  [io("reload"), Cr.Reload],
  [io("use"), Cr.Use],
  [io("throw"), Cr.Throw],
  ["Digit3", Cr.Throw],
  [io("heal"), Cr.Heal],
  ["Digit4", Cr.Heal]];
  return (__sfKeyTable = r);
}
function Mde() {
  return __sfKeyTable ?? __sfBuildKeyTable();
}"""
    text = sub(text, "hoist:Mde", RAWORDER, replacement)

    # Invalidate whenever the bindings change. cP/c9 are the only mutators.
    text = sub(
        text,
        "hoist:Mde-invalidate",
        "function cP(r, e) {",
        "function cP(r, e) {\n  __sfKeyTable = null;",
    )
    text = sub(
        text,
        "hoist:Mde-invalidate-reset",
        "function c9(r) {",
        "function c9(r) {\n  __sfKeyTable = null;",
    )
    return text


# --------------------------------------------------------------------------
# 2. Reuse the viewmodel.update argument object (2 object literals/frame)
# --------------------------------------------------------------------------
def reuse_viewmodel_args(text: str) -> str:
    anchor = "function WG(r, e, o) {"
    text = sub(
        text,
        "viewmodel:scratch",
        anchor,
        anchor
        + "\n  let __sfVM = r.__sfVMBuf || (r.__sfVMBuf = {});",
    )

    text = sub(
        text,
        "viewmodel:spectator",
        """    r.renderer.viewmodel.update({
      dt: e,
      speed: 0,
      grounded: !0,
      sprinting: !1,
      aiming: l.aiming,
      reloadLeft: l.reloadLeft,
      weapon: l.weapon,
      switchLeft: 0,
      dead: !1,
      ammo: 1,
      throwLeft: l.throwLeft,
      nade: r.thrownKind,
      healLeft: l.healLeft,
      optic: s,
      wall: ib(r.world, r.renderer.camera.position, r.renderer.camera.quaternion)
    }),""",
        """    let __vm = __sfVM;
    __vm.dt = e,
    __vm.speed = 0,
    __vm.grounded = !0,
    __vm.sprinting = !1,
    __vm.aiming = l.aiming,
    __vm.reloadLeft = l.reloadLeft,
    __vm.weapon = l.weapon,
    __vm.switchLeft = 0,
    __vm.dead = !1,
    __vm.ammo = 1,
    __vm.throwLeft = l.throwLeft,
    __vm.nade = r.thrownKind,
    __vm.healLeft = l.healLeft,
    __vm.optic = s,
    __vm.wall = ib(r.world, r.renderer.camera.position, r.renderer.camera.quaternion),
    r.renderer.viewmodel.update(__vm),""",
    )

    text = sub(
        text,
        "viewmodel:live",
        """  r.renderer.viewmodel.update({
    dt: e,
    speed: n,
    grounded: t.grounded,
    sprinting: r.input.sprinting && !i && n > 5,
    aiming: i,
    reloadLeft: t.reloadLeft,
    weapon: xt(t).id,
    switchLeft: t.switchLeft,
    dead: r.death !== null || r.deploying || r.mirror !== null || r.emote.cam.shown,
    ammo: t.ammo,
    throwLeft: t.throwLeft,
    nade: r.thrownKind,
    healLeft: t.healLeft,
    optic: r.opticOf(xt(t).id),
    wall: ib(r.world, r.renderer.camera.position, r.renderer.camera.quaternion)
  });""",
        """  let __vm = __sfVM;
  __vm.dt = e,
  __vm.speed = n,
  __vm.grounded = t.grounded,
  __vm.sprinting = r.input.sprinting && !i && n > 5,
  __vm.aiming = i,
  __vm.reloadLeft = t.reloadLeft,
  __vm.weapon = xt(t).id,
  __vm.switchLeft = t.switchLeft,
  __vm.dead = r.death !== null || r.deploying || r.mirror !== null || r.emote.cam.shown,
  __vm.ammo = t.ammo,
  __vm.throwLeft = t.throwLeft,
  __vm.nade = r.thrownKind,
  __vm.healLeft = t.healLeft,
  __vm.optic = r.opticOf(xt(t).id),
  __vm.wall = ib(r.world, r.renderer.camera.position, r.renderer.camera.quaternion),
  r.renderer.viewmodel.update(__vm);""",
    )
    return text


# --------------------------------------------------------------------------
# 3. Dirty-guard the ammo card (was ~40 DOM touches every frame)
# --------------------------------------------------------------------------
def guard_ammo_card(text: str) -> str:
    old = """    setAmmoCard(e) {
      for (let o of this.ammoSlots) {
        let t = e.slots.find((n) => n.kind === o.dataset.kind);
        o.hidden = !t,
        t && (
        o.classList.toggle("on", t.on), o.classList.toggle("faint", t.faint), o.title = t.title, uS(o, t.pics));
      }
      for (
      this.ammo.classList.toggle("empty", e.empty),
      this.ammoHd.classList.toggle("melee", e.melee),
      this.ammoPic.hidden = e.pic === null,
      e.pic !== null && IB(this.ammoPic, e.pic),
      this.ammoLabel.textContent = e.label,
      this.ammoNum.textContent = e.ammo === null ? "" : String(e.ammo);
      this.ammoBars.children.length > e.bars.total;)

      this.ammoBars.lastElementChild.remove();
      for (; this.ammoBars.children.length < e.bars.total;) this.ammoBars.append(document.createElement("i"));
      Array.from(this.ammoBars.children).forEach((o, t) => o.classList.toggle("x", t >= e.bars.full));
    }"""
    new = """    setAmmoCard(e) {
      let __k = e.label + "|" + e.ammo + "|" + e.empty + "|" + e.melee + "|" + e.bars.total + "|" + e.bars.full + "|" + (e.pic === null ? "-" : e.pic);
      for (let o of e.slots) __k += "|" + o.kind + o.on + o.faint + o.pics.length + o.title;
      if (__k === this.__sfAmmoKey) return;
      this.__sfAmmoKey = __k;
      for (let o of this.ammoSlots) {
        let t = e.slots.find((n) => n.kind === o.dataset.kind);
        o.hidden = !t,
        t && (
        o.classList.toggle("on", t.on), o.classList.toggle("faint", t.faint), o.title = t.title, uS(o, t.pics));
      }
      for (
      this.ammo.classList.toggle("empty", e.empty),
      this.ammoHd.classList.toggle("melee", e.melee),
      this.ammoPic.hidden = e.pic === null,
      e.pic !== null && IB(this.ammoPic, e.pic),
      this.ammoLabel.textContent = e.label,
      this.ammoNum.textContent = e.ammo === null ? "" : String(e.ammo);
      this.ammoBars.children.length > e.bars.total;)

      this.ammoBars.lastElementChild.remove();
      for (; this.ammoBars.children.length < e.bars.total;) this.ammoBars.append(document.createElement("i"));
      Array.from(this.ammoBars.children).forEach((o, t) => o.classList.toggle("x", t >= e.bars.full));
    }"""
    return sub(text, "guard:ammoCard", old, new)


# --------------------------------------------------------------------------
# 4. Dirty-guard setGear / setAim / setTags / health
# --------------------------------------------------------------------------
def guard_small_hud(text: str) -> str:
    text = sub(
        text,
        "guard:setGear",
        """    setGear(e) {
      this.gear.hidden = e === 0,
      this.set("gear", this.gear, e > 0 ? de`<span><kbd>${ct("heal")}</kbd>${e} \xD7 BANDAGE</span>` : t0);
    }""",
        """    setGear(e) {
      if (e === this.__sfGear) return;
      this.__sfGear = e,
      this.gear.hidden = e === 0,
      this.set("gear", this.gear, e > 0 ? de`<span><kbd>${ct("heal")}</kbd>${e} \xD7 BANDAGE</span>` : t0);
    }""",
    )

    text = sub(
        text,
        "guard:setAim",
        """    setAim(e, o = !1) {
      this.crosshair.style.opacity = String(Math.max(0, 1 - e * 2)),
      this.scope.style.opacity = o ? String(Math.max(0, (e - 0.75) * 4)) : "0";
    }""",
        """    setAim(e, o = !1) {
      let a = String(Math.max(0, 1 - e * 2)),
        b = o ? String(Math.max(0, (e - 0.75) * 4)) : "0";
      a !== this.__sfCross && (this.__sfCross = a, this.crosshair.style.opacity = a),
      b !== this.__sfScope && (this.__sfScope = b, this.scope.style.opacity = b);
    }""",
    )

    text = sub(
        text,
        "guard:setTags",
        """        n.hidden = !1,
        n.textContent !== i.name && (n.textContent = i.name),
        n.style.setProperty("--team", bo[i.team] ?? "#fff"),
        n.style.transform = `translate(${i.x.toFixed(0)}px, ${i.y.toFixed(0)}px) translate(-50%, -100%)`;""",
        """        n.hidden = !1,
        n.textContent !== i.name && (n.textContent = i.name);
        let A = `translate(${i.x.toFixed(0)}px, ${i.y.toFixed(0)}px) translate(-50%, -100%)`;
        n.style.setProperty("--team", bo[i.team] ?? "#fff"),
        n.__sfXf !== A && (n.__sfXf = A, n.style.transform = A);""",
    )

    text = sub(
        text,
        "guard:health",
        """    this.healthNum.textContent !== t && (this.healthNum.textContent = t);
    let n = `${o / d1 * 100}%`;
    this.healthFill.style.width !== n && (this.healthFill.style.width = n),
    this.els.health.classList.toggle("low", o <= 35),
    this.els.health.classList.toggle("mid", o > 35 && o <= 65);""",
        """    this.healthNum.textContent !== t && (this.healthNum.textContent = t);
    let n = `${o / d1 * 100}%`;
    if (this.healthFill.style.width !== n && (this.healthFill.style.width = n), o !== this.__sfHp) {
      this.__sfHp = o;
      let lo = o <= 35,
        mid = o > 35 && o <= 65;
      lo !== this.__sfHpLo && (this.__sfHpLo = lo, this.els.health.classList.toggle("low", lo)),
      mid !== this.__sfHpMid && (this.__sfHpMid = mid, this.els.health.classList.toggle("mid", mid));
    }""",
    )
    return text



# --------------------------------------------------------------------------
# 4b. Idempotent .hidden writes (each assign queues a MutationRecord even when
#     the value is unchanged; six of these ran every frame)
# --------------------------------------------------------------------------
def guard_hidden_writes(text: str) -> str:
    text = sub(
        text,
        "hidden:helper",
        "function yS(r) {",
        """function __sfHide(e, o) {
  let t = o === null;
  t !== e.hidden && (e.hidden = t);
}
function yS(r) {""",
    )
    pairs = [
        ("showDeath", "this.death.hidden = t === null,",
         "this.__sfHideDeath ??= (v) => __sfHide(this.death, v), this.__sfHideDeath(t),"),
        ("showLoadout", "if (this.loadout.hidden = e === null, document.body.classList.toggle(\"lo-open\", e !== null), !e) return;",
         "if (this.__sfHideLoa ??= (v) => __sfHide(this.loadout, v), this.__sfHideLoa(e), document.body.classList.toggle(\"lo-open\", e !== null), !e) return;"),
        ("showPause", "o && this.showSettings(!1), this.pause.hidden = !e, o && this.onPauseOpen?.();",
         "o && this.showSettings(!1), this.pause.hidden === e && (this.pause.hidden = !e), o && this.onPauseOpen?.();"),
        ("setHeavyHint", "if (this.heavyHint.hidden = e === null, !e) return;",
         "if (this.__sfHideHeavy ??= (v) => __sfHide(this.heavyHint, v), this.__sfHideHeavy(e), !e) return;"),
        ("setRangePanel", "if (this.range.hidden = e === null, !e) return;",
         "if (this.__sfHideRange ??= (v) => __sfHide(this.range, v), this.__sfHideRange(e), !e) return;"),
        ("setPickupPrompt", "if (this.prompt.hidden = e === null, !e) return;",
         "if (this.__sfHidePrompt ??= (v) => __sfHide(this.prompt, v), this.__sfHidePrompt(e), !e) return;"),
        ("setSightHint", "this.sightHint.hidden = e === null, e && this.set(\"sighthint\", this.sightHint, QG(e));",
         "this.__sfHideSight ??= (v) => __sfHide(this.sightHint, v), this.__sfHideSight(e), e && this.set(\"sighthint\", this.sightHint, QG(e));"),
    ]
    for name, old, new in pairs:
        text = sub(text, "hidden:" + name, old, new)
    return text


# --------------------------------------------------------------------------
# 5. Skip the debug string build while the debug panel is hidden
# --------------------------------------------------------------------------
def gate_debug_lines(text: str) -> str:
    old = """    r.hud.setDebug([
    `${r.fps} fps  ${r.net ? `${Math.round(r.net.rtt)} ms` : "offline"}`,
    `id #${r.selfId}  room ${r.net?.roomId ?? "-"}`,
    `pos ${o.x.toFixed(2)} ${o.y.toFixed(2)} ${o.z.toFixed(2)}${o.grounded ? "" : " air"}${o.crouched ? " crouch" : ""}`,
    `pending ${r.predictor.pendingCount}  corr ${(r.predictor.lastError * 100).toFixed(1)} cm`,
    `others drawn ${Math.round(r.interp.ticks * 1e3 / Zn)} ms back`,
    ...r.input.stats.lines(r.renderer.quality, r.renderer.viewmodel.aim)]
    );"""
    new = """    r.hud.debug.hidden || r.hud.setDebug([
    `${r.fps} fps  ${r.net ? `${Math.round(r.net.rtt)} ms` : "offline"}`,
    `id #${r.selfId}  room ${r.net?.roomId ?? "-"}`,
    `pos ${o.x.toFixed(2)} ${o.y.toFixed(2)} ${o.z.toFixed(2)}${o.grounded ? "" : " air"}${o.crouched ? " crouch" : ""}`,
    `pending ${r.predictor.pendingCount}  corr ${(r.predictor.lastError * 100).toFixed(1)} cm`,
    `others drawn ${Math.round(r.interp.ticks * 1e3 / Zn)} ms back`,
    ...r.input.stats.lines(r.renderer.quality, r.renderer.viewmodel.aim)]
    );"""
    return sub(text, "gate:debugLines", old, new)


# --------------------------------------------------------------------------
# 6. applyLook only when the look actually changed
# --------------------------------------------------------------------------
def guard_apply_look(text: str) -> str:
    old = """  applyLook() {
    let e = this.scene.fog;
    e.color.set(ee.skyHorizon),
    e.near = ee.fogNear,
    e.far = ee.fogFar,
    this.fogColor.copy(e.color),
    this.skyLight.intensity = ee.skyLight,
    this.skyLight.groundColor.set(ee.groundLight),
    this.sun.intensity = ee.sunLight,
    this.sun.color.set(ee.sunColor);
  }"""
    new = """  applyLook() {
    let __k = `${ee.skyHorizon}|${ee.fogNear}|${ee.fogFar}|${ee.skyLight}|${ee.groundLight}|${ee.sunLight}|${ee.sunColor}`;
    if (__k === this.__sfLookKey) return;
    this.__sfLookKey = __k;
    let e = this.scene.fog;
    e.color.set(ee.skyHorizon),
    e.near = ee.fogNear,
    e.far = ee.fogFar,
    this.fogColor.copy(e.color),
    this.skyLight.intensity = ee.skyLight,
    this.skyLight.groundColor.set(ee.groundLight),
    this.sun.intensity = ee.sunLight,
    this.sun.color.set(ee.sunColor);
  }"""
    return sub(text, "guard:applyLook", old, new)


# --------------------------------------------------------------------------
# 7. Reuse the shaderWatch scene array
# --------------------------------------------------------------------------
def reuse_shaderwatch_array(text: str) -> str:
    old = """    this.shaderWatch.check(this.renderer, performance.now() - e, [
    this.scene,
    this.viewmodel.scene,
    ...(this.menu?.stickmen ? [this.menu.scene] : []),
    ...(this.podium ? [this.podium.scene] : [])]
    ),"""
    new = """    this.shaderWatch.check(this.renderer, performance.now() - e, this.__sfWatchList()),"""
    text = sub(text, "reuse:shaderWatch", old, new)
    anchor = "  setRemotes(e, o) {"
    return sub(
        text,
        "reuse:shaderWatch-fn",
        anchor,
        """  __sfWatchList() {
    let e = this.__sfWatchBuf || (this.__sfWatchBuf = []);
    return e.length = 0,
    e.push(this.scene, this.viewmodel.scene),
    this.menu?.stickmen && e.push(this.menu.scene),
    this.podium && e.push(this.podium.scene),
    e;
  }
"""
        + anchor,
    )


# --------------------------------------------------------------------------
# 8. Reuse the cached mesh arrays in Stickmen (4 arrays built per frame)
# --------------------------------------------------------------------------
def cache_stickmen_meshes(text: str) -> str:
    old = """    meshes() {
      let e = this.wear.meshes();
      return [...this.rig.meshes(), this.crown, this.mags, ...this.guns.meshes, ...e];
    }"""
    new = """    meshes() {
      return this.__sfMeshes ?? (this.__sfMeshes = [...this.rig.meshes(), this.crown, this.mags, ...this.guns.meshes, ...this.wear.meshes()]);
    }"""
    text = sub(text, "cache:stickmenMeshes", old, new)
    # The cache must die whenever the rig/wear set changes.
    return sub(
        text,
        "cache:stickmenMeshes-invalidate",
        """    setWorld(e) {
      this.world = e;
    }""",
        """    setWorld(e) {
      this.world = e, this.__sfMeshes = null;
    }""",
    )


# --------------------------------------------------------------------------
# 9. Reuse the pose array instead of spreading remotes
# --------------------------------------------------------------------------
def reuse_pose_array(text: str) -> str:
    return sub(
        text,
        "reuse:poses",
        "o.length = 0, o.push(...r.remotes), e.self = r.mirror || r.emote.cam.shown ? null : r.selfId;",
        """o.length = 0;
  for (let __i = 0; __i < r.remotes.length; __i++) o.push(r.remotes[__i]);
  e.self = r.mirror || r.emote.cam.shown ? null : r.selfId;""",
    )


# --------------------------------------------------------------------------
# 10. Reuse the camera state object returned every frame
# --------------------------------------------------------------------------
def reuse_camera_return(text: str) -> str:
    return sub(
        text,
        "reuse:cameraReturn",
        """    r.lastX = l,
    r.lastZ = s,
    { x: l, z: s });""",
        """    r.lastX = l,
    r.lastZ = s,
    (r.__sfCam || (r.__sfCam = { x: 0, z: 0 }), r.__sfCam.x = l, r.__sfCam.z = s, r.__sfCam));""",
    )


# --------------------------------------------------------------------------
# 11. Perf probe (?prof) so gains can be measured rather than asserted
# --------------------------------------------------------------------------
def add_profiler(text: str) -> str:
    probe = """var __sfProf = (() => {
  let on = /[?&]prof(=|&|$)/.test(location.search),
    acc = { sim: 0, remotes: 0, hud: 0, render: 0, n: 0 },
    t0 = 0;
  return {
    get on() { return on; },
    begin() { if (on) t0 = performance.now(); },
    end(k) { if (on) acc[k] += performance.now() - t0; },
    frame() { if (on) acc.n++; },
    report() {
      if (!on || !acc.n) return "";
      let n = acc.n,
        f = (v) => (v / n).toFixed(2),
        s = `prof n${n} sim ${f(acc.sim)} rem ${f(acc.remotes)} hud ${f(acc.hud)} draw ${f(acc.render)} ms`;
      return (acc.sim = acc.remotes = acc.hud = acc.render = acc.n = 0), s;
    }
  };
})();
"""
    text = sub(text, "prof:definition", "function yS(r) {", probe + "function yS(r) {")

    # Instrument the four frame sections in Game.frame.
    text = sub(
        text,
        "prof:sim",
        "    for (this.last = e, this.accumulator += o; this.accumulator >= Gt;) this.accumulator -= Gt, JG(this);",
        """    __sfProf.begin();
    for (this.last = e, this.accumulator += o; this.accumulator >= Gt;) this.accumulator -= Gt, JG(this);
    __sfProf.end("sim");""",
    )
    text = sub(
        text,
        "prof:remotes",
        """    wG(this.systems, o, e),
    this.renderer.setRemotes(yS(this), e);""",
        """    __sfProf.begin(),
    wG(this.systems, o, e),
    this.renderer.setRemotes(yS(this), e),
    __sfProf.end("remotes");""",
    )
    text = sub(
        text,
        "prof:hud",
        """    this.renderer.render(),
    tG(this, e, i),""",
        """    __sfProf.begin(),
    this.renderer.render(),
    __sfProf.end("render"),
    __sfProf.begin(),
    tG(this, e, i),
    __sfProf.end("hud"),
    __sfProf.frame(),""",
    )
    text = sub(
        text,
        "prof:report",
        "    ...r.input.stats.lines(r.renderer.quality, r.renderer.viewmodel.aim)]",
        """    ...r.input.stats.lines(r.renderer.quality, r.renderer.viewmodel.aim),
    ...__sfProf.on ? [__sfProf.report()] : []]""",
    )
    return text


# --------------------------------------------------------------------------
# 12. Minimal adaptive resolution
# --------------------------------------------------------------------------
def adaptive_resolution(text: str) -> str:
    """Target the panel's own refresh rate, one 0.125 step at most.

    The stock ladder (pm) steps down whenever FPS is under a flat 50, which on a
    144 Hz panel would trade sharpness for refresh rate in a losing trade. This
    governor compares against the panel rate it has observed instead, and is
    allowed exactly one step so the picture can barely change.
    """
    governor = """function __sfNoAutoRes() {
  return /[?&]noautores(=|&|$)/.test(location.search);
}
var __sfRes = class {
  drop = 0;
  panel = 0;
  slowSince = null;
  fastSince = null;
  ups = 0;
  static targetOf(e) {
    if (e <= 0) return 60;
    for (let o of [60, 75, 90, 120, 144, 165, 240, 360])
    if (e >= o * 0.97 && e <= o * 1.03) return o;
    return Math.max(30, e * 0.97);
  }
  static floorOf(e) {
    return Math.max(0.5, e * 0.6);
  }
  window(e, o, t) {
    if (e === null) {
      this.slowSince = this.fastSince = null;
      return;
    }
    this.panel = Math.max(this.panel, e);
    let n = __sfRes.targetOf(this.panel),
      i = __sfRes.floorOf(t);
    if (this.drop > 0 && t - this.drop * eK <= i + 1e-9) {
      this.slowSince = null;
      return;
    }
    e < n * 0.92 ?
    (this.fastSince = null,
    this.slowSince ??= o,
    o - this.slowSince >= 5e3 && this.drop < 1 && (this.drop = 1, this.slowSince = o)) :
    e > n * 0.98 ?
    (this.slowSince = null,
    this.drop > 0 &&
    this.ups < 3 &&
    (this.fastSince ??= o, o - this.fastSince >= 1e4 && (this.drop = 0, this.fastSince = o, this.ups++))) :
    (this.slowSince = this.fastSince = null);
  }
  ratio(e) {
    return Math.max(__sfRes.floorOf(e), e - Math.min(this.drop, 1) * eK);
  }
};
"""
    text = sub(
        text,
        "autores:governor",
        "var A5e = 1,",
        governor + "var A5e = 1,",
    )

    # Route the three construction sites through the governor.
    text = sub(
        text,
        "autores:install",
        "this.resolution = e.adaptive ? new pm() : null;",
        "this.resolution = e.adaptive ? new __sfRes() : null;",
    )
    text = sub(
        text,
        "autores:accept",
        "this.resolution ??= new pm(), this.accepted = !0;",
        "this.resolution ??= new __sfRes(), this.accepted = !0;",
    )
    text = sub(
        text,
        "autores:stepdown",
        'this.resolution = new pm(), this.action = "step"',
        'this.resolution = new __sfRes(), this.action = "step"',
    )

    # Desktop adaptive on by default; ?noautores restores the static preset.
    text = re.sub(
        r"JK = \{ desktop: \{ fpsCap: 0, adaptive: !1 \}",
        "JK = { desktop: { fpsCap: 0, adaptive: !__sfNoAutoRes() }",
        text,
        count=1,
    )

    # setPixelRatio is deferred and deduped upstream, so only ask when it moved.
    text = sub(
        text,
        "autores:apply",
        """          this.resolution.window(e, o, n),
          t.setPixelRatio(this.resolution.ratio(n)),""",
        """          this.resolution.window(e, o, n),
          this.__sfRatio !== this.resolution.ratio(n) && t.setPixelRatio(this.resolution.ratio(n)),
          this.__sfRatio = this.resolution.ratio(n),""",
    )
    return text




# --------------------------------------------------------------------------
# 13. Rebrand the in-world painted text. Every one of these is a canvas string or
#     a map sign the client draws, so this is a visible-text change only.
# --------------------------------------------------------------------------
def ragdoll_defaults(text: str) -> str:
    """Never let a missing death record take the whole frame down.

    `RD()` builds a ragdoll from `e.push[0..2]`, `e.style` and `e.head`. A kill
    event without a push vector made that throw inside the renderer's update,
    which unwound the entire frame -- the HUD never ran, so the death overlay
    never appeared and the player stayed able to shoot. Defaults here mean a
    malformed event produces a plain death instead of a broken one.
    """
    return sub(
        text,
        "ragdoll:defaults",
        "    onKill(e, o, t, n, i = \"shot\") {\n      this.pending.set(e, { push: o, head: t, style: i, at: n });",
        "    onKill(e, o, t, n, i = \"shot\") {\n"
        "      // A malformed event must still produce a body.\n"
        "      o = Array.isArray(o) && o.length >= 3 ? o : [0, 0, 0];\n"
        "      this.pending.set(e, { push: o, head: !!t, style: i || \"shot\", at: n });",
    )


def hurt_feedback_only(text: str) -> str:
    """Damage feedback must not also subtract health in a networked match.

    The host owns health and every snapshot carries it, so applying `e.dmg` here
    as well made the number dip on the event and jump back on the next snapshot.
    Offline keeps the local subtraction, because nothing else publishes health.
    """
    return sub(
        text,
        "hurt:feedback",
        '      r.health = Math.max(0, r.health - e.dmg),\n'
        '      r.hud.damage.hurt(e.by, e.x, e.z, r.health, performance.now()),',
        '      // Offline the client owns health; in a match the host does and the\n'
        '      // snapshot delivers it, so only apply damage when there is no net.\n'
        '      r.net || (r.health = Math.max(0, r.health - e.dmg)),\n'
        '      r.hud.damage.hurt(e.by, e.x, e.z, r.health, performance.now()),',
    )


def respawn_guard(text: str) -> str:
    """Only the local player's own respawn may clear the death state.

    The original handler takes no notice of which player the event is about, so
    in a match with bots every bot's respawn also cleared the local death state
    -- the kill cam vanished a frame or two after it appeared and the player was
    back to shooting while still at 0 HP.
    """
    return sub(
        text,
        "respawn:id",
        "    respawn: (r, e) => {\n      r.input.knife = !1,",
        "    respawn: (r, e) => {\n"
        "      if (e.id !== void 0 && e.id !== r.selfId) return;\n"
        "      r.input.knife = !1,",
    )


def row_guard(text: str) -> str:
    """A roster row must not throw when the match has no score table yet.

    `row()` does `r.match?.scores.find(...)`. Optional chaining stops at
    `match`, not at `scores`, so an event that arrives before the first match
    object carries `scores` throws -- and because that happens inside the kill
    handler, the death overlay never appeared for a whole match.
    """
    return sub(
        text,
        "row:guard",
        "  let t = r.match?.scores.find((n) => n[0] === e);",
        "  let t = r.match?.scores?.find((n) => n[0] === e);",
    )


def mode_label(text: str) -> str:
    """Stop every free-for-all from announcing itself as RANGE.

    `setTimer(time, line, showingTime, label)` defaults the label to "RANGE",
    and the free-for-all call site only passes three arguments -- so the panel
    header read RANGE in every FFA match. Team modes pass their own label
    through setTeamTimer, which is why only the non-team path was wrong.
    """
    return sub(
        text,
        "mode:label",
        "  r.hud.setTimer(a.timeLeft, w, p !== null),",
        '  r.hud.setTimer(a.timeLeft, w, p !== null, Ns(a.mode)?.title ?? "FREE-FOR-ALL"),',
    )


def rebrand_world_text(text: str) -> str:
    """Rewrite the painted brand text the client draws on signs and posters."""
    text = text.replace("STICKFRAG.COM", "STICKFRAG.HTML")

    # One painted logo composes the name from two strings and draws the suffix at
    # a smaller size, so the whole-string swap above cannot reach it.
    text = sub(
        text,
        "rebrand:suffix",
        '  let i = "STICKFRAG",\n    A = ".COM";',
        '  let i = "STICKFRAG",\n    A = ".HTML";',
    )

    # Other logos draw the suffix as its own string.
    for old, new in (
        ('qn(r, ".COM",', 'qn(r, ".HTML",'),
        ('sl(r, ".COM",', 'sl(r, ".HTML",'),
        ('r.strokeText(".com",', 'r.strokeText(".html",'),
        ('r.fillText(".com",', 'r.fillText(".html",'),
    ):
        text = text.replace(old, new)
    return text


# --------------------------------------------------------------------------
# 15. Stop 170+ empty InstancedMeshes from submitting driver work every frame
# --------------------------------------------------------------------------
def cull_empty_pools(text: str) -> str:
    # The scene builds a large pool of InstancedMesh objects up front and only
    # fills a handful of them. An InstancedMesh with count === 0 cannot change a
    # pixel, but three.js still binds its VAO and re-uploads its instance buffer
    # on every frame -- which is what made ~10% of frames take 33 ms instead of
    # 16.7. Hiding them removed every dropped frame while leaving the rendered
    # triangle count byte-for-byte identical.
    #
    # It re-checks periodically instead of hiding once, because these are pools:
    # one that gets filled later has to come back on its own.
    helper = """var __sfPoolTick = 0;
function __sfCullEmptyPools(scene) {
  scene.traverse((o) => {
    if (!o.isInstancedMesh) return;
    if (o.count === 0) {
      if (o.visible) { o.visible = false; o.__sfPoolHidden = true; }
    } else if (o.__sfPoolHidden) {
      o.visible = true;
      o.__sfPoolHidden = false;
    }
  });
}
var __sfSharedGeometry = false;
function __sfShareGeometry(scene) {
  // The map builder makes a fresh BufferGeometry per prop, so identical props
  // each upload their own copy of the same vertices -- 804 geometries for 142
  // distinct shapes. Sharing one object per shape drops the GPU buffers, the
  // per-frame binds and the memory, and cannot change what is drawn because
  // the data is byte-for-byte the same.
  if (__sfSharedGeometry) return;
  __sfSharedGeometry = true;
  const key = (g) => {
    const p = g.attributes && g.attributes.position;
    if (!p || g.isInstancedBufferGeometry) return null;
    if (!g.boundingBox) g.computeBoundingBox();
    const b = g.boundingBox;
    const f = (v) => (Math.round(v * 1000) / 1000).toFixed(3);
    // Sample the vertex data as well as the counts. Two props can share a
    // bounding box and a vertex count yet hold different vertices, and merging
    // those would redraw one as the other.
    const a = p.array;
    let h = 0;
    const step = Math.max(3, Math.floor(a.length / 24));
    for (let i = 0; i < a.length; i += step) h = (h * 31 + Math.round(a[i] * 100)) | 0;
    return [
      p.count, p.itemSize, g.index ? g.index.count : 0,
      g.attributes.normal ? g.attributes.normal.count : 0,
      g.attributes.uv ? g.attributes.uv.count : 0,
      f(b.min.x), f(b.min.y), f(b.min.z), f(b.max.x), f(b.max.y), f(b.max.z), h,
    ].join(":");
  };
  const keep = new Map();
  const uses = new Map();
  const replaced = [];
  scene.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    uses.set(o.geometry, (uses.get(o.geometry) || 0) + 1);
  });
  scene.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    const k = key(o.geometry);
    if (!k) return;
    const first = keep.get(k);
    if (!first) { keep.set(k, o.geometry); return; }
    if (first === o.geometry) return;
    uses.set(o.geometry, (uses.get(o.geometry) || 0) - 1);
    if (uses.get(o.geometry) === 0) replaced.push(o.geometry);
    o.geometry = first;
  });
  // Only free a buffer once nothing points at it any more.
  for (const g of replaced) { try { g.dispose(); } catch (err) {} }
}"""

    # The helper must live at file scope: a var cannot be declared inside a
    # class body, and these pools are culled from Game.frame.
    text = sub(text, "pools:definition", "var jX = Object.create;", helper + "\nvar jX = Object.create;")

    # Every 30th frame is soon enough to notice a pool being filled.
    text = sub(
        text,
        "pools:call",
        "  frame(e) {\n    if (requestAnimationFrame",
        "  frame(e) {\n    if ((__sfPoolTick++ % 30) === 0 && this.renderer?.scene) { __sfCullEmptyPools(this.renderer.scene); __sfShareGeometry(this.renderer.scene); }\n    if (requestAnimationFrame",
    )
    return text


# --------------------------------------------------------------------------
# 16. Stop the minimap canvas from forcing a re-composite every 30 Hz redraw
# --------------------------------------------------------------------------
def contain_minimap(text: str) -> str:
    # The minimap redraws its 170x170 canvas at 30 Hz. draw() itself costs
    # 0.08 ms, but the canvas sits in the normal layout flow, so each redraw
    # makes the compositor re-rasterise that layer -- which is what put p90 at
    # 33 ms. Isolating it (contain:strict) keeps it as its own layer and the
    # redraws stop perturbing the main frame.
    old = """    let A = this.el,
      a = Math.min(2, window.devicePixelRatio || 1);
    A.width = Math.round(i * a),"""
    new = """    let A = this.el,
      a = Math.min(2, window.devicePixelRatio || 1);
    A && !A.style.contain && ((A.style.contain = "strict"), (A.style.willChange = "transform"));
    A.width = Math.round(i * a),"""
    return sub(text, "minimap:contain", old, new)



# --------------------------------------------------------------------------
# 17. Trim the two GPU allocations that dwarf everything else
# --------------------------------------------------------------------------
def ink_scale(text: str) -> str:
    """Keep characters out of the sun's shadow pass, and nothing else.

    The rig is 171 InstancedMeshes refilled every frame. Re-submitting all of
    them through the shadow camera every second frame cost more than the main
    pass, so bodies no longer cast a sun shadow; the art's flat look and the map's
    own shadows carry the scene.

    An earlier version also moved the rig to a layer the ink pass skips. That is
    reverted: the ink pass is not only an outline pass, it also produces the
    normal/depth buffer that the final composite samples. Bodies missing from that
    buffer had most of their pixels replaced by background, so excluding them is
    not a visual no-op.
    """
    return sub(
        text,
        "perf:ink-scale",
        '      for (let t of this.meshes()) t.castShadow = !0, t.frustumCulled = !1, t.count = 0, this.group.add(t);',
        "      // Bodies cast no sun shadow: the rig is 171 instanced meshes refilled\n"
        "      // every frame and re-submitting them through the shadow camera cost\n"
        "      // more than the main pass. They stay on the default layer because the\n"
        "      // ink pass also builds the buffer the final composite samples from.\n"
        "      for (let t of this.meshes()) t.castShadow = !1, t.frustumCulled = !1, t.count = 0, this.group.add(t);",
    )


def warm_combat_materials(text: str) -> str:
    """Compile combat-only effect materials during the loading screen.

    `warmUp()` compiles the world, the viewmodel and the menu, then renders one
    frame of each. Everything that only appears once a match is under way was
    left out -- blood decals, ragdolls, smoke, grenades, dropped weapons, damage
    numbers. Watching `renderer.info.programs` over a bot match, the count sat at
    79 for the first five seconds and then jumped to 102 with 21 programs
    compiled in one frame, at 11.2 s, exactly where the frame-time graph has its
    worst spike: every first kill cost a visible hitch.

    Each transient effect's meshes are made visible for the compile pass and then
    restored, so nothing extra is left on screen.
    """
    old = "    await $z(),\n    await YC(e, () => Promise.all(e.map(([o, t]) => this.renderer.compileAsync(o, t)))),\n    YC(e, () => {\n      let o = this.renderer;"
    new = (
        "    // Combat effects are built lazily, so their shaders used to compile on\n"
        "    // the first kill of a match -- 21 programs in a single frame. Reveal them\n"
        "    // for the compile pass, then put visibility back exactly as it was.\n"
        "    this._warmCull = [];\n"
        "    for (let _ws of [this.stains, this.gore, this.drops, this.smoke, this.nades]) {\n"
        "      let _wg = _ws && _ws.group;\n"
        "      if (!_wg) continue;\n"
        "      _wg.traverse((_wo) => {\n"
        "        if (!(_wo.isMesh || _wo.isSprite || _wo.isPoints || _wo.isLine)) return;\n"
        "        if (!_wo.visible) { _wo.visible = !0; this._warmCull.push(_wo); }\n"
        "      });\n"
        "    }\n"
        "    await $z(),\n"
        "    await YC(e, () => Promise.all(e.map(([o, t]) => this.renderer.compileAsync(o, t)))),\n"
        "    YC(e, () => {\n"
        "      for (let _wo of this._warmCull) _wo.visible = !1;\n"
        "      this._warmCull = null;\n"
        "      let o = this.renderer;"
    )
    return sub(text, "perf:warm-combat", old, new)


def guard_replace_state(text: str) -> str:
    """Make URL bookkeeping non-fatal.

    The game keeps the address bar in step with the current map/room through
    `history.replaceState`. Every one of those calls passes `location.pathname`,
    and a document loaded through the SVG wrapper is `about:srcdoc`, where
    History rejects any constructed URL with a SecurityError. That surfaced as
    "could not start the game" and the match never began.

    These writes are cosmetic (they exist so a reload lands in the same match), so
    failing them should do nothing rather than abort the boot.
    """
    helper = """function __sfReplaceState(url) {
  try { history.replaceState(null, "", url); } catch {}
}
// `bC` is referenced once, in the join-failure path, and defined nowhere: the
// recovered bundle lost the constant. That path was unreachable while the boot
// threw earlier, so the ReferenceError stayed hidden. A sentinel keeps the
// comparison meaningful without inventing a message the original had.
var bC = "\\u0000";
"""
    text = sub(text, "perf:replace-state-def", "var jX = Object.create;", helper + "var jX = Object.create;")
    call = 'history.replaceState(null, "", '
    # Nine sites across eight lines: the join/respawn path calls it twice in one
    # statement. Any other number means the source moved and the guard is stale.
    found = text.count(call)
    if found != 9:
        raise SystemExit(f"[perf:replace-state] expected 9 call sites, found {found}")
    return text.replace(call, "__sfReplaceState(")


def boot_params_from_global(text: str) -> str:
    """Let the shell hand boot parameters to the game without the address bar.

    The game reads mode/map/bots/peer/offline straight out of `location.search`.
    That is fine for the .html, but the SVG wrapper runs the game in an iframe
    whose document is `about:srcdoc`, and History refuses to write a URL there --
    so every parameter was empty, the game fell through to "no match", and the
    frame loop never started.

    The shell publishes the same set on `globalThis.__SF_BOOT_PARAMS`; this merges
    it in immediately after the query string is read. On an ordinary page it is
    absent and behaviour is unchanged.
    """
    return sub(
        text,
        "perf:boot-params",
        "var Co = new URLSearchParams(location.search);",
        "var Co = new URLSearchParams(location.search);\n"
        "if (typeof globalThis.__SF_BOOT_PARAMS === \"object\" && globalThis.__SF_BOOT_PARAMS)\n"
        "  for (let _k in globalThis.__SF_BOOT_PARAMS) Co.set(_k, globalThis.__SF_BOOT_PARAMS[_k]);",
    )


def lighter_quality_tiers(text: str) -> str:
    """Cap the shadow map at 1024 on every tier.

    This is the single largest frame-time item in a busy match. The shadow pass
    re-renders the whole scene through the sun's camera, and at 2048 that measured
    **21.7 ms of GPU time** with six characters on the map, against 3.5 ms with an
    empty server -- enough to miss every other vsync and halve the frame rate.
    At 1024 the same scene measures **3.7 ms** and the picture is unchanged at
    gameplay distance: the map is flat-shaded and the shadow camera spans 90 world
    units, so the edge softness it loses was not visible in the first place.

    shadowEvery 3 redraws every third frame instead of every second, which is
    still 20 updates a second for characters moving at walking pace.
    """
    old = """  { pixelRatio: 0.75, shadowMap: 2048, shadowEvery: gQ, atlas: yp },
  { pixelRatio: 1, shadowMap: 2048, shadowEvery: 2, atlas: { w: 2048, h: 2048 } },
  { pixelRatio: 1.5, shadowMap: 4096, shadowEvery: 2, atlas: { w: 4096, h: 2048 } }];"""
    new = """  { pixelRatio: 0.75, shadowMap: 1024, shadowEvery: gQ, atlas: yp },
  { pixelRatio: 1, shadowMap: 1024, shadowEvery: 3, atlas: { w: 2048, h: 2048 } },
  { pixelRatio: 1.5, shadowMap: 1024, shadowEvery: 3, atlas: { w: 2048, h: 2048 } }];"""
    return sub(text, "perf:quality-tiers", old, new)



STEPS = [
    ("hoist key table", hoist_sample_table),
    ("reuse viewmodel args", reuse_viewmodel_args),
    ("guard ammo card", guard_ammo_card),
    ("guard small hud", guard_small_hud),
    ("guard hidden writes", guard_hidden_writes),
    ("gate debug lines", gate_debug_lines),
    ("guard applyLook", guard_apply_look),
    ("reuse shaderWatch array", reuse_shaderwatch_array),
    ("cache stickmen meshes", cache_stickmen_meshes),
    ("reuse pose array", reuse_pose_array),
    ("reuse camera return", reuse_camera_return),
    ("lighter quality tiers", lighter_quality_tiers),
    ("guard replaceState", guard_replace_state),
    ("boot params from global", boot_params_from_global),
    ("warm combat materials", warm_combat_materials),
    ("ink scale", ink_scale),
    ("cull empty instanced pools", cull_empty_pools),
    ("contain minimap", contain_minimap),
    ("perf probe", add_profiler),
    ("adaptive resolution", adaptive_resolution),
    ("mode label", mode_label),
    ("roster row guard", row_guard),
    ("respawn id guard", respawn_guard),
    ("hurt feedback only", hurt_feedback_only),
    ("ragdoll defaults", ragdoll_defaults),
    ("rebrand world text", rebrand_world_text),
]
