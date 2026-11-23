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

# landing.js is bundled on its own, and only after the main bundle. It drives the
# restored page's halves -- the ad calculator, the halo stickman and the scene
# loaders -- and shares no wiring with the menu. Keeping it out of the main entry
# also keeps the main bundle's minified names stable, which is what the counted
# substitutions below match on. (Adding it to ENTRY_MODULES renames every symbol
# in the file and breaks all of them; that is how this was found.)
LANDING_ENTRY = ["landing.js"]
LANDING_OUT = ROOT / "build" / "landing.js"

# The halo stickman on the thank-you card. landing.js loads it by importing the
# URL in `body.dataset.halo`, which cannot work inlined; the module self-starts
# from `#halo-man` instead, so bundling it as its own IIFE is all it needs. Its
# sibling eventscene.js is not bundled: the Friends Weekend section ships hidden
# on this build (as it does live) and two of its three chunks are not mirrored.
SUPPORT_ENTRY = ["supportscene.js"]
SUPPORT_OUT = ROOT / "build" / "supportscene.js"


def stage() -> None:
    """Copy the modules and their chunks into a scratch tree."""
    if WORK.exists():
        shutil.rmtree(WORK)
    WORK.mkdir(parents=True)
    for name in ENTRY_MODULES + STANDALONE + LANDING_ENTRY + SUPPORT_ENTRY:
        src = SITE / name
        if not src.exists():
            raise SystemExit(f"missing home module: {name}")
        shutil.copy2(src, WORK / name)
    chunks_src = SITE / "chunks"
    if chunks_src.is_dir():
        shutil.copytree(chunks_src, WORK / "chunks")

    # The chunks import each other by site-absolute path. Rewrite them to
    # relative so the bundler can resolve them from the scratch tree.
    entries = [WORK / n for n in ENTRY_MODULES + LANDING_ENTRY + SUPPORT_ENTRY]
    for path in list(WORK.glob("chunks/*.js")) + entries:
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
    bundle_landing()
    bundle_support()
    return route_launch()

def bundle_landing() -> int:
    """Bundle landing.js alone, for the restored page's own sections.

    It is a separate file on purpose: the page loads it after the menu bundle, in
    the same place the live page loads it, and its presence must not affect the
    minified names inside home.js (every counted substitution there matches on
    them).
    """
    entry = WORK / "__landing.js"
    entry.write_text('import "./landing.js";\n', encoding="utf-8")
    subprocess.run(
        [
            "npx", "--yes", "esbuild@0.25", str(entry),
            "--bundle", "--minify", "--format=iife", "--target=esnext",
            f"--outfile={LANDING_OUT}",
        ],
        check=True,
        cwd=str(WORK),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    # The scene URLs in body.dataset cannot be imported from a single file. The
    # halo stickman is bundled here instead and self-starts from #halo-man; the
    # event scene's section ships hidden, so dropping that loader is correct.
    # The binding name is minified, so only the body of the arrow is matched.
    js = LANDING_OUT.read_text(encoding="utf-8")
    old = "let t=document.body.dataset[e];t&&import(t).catch(()=>{})"
    new = "let t=void 0"
    if js.count(old) != 1:
        raise SystemExit(f"landing scene loader not found exactly once: {js.count(old)}")
    LANDING_OUT.write_text(js.replace(old, new, 1), encoding="utf-8")
    return LANDING_OUT.stat().st_size


def bundle_support() -> int:
    """Bundle the halo stickman, which landing.js loaded by URL."""
    entry = WORK / "__support.js"
    entry.write_text('import "./supportscene.js";\n', encoding="utf-8")
    subprocess.run(
        [
            "npx", "--yes", "esbuild@0.25", str(entry),
            "--bundle", "--minify", "--format=iife", "--target=esnext",
            f"--outfile={SUPPORT_OUT}",
        ],
        check=True,
        cwd=str(WORK),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    )
    return SUPPORT_OUT.stat().st_size


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

# The server list came from matchmaking. Its rows are built from the object DM
# returns, so that one function is what a local room has to answer in: the site's
# own row renderer then lays it out with no markup of ours.
LOCAL_SERVERS = (
    "async function DM(e){let t=await fetch(`${$m()}/servers?mode=${e}`,{cache:\"no-store\"});"
    "if(!t.ok)throw new Error(`server list: HTTP ${t.status}`);return await t.json()}",
    "async function DM(e){"
    "var R=(()=>{try{return JSON.parse(localStorage.getItem('sf:rooms')||'[]')}catch(_){return []}})();"
    "if(!R.length)return{rows:[]};"
    "return{rows:R.filter(r=>r.mode===e).map(r=>({"
    "name:'Room '+r.code,map:r.map==='any'?'yard':(r.map||'yard'),"
    "secondsLeft:1200,humans:r.players||1,max:r.max||16,bots:0,slot:r.code,"
    "names:[]"
    "}))}"
    "}",
)

INVITE_SITE = [
    (
        "Pl.value=PM(MD(new URL(r1,location.href).href,re.mode.code,re.map,re.mode.bots,re.game,re.routed?.privateRegion??jm()))",
        "Pl.value=globalThis.__sfInvite(re.mode.code,re.map,re.game)",
    ),
]



# The module's last statement looks the canvas up and hands it to the builder.
# Every identifier there is minified, so the site is located by the one stable
# string, and the builder's name is read out of the match.
LOBBY_BOOT = re.compile(
    r'var (?P<var>[\w$]+)=document\.getElementById\("gear-canvas"\);'
    r'if\((?P=var) instanceof HTMLCanvasElement\)try\{(?P<build>[\w$]+)\((?P=var)\)\}catch\{\}'
)

LOBBY_WRAP = """globalThis.__sfLobbyBoot=(function(){
var live=false;
function canvas(){return document.getElementById("gear-canvas")}
function start(){
if(live)return;
var c=canvas();
if(!(c instanceof HTMLCanvasElement))return;
var g=c.getContext("webgl2")||c.getContext("webgl");
if(g&&g.isContextLost())return;
live=true;
try{BUILD(c)}catch(e){live=false}
}
return{
start:start,
// A lost context cannot be revived on the same canvas, so the element is
// replaced with a fresh clone. That is what lets the room come back on HOME.
release:function(){
if(!live)return;
live=false;
var c=canvas();
if(!(c instanceof HTMLCanvasElement))return;
var g=c.getContext("webgl2")||c.getContext("webgl");
try{g&&g.getExtension("WEBGL_lose_context")?.loseContext()}catch(e){}
var fresh=c.cloneNode(false);
fresh.removeAttribute("class");
fresh.width=300;fresh.height=150;
c.replaceWith(fresh);
},
get live(){return live}
};
})();
globalThis.__sfLobbyRelease=function(){globalThis.__sfLobbyBoot.release()};
globalThis.__sfLobbyRestore=function(){
requestAnimationFrame(function(){requestAnimationFrame(globalThis.__sfLobbyBoot.start)});
};
__sfLobbyBoot.start();"""


def wrap_lobby(js: str) -> str:
    """Give the lobby a release/restore pair around its one-shot bootstrap."""
    found = list(LOBBY_BOOT.finditer(js))
    if len(found) != 1:
        raise SystemExit(f"lobby bootstrap not found exactly once: {len(found)}")
    wrapped = LOBBY_WRAP.replace("BUILD", found[0].group("build"))
    return LOBBY_BOOT.sub(lambda m: wrapped, js, count=1)


def route_launch() -> int:
    js = OUT.read_text(encoding="utf-8")
    patch = LAUNCH_SITES + STEP_LOOP + INVITE_SITE + FIXED_BASE + [LOCAL_SERVERS]
    for old, new in patch:
        found = js.count(old)
        if found != 1:
            raise SystemExit(f"home bundle site not found exactly once ({found}): {old[:70]}")
        js = js.replace(old, new, 1)
    js = wrap_lobby(js)
    OUT.write_text(js, encoding="utf-8")
    return OUT.stat().st_size


def main() -> None:
    stage()
    size = bundle()
    print(
        f"wrote {OUT.relative_to(ROOT)}  {size:,} bytes\n"
        f"wrote {LANDING_OUT.relative_to(ROOT)}  {LANDING_OUT.stat().st_size:,} bytes\n"
        f"wrote {SUPPORT_OUT.relative_to(ROOT)}  {SUPPORT_OUT.stat().st_size:,} bytes"
    )


if __name__ == "__main__":
    main()
