#!/usr/bin/env python3
"""Build the home page's script bundle from the vendored modules.

The landing page ships as seven scripts plus twelve chunks that import each other
by absolute path. Rather than rewrite those paths at serve time, they are bundled
once here into a single IIFE that the combined page can inline.

The bundle is produced from the same files the site itself uses, so the home
screen keeps its real behaviour (haven, locker, room code) instead of being
reimplemented.
"""

from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "stickfrag.com"
WORK = ROOT / "build" / "home-bundle"
OUT = ROOT / "build" / "home.js"

ENTRY_MODULES = ["playmenu.js", "lobby.js", "signup.js"]
STANDALONE = ["retry.js", "haven-boot.js"]


def stage() -> None:
    """Copy the modules and their chunks into a scratch tree."""
    if WORK.exists():
        shutil.rmtree(WORK)
    WORK.mkdir(parents=True)
    for name in ENTRY_MODULES + STANDALONE:
        src = SITE / name
        if not src.exists():
            raise SystemExit(f"missing home module: {name}")
        shutil.copy2(src, WORK / name)
    chunks_src = SITE / "chunks"
    if chunks_src.is_dir():
        shutil.copytree(chunks_src, WORK / "chunks")

    # The chunks import each other by site-absolute path. Rewrite them to
    # relative so the bundler can resolve them from the scratch tree.
    for path in list(WORK.glob("chunks/*.js")) + [WORK / n for n in ENTRY_MODULES]:
        text = path.read_text(encoding="utf-8")
        inside_chunks = path.parent.name == "chunks"
        prefix = "./" if inside_chunks else "./chunks/"
        new = re.sub(r'from"/chunks/', f'from"{prefix}', text)
        new = re.sub(r'import"/chunks/', f'import"{prefix}', new)
        if new != text:
            path.write_text(new, encoding="utf-8")


def bundle() -> int:
    """Bundle the entry modules into one file and return its size."""
    entry = WORK / "__entry.js"
    entry.write_text(
        "".join(f'import "./{name}";\n' for name in ENTRY_MODULES),
        encoding="utf-8",
    )
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "npx", "--yes", "esbuild@0.25", str(entry),
            "--bundle", "--minify", "--format=iife", "--target=esnext",
            f"--outfile={OUT}",
        ],
        check=True,
        cwd=str(WORK),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    return route_launch()


# The menu ends by assigning the URL it built to location.href. In the combined
# file that would navigate -- re-downloading and re-parsing the whole 9 MB
# document -- when the URL already carries everything the game needs (mode, map,
# room). Both launch sites become a call into the shell instead. Exact matches,
# so an upstream change fails the build rather than silently restoring the
# navigation.
LAUNCH_SITES = [
    (
        "location.href=re.nameUnsaved?`${n}&${new URLSearchParams({name:re.name})}`:n",
        "globalThis.__sfGo(re.nameUnsaved?`${n}&${new URLSearchParams({name:re.name})}`:n)",
    ),
    (
        'location.href=gM(vz,{kind:"friends",code:Kg(),bots:!1},gz,mM()??"ffa",null,i)',
        'globalThis.__sfGo(gM(vz,{kind:"friends",code:Kg(),bots:!1},gz,mM()??"ffa",null,i))',
    ),
]

# The step switcher assumes every step element exists. This build drops the
# server browser, so #step-servers is gone and the loop threw on the first
# transition -- PLAY looked dead because the error happened after it.
STEP_LOOP = [
    (
        'for(let a of["gear","start","servers","game","how","map","invite"]){'
        "let i=ge(`step-${a}`);i.classList.toggle(\"off\",a!==e),i.inert=a!==e}",
        'for(let a of["gear","start","servers","game","how","map","invite"]){'
        "let i=ge(`step-${a}`);if(!i)continue;i.classList.toggle(\"off\",a!==e),i.inert=a!==e}",
    ),
]

# The invite link is built against /play/, which is the game's own page on the
# live site. Here the whole thing is one file, so the link a friend pastes has to
# point back at it and ask for the peer path.
# Resolving "/play/" against location.href throws when this file runs inside the
# SVG wrapper, where the document URL is about:srcdoc. Only used as an href for
# the hidden phone-mode PLAY anchor, so a fixed base keeps it harmless.
FIXED_BASE = [
    ("new URL(r1,location.href).href", 'new URL(r1,"http://sf.invalid/").href'),
]

INVITE_SITE = [
    (
        "Pl.value=PM(MD(new URL(r1,location.href).href,re.mode.code,re.map,re.mode.bots,re.game,re.routed?.privateRegion??jm()))",
        "Pl.value=globalThis.__sfInvite(re.mode.code,re.map,re.game)",
    ),
]


def route_launch() -> int:
    js = OUT.read_text(encoding="utf-8")
    for old, new in LAUNCH_SITES + STEP_LOOP + INVITE_SITE + FIXED_BASE:
        found = js.count(old)
        if found != 1:
            raise SystemExit(f"home bundle site not found exactly once ({found}): {old[:70]}")
        js = js.replace(old, new, 1)
    OUT.write_text(js, encoding="utf-8")
    return OUT.stat().st_size


def main() -> None:
    stage()
    size = bundle()
    print(f"wrote {OUT.relative_to(ROOT)}  {size:,} bytes")


if __name__ == "__main__":
    main()
