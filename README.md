# StickFrag mirror (local archive)

This is a **static mirror of the live StickFrag web client** (`stickfrag.com/play`), now built as a
**standalone client**: no matchmaking, events, auth or rewards. The original TypeScript, tests,
design docs and server code were never published; `play/main.js` is a recovered, rebuilt, lean
client. The production bundle is preserved at `build/main.original.js`.

A match chosen from the menu runs locally under the host authority: the chosen mode, its
scoreboard and team scores, ability pickups, and any peers who join. There is no bot AI — the
original client had none either, it lived on the server — so a local match has no opponents
until someone joins your room. FPS and draw calls are visible by default.

## One file

`stickfrag.html` is the whole thing: the home screen and the match in a single
self-contained file. Drop it anywhere — including `file://` — and it runs, with no
server and no external requests.

The two screens never coexist. The home markup is live on load and the game's module
is *parked* as inert text, so sitting on the menu costs ~10 MB of JS heap instead of
~120 MB and no WebGL context at all. Choosing a mode swaps the screens in place and
boots the module from a blob URL.

`stickfrag.svg` is the same file in an image wrapper, for anything that will only
accept an SVG. An SVG opened directly is an XML document, so the game cannot run
inside it: `document.body` is null and `createElement("canvas")` returns an
`SVGElement` with no `getContext`. The wrapper carries the untouched payload and
writes it into a fresh `about:blank` tab, which is a real HTML document. Browsers
block `window.open` without a gesture, so it tries on load and the whole page is
also a clickable retry. The query string survives into the tab, so `?peer=join`
invite links work there too.

### The menu

The home screen is the real landing page, so its own flow is intact: nickname, PLAY,
then the mode list (TDM, free-for-all, gun game, capture the flag, pumpkin bomb),
QUICK JOIN and CREATE A ROOM. Those steps and their stylesheets are the site's own;
this build only removes the top bar, the server browser and the scrolling marketing
sections below the hero.

Two things are rewired because the server they used is gone:

- **Room-code JOIN.** The page asks matchmaking which room a code is; peers here find
  each other over the broker, so that submit is handled locally instead.
- **Launch.** The menu ends by assigning to `location.href`. That URL carries mode,
  map and room and is exactly what the game reads from the query string, so it is
  handed to the shell and the match starts in place instead of re-parsing the file.

Choosing a mode hosts a local match, which is what gives it a real match object —
mode name, scoreboard, and team scores for the team modes — rather than the bare
offline sandbox. Reloading a match URL restores that same mode.

The original landing page's top bar, server browser, footer and the long scrolling
marketing sections below the hero are not part of this build: the home screen is
exactly one viewport.

`index.html` is the older standalone home page and is no longer required.

## Multiplayer

Peer-to-peer with no game server. A **WebRTC mesh** carries the connections and one player is
the **host**, who runs the authoritative 60 Hz simulation; everyone else sends inputs and
receives snapshots. The client's own prediction and reconciliation are untouched.

Two ways to connect:

1. **MQTT signalling (default).** Free anonymous brokers, tried in parallel:
   `broker.emqx.io`, `broker.hivemq.com`, `test.mosquitto.org`. A room is
   `sf1/<CODE>/…`; a room-scoped nonce keeps two rooms with the same code apart.
2. **Offer/answer codes (fallback, always works).** In game, the host copies an offer code
   (`SF1:…`), the joiner pastes it and returns an answer code (`SF1:…`). No broker, no
   server, and it works on a LAN. Same ICE path, including STUN for the public address and
   host candidates for the local network.

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
./tools/build-all.sh     # patch -> bundle -> home bundle -> single file
```

Patch layers are exact-match replacements, so a moved upstream fails the build instead of
producing a half-patched client:

```
tools/patch-build.py perf wheel net abilities abilities_bind   # client source
tools/build-home-bundle.py                                     # home screen bundle
tools/build-single.py                                          # stickfrag.html + .svg
```

## Tests

```bash
python3 tools/test_single.py   # home screen, no top bar / server list / scroll, PLAY in place
python3 tools/test_svg.py      # the SVG build plays the same match, 60 fps, no network
python3 tools/test_wheel.py    # scroll-wheel weapon switching
python3 tools/test_pips.py     # sound pips: standing emits, crouching does not
python3 tools/test_peers.py    # two-peer join, seating, movement, frame rate
python3 tools/test_pickups.py  # F takes a wall weapon and an ability
python3 tools/test_death.py    # death UI, respawn, no shooting while dead, health monotonic
```

`test_peers.py` runs two browser contexts on one machine, which share an mDNS host candidate;
it disables `WebRtcHideLocalIpsWithMdns` so same-machine ICE can complete. Real players are on
different machines, where that is not a factor.

## Performance notes

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
  `tools/build-source.sh` builds it to `build/main.js` (5.7 MiB / 5,928,789 bytes).
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
  index.html              redirect into the standalone /play/
  play/index.html         game page (CSP, standalone.js, one CSS link, modulepreload)
  play/standalone.js      forces offline mode + default nickname
  play/main.js            installed lean build (5,928,789 bytes)
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
tools/beautify.sh         regenerate readable/main.js
tools/rename.js           restore subsystem class names -> readable/main.named.js
tools/optimize.py         standalone/performance patches -> readable/main.fast.js
tools/strip-net.js        remove dormant network classes -> readable/main.offline.js
tools/cut-sdk.py          cut schema/encoder/transport -> readable/main.lean.js
tools/build-source.sh     lean -> build/main.js
server.stickfrag.com/     captured JSON endpoints (auth, rewards)
us.stickfrag.com/         captured matchmaking/server-list JSON
wss---us1.stickfrag.com/  placeholder for the captured WebSocket URL
static.cloudflareinsights.com/  captured analytics beacon (now unused)
```

## Known gaps

The mirror was captured with a plain crawler, so it is missing the rest of the site (13 pages
from `sitemap.xml`), the landing CSS/JS, `favicon.svg`, `apple-touch-icon.png`, `og.png`,
`/map-*.webp` loading images and the lazy `/chunks/*.light` map data. The loading and icon
requests for missing files were removed, so the installed page makes no 404s. The lean build
has no online transport or Colyseus schema/transport cluster; replay/review URLs are stripped.
Source maps are not published (`/play/main.js.map` returns 404).

## Notice

StickFrag, its code and its art belong to their author. The site's terms (section 10) prohibit
copying, publishing or self-hosting the game. Keep this mirror for personal analysis; do not
redistribute it or run it as a public service.
