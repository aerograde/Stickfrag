# StickFrag mirror (local archive)

This is a **static mirror of the live StickFrag web client** (`stickfrag.com/play`), now built as a
**standalone client**: no matchmaking, events, auth or rewards. The original TypeScript, tests,
design docs and server code were never published; `play/main.js` is a recovered, rebuilt, lean
client. The production bundle is preserved at `build/main.original.js`.

A match chosen from the menu runs locally under the host authority: the chosen mode, its
scoreboard and team scores, ability pickups, a small bot AI and any peers who join. The
original client had no AI of its own — on the live site every bot ran on the server — so
the host simulation here supplies it. FPS and draw calls are visible by default.

## One file

`stickfrag.html` is the whole thing: the home screen and the match in a single
self-contained file. Drop it anywhere — including `file://` — and it runs, with no
server. A solo match makes no external requests; a room or invite uses the signalling
code pairing described under Multiplayer.

The menu runs in the top document. Every match gets a **disposable iframe** of its own:
over http(s) the frame loads this same file with `?embed=1` (a real document, which is
what Chromium grants pointer lock to); from disk, or when the document has no
addressable URL, a game-only document is built from the parked CSS, HUD markup and
module and loaded from a blob URL. An embedded match skips the menu bundles entirely and
the game does not rewrite the wrapper URL, so it is a game frame from first paint to
HOME. HOME removes the frame, and with it the module, the WebGL context, listeners,
sockets and timers. That matters: an ES module cannot be unloaded, so a match imported
into the menu document used to leave roughly 80 MB and a GL context behind on every
PLAY/HOME cycle.

The game's markup and module are parked as inert text, so the menu pays for no game
context. The HUD and the menu never share a document, so their overlapping ids and
class names cannot collide. The landing page itself is the real site, whole and live.

`stickfrag.svg` is the same file in an image wrapper. An SVG opened directly is an XML
document, so the game cannot run inside it: `document.body` is null and
`createElement("canvas")` returns an `SVGElement` with no `getContext`. The wrapper
carries the untouched payload and launches it:

- On load, the payload is written to **IndexedDB** (`stickfrag` / `files` /
  `stickfrag.html`) together with a boot script. The launcher waits for that write
  before offering the game.
- A click opens an `about:blank` tab. A tiny bootstrap reads the stored file from
  IndexedDB and becomes it. If the tab cannot use storage (private mode, some `file://`
  origins), it asks the launcher for the file and the launcher writes it directly.
- From `file://`, a double-click starts an inline blob frame instead of a tab. This is
  the pointer-lock path: Chromium refuses pointer lock in `about:srcdoc` but allows it
  in a blob frame from disk. If the inline frame fails, a click falls back to the tab.
  Linux Chromium is one host that refuses this blob-in-SVG frame; the tab fallback is
  the path measured there.
- A query on the SVG that names a match (`?peer=join&room=…`, `?mode=…`, `?play`) is
  passed through and autostarts the match, so an invite link can point at either file.
- HOME from a match refills that frame (or rewrites the tab) with a fresh payload
  document and a **menu-only query** — the room, mode and map belong to the match that
  just ended, not to the next menu. A second match therefore gets a new module and a new
  GL context.

A blob document from `file://` has a null origin, so `localStorage` throws there. The
wrapper installs a memory-backed `Storage` before the payload's scripts run; the probe
covers writes as well as reads. The query string cannot ride on a blob URL (appending
one makes it invalid), so it is injected into the payload's `<head>` as
`__SF_PARENT_QUERY`; the shell merges it into the boot parameters and uses it to start
the requested match. `?peer=join&room=…` invite links work in both paths. The launcher
keeps the payload so HOME can rewrite the document. An `<img>` or CSS background never
runs SVG scripts, so open the file directly (or through `<object>`/`<iframe>`).

### Pointer lock and the fallback

A match normally captures the pointer. Some contexts cannot grant it: an
`about:blank` tab, a sandboxed or blob frame over http, a browser or embedding that
denies the request. In those cases the game switches to a playable fallback: movement
keys, mouse-move look without capture, click to fire and the wheel to switch weapons.
A short banner says `MOUSE CAPTURE UNAVAILABLE`; if a lock is granted later, it takes
over and the banner goes away. The resume panel no longer traps the player.


### The menu

The home screen is the real landing page, **whole**: the top bar, the hero, the squad
ribbon, the weekly row, the thank-you card, the updates, the `#play` section and the
footer. Its own flow is intact: nickname, PLAY, then the mode list (TDM, free-for-all,
gun game, capture the flag, pumpkin bomb), TRAINING, QUICK JOIN and CREATE A ROOM.
Those steps and their stylesheets are the site's own.

The page **scrolls**, exactly as it does live. An earlier build forced it to one
viewport with `overflow: hidden`, which on a small screen clipped the menu — the mode
list and QUICK JOIN were unreachable — and read as a completely broken page.

Three things are rewired because the server they used is gone:

- **Room-code JOIN.** The old matchmaker is gone. A short code now starts a join
  match locally; the actual pairing uses the long JOIN/ANSWER codes from the in-game
  panel (details under Multiplayer).
- **Launch.** The menu ends by assigning to `location.href`. That URL carries mode,
  map and room and is exactly what the game reads from the query string, so it is
  handed to the shell, which opens a match frame with the same parameters.
- **The server browser.** The step and its row renderer are the site's own; only the
  source of the rows changed. A hosted room is recorded locally and listed there, so
  ALL SERVERS shows the rooms this build actually has rather than failing to reach a
  matchmaker.

Links to pages a single file cannot serve (leaderboard, maps, ideas, updates, privacy
and the rest) are removed rather than left to fail; every removal is counted in
`tools/patch_home.py`, so an upstream layout change fails the build instead of
shipping a dead link.

Choosing a mode hosts a local match, which is what gives it a real match object —
mode name, scoreboard, and team scores for the team modes — rather than the bare
offline sandbox. Reloading a match URL restores that same mode. Nothing contacts a
broker or matchmaker: a host is authoritative locally, and a joining player starts a
join match and pairs with its long code. Room/invite links are shortcuts into that
join flow, not automatic connection.

`index.html` is the older standalone home page and is no longer required.

## Multiplayer

Peer-to-peer with no game server and **no signalling broker**. One player is the
**host**, who runs the authoritative 60 Hz simulation; everyone else sends inputs and
receives snapshots. The client's own prediction and reconciliation are untouched.

### Pairing one player

1. The host starts a match (a mode tile, QUICK JOIN or a room invite still gets them
   into a host or join match). The host can pair players at any time: press **Esc**
   (to leave mouse capture), then **C**, or use the notice.
2. The joining player starts a **join** match. The pairing panel opens automatically.
3. The joining player presses **COPY JOIN CODE**. That long `SF1:…` code is a complete
   SDP offer including ICE candidates.
4. Send the JOIN code to the host out-of-band. The host pastes it into the panel and
   presses **PASTE CODE**. The panel produces the long **ANSWER** code.
5. Send the ANSWER code back. The joining player pastes it and presses **PASTE CODE**.
   The WebRTC connection opens and the host seats them.

`tools/test_peers.py` drives exactly those panel buttons, not a hidden API.

### Three or more players: the mesh

Every additional player repeats the JOIN/ANSWER exchange with the host. After the host
seats a new player, it sends that player the ids of the existing joiners **over the
already-open host data channel**. The new player creates one offer per existing joiner;
the host relays the offers, answers and ICE candidates between the two joiners until
their **direct** link opens. No further codes are needed.

The result is a full graph: each player has a direct link to the host and to every other
joiner. Game traffic stays host-authoritative (inputs only to the host, snapshots and
events from the host); the direct joiner links are the mesh the host builds. A roster
message keeps every scoreboard in step as players join.

`tools/test_mesh.py` exercises the relay routing deterministically with fake peers, so
it runs even on a machine whose loopback ICE cannot connect. `tools/test_peers.py`
runs the real two- and three-player path when ICE is available.

### Transport limits

Signalling is **STUN only**: host candidates on a LAN and STUN for the public address.
There is no TURN relay. Networks that require TURN (symmetric NAT, some corporate
networks) will not connect; STUN is the explicit trade-off.

The JOIN/ANSWER codes are compressed (`CompressionStream`/`DecompressionStream`) SDPs;
they are roughly 700 characters in practice. Gathering waits up to ten seconds for ICE
so the code carries the candidates; the panel shows when it is working.

Same-machine loopback WebRTC is not available in every OS/browser/network configuration;
`tools/test_peers.py` checks the codes and reports SKIP when ICE cannot connect, rather
than blaming the game. Real players are on different machines.

## Picking things up

**F** is the use/pick-up key. Look at a weapon on a wall rack or pedestal and the HUD shows
`F TAKE <NAME>`; press F and it goes in your hands with a full magazine. Ability pickups work
the same way — they float at chest height, so stand next to one rather than looking at the floor.
One press takes one thing: an ability if you are aiming at one, otherwise the weapon.

A take empties that wall mount and it comes back after 20 seconds. Availability is tracked
outside `match.pickups` on purpose: the host replaces that array with every snapshot, so a
mutation made locally would be silently undone.

Every kind of pedestal item is takeable, not just guns: a grenade sets the throwable and its
count, a bandage tops up the pouch, a hat swaps the cosmetic, a knife becomes the melee weapon.
Gear applies locally and does not raise a pickup event, because it has no weapon id.

The aim target is a sphere of radius 0.8 centred 0.55 m above each mount. It used to be 0.55 at
0.3 m, which meant a gun on a floor pedestal could only be taken by looking down at roughly
thirty degrees — a level look passed about 0.8 m above the sphere, so aiming at the weapon did
nothing. A player now gets the prompt whether they are looking at the gun or straight ahead.

A **tap** counts, not just a hold. The frame loop samples the use key once per frame, so a
quick press could land between two samples and vanish; the key event is captured on the way
in and consumed by the frame, and the press is held for a few frames afterwards because a
snapshot can reconcile the body back before the take is handled. Typing in a field is excluded.

Reloading is **R**. In a host match the client's reload used to be cancelled every frame:
`mirror()` copied only part of the local player's state to the host, so `reloadLeft` stayed
zero there and the host's snapshot wrote that zero back. The mirror now copies the whole
state object, which also fixes the same class of bug for fire cooldown, weapon switch, melee,
grenades and bandages.

Dying and respawning is owned by the host. Three separate defects combined to make
death look completely broken in a hosted match, and each one hid the next:

- **The client's own `kill` handler was replaced.** The ability code added a second
  `kill:` key to the event table to strip abilities on death. An object literal keeps the
  *last* entry for a duplicate key, so the death overlay, kill feed and respawn bookkeeping
  all stopped running while the match carried on. That entry is now folded into the existing
  handler.
- **A kill event threw inside the renderer.** The host sent no `push` vector, and the ragdoll
  builder reads `e.push[0]`, so building the corpse threw *inside the frame loop*. The frame
  unwound before the HUD ran, which is why the overlay never drew and firing still worked.
  Kill events now carry a push vector, and `onKill` defaults one rather than trusting input.
- **Every bot's respawn cleared the local death state.** The `respawn` handler never looked at
  `e.id`, so the kill cam vanished about 150 ms after appearing. It now ignores other players.

Damage feedback had the same shape of bug from the other side: the host lowered health without
telling the client, so there was no hit feedback at all. It now emits a `hurt` event, but that
event is **feedback only** — health arrives in the snapshot, so applying `e.dmg` as well made
the HUD dip on the event and jump back on the next snapshot, which read as randomly gaining HP.

The teleport was the same root cause seen from outside: a respawn moved the host's copy of the
player, the client never got a respawn event for itself, and the next snapshot corrected it as a
single large jump — 12.35 m in one frame, measured. Respawns now pick a spawn point no live
player is standing on, and the client's own respawn resets the predictor instead of walking the
body across the map.

`tools/test_death.py` asserts all of it: the UI appears and names the killer, it survives bot
respawns, firing is blocked while dead, the player comes back, health never climbs mid-life,
and the page logs no errors.

## Abilities

Pickups spawn on the map, one per pair of **human** players, capped at three:
`clamp(ceil(humans / 2), 1, 3)`. Bots do not add to the pool — they are opponents to fight,
not players to equip — so a training match with four bots still has exactly one pickup. Each
is a real upside paid for by a real downside, is visible on the enemy's body, and is lost on
death.

A pickup is a small solid token with a soft additive halo and a ring on the floor. It used to
be a shape standing inside a 5.5 m translucent cylinder, which read as a plastic tube at eye
level and was the ugliest thing on the map.

| Ability | Upside | Downside |
| --- | --- | --- |
| FEATHER | +55% jump, +15% air control, no fall damage | max HP 80, footsteps twice as loud |
| IRON | max HP 150, 10% less damage taken | 18% slower, no slide |
| BLUR | +22% move speed, slide cooldown halved | max HP 65, leaves a dust trail |
| DEADEYE | +25% damage | 20% slower fire rate, scope glint |
| LEECH | +8 HP per hit, +25 per kill | max HP 70, bandages do nothing |
| BERSERK | +35% fire rate, +8% speed | 35% more damage taken, no aim-down-sights |

## Bots and training

The client has no AI of its own — on the live site every bot runs on the server. A small one
lives in the host simulation here: it picks the nearest enemy, turns toward it at a fixed rate,
holds a fighting distance, sidesteps, reloads when dry and fires once its aim settles. Bots use
the same movement integrator and the same shot resolution a remote peer does, so they collide
with the map, take damage and respawn exactly like a player.

`TRAINING` on the mode list starts a free-for-all against four of them. A host match fills with
three by default; `?bots=N` sets the count (0–8) and `nobots` — the flag the menu writes when
the room's Bots box is unticked — turns them off.

## Build

```bash
./tools/build-all.sh          # wrapper for the cross-platform build
python3 tools/build-all.py    # the same build, directly (Windows included)
```

Patch layers are exact-match replacements, so a moved upstream fails the build instead of
producing a half-patched client:

```
tools/patch-build.py perf wheel net abilities abilities_bind portable fallback  # client source
tools/build-home-bundle.py                                              # home + landing bundles
tools/build-single.py                                                   # stickfrag.html
tools/build-svg.py                                                      # stickfrag.svg
```

`tools/esbuild_runner.py` pins esbuild **0.25.12** and invokes it through `npx.cmd` on
Windows. The home bundle is patched by exact-match substitutions against minified
names, so a floating bundler version is a build input, not an incidental download.
The client is ESM with top-level await and no `package.json`, so the syntax check
copies it to `build/check.mjs` before `node --check`; a bare `.js` is treated as
CommonJS by older Node releases.

The shell lives in `tools/single-shell.js` so it can be read and syntax-checked as
JavaScript; `build-single.py` only assembles the document and inlines the assets.

`build-home-bundle.py` produces three bundles: the menu (`home.js`), the landing
sections (`landing.js`) and the halo stickman (`supportscene.js`). They are separate
on purpose. Adding `landing.js` to the menu entry renames every minified symbol in
`home.js`, and the counted substitutions in `route_launch()` match on those names.

## Tests

```bash
python3 tools/test_browsers.py chromium   # all flows, one browser (firefox/webkit too)
python3 tools/test_single.py              # site, PLAY, match frame, HOME, second match
python3 tools/test_svg.py                 # SVG over http: IDB, about:blank, match, fps
python3 tools/test_svg_file.py            # SVG from file://: inline frame, lock, HOME
python3 tools/test_home.py                # single-file home: gate, mode list, branding
python3 tools/test_fallback.py            # playable when pointer lock is refused
python3 tools/test_resilience.py          # storage/IDB/popups/WebGL/blob/HOME failures
python3 tools/test_menu_matrix.py         # headless menu/SVG matrix, no game (Linux/CI)
python3 tools/test_cycles.py              # five PLAY/HOME cycles: no frame left behind
python3 tools/test_wheel.py               # scroll-wheel weapon switching
python3 tools/test_pips.py                # sound pips: standing emits, crouching does not
python3 tools/test_peers.py               # panel JOIN/ANSWER, 2 & 3-peer mesh, seating
python3 tools/test_mesh.py                # deterministic host-relay/mesh routing
python3 tools/test_pickups.py             # F takes a wall weapon and an ability
python3 tools/test_death.py               # death UI, respawn, no shooting while dead
python3 tools/test_perf_match.py          # p50/p90 frame time in a four-bot match
```

`test_browsers.py` is the cross-machine check: the same four flows (http single file,
file:// single file, file:// SVG, http SVG) in Chromium, Firefox and WebKit, with
pointer lock or the fallback, HOME, a second match and a no-external-requests check.
Install the engines once with `python3 -m playwright install chromium firefox webkit`.

### Cross-machine verification

Executed from this workspace:

- **macOS (this host), Chromium + Firefox + WebKit:** the full 38-check matrix passes in
  all three engines; the resilience suite passes 56 checks, including direct
  `?peer=&mode=` SVG matches over HTTP and `file://` followed by HOME; the five-cycle
  leak test returns 1 frame / 0 iframes / 3 canvases every time; in a run where the
  host's loopback ICE completed, the code-paired three-player graph opened (host 2
  peers, each joiner host + the other joiner) at 60 FPS; on runs where it does not, the
  peers test validates the JOIN/ANSWER codes and reports the mesh half as SKIP rather
  than failing the code path. The deterministic relay test passes; the four-bot match
  holds p90 18.2 ms with zero dropped frames.
- **Linux x86_64, Colima + Playwright 1.60.0 images:** `tools/build-all.py` produces
  byte-identical `main.js`, `home.js`, `landing.js` and `supportscene.js` (same SHA-256)
  and single files of the same size as macOS; the headless menu/SVG matrix passes 41/41
  checks in Chromium, Firefox and WebKit. Two environment-specific paths were exercised
  there: Chromium's Linux build refuses the blob iframe inside an SVG (the launcher's
  click-to-tab fallback takes over), and WebKit's headless build has no IndexedDB (the
  about:blank tab uses the direct-write fallback). Both are designed paths, not failures.

Prepared, but not executed from this host:

- **Windows/Linux/macOS CI:** `.github/workflows/ci.yml` builds from source on each OS
  and runs the headless menu/SVG matrix. It is in the tree; running it needs a push or a
  workflow dispatch in the GitHub repository.
- **GPU-bound gameplay** needs a GPU. The Linux VM available here has none; Chromium's
  SwiftShader did not finish compiling the match shaders within ten minutes, so Linux
  gameplay is not claimed as measured. The game bundle is byte-identical to the macOS
  one, and the menu/SVG/build are measured on Linux. Windows gameplay likewise needs a
  Windows GPU runner. These are the only two combinations this host cannot execute; the
  CI/tooling is ready for them.

Diagnostics written while chasing the small-screen report, kept because they measure
things the assertions do not:

```bash
python3 tools/diag_small.py            # every viewport: overflow, scrollability, errors
python3 tools/diag_game.py 360 640 2   # a match: fps, draw calls, buffer size, quality
python3 tools/shots_small.py 360 640 2 # menu / mode list / match screenshots
python3 tools/shots_small.py 360 640 2 --live   # the same, from stickfrag.com
```

`test_peers.py` opens two browser contexts on one machine and then a third, which share an mDNS host candidate;
it drives the actual JOIN/ANSWER panel and disables `WebRtcHideLocalIpsWithMdns` so
same-machine ICE can complete. It then joins a third player and checks the host's relayed
direct mesh. Some machines still refuse loopback WebRTC; the test validates the codes and
reports SKIP for the datachannel half rather than blaming the game. `test_mesh.py` checks
the relay routing deterministically, so the three-player signalling path is covered even
then. Real players are on different machines.

## Performance notes

### Low-end and small-screen devices

The client is WebGL2 throughout; there is no WebGPU path to add or lose
(`navigator.gpu`, `GPUDevice` and `requestAdapter` appear nowhere in the bundle).
The renderer already asks for a low-latency context (`desynchronized: true`,
`powerPreference: "high-performance"`, no antialiasing). What a weak device actually
needs is for the *quality and resolution policy* to notice it, and four changes do
that without touching the art, the shaders, the ink pass or the paper pass:

- **A weak desktop starts on LOW.** `qK()` already picked quality from the device on
  touch and left desktop at HIGH. It now covers desktop too: a software rasteriser
  (`SwiftShader`, `llvmpipe`, `Basic Render`), 4 GB of RAM or less, four cores or
  fewer, or a small screen starts at the LOW preset that the Graphics setting already
  offers — 0.75× pixels, 1024 shadow map. A machine that cannot hold HIGH no longer
  spends its first minute finding out. Measured: an RTX-class GPU string stays at
  HIGH (quality 2); the software renderer and a 4-core/4 GB profile both start at 0.
- **The drawing buffer is capped on desktop as well.** `topPixelRatio()` capped the
  long side for touch only. Desktop now gets `[1280, 1600, 1920]` per preset. A
  1280×800 window at dpr 2 renders **1.02 MP instead of 4.10 MP** — a 75 % cut in
  fragments, for pixels nobody can see, with no CSS size or FOV change. A 360×640
  window at dpr 3 renders 720×1280 instead of 1080×1920.
- **Each match has its own context, and the menu's room pauses.** A match runs in a
  disposable frame, so the lobby and the game never share a document. The lobby's
  `IntersectionObserver` stops its render loop while the menu is hidden; its renderer
  is kept, because releasing and rebuilding it churned (and the old scene leaked).
  Removing the match frame on HOME releases its GL context with the rest of the realm.
- **The HUD fits a narrow screen.** The panels are laid out for a desktop window
  (`#health` 220 px, the ammo card 260 px) and, below 560 px of usable width,
  `#xpbar`'s `calc(100vw - 560px)` went negative while its `min-width: 200px` kept it
  200 px, so it overlapped both bottom corners. The widths are now capped to the
  viewport (divided by `--hud-scale`, since these panels are zoomed), `#xpbar` sits
  above the corners, and the toast keeps a margin for its rotation. At 360×640 every
  panel is inside the viewport with no collisions.

Two things were actually costing frames, and both are now fixed at the source:

- **Empty instanced pools.** The scene builds ~180 `InstancedMesh` objects up front and fills
  a handful. One with `count === 0` cannot draw a pixel, but three.js still binds its VAO and
  re-uploads its instance buffer every frame. Hiding them took p90 frame time from **32 ms to
  18 ms** and dropped **0 frames out of 250**, with the triangle count unchanged at 502,664.
- **The minimap canvas.** It redraws at 30 Hz into a node in normal layout flow, so each
  redraw made the compositor re-rasterise that layer. `contain: strict` + `will-change` makes it
  its own layer. (Its own draw cost was only 0.08 ms — the cost was presentation.)

The HUD also no longer writes to the DOM unless a value changed (~850 → ~9 mutations/second),
and the per-tick key table and per-frame argument objects are hoisted out of the loop.

The host authority's catch-up loop is capped at five ticks per frame. It was unbounded: a slow
frame asked for more ticks, which made the next frame slower, which asked for more still, so
the simulation could never return to real time and the match settled at half rate. Surplus
accumulated time is now dropped instead.

The mode panel used to read **RANGE** in every free-for-all. `setTimer(time, line, showing,
label)` defaults `label` to `"RANGE"` and the free-for-all call site only passed three
arguments; team modes go through `setTeamTimer` with their own label, which is why only the
non-team path was wrong. It now passes the mode's title.

Two quality reductions that trade pixels for memory are **applied by default**, because the
frame time does not move either way — the game is bound by draw submission, not by fill rate,
so the extra resolution was buying nothing measurable:

- **Shadow map 4096 → 2048.** 64 MB → 16 MB of depth texture. Shadow edges soften slightly
  (0.15% of pixels differ, maximum delta 49); at this art style it reads as an intentional
  soft edge. Frame time is unchanged.
- **World atlas 4096×2048 → 2048×2048.** 32 MB → 16 MB. Distant signage loses a little
  sharpness; nothing in the play space changes.

Together that is **~64 MB less GPU memory**. Pixel ratio was measured too and left alone: at
1.5 vs 1.0 the GPU time was 21.4 ms vs 21.2 ms, so lowering it would only cost sharpness.

### Match lifetime and the menu

Every PLAY creates a match frame and every HOME removes it. `tools/test_cycles.py` runs
five cycles and asserts that the frame count returns to one, the canvas count stays at
three and no page errors appear; the frame's module, listeners, sockets and GL context
go with it. The old shared-document shell could not unload an ES module, so it left
roughly **80 MB and a GL context** behind on every cycle. The menu's own heap is about
**41 MB** on this Mac, including the paused lobby. With broker signalling removed, the
menu and solo matches make no external requests; the long JOIN/ANSWER codes are the
only signalling path.

### Matches with other players

A match with characters in it used to run well below refresh rate while an empty one sat at
60. Three separate causes, all fixed:

- **Combat shaders compiled on the first kill.** `warmUp()` compiled the world, the viewmodel
  and the menu, but everything that only appears once fighting starts — blood decals, ragdolls,
  smoke, grenades, dropped weapons, damage numbers — built its materials lazily. Watching
  `renderer.info.programs` over a bot match, the count held at 79 for five seconds and then
  jumped to **102 with 21 programs compiled in a single frame**, which is the hitch you feel on
  the first kill. Those systems are now revealed for one compile pass during loading and put
  back exactly as they were.
- **Characters re-submitted through the shadow camera.** The rig is 171 `InstancedMesh` objects
  refilled every frame; bodies no longer cast a sun shadow.
- **Characters were drawn twice.** Excluding the rig from the ink pass is *not* safe, and an
  earlier attempt at it shipped broken: the ink pass also produces the normal/depth buffer the
  final composite samples from, so bodies missing from it had most of their pixels replaced by
  background. It is reverted.

Measured with pointer lock engaged, delivered frames over an 8 s window: **60 fps with no
bots, 58–59 with three, 54–60 with six**. This host also runs a Spotlight indexer that pegs a
core, so individual samples move around; the numbers above are the settled ones.

Bots were also made beatable. They now react in 0.45–1.0 s, carry a wider aim error that grows
with range, fire in shorter bursts, and deal **55% damage**. Three of them take a stationary
player to low health without killing them, which is the intent: practice, not a firing squad.

Geometry is also shared now. The map builder makes a fresh `BufferGeometry` per prop, which
left 804 geometry objects for ~142 distinct shapes. One object per shape (matched on vertex
count, attribute counts, bounding box and a sampled hash of the vertex data) drops that to
224 in-scene geometries with identical draw calls and triangle counts.

## Quick start

```bash
python3 tools/build.py                 # CSS bundle + .br/.gz artefacts
python3 tools/serve.py                 # http://127.0.0.1:8123
```

Then open:

```
http://127.0.0.1:8123/
```

`standalone.js` supplies a nickname and offline mode, so no query is required. A map can be
chosen with `?map=yard`, `?map=range`, etc.

```
/play/?blur=0        # no motion blur, no extra render targets
/play/?blur=force    # always-on motion blur (may cost FPS)
/play/?lite          # LOW preset: 0.75x pixels, static shadows, no blur
```

Motion blur is governed by default: it starts off, enables only when the FPS stays within 1% of
the panel's observed rate, and frees its targets on a drop. `?lite` is the resource-first mode.
Opening `index.html` over `file://` will not work: the client uses root-absolute URLs and ES
modules, both of which need an HTTP origin.

## What was optimised

**Delivery and startup**

| Change | Effect |
| --- | --- |
| 13 stylesheets concatenated in cascade order into `game.all.css` | 13 requests → 1 |
| Brotli/gzip next to every text asset, negotiated by `tools/serve.py` | `main.js` 5,928,789 → 1,082,275 bytes |
| `modulepreload` for `main.js` in the document head | download starts before the module tag is parsed |
| `Cache-Control: immutable` on `?v=`/`/chunks/` URLs | repeat loads come from cache |
| Removed the blocked Cloudflare beacon | one failed cross-origin request less |

Measured first load for the play page (HTML + CSS + JS + small scripts + loadout images):

```
before  6,259,430 bytes (5.96 MiB),  20 successful requests
after   1,132,840 bytes (1.08 MiB),   9 successful requests
saved   5,126,590 bytes (81.9%)
```

The page now makes nine same-origin requests and no 404s. The loading-map and favicon requests
were removed rather than left to fail.

**Client**

- Offline `Game.frame` skips snapshot interpolation, snapshot sampling and ghost splitting when
  `this.net` is null; the adiabatic netcode state machine is not on the offline hot path.
- WebGL2 context now requests `desynchronized: true` (`Renderer(canvas, true)`).
- HIGH shadows update every other frame instead of every frame (resolution unchanged).
- Static paper grain is baked once into a texture; every frame now samples it instead of running
  the noise shader.
- The results podium is lazy (not constructed until a result exists), and the hidden menu scene
  update is gated off during gameplay.
- The dormant network classes (`NetClient`, `MultiplayerClient`, `EC`, `Room`, `Auth`, `HttpApi`)
  and the Colyseus schema/encoder/transport cluster are removed from the offline build.
  `standalone.js` also strips replay/review routes.
- Live-events fetch is skipped and the page enforces `connect-src 'self'`; no server traffic.
- World-only adaptive temporal motion blur, gated on measured FPS. It starts off, enables only if
  it stays within 1% of the best observed rate, and frees its targets below 98%.
  `?blur=0` is hard-off; `?blur=force` is the quality-first override.
- `?lite` selects the existing LOW preset (0.75× pixels, static 2048² shadows, no blur) and also
  skips the paper pass and menu/podium shader warm-up. The default build keeps HIGH.
- Missing-asset requests were removed: no loading-map/favicon 404s.
- The external beacon is gone; `/` redirects into the standalone client.

**The FPS ceiling is real.** `requestAnimationFrame` is tied to the panel: a 60 Hz display will
show 60 regardless of client work, while 120/144/240 Hz displays can go higher if the GPU keeps
the frame under 4–8 ms. The remaining levers — internal resolution, shadow-map size, the second
scene render needed for ink outlines, post passes — all change the picture. The default keeps
HIGH; `?lite` is the opt-in trade for the smallest footprint. Details:
`docs/OPTIMIZATIONS.md`.

## Recovered source

No source map, repository or archived source file exists — `/play/main.js.map` is 404 live and in
Wayback, and the full domain archive contains no `.map`, `.ts` or `/src/` URLs. `docs/RECOVERY.md`
has the full search.

What exists is a recovered source tree that has been verified end-to-end:

- `readable/main.js` — the production bundle formatted by Prettier, 126,617 lines. Formatting
  only, so semantics are identical.
- `readable/main.named.js` — the same code with 36 subsystem classes renamed (`Game`, `Hud`,
  `Predictor`, `Renderer`, `NetClient`, …); scope-aware and line-compatible. `docs/NAMES.md`
  maps every rename.
- `readable/main.fast.js` — the standalone/performance layer built by `tools/optimize.py`
  (126,821 lines; FPS default, low-latency context, half-rate shadows, FPS-gated motion blur,
  `?lite`, offline frame skips, cached paper, lazy podium).
- `readable/main.offline.js` — `main.fast.js` with the six dormant network classes removed by
  `tools/strip-net.js`.
- `readable/main.lean.js` — `main.offline.js` with the Colyseus schema/encoder/transport cluster
  cut by `tools/cut-sdk.py` (119,059 lines). This is the installed source.
  `tools/build-source.sh` builds it to `build/main.js` (~5.7 MiB).
- `build/main.original.js` — the untouched production bundle, kept for comparison and revert.
- `docs/SYMBOLS.md` — class map and method anchors for the HUD, predictor, game loop, input,
  network client, renderer and clock.
- `docs/ARCHITECTURE.md` — boot flow, netcode/authority model and offline sandbox.
- `docs/OPTIMIZATIONS.md` — exactly what the fast layer changes and why the refresh-rate
  ceiling cannot be coded away.

Limits: original identifiers, types, comments and module boundaries are unrecoverable. It is
enough to read, patch and rebuild behavior; it is not enough for safe large-scale restructuring.
For FPS, the original source would not change the GPU/quality ceiling.

## Readability

- `readable/main.js` is the fidelity source; `readable/main.named.js` restores subsystem names;
  `readable/main.fast.js` is the optimized layer; `readable/main.offline.js` / `main.lean.js`
  are the network-pruned layers. Regenerate with `./tools/beautify.sh`, `node tools/rename.js`,
  `python3 tools/optimize.py`, `node tools/strip-net.js`, `python3 tools/cut-sdk.py`.
- `play/main.js` is the installed lean build; the untouched production bundle is
  `build/main.original.js`. `game.all.css` is generated; edit the sources and rebuild.
  The lean cut drops source lines, so use `main.named.js`/`main.fast.js` for the documented
  line anchors; `main.lean.js` is for building, not line navigation.

## Layout

```
stickfrag.com/            site root (document root for tools/serve.py)
  index.html              the real landing page, whole (built by patch_home.py)
  stickfrag.html          one file: the site and the game, generated (~10.4 MB)
  stickfrag.svg           the same payload, IndexedDB/about:blank launcher, generated
  play/index.html         standalone game page (CSP, standalone.js, CSS, modulepreload)
  play/standalone.js      forces offline mode + default nickname
  play/main.js            installed lean build (~5.7 MiB)
  *.css                   readable source stylesheets
  game.all.css            generated bundle used by the page
  play-redirect.js        name gate / menu redirect
  retry.js                module-load retry with backoff
readable/main.js          recovered source, original minified names (verified)
readable/main.named.js    same code with 36 subsystem classes renamed (verified)
readable/main.fast.js     standalone/performance layer
readable/main.offline.js  network classes removed
readable/main.lean.js     schema/transport cluster cut (installed source)
build/main.js             esbuild output from readable/main.lean.js (verified)
build/main.original.js    untouched production bundle (revert reference)
docs/ARCHITECTURE.md      boot flow, netcode, offline mode
docs/OPTIMIZATIONS.md     standalone boundary, motion blur, FPS ceiling
docs/NAMES.md             minified -> recovered class-name map
docs/SYMBOLS.md           recovered class map and method anchors
docs/RECOVERY.md          source search and fidelity report
tools/build.py            CSS bundle + brotli/gzip build
tools/serve.py            static server with compression and caching
tools/build-all.py        cross-platform build (patch -> bundle -> single -> svg)
tools/build-all.sh        wrapper for build-all.py
tools/esbuild_runner.py   pinned esbuild 0.25.12, Windows-safe
tools/single-shell.js     the single file's menu/frame shell
tools/beautify.sh         regenerate readable/main.js
tools/rename.js           restore subsystem class names -> readable/main.named.js
tools/optimize.py         standalone/performance patches -> readable/main.fast.js
tools/strip-net.js        remove dormant network classes -> readable/main.offline.js
tools/cut-sdk.py          cut schema/encoder/transport -> readable/main.lean.js
tools/build-source.sh     lean -> build/main.js
tools/test_browsers.py    Chromium/Firefox/WebKit flow matrix
tools/test_single.py      single file: menu, frame, HOME, second match
tools/test_svg.py         SVG over http: IndexedDB, about:blank, match
tools/test_svg_file.py    SVG from disk: inline frame, pointer lock, HOME
tools/test_fallback.py    playable without pointer lock
tools/test_resilience.py  storage/IDB/popups/WebGL/blob/direct-SVG failure paths
tools/test_menu_matrix.py headless menu/SVG matrix, no game (Linux/CI)
tools/ci_menu.py          starts the server and runs the headless matrix on CI
tools/test_cycles.py      five PLAY/HOME cycles, no frame left behind
.github/workflows/ci.yml  build + menu/SVG matrix on ubuntu/macos/windows
server.stickfrag.com/     captured JSON endpoints (auth, rewards)
us.stickfrag.com/         captured matchmaking/server-list JSON
wss---us1.stickfrag.com/  placeholder for the captured WebSocket URL
static.cloudflareinsights.com/  captured analytics beacon (now unused)
```

## Known gaps

The mirror was captured with a plain crawler, so it is missing the rest of the site (13 pages
from `sitemap.xml`), `apple-touch-icon.png`, `og.png`, `/map-*.webp` loading images and the
lazy `/chunks/*.light` map data. The loading and icon requests for missing files were removed,
so the installed page makes no 404s. The lean build has no online transport or Colyseus
schema/transport cluster; replay/review URLs are stripped. Source maps are not published
(`/play/main.js.map` returns 404).

The SVG is a launcher, not a picture: `<img>` and CSS backgrounds never execute SVG scripts.
Open it directly, or through `<object>`/`<iframe>`. Over http(s) it launches an `about:blank`
tab, where Chromium refuses pointer lock; the game's mouse-move fallback takes over. For
pointer lock, open `stickfrag.html` directly (the file:// inline path keeps it).

Two Linux engine quirks are handled and tested: Chromium's Linux build refuses a blob iframe
inside an SVG (the launcher's click-to-tab fallback is used), and headless WebKit on Linux may
have no IndexedDB (the direct-write fallback is used). The game itself needs WebGL 2; without
it the shell shows a specific message and returns to the menu instead of a black match.
Windows runtime and GPU-bound Linux/Windows gameplay are not measured from this macOS host;
the CI workflow builds and runs the headless menu/SVG matrix on all three OSes, and the full
gameplay matrix needs a GPU runner.

`supportscene.js` and its chunk were fetched from the live site to restore the halo stickman on
the thank-you card. `eventscene.js` was not: it is only used by the Friends Weekend section,
which ships `hidden` on this build exactly as it does live, and two of its three chunks are not
mirrored. Its loader is dropped rather than left to 404.

The weekly leaderboard row and the daily card need a server, so they show their own empty
states. That is the page's own markup and behaviour, not a stub of ours.

## Notice

StickFrag, its code and its art belong to their author. The site's terms (section 10) prohibit
copying, publishing or self-hosting the game. Keep this mirror for personal analysis; do not
redistribute it or run it as a public service.
