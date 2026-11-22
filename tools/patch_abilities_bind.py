"""Bind the tree-shaken three.js constructors for the abilities renderer.

The bundle has no `THREE` namespace: three.js is tree-shaken into named locals.
Each identifier below was resolved from the current source and is asserted at
build time, so an upstream rename fails the build instead of drawing nothing.

  Group -> se, Mesh -> N, MeshBasicMaterial -> Fe, Color -> ce,
  BoxGeometry -> Xe, CylinderGeometry -> Be, IcosahedronGeometry -> Go,
  OctahedronGeometry -> ua, TorusGeometry -> tn, ConeGeometry -> Kt
"""

from pathlib import Path

from patchlib import sub

ROOT = Path(__file__).resolve().parent.parent
ABILITY_HOST_SRC = (ROOT / "tools" / "net" / "sf-abilities.js").read_text(encoding="utf-8")
ABILITY_CLIENT_SRC = (ROOT / "tools" / "net" / "sf-abilities-client.js").read_text(encoding="utf-8")

# Type marker in the source -> the local the class is assigned to.
THREE_LOCALS = {
    "Group": ("se", 'this.isGroup = !0'),
    "Mesh": ("N", 'this.type = "Mesh"'),
    "MeshBasicMaterial": ("Fe", 'this.isMeshBasicMaterial = !0'),
    "Color": ("ce", 'this.isColor = !0'),
    "BoxGeometry": ("Xe", 'this.type = "BoxGeometry"'),
    "CylinderGeometry": ("Be", 'this.type = "CylinderGeometry"'),
    "IcosahedronGeometry": ("Go", 'this.type = "IcosahedronGeometry"'),
    "OctahedronGeometry": ("ua", 'this.type = "OctahedronGeometry"'),
    "TorusGeometry": ("tn", 'this.type = "TorusGeometry"'),
    "ConeGeometry": ("Kt", 'this.type = "ConeGeometry"'),
    "RingGeometry": ("E1", 'this.type = "RingGeometry"'),
    "Sprite": ("wi", 'this.isSprite = !0'),
    "SpriteMaterial": ("ri", 'this.isSpriteMaterial = !0'),
    "CanvasTexture": ("$r", 'this.isCanvasTexture = !0'),
}


def verify_locals(text: str) -> None:
    """Fail loudly if any bound local no longer owns the constructor we expect."""
    for name, (local, marker) in THREE_LOCALS.items():
        if marker not in text:
            raise AssertionError(f"{name}: marker {marker!r} missing from source")
        # The local must be assigned as a class somewhere in the bundle.
        if f"{local} = class" not in text:
            raise AssertionError(f"{name}: local {local!r} is not a class assignment")


# Prepended to the module, ahead of every consumer. The three.js locals and zw()
# are `var`/function declarations, so they are hoisted and already reachable here;
# the ability client also resolves them lazily, which makes order irrelevant.
FIRST_STATEMENT = "var jX = Object.create;"


def bind_three(text: str) -> str:
    verify_locals(text)
    body = "".join(
        f"  {name}: {local},\n" for name, (local, _) in THREE_LOCALS.items()
    )
    # The three.js classes are `var` declarations thousands of lines below this
    # injection point, so reading them eagerly yields undefined. A getter defers
    # the read to first use, which is after the module has finished evaluating.
    entries = "".join(
        f"    {name}: {local},\n" for name, (local, _) in THREE_LOCALS.items()
    )
    shim = (
        "let __sfThreeCache = null;\n"
        "Object.defineProperty(globalThis, '__SFThree', {\n"
        "  configurable: true,\n"
        "  get() {\n"
        "    if (__sfThreeCache) return __sfThreeCache;\n"
        # Guard against an early read: report not-ready rather than caching undefineds.
        f"    if (typeof {THREE_LOCALS['Group'][0]} === 'undefined') return null;\n"
        "    return (__sfThreeCache = {\n" + entries + "    });\n"
        "  },\n"
        "});\n"
        "globalThis.__sfAimPick = (...a) => zw(...a);\n"
        # Ammo caps live beside the weapon table, so read them the same lazy way.
        "Object.defineProperty(globalThis, '__sfLimits', {\n"
        "  configurable: true,\n"
        "  get() { return (typeof v8 === 'undefined') ? null : { nades: v8, bandages: JM }; },\n"
        "});\n"
        # The weapon table is a `var` declared far below this injection point, so
        # read it lazily rather than capturing undefined here.
        "Object.defineProperty(globalThis, '__sfWeapons', {\n"
        "  configurable: true,\n"
        "  get() { return typeof Re === 'undefined' ? null : Re; },\n"
        "});\n"
        # Expose the pickup resolver so its decisions are inspectable.
        "globalThis.__sfResolvePickup = (...a) => Y0e(...a);\n"
    )
    # The host authority and the client renderer are plain IIFEs that talk to
    # globalThis, so they are injected verbatim ahead of the boot function.
    return sub(
        text,
        "ability:bind",
        # Anchor on the net runtime's own first line: it is a module-scope IIFE
        # that already survives minification in a position before every renderer,
        # which is exactly where the ability code has to live.
        FIRST_STATEMENT,
        shim + ABILITY_HOST_SRC + ABILITY_CLIENT_SRC + FIRST_STATEMENT,
    )


STEPS = [
    ("ability bind", bind_three),
]
