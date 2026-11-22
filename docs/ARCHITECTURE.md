# Client architecture notes

Derived from the production bundle and the page markup. Everything below describes the **client**;
the authoritative game runs in Colyseus rooms and is not part of this archive. The installed
`main.lean.js`/`play/main.js` is the offline-only build: the network transport and Colyseus
transport/schema cluster are stripped, and `standalone.js` forces `offline` and a nickname before
the production redirect runs. The line anchors in this document refer to `readable/main.named.js`
and `main.fast.js`; `main.lean.js` drops the cluster and does not keep those line numbers.

## Boot flow

1. `play/index.html` loads `play-redirect.js` synchronously in `<head>`. If the URL or
   `localStorage` has no valid nickname (3–16 chars, `[A-Za-z0-9_]`), it redirects to the menu
   unless the URL carries `room`, `code`, `replay`, `clip`, `review`, `overwatch`, `case` or
   `studio`. `offline` is not on that list, so an offline URL needs `?name=`.
2. The single stylesheet (`game.all.css`, generated from the 13 sources) and
   `modulepreload` for `play/main.js` start in the head.
3. `retry.js` listens for failed module `<script>` loads and retries under a new `?retry=N`
   URL with 0/1/2/4/8/15/30 s backoff, but only for same-origin scripts.
4. `main.js` (a single esbuild bundle) boots the UI/game. The recovered production bundle contains
   three.js r186 and the Colyseus SDK (`@colyseus/sdk` 0.18.4, `@colyseus/schema` 5.0.35) plus
   game code. The installed lean build keeps three.js and the game, and removes the Colyseus
   transport/schema cluster.

The production map, mode, room, region and debug switches all come from the query string
(`?map=`, `?mode=`, `?room=`, `?region=`, `?offline`, `?debug`). The standalone layer strips
`room`, `code`, `region`, `review`, `overwatch`, `case`, `studio`, `replay` and `clip`; `map`,
`mode`, `blur` and `lite` remain.

## Frame and simulation

- Render loop: `requestAnimationFrame`, with an accumulator.
- Simulation step: fixed **60 Hz** (`Zn = 60`, `Gt = 1/60` in the formatted bundle).
- Per step: sample local input, predict the local body (`applyLocal`), optionally fire, queue the
  input for the server.
- Per frame: sample interpolated remote snapshots, update viewmodel/HUD/systems, render.
- Settings live in `localStorage["settings"]`; defaults include FOV 78, quality 2 (HIGH),
  sensitivity 1, volume 0.8.

## Rendering

- WebGL2 only. The game requests `{ alpha: false, depth: true, stencil: false,
  antialias: false, powerPreference: "high-performance", desynchronized: true }` when the
  low-latency path is enabled; three.js is also constructed with `powerPreference: "high-performance"`.
- `shadowMap.enabled = true`; camera FOV 78, near 0.05, far 700.
- Quality presets (`V1`):
  - LOW — pixel ratio 0.75, 2048 shadow map, shadows every other frame;
  - MEDIUM — pixel ratio 1, 2048 shadow map, shadows every 2 frames;
  - HIGH (default) — pixel ratio 1.5, 4096 shadow map, shadows every frame.
- Static map lighting is baked into `/chunks/<map>-<hash>.light` for maps that have it.
- Diagnostics: FPS, RTT, draw calls, GPU timer queries, prediction correction error, shader
  compile watch. The HUD can show some of this with the FPS setting or `?debug`.

## Networking and authority

- Join: `POST {region}/matchmake/joinOrCreate/<roomName>` (Colyseus HTTP matchmaking). The
  response is a seat reservation (`roomId`, `sessionId`, `processId`, `publicAddress`,
  `reconnectionToken`), then a WebSocket connection to
  `wss://<region-host>/<build>/<processId>/<roomId>?sessionId=…`.
- Regions are hard-coded in the bundle: EU (`wss://server.stickfrag.com`), US
  (`wss://us.stickfrag.com`), Asia (`wss://asia.stickfrag.com`); the client probes latency and
  can be forced with `?region=`.
- State arrives as Colyseus schema patches (`snapshots`). The client buffers snapshots and
  interpolates remotes at a render delay derived from RTT.
- Local movement is predicted and replayed on top of each authoritative snapshot
  (`reconcile`); the debug line exposes the correction error in centimetres.
- Input is sent in input messages; hits, health, deaths, match phases, scores and spawns are
  server-decided. The HUD distinguishes predicted hits ("not yet confirmed by the server").
- Reports, votekick, chat, loadout, team switch and emotes are room messages.
- Progression is HTTP: `/rewards/me` (XP, packs, daily counters), `/auth/me` (email sign-in and
  saved progress), `/servers?mode=` (server list) and `/events` (live events).

## Offline sandbox

`?offline` bypasses matchmaking. `startOffline` → `FG()` resets the local predictor at a spawn,
sets `selfId = 1`, puts only that player in the roster, and leaves `match = null`.

Consequences:

- movement, collision, firing, reload, weapon switching and world impacts all work locally;
- there are no opponents, bots, scores, rounds, XP, packs or chat;
- calls that need `this.net` (chat, report, votekick, loadout sync) are no-ops;
- the range HUD is gated on `match?.mode === "range"` and therefore does not appear offline.

## Lazy and optional modules

- `/review.js`, `/overwatch.js`, `/studioplay.js`, `/case.js` are imported only for the
  `?review`, `?overwatch`, `?studio` and `?case` query parameters (replay/moderation tooling).
- These, the site pages, and the `.light` chunks are not part of the original capture.

## Navigating `readable/main.js`

`readable/main.named.js` restores names for 36 subsystem classes (`Game`, `Hud`, `Predictor`,
`Renderer`, `NetClient`, …); the line map is identical in `readable/main.js`, which keeps the
minified names. `readable/main.fast.js` (the installed layer) inserts `TemporalBlend` after
`ComicPass`, so its line numbers after that point are about 150 higher. Use `docs/NAMES.md` for
the mapping and `docs/SYMBOLS.md` for the class map.

| Topic | Line |
| --- | --- |
| `openReplayPage` (lazy tooling router) | 51 |
| `powerPreference` / WebGL context setup | 87,689 |
| `clock.serverTick` (client clock wrapper) | 94,355 |
| `rangeStats` (shooting range counters) | 100,261 |
| `Hud.setFps` | 101,539 |
| `Predictor.applyLocal` (local movement step) | 102,175 |
| `Predictor.reconcile` (prediction replay) | 102,180 |
| `Game.onSnapshot` (server state ingest) | 109,190 |
| `Game.frame` (60 Hz loop) | 109,214 |
| `Game.startOffline` (sandbox entry) | 109,252 |
| `ServerClock` class (RTT/offset) | 115,149 |
| `MultiplayerClient.joinOrCreate` (matchmaking) | 117,996 |
| `NetClient.connect` | 118,234 |
| `NetClient.flush` (input send) | 118,284 |
| quality presets (`pixelRatio: 0.75`) | 125,056 |
| `Renderer.render` | 125,350 |
| `Renderer.warmUp` (shader compile) | 125,419 |

Regenerate the readable copy with `./tools/beautify.sh`; regenerate the named copy with
`node tools/rename.js` (requires the Babel packages listed in that file).
