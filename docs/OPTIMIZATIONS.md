# Standalone and performance changes

## Two different "backends"

This document is about the **client's internal backend**: the frame loop, state machine, scene
lifetime and render pipeline. The remote server is separate. Rewriting the remote server can
change latency, tick consistency and hosting cost, but it does not render a client frame. The
server is cut off for this build:

- `play/standalone.js` runs before every other script, forces `offline`, removes `room`, `code`,
  `region`, `review`, `overwatch`, `case`, `studio`, `replay` and `clip`, and supplies a default
  nickname.
- The page sets `connect-src 'self'`. The client can still fetch its own `/chunks` assets, but
  matchmaking, events, auth and rewards on `*.stickfrag.com` are blocked.
- `c0e()` (the live-events fetch) returns immediately.
- The dormant `NetClient`, `MultiplayerClient`, `EC`, `Room`, `Auth` and `HttpApi` classes are
  removed from `readable/main.offline.js`; the Colyseus schema/encoder/transport cluster is cut
  in `readable/main.lean.js`. No room code is loaded or executed offline.

## Frame-path changes

| Change | Why |
| --- | --- |
| `showFps` defaults to true | FPS and draw calls are visible from the first frame |
| `new Renderer(canvas, true)` | Uses the `desynchronized` low-latency WebGL2 context |
| HIGH `shadowEvery: 2` | 4096² shadows update every other frame instead of every frame |
| World-only temporal motion blur | Smooths camera motion without blurring the gun or HUD |
| Blur governor | Blur only exists while it costs no measured FPS |
| Offline frame path skips interpolation/snapshots/ghosts | No network state machine work when `net` is null |
| Static paper shader baked once | Removes the grain noise math from every frame |
| Lazy results podium | The results scene is not constructed until a result exists |
| Hidden menu update gated | The menu scene is not stepped while it is invisible |
| Dormant network classes + SDK cluster cut | 5.93 MB bundle, 1.08 MB brotli |
| No events/network at startup | Removes fetches, latency probes and event work |
| No missing-asset requests | Loading-image/favicon 404s removed |
| One CSS bundle and precompressed assets | Fewer requests and ~81.9% less first-load transfer |

The shadow change is the only static-image-affecting optimization, and it only changes how often
dynamic shadows are refreshed, not their resolution or filtering. The FPS overlay is visible by
request. Motion blur is motion-dependent and off while the governor is measuring.

## Motion blur is FPS-gated

The world is rendered into a ping-pong render target. A full-screen pass mixes the current frame
with the previous one. The amount is adaptive: 0.03 at rest, rising with camera speed and look
speed, capped at 0.28. It applies to the world only; the viewmodel, gun, menus, paper overlay and
DOM HUD stay crisp.

The governor starts **inactive**, waits for 2.5 s of samples, then enables only when the FPS is
within 1% of the best observed rate for three consecutive samples. It disables below 98% of that
rate, frees both render targets immediately, and after a second drop keeps blur off for the rest
of the session. In auto mode the panel therefore does not stay below the panel's rate because of
blur.

Controls:

```
/play/?blur=0       # hard off, no targets allocated
/play/?blur=force   # always on; may cost FPS
```

`force` is the deliberate quality-first mode. Auto is the default.

## Resource-first mode

```
/play/?lite
```

Uses the client's existing LOW preset: 0.75× internal pixels, a 2048² shadow map updated once
for the static map, and no motion blur. It also skips the static paper pass, the paper bake, and
menu/podium shader warm-up. This is the resource-first switch; it changes sharpness. The default
build keeps the HIGH preset.

The remaining fixed cost is the rendering architecture itself: the color pass, the normal/depth
pass used for ink outlines, the shader warm-up for the two game scenes, and the ink post pass.
Removing any of them changes the comic look, so they are not removed by default. The paper pass
and the two decorative podium scenes are the avoidable parts, and they have been removed or
made lazy.

## The refresh-rate ceiling

`requestAnimationFrame` is tied to the display. On a 60 Hz panel the browser present rate is 60,
and no client change can make the counter show 200. On 120/144/240 Hz panels the ceiling is
higher, and the reduced shadow cadence, low-latency context and lack of network work give
headroom. A consistent "hundreds" figure also requires the GPU to finish the frame in under
4–8 ms; that depends on resolution and GPU model.

Going further without changing the visuals is not honest: the remaining levers are internal
resolution, shadow-map size, the second scene render required for ink outlines, and the post
passes. Each changes the picture. That is why this layer stops at removing avoidable work.

## Verified

- Source chain: `main.named.js` → `main.fast.js` (performance patches) → `main.offline.js`
  (six network classes removed) → `main.lean.js` (Colyseus schema/encoder/transport cut).
- Installed `main.js`: 5,928,789 bytes; 1,082,275 bytes over the wire with brotli.
- First page load: 1,132,840 bytes / nine same-origin requests, no 404s.
- Loaded with no query string; standalone.js supplies `name=player&offline`; the world renders
  with the FPS overlay visible. The 45 s virtual-time capture completed with no console errors.
- `?blur=0` and `?lite` were both loaded and rendered.
- Static screenshot matches the production art; the only intended visual additions are the FPS
  panel and motion-dependent blur.
