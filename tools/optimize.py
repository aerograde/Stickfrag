#!/usr/bin/env python3
"""Apply the standalone / low-latency / motion-blur client patch.

Input:  readable/main.named.js
Output: readable/main.fast.js

Every patch asserts its anchor exactly once, so a bundle update fails loudly
instead of silently producing a half-patched client.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "readable" / "main.named.js"
DST = ROOT / "readable" / "main.fast.js"

src = SRC.read_text(encoding="utf-8")


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected 1 occurrence, found {count}")
    print(f"patch: {label}")
    return text.replace(old, new, 1)


src = replace_once(src, "showFps: !1,", "showFps: !0,", "FPS visible by default")
src = replace_once(src, "showFps = !1;", "showFps = !0;", "FPS runtime default")
src = replace_once(
    src,
    "function k2() {\n  try {",
    'function k2() {\n  if (new URLSearchParams(location.search).has("lite")) return { ...Yu, quality: 0 };\n  try {',
    "?lite selects the LOW resource preset",
)
src = replace_once(
    src,
    't && (t.textContent = r), o.style.setProperty("--loading-pic", `url(/map-${e}.webp)`);',
    "t && (t.textContent = r);",
    "skip missing map loading images",
)
src = replace_once(src, "new Renderer(e, !1);", "new Renderer(e, !0);", "low-latency WebGL context")
src = replace_once(
    src,
    "{ pixelRatio: 1.5, shadowMap: 4096, shadowEvery: 1, atlas: { w: 4096, h: 2048 } }",
    "{ pixelRatio: 1.5, shadowMap: 4096, shadowEvery: 2, atlas: { w: 4096, h: 2048 } }",
    "HIGH shadows update every other frame",
)
src = replace_once(
    src,
    "async function c0e() {\n  try {",
    "async function c0e() {\n  return;\n  try {",
    "disable live-events fetch",
)
src = replace_once(
    src,
    "render(e, o, t, n, i = 1 / 0, A = 1 / 0, a = !1, l = !1) {",
    "render(e, o, t, n, i = 1 / 0, A = 1 / 0, a = !1, l = !1, u = null) {",
    "ComicPass accepts a render target",
)
src = replace_once(
    src,
    "e.setRenderTarget(null),\n      e.render(this.edgeScene, this.quadCamera),",
    "e.setRenderTarget(u),\n      e.render(this.edgeScene, this.quadCamera),",
    "ComicPass leaves the target set for the veil",
)
src = replace_once(src, "inkPass = new ComicPass();", "inkPass = new ComicPass();\n  motion = new TemporalBlend();", "add temporal blend to renderer")
src = replace_once(
    src,
    "this.renderer.setSize(o, t, !1),\n    this.camera.aspect = o / t,",
    "this.renderer.setSize(o, t, !1),\n    this.motion.setSize(e.width, e.height),\n    this.camera.aspect = o / t,",
    "resize temporal targets",
)
src = replace_once(
    src,
    'e.setRenderTarget(null),\n    e.setClearColor(this.fogColor, 1),\n    e.clear(),\n    jc("world", o.position.x, o.position.y, o.position.z),',
    'e.setRenderTarget(this.motion.active ? this.motion.begin() : null),\n'
    '    e.setClearColor(this.fogColor, 1),\n    e.clear(),\n    jc("world", o.position.x, o.position.y, o.position.z),',
    "render world into the blend target",
)
src = replace_once(
    src,
    "this.inkPass.render(e, this.scene, o, ee.inkWidth * this.inkScale, ee.fogNear, ee.fogFar),\n"
    "    this.smoke > 0 && this.veil.render(e, this.inkPass.depth, o, this.smoke, performance.now() / 1e3 % 1e3),\n"
    "    e.clearDepth(),",
    "this.inkPass.render(e, this.scene, o, ee.inkWidth * this.inkScale, ee.fogNear, ee.fogFar, !1, !1, this.motion.active ? this.motion.begin() : null),\n"
    "    this.smoke > 0 && this.veil.render(e, this.inkPass.depth, o, this.smoke, performance.now() / 1e3 % 1e3),\n"
    "    this.motion.active && this.motion.present(e, o),\n"
    "    e.clearDepth(),",
    "composite world with previous frame",
)
src = replace_once(
    src,
    "r.fps = Math.round(r.frames * 1e3 / (e - r.fpsAt)), r.frames = 0, r.fpsAt = e;",
    "r.fps = Math.round(r.frames * 1e3 / (e - r.fpsAt)), r.frames = 0, r.fpsAt = e,\n"
    "    r.renderer.motion.govern(r.fps, e);",
    "feed FPS to the blur governor",
)

motion = r'''
var MotionVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,
MotionFragment = `
  uniform sampler2D tCurrent;
  uniform sampler2D tPrevious;
  uniform float amount;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(tCurrent, vUv);
    vec4 p = texture2D(tPrevious, vUv);
    gl_FragColor = mix(c, p, amount);
    #include <colorspace_fragment>
  }
`,
TemporalBlend = class {
  scene = new Pt();
  camera = new Ki(-1, 1, 1, -1, 0, 1);
  index = 0;
  ready = !1;
  enabled =
    new URLSearchParams(location.search).get("blur") !== "0" &&
    !new URLSearchParams(location.search).has("lite");
  force = new URLSearchParams(location.search).get("blur") === "force";
  active = !1;
  width = 1;
  height = 1;
  targets = null;
  material;
  mesh;
  startAt = performance.now();
  maxFps = 0;
  stable = 0;
  dropAt = -1;
  drops = 0;
  lastX = NaN;
  lastY = 0;
  lastZ = 0;
  lastYaw = 0;
  lastPitch = 0;
  lastAt = 0;
  constructor() {
    this.material = new Qo({
      vertexShader: MotionVertex,
      fragmentShader: MotionFragment,
      uniforms: {
        tCurrent: { value: null },
        tPrevious: { value: null },
        amount: { value: 0 }
      },
      depthTest: !1,
      depthWrite: !1
    });
    this.mesh = new N(new Br(2, 2), this.material);
    this.mesh.frustumCulled = !1;
    this.scene.add(this.mesh);
    this.active = this.force && this.enabled;
  }
  ensure() {
    if (this.targets) return;
    let make = () => {
      let t = new rn(1, 1, { depthBuffer: !0, stencilBuffer: !1, minFilter: 1006, magFilter: 1006 });
      t.texture.colorSpace = "srgb";
      t.setSize(this.width, this.height);
      return t;
    };
    this.targets = [make(), make()];
    this.ready = !1;
  }
  release() {
    if (!this.targets) return;
    for (let t of this.targets) t.dispose();
    this.targets = null;
    this.ready = !1;
  }
  setSize(e, o) {
    this.width = Math.max(1, e);
    this.height = Math.max(1, o);
    if (this.targets) for (let t of this.targets) t.setSize(this.width, this.height);
    this.ready = !1;
  }
  begin() {
    this.ensure();
    return this.targets[this.index];
  }
  govern(e, o) {
    if (this.force || !this.enabled || !(e > 0)) return;
    this.maxFps = Math.max(e, this.maxFps * 0.995);
    let t = this.maxFps;
    if (this.active) {
      if (e < t * 0.98) {
        this.active = !1;
        this.dropAt = o;
        this.stable = 0;
        this.drops++;
        if (this.drops >= 2) this.enabled = !1;
        this.release();
      }
      return;
    }
    if (t < 55 || o - this.startAt < 2500) return;
    if (e >= t * 0.99) {
      this.stable++;
      if (this.stable >= 3 && (this.dropAt < 0 || o - this.dropAt > 15000)) {
        this.active = !0;
        this.stable = 0;
      }
    } else this.stable = 0;
  }
  present(e, o) {
    let t = this.targets[this.index],
      n = this.targets[1 - this.index],
      i = this.material.uniforms,
      A = 0;
    if (this.ready) {
      let a = performance.now(),
        l = Math.min(0.1, Math.max(1 / 240, (a - this.lastAt) / 1e3));
      if (Number.isFinite(this.lastX)) {
        let s = Math.hypot(o.position.x - this.lastX, o.position.y - this.lastY, o.position.z - this.lastZ) / l,
          d = Math.abs(o.rotation.y - this.lastYaw) + Math.abs(o.rotation.x - this.lastPitch);
        A = Math.min(0.28, 0.03 + s * 0.004 + d * 0.12);
      }
      this.lastX = o.position.x;
      this.lastY = o.position.y;
      this.lastZ = o.position.z;
      this.lastYaw = o.rotation.y;
      this.lastPitch = o.rotation.x;
      this.lastAt = a;
    }
    i.tCurrent.value = t.texture;
    i.tPrevious.value = n.texture;
    i.amount.value = A;
    e.setRenderTarget(null);
    e.render(this.scene, this.camera);
    this.index = 1 - this.index;
    this.ready = !0;
  }
};
'''

src = replace_once(src, "function KU(r) {", motion + "\nfunction KU(r) {", "insert TemporalBlend class")

src = replace_once(
    src,
    """    let t = this.clock.ready ? this.clock.serverTick(e, Zn) : 0;
    this.interp.update(o),
    this.clock.ready && (this.viewTick = this.snapshots.sample(t - this.interp.ticks, this.selfId, this.remotes)),
    this.ghosts.split(this.remotes),
    wG(this.systems, o, e),""",
    """    let t = this.net && this.clock.ready ? this.clock.serverTick(e, Zn) : 0;
    this.net && (this.interp.update(o), this.clock.ready && (this.viewTick = this.snapshots.sample(t - this.interp.ticks, this.selfId, this.remotes)), this.ghosts.split(this.remotes)),
    wG(this.systems, o, e),""",
    "offline frame skips interpolation, snapshots and ghosts",
)

src = replace_once(
    src,
    'this.paper.render(e), jc("off");',
    'Co.has("lite") || this.paper.render(e), jc("off");',
    "?lite skips the static paper pass",
)
src = replace_once(
    src,
    "this.paper.render(o, !0);",
    'Co.has("lite") || this.paper.render(o, !0);',
    "?lite skips paper shader warm-up",
)
src = replace_once(
    src,
    """    let e = [
    [this.scene, this.camera],
    [this.viewmodel.scene, this.viewmodel.camera],
    [this.menu.scene, this.menu.camera],
    [this.podium.scene, this.podium.camera]];""",
    """    let e = [
    [this.scene, this.camera],
    [this.viewmodel.scene, this.viewmodel.camera]];
    Co.has("lite") || (this.menu?.stickmen && e.push([this.menu.scene, this.menu.camera]), this.podium && e.push([this.podium.scene, this.podium.camera]));""",
    "?lite skips menu/podium shader warm-up",
)
src = replace_once(
    src,
    "for (let t of this.podium.textures()) o.initTexture(t);",
    'Co.has("lite") || !this.podium || (() => { for (let t of this.podium.textures()) o.initTexture(t); })();',
    "?lite skips podium texture upload",
)

src = re.sub(
    r"  dp = class \{.*?\n  \};",
    """  dp = class {
    scene = new Pt();
    camera = new Ki(-1, 1, 1, -1, 0, 1);
    material = new Qo({
      vertexShader: k7e,
      fragmentShader: z7e,
      uniforms: { amount: { value: 0 }, size: { value: 1.5 }, resolution: { value: new te(1, 1) } },
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      blending: A4,
      blendSrc: l4,
      blendDst: a4
    });
    cacheMaterial = new Qo({
      vertexShader: k7e,
      fragmentShader: "uniform sampler2D map; varying vec2 vUv; void main() { gl_FragColor = texture2D(map, vUv); }",
      uniforms: { map: { value: null } },
      transparent: !0,
      depthTest: !1,
      depthWrite: !1,
      blending: A4,
      blendSrc: l4,
      blendDst: a4
    });
    quad;
    cacheMesh;
    cache = null;
    cacheW = 0;
    cacheH = 0;
    cacheAmount = -1;
    cacheGrainSize = -1;
    dirty = !0;
    constructor() {
      this.quad = new N(new Br(2, 2), this.material);
      this.quad.frustumCulled = !1;
      this.scene.add(this.quad);
      this.cacheMesh = new N(new Br(2, 2), this.cacheMaterial);
      this.cacheMesh.frustumCulled = !1;
      this.cacheMesh.visible = !1;
      this.scene.add(this.cacheMesh);
    }
    setSize(e, o) {
      this.material.uniforms.resolution.value.set(e, o);
      this.dirty = !0;
    }
    bake(e) {
      let o = e.getDrawingBufferSize(new te()),
        t = Math.max(1, Math.floor(o.x)),
        n = Math.max(1, Math.floor(o.y));
      if (!this.cache || this.cacheW !== t || this.cacheH !== n) {
        this.cache && this.cache.dispose();
        this.cache = new rn(t, n, { depthBuffer: !1, stencilBuffer: !1, minFilter: 1006, magFilter: 1006 });
        this.cacheW = t;
        this.cacheH = n;
      }
      let i = this.material,
        A = i.blending,
        a = i.transparent;
      i.blending = 0;
      i.transparent = !1;
      e.setRenderTarget(this.cache);
      e.clear();
      e.render(this.scene, this.camera);
      i.blending = A;
      i.transparent = a;
      this.cacheMaterial.uniforms.map.value = this.cache.texture;
      this.cacheAmount = ee.grain;
      this.cacheGrainSize = ee.grainSize;
      this.dirty = !1;
    }
    render(e, o = !1) {
      if (ee.grain <= 0 && !o) return;
      if (!this.cache || this.dirty || this.cacheAmount !== ee.grain || this.cacheGrainSize !== ee.grainSize) {
        this.material.uniforms.amount.value = ee.grain;
        this.material.uniforms.size.value = ee.grainSize;
        this.bake(e);
      }
      this.quad.visible = !1;
      this.cacheMesh.visible = !0;
      e.setRenderTarget(null);
      e.render(this.scene, this.camera);
      this.cacheMesh.visible = !1;
      this.quad.visible = !0;
    }
  };""",
    src,
    count=1,
    flags=re.S,
)
assert "cacheMaterial = new Qo" in src, "paper cache patch did not match"

src = replace_once(
    src,
    "  get drawCalls() {\n    return this.renderer.info.render.calls;\n  }",
    "  get drawCalls() {\n    return this.renderer.info.render.calls;\n  }\n  ensurePodium() {\n    return this.podium ?? (this.podium = new Np());\n  }",
    "lazy podium factory",
)
src = replace_once(src, "podium = new Np();", "podium = null;", "podium is lazy")
src = replace_once(src, "r.renderer.podium.update(e)", "r.renderer.podium?.update(e)", "podium update optional")
src = replace_once(src, "r.renderer.podium.inIntro(e)", "r.renderer.podium?.inIntro(e)", "podium intro optional")
src = replace_once(src, "r.renderer.podium.start(nG(r, e), n);", "r.renderer.ensurePodium().start(nG(r, e), n);", "results create podium")
src = replace_once(src, "r.renderer.podium.start(null, performance.now())", "r.renderer.ensurePodium().start(null, performance.now())", "results clear podium")
src = replace_once(src, "let i = e.podium.stickmen;", "let i = e.podium?.stickmen;", "results podium optional")
src = replace_once(src, "this.podium.scene]", "...(this.podium ? [this.podium.scene] : [])]", "shader watch podium optional")
src = replace_once(src, "this.podium.setAspect(o / t)", "this.podium?.setAspect(o / t)", "resize podium optional")
src = src.replace("this.podium.visible", "this.podium?.visible")
assert "this.podium?.visible" in src
src = replace_once(
    src,
    """  let i = e.podium?.stickmen;
  i.colorOf = (A) => j4(r, A),
  i.skinOf = (A) => MA(r, A),
  zE(r, i),
  i.teamOf = (A) => q4(r, A),""",
    """  let i = e.podium?.stickmen;
  i && (i.colorOf = (A) => j4(r, A), i.skinOf = (A) => MA(r, A), zE(r, i), i.teamOf = (A) => q4(r, A)),""",
    "skip podium stickman hooks when podium is lazy",
)

src = replace_once(
    src,
    "  ensurePodium() {\n    return this.podium ?? (this.podium = new Np());\n  }",
    "  ensurePodium() {\n    return this.podium ?? (this.podium = new Np());\n  }",
    "lazy podium factory",
)
src = replace_once(src, "r.renderer.menu.update(e),", "r.renderer.menu?.update(e),", "menu update optional")
src = replace_once(
    src,
    """    this.shaderWatch.check(this.renderer, performance.now() - e, [
    this.scene,
    this.viewmodel.scene,
    this.menu.scene,""",
    """    this.shaderWatch.check(this.renderer, performance.now() - e, [
    this.scene,
    this.viewmodel.scene,
    ...(this.menu?.stickmen ? [this.menu.scene] : []),""",
    "shader watch menu optional",
)
src = replace_once(src, "this.menu.setAspect(o / t)", "this.menu?.setAspect(o / t)", "resize menu optional")
src = src.replace("this.menu.visible", "this.menu?.visible")
assert "this.menu?.visible" in src



src = replace_once(
    src,
    "r.renderer.menu?.update(e),",
    "(!r.ready || r.input.menuOpen || r.renderer.menu?.visible) && r.renderer.menu.update(e),",
    "skip hidden menu update",
)

DST.write_text(src, encoding="utf-8")
print(f"wrote {DST}: {src.count(chr(10)) + 1} lines")
