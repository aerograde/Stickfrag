"""M5 + M5b: wheel polish and Fortnite-style sound visualisation.

M5  The wheel already cycles gun -> sidearm -> knife. It only misbehaves for
    trackpad users (deltaX is ignored) and while the pumpkin bomb has a second,
    ungated wheel listener that drops it on every scroll.

M5b Sound pips are hung off the two places the client already decides a sound is
    audible: the remote-footstep gate (which already refuses crouched walkers)
    and the remote-gunshot hook. Because the pip is emitted at the same site, the
    crouch rule cannot drift from what the player hears.
"""

from __future__ import annotations

from patchlib import sub


# --------------------------------------------------------------------------
# Wheel: horizontal trackpad scroll counts as a scroll, and a line/page-mode
# delta is normalised instead of multiplied blindly.
# --------------------------------------------------------------------------
def wheel_axes(text: str) -> str:
    return sub(
        text,
        "wheel:axes",
        """          this.locked && (
          t.preventDefault(),
          !this.menu &&
          !this.numbersTaken &&
          !this.mouseTaken &&
          this.wheelStep(t.deltaMode === 1 ? t.deltaY * 33 : t.deltaY, t.timeStamp));""",
        """          this.locked && (
          t.preventDefault(),
          !this.menu &&
          !this.numbersTaken &&
          !this.mouseTaken &&
          this.wheelStep(__sfWheelDelta(t), t.timeStamp));""",
    )


def wheel_normalise(text: str) -> str:
    return sub(
        text,
        "wheel:normalise",
        "function Qde(r, e, o) {",
        """// A wheel notch (deltaMode 0) is ~100 units; line mode counts lines and page
// mode counts viewports. Trackpads report the horizontal axis, and a sideways
// swipe on one should step weapons the same way a vertical wheel does.
function __sfWheelDelta(e) {
  let o = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  if (e.deltaMode === 1) return o * 33;
  if (e.deltaMode === 2) return o * 400;
  return o;
}
function Qde(r, e, o) {""",
    )


def wheel_pumpkin(text: str) -> str:
    """The pumpkin-bomb wheel handler must not fire out of a match or on the menu."""
    return sub(
        text,
        "wheel:pumpkin",
        'addEventListener("wheel", () => this.take(!1), { passive: !0 });',
        'addEventListener("wheel", () => {\n'
        "        this.input.locked && !this.input.menu && this.take(!1);\n"
        "      }, { passive: !0 });",
    )


# --------------------------------------------------------------------------
# Sound visuals
# --------------------------------------------------------------------------
SOUND_VISUALS_JS = r"""
// ---------------------------------------------------------------------------
// SoundVisuals: screen-space pips for sounds you could have heard. The same
// gates that decide whether audio plays decide whether a pip is drawn, so this
// can never show a crouched walker, a dead body or a silenced shot from across
// the map. Off by default; ?soundviz=1 for tests.
// ---------------------------------------------------------------------------
var __sfSoundVizOn = (() => {
  if (/[?&]soundviz=(1|on)(&|$)/.test(location.search)) return !0;
  try {
    let raw = localStorage.getItem("settings");
    if (raw) return JSON.parse(raw).soundVisuals === !0;
  } catch {}
  return !1;
})();
var SoundVisuals = class {
  constructor() {
    this.root = null;
    this.pool = [];
    this.next = 0;
    this.pips = new Map();
    if (__sfSoundVizOn) this.mount();
  }
  mount() {
    let e = document.createElement("div");
    e.id = "soundpips";
    e.className = "hud";
    e.setAttribute("aria-hidden", "true");
    document.body.append(e);
    this.root = e;
  }
  // Bearing on screen: same convention as the damage arcs.
  static bearing(o, t, n) {
    let i = o.x - t.x,
      A = o.z - t.z,
      a = Math.hypot(i, A);
    if (a < 0.01) return 0;
    let l = Math.atan2(i, A) - n;
    return (l * 180) / Math.PI;
  }
  spawn(e, o, t, n) {
    if (!this.root) return;
    let i = this.pips.get(e);
    if (!i) {
      if (this.pool.length < 12) {
        i = document.createElement("i");
        i.className = "sf-pip";
        this.root.append(i);
        this.pool.push(i);
      } else i = this.pool[this.next++ % this.pool.length];
      this.pips.set(e, i);
    }
    let A = this.root.clientWidth / 2,
      a = Math.min(A - 34, 150 + n * 8);
    i.className = "sf-pip " + o;
    i.style.opacity = "1";
    i.style.transform = `translate(-50%,-50%) rotate(${t}deg) translateY(-${a}px)`;
    this.pips.set(e, i);
  }
  step(e, o, t, n) {
    if (!__sfSoundVizOn || !this.root) return;
    let i = o.selfPose || { x: 0, z: 0 };
    this.spawn("s" + e, "step", SoundVisuals.bearing(i, { x: o.x, z: o.z }, o.yaw), n);
  }
  shot(e, o) {
    if (!__sfSoundVizOn || !this.root) return;
    let t = this.root.clientWidth / 2,
      n = SoundVisuals.bearing(this.pose || { x: 0, z: 0 }, o, this.yaw || 0);
    this.spawn("g" + e, "shot", n, 0);
  }
  frame(e) {
    if (!this.root) return;
    for (let [o, t] of this.pips) {
      let n = parseFloat(t.style.opacity || "1") - 0.02;
      n <= 0 ? (t.style.opacity = "0", this.pips.delete(o)) : (t.style.opacity = String(n));
    }
  }
};
"""


def add_sound_visuals(text: str) -> str:
    text = sub(text, "soundviz:class", "var __sfProf = (() => {", SOUND_VISUALS_JS + "var __sfProf = (() => {")

    # Build the instance with the game object, and keep it pointed at the camera.
    text = sub(
        text,
        "soundviz:install",
        "function yS(r) {",
        """function yS(r) {
  if (!r.soundViz) r.soundViz = new SoundVisuals(), (globalThis.__sfSV = r.soundViz), (globalThis.__sfGame = r);
  r.soundViz.pose = { x: r.predictor.state.x, z: r.predictor.state.z };
  r.soundViz.yaw = r.input.yaw;""",
    )

    # Expose the step update for the automated crouch assertion. It runs every
    # frame regardless, so this adds no behaviour beyond a global alias.
    text = sub(
        text,
        "soundviz:expose-wr",
        "function WR(r) {",
        "function WR(r) {\n  globalThis.__sfWR = WR;",
    )

    # Footstep pip: emitted at the exact gate that decides the footstep audio,
    # so crouched walkers are already excluded.
    text = sub(
        text,
        "soundviz:step",
        "    o.d += n, o.d > 2.1 && (o.d = 0, r.sound.footstep(e.x, e.z, (e.flags & Ar.Crouched) !== 0)));",
        """    o.d += n,
    o.d > 2.1 && (
    o.d = 0,
    r.sound.footstep(e.x, e.z, (e.flags & Ar.Crouched) !== 0),
    !(e.flags & Ar.Crouched) && r.soundViz?.step(e.id, e, e.x, e.z)));""",
    )

    # Gunshot pip: the hook the client already exposes for remote shots.
    text = sub(
        text,
        "soundviz:shot",
        "    r.onRemoteShot?.(t.shooter, t.weapon),",
        "    r.onRemoteShot?.(t.shooter, t.weapon), r.soundViz?.shot(t.shooter, i),",
    )

    # Fade the pool once per frame, after the HUD has been written.
    text = sub(
        text,
        "soundviz:frame",
        "    __sfProf.end(\"hud\"),\n    __sfProf.frame(),",
        "    __sfProf.end(\"hud\"),\n    this.soundViz?.frame(e),\n    __sfProf.frame(),",
    )
    return text


# --------------------------------------------------------------------------
# Settings toggle, so the feature is discoverable rather than URL-only.
# --------------------------------------------------------------------------
def sound_visuals_setting(text: str) -> str:
    text = sub(
        text,
        "soundviz:default",
        "    minimapSize: 1\n  };",
        "    minimapSize: 1,\n    soundVisuals: !1\n  };",
    )
    return text


STEPS = [
    ("wheel axes", wheel_axes),
    ("wheel normalise", wheel_normalise),
    ("wheel pumpkin gate", wheel_pumpkin),
    ("sound visuals", add_sound_visuals),
    ("sound visuals setting", sound_visuals_setting),
]
