"""Make the single-file build truly self-contained when opened from disk.

Everything else is already inlined; the five weapon icons in the loadout HUD are
not. They are fetched from the site root as `/loadout-<id>.webp`, which resolves
to the filesystem root under `file://` and 404s.

Rather than asking anyone to keep five small files beside the page, they are
embedded as data URIs. Base64 costs about a third on top of ~15 KB of WebP, which
is nothing against a 5.8 MB bundle, and it means `stickfrag.html` genuinely runs
from anywhere on its own.
"""

from __future__ import annotations

import base64
from pathlib import Path

from patchlib import sub

ROOT = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT / "stickfrag.com"


def icon_table() -> dict[str, str]:
    """Map each loadout icon id to a data URI of the real image."""
    table: dict[str, str] = {}
    for path in sorted(ICON_DIR.glob("loadout-*.webp")):
        key = path.stem.removeprefix("loadout-")
        data = base64.b64encode(path.read_bytes()).decode("ascii")
        table[key] = f"data:image/webp;base64,{data}"
    if not table:
        raise AssertionError("no loadout icons found to inline")
    return table


def inline_icons(text: str) -> str:
    """Replace both icon URL templates with a data-URI lookup."""
    table = icon_table()
    entries = ",\n".join(f"  {k!r}: {v!r}" for k, v in sorted(table.items()))
    table_src = f"globalThis.__sfIcons = {{\n{entries}\n}};\n"

    # The palette lookup: `/loadout-<id>.webp` -> the inlined image.
    text = sub(
        text,
        "single:icon-path",
        "  let o = `/loadout-${e}.webp`;",
        "  let o = (globalThis.__sfIcons || {})[e] || \"\";",
    )
    # The <img> that renders it.
    text = sub(
        text,
        "single:icon-img",
        '  return de`<img src="/loadout-${o}.webp" alt="" draggable="false">`;',
        '  return de`<img src="${(globalThis.__sfIcons || {})[o] || ""}" alt="" draggable="false">`;',
    )
    return sub(text, "single:icon-table", "async function She() {", table_src + "async function She() {")


def home_in_place(text: str) -> str:
    """HOME returns to the menu instead of navigating the document away.

    All three of the client's "back to the menu" paths do
    `location.replace('/#gear')` (or `/${location.search}#gear`). That is right on
    the live site, where the menu is a different document. In the single file it
    would re-download and re-parse the whole 9.5 MB document, and inside the SVG
    wrapper it would leave the game entirely. The shell owns the swap, so it is
    given the call.
    """
    text = sub(
        text,
        "portable:home-go",
        '    removeEventListener("beforeunload", ul), location.replace("/#gear");',
        "    removeEventListener(\"beforeunload\", ul), "
        "(globalThis.__sfHome ? globalThis.__sfHome() : location.replace(\"/#gear\"));",
    )
    text = sub(
        text,
        "portable:home-bootfail",
        '        () => location.replace("/#gear"),',
        '        () => (globalThis.__sfHome ? globalThis.__sfHome() : location.replace("/#gear")),',
    )
    return sub(
        text,
        "portable:home-redirect",
        "location.replace(`/${location.search}#gear`)",
        '(globalThis.__sfHome ? globalThis.__sfHome() : location.replace(`/${location.search}#gear`))',
    )


# A software rasteriser is the clearest possible "this machine cannot do HIGH"
# signal, and it is read from the same GPU string the client already samples.
def weak_device_starts_low(text: str) -> str:
    """Start a plainly weak desktop on the LOW preset the client already ships.

    `qK` picks quality from the device on touch only; a desktop is always left at
    whatever the stored setting says, which is HIGH. A machine with 4 GB of RAM, a
    software rasteriser or four cores cannot hold HIGH at any resolution, and the
    client's own #fps-card already asks the player to press LOWER. This starts
    there instead. It is the same LOW preset from the Graphics setting: 0.75x
    pixels and the 1024 shadow map, not a new mode, and nothing about the art or
    the shaders changes.
    """
    old = "  r === \"touch\" ? Ku({ quality: Yde(Kde(e)) }) : _de(e) && Ku({ quality: 1 });"
    new = """  if (r === "touch") { Ku({ quality: Yde(Kde(e)) }); return; }
  // A machine that cannot hold HIGH should not spend its first minute discovering
  // that: a software rasteriser, very little RAM, very few cores, or a small
  // screen all mean the same thing here.
  const __sfWeak =
    __sfLooksSoftware(e) ||
    (navigator.deviceMemory > 0 && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) ||
    screen.width * screen.height * (devicePixelRatio ** 2) < 1_200_000;
  if (__sfWeak) { Ku({ quality: 0 }); return; }
  _de(e) && Ku({ quality: 1 });"""
    text = sub(text, "portable:weak-quality", old, new)
    return sub(
        text,
        "portable:weak-quality-test",
        "function qK(r, e) {",
        "function __sfLooksSoftware(g) {\n"
        "  return /SwiftShader|llvmpipe|Basic Render|Software|Mesa OffScreen/i.test(g || \"\");\n"
        "}\n"
        "function qK(r, e) {",
    )


def cap_drawing_buffer(text: str) -> str:
    """Give desktop the same long-side cap touch already has.

    `topPixelRatio()` caps the drawing buffer's long side for touch but returns
    `Math.min(devicePixelRatio, preset.pixelRatio)` for desktop. A 360x640 window
    on a 3x display then allocates a 1080x1920 buffer for a 360 px view: nine times
    the fragments, for pixels nobody can see. The cap applies to the *backing*
    buffer only, so nothing moves, resizes or changes FOV on screen.
    """
    old = "  XK = { desktop: null, touch: [1280, 1920, 1920] },"
    new = "  XK = { desktop: [1280, 1600, 1920], touch: [1280, 1920, 1920] },"
    return sub(text, "portable:long-sides", old, new)


STEPS = [
    ("single: inline icons", inline_icons),
    ("single: home in place", home_in_place),
    ("single: weak device starts low", weak_device_starts_low),
    ("single: cap the drawing buffer", cap_drawing_buffer),
]
