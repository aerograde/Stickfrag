# Recovered class map

Generated from `readable/main.named.js` with `@babel/parser`. The 36 subsystem classes
named in `docs/NAMES.md` use their recovered names; everything else keeps the bundle's
minified name. Role labels are inferred from preserved fields and methods.
File: 126,617 lines. Classes found: 190.

Vendor layout, roughly: three.js is dominant from ~64k to ~90k, the game's rendering and
simulation sits from ~90k to ~118k, Colyseus schema/transport code is interleaved around
110k–118k, and more game code continues from ~118k to the end.

## High-confidence method anchors

| class | role | method | line |
| --- | --- | --- | ---: |
| `Game` | game orchestrator | `frame` | 109214 |
| `Game` | game orchestrator | `start` | 109172 |
| `Game` | game orchestrator | `startOffline` | 109252 |
| `Game` | game orchestrator | `onSnapshot` | 109190 |
| `Game` | game orchestrator | `onMatch` | 109199 |
| `Game` | game orchestrator | `onWelcome` | 109187 |
| `Game` | game orchestrator | `leave` | 109246 |
| `Game` | game orchestrator | `setNotice` | 109243 |
| `Predictor` | local predictor | `applyLocal` | 102175 |
| `Predictor` | local predictor | `reconcile` | 102180 |
| `Predictor` | local predictor | `reset` | 102154 |
| `Predictor` | local predictor | `follow` | 102169 |
| `Predictor` | local predictor | `respawned` | 102163 |
| `Hud` | HUD | `setFps` | 101539 |
| `Hud` | HUD | `setDebug` | 101281 |
| `Hud` | HUD | `setAmmoCard` | 101311 |
| `Hud` | HUD | `showLeft` | 101459 |
| `Hud` | HUD | `setPauseOwner` | 101366 |
| `Renderer` | renderer | `render` | 125350 |
| `Renderer` | renderer | `warmUp` | 125419 |
| `Renderer` | renderer | `setRemotes` | 125307 |
| `Renderer` | renderer | `setAim` | 125313 |
| `NetClient` | network client | `connect` | 118234 |
| `NetClient` | network client | `queue` | 118281 |
| `NetClient` | network client | `flush` | 118284 |
| `NetClient` | network client | `chat` | 118287 |
| `NetClient` | network client | `report` | 118290 |
| `Input` | input | `sample` | 109769 |
| `Input` | input | `aimGuard` | 109728 |
| `Rewards` | rewards / XP / packs | `welcome` | 106843 |
| `Viewmodel` | viewmodel | `update` | 122388 |
| `Viewmodel` | viewmodel | `fire` | 122353 |
| `Viewmodel` | viewmodel | `muzzleIn` | 122348 |

## Game-area classes (line ≥ 85,000, span ≥ 40 lines)

| line | span | class | inferred role | first methods |
| ---: | ---: | --- | --- | --- |
| 86831 | 441 | `Og` |  | constructor |
| 87678 | 1295 | `f4` |  | constructor, coordinateSystem, outputColorSpace, outputColorSpace |
| 90058 | 97 | `qc` |  | constructor, blast, update, place |
| 90297 | 90 | `r9` |  | constructor, textures, pop, stamp, update, wordTexture, popSprite |
| 90477 | 54 | `n9` |  | constructor, made, clear, update |
| 91001 | 254 | `x4` |  | constructor, textures, tracer, pop, impact, slideDust, hit, headBurst, bleed, drip |
| 91698 | 99 | `s9` |  | constructor, frame, frameDone, event, snapshot, predictedHit, confirmedHit, corrected, error, restart |
| 92004 | 56 | `p9` |  | step, shown, at, mirror |
| 92264 | 51 | `w9` |  | start, stop, drop, onEvent, has, weightOf, apply |
| 92369 | 84 | `x9` |  | constructor, attach, open, toggle, openWheel, close, pick, noteInput, frame, view |
| 92463 | 65 | `yi` |  | constructor, fromJSON |
| 93731 | 57 | `M9` |  | constructor, setHealth, setFlash, makeArcs, hurt, updateArcs |
| 93894 | 158 | `D9` |  | constructor, clear, onMatch, name, announce, scored, carriers, liveFlags, update, updateStrip |
| 94345 | 89 | `H9` |  | push, latest, clear, sample |
| 97376 | 296 | `StickmanRenderer` | stickman renderer | constructor, setOn, kill, kick, dismember, clear, update, freePiece, colours, flyHead |
| 97805 | 100 | `Eu` |  | constructor, meshes, noFarShadows, begin, drew, forget, takeBack, draw |
| 97923 | 63 | `bu` |  | constructor, meshes, noFarShadows, begin, forget, takeBack, drew, dress, draw, mesh |
| 97986 | 49 | `yu` |  | constructor, meshes, setup, resetCounts, begin, forget, takeBack, drew, dress, head |
| 98035 | 219 | `Qu` |  | constructor, meshes, setCount, limb, drawTorso, limbParts, ball, bone, stump, deadLimbs |
| 98309 | 46 | `Du` |  | get, forget, clear, begin, end, point, dust |
| 98390 | 262 | `Stickmen` | stickman factory | onDust, constructor, meshes, setWorld, onKill, clear, livePoseOf, pointsOf, showBody, muzzleOf |
| 99557 | 67 | `Ru` |  | update, clear, make |
| 100629 | 287 | `Breakables` | map effects / breakables | constructor, fillPanels, colourOf, boxMatrix, markPanels, markChunks, reset, blast, frame, openPanel |
| 101099 | 87 | `XpBar` | XP bar HUD | constructor, set, setXp, xpGain, showLevelUp, toast, killFeed, dropTaken, joined, feed |
| 101203 | 341 | `Hud` | HUD | set, showGameHud, setStatus, toggleDebug, setDebug, setAim, setGear, damageNumber, setRangePanel, setAmmoCard |
| 102081 | 60 | `Podium` | podium scene | constructor, setAspect, setColor, setSkin, leave, update |
| 102141 | 75 | `Predictor` | local predictor | constructor, pendingCount, reset, queueFrozen, respawned, follow, applyLocal, reconcile, replay, dropAcked |
| 102731 | 75 | `ch` |  | constructor, clear, onEvent, update, offer, makeMark |
| 103711 | 153 | `Eh` |  | constructor, home, free, strain, update, collide, draw, dispose |
| 104010 | 131 | `Pickups` | pickups | constructor, addSlot, freeSlot, show, hide, clear, free, spot, spots, update |
| 104141 | 75 | `MapDrops` | map drops | constructor, reset, onEvent, update, offer, letGo |
| 104752 | 171 | `ComicPass` | comic post-process | constructor, depth, setSize, compile, render |
| 104965 | 328 | `CardPacks` | card packs | constructor, hint, tween, after, kick, ray, hit, planePoint, project, auto |
| 105350 | 92 | `Rh` |  | constructor, add, burst, smoke, blast, update, samples |
| 105496 | 420 | `CardsUI` | card UI | constructor, go, spinTo, emergeAll, ready, hitCard, overShown, move, down, up |
| 106797 | 256 | `Rewards` | rewards / XP / packs | constructor, welcome, kill, nextStreak, onEvent, resultsStart, newMatch, humanJoined, packFromCrate, packKey |
| 107053 | 59 | `OwnerMenu` | owner menu | constructor, openMenu, key, onEvent, frame |
| 107380 | 114 | `Pacing` | frame pacing / adaptive quality | constructor, due, accept, take, window, stepDown |
| 107624 | 72 | `qh` |  | constructor, take, card, update, clear |
| 107696 | 68 | `Zh` |  | constructor, hide, update |
| 107809 | 318 | `BombMode` | bomb mode | constructor, clear, onMatch, onSnapshot, name, attacking, announce, ended, pieces, left |
| 108373 | 217 | `TouchInput` | touch input | mount, setSettings, clear, frame, hide, place, placeTouch, plan, draw, dot |
| 108684 | 141 | `Hardpoint` | hardpoint mode | constructor, clear, onMatch, announce, liveMarks, mapSpots, update, updateStrip, updateMarks, makeStrip |
| 108828 | 91 | `Sights` | sights | constructor, of, use, key, kind, nextForAll, pick, setKind, next, encode |
| 108938 | 318 | `Game` | game orchestrator | isOwner, constructor, setWorld, voteKey, castVote, teamMode, sandboxLine, sendLoadout, loadoutKey, loadoutMode |
| 109290 | 102 | `Diagnostics` | frame diagnostics | takeLocks, move, restart, frame, gpu, watchPaint, mark, takePaints, cpu, lock |
| 109471 | 322 | `Input` | input | constructor, press, locked, addDevice, active, pointerless, aiming, sprinting, firing, using |
| 110594 | 61 | `J0` |  | register, cache, constructor, has, get, add, getTypeId, discoverTypes, debug |
| 110683 | 290 | `Py` |  | record, recordDelete, recordRaw, recordPure, operationAt, setOperationAt, forEach, forEachWithCtx, size, has |
| 111333 | 503 | `Sy` |  | constructor, change, delete, indexedOperation, operation, setParent, addParent, setParentIndex, removeParent, getChange |
| 111992 | 88 | `Dm` |  |  |
| 112086 | 454 | `$a` |  | W0, is, from, constructor, initializeForDecoder, length, length, pauseTracking, resumeTracking, untracked |
| 112541 | 264 | `el` |  | maxPerTick, maxPerTick, priority, priority, $indexes, _collectionIndexes, W0, is, constructor, initializeForDecoder |
| 112806 | 181 | `vm` |  | maxPerTick, maxPerTick, priority, priority, W0, is, constructor, initializeForDecoder, add, at |
| 112988 | 181 | `Im` |  | maxPerTick, maxPerTick, priority, priority, W0, is, constructor, initializeForDecoder, add, entries |
| 113170 | 123 | `zf` |  | maxPerTick, maxPerTick, priority, priority, W0, is, constructor, initializeForDecoder, add, remove |
| 113294 | 68 | `T2` |  | constructor, default, view, unreliable, patchOnly, fullStateOnly, noSync, stream, priority, deprecated |
| 113691 | 211 | `Nt` |  | initialize, initializeForDecoder, reset, G1, is, isSchema, S2, W0, constructor, assign |
| 113903 | 147 | `Hy` |  | enqueueFilterRefresh, acquireViewId, releaseViewId, registerView, unregisterView, forEachActiveView, registerStream, unregisterStream, constructor, add |
| 114130 | 535 | `PA` |  | constructor, setState, decode, decodeResync, skipCurrentStructure, getInstanceType, createInstanceOfType, removeChildRefs |
| 114772 | 96 | `Yf` |  | constructor, seq, encode, reset, copyInto, _produceDelta, _pushAndEmitRing, _emitRing, _grow |
| 114896 | 241 | `InputBuffer` | Colyseus input buffer | constructor, mode, tickRate, stepSeconds, stepMs, patchRate, subSteps, subStepSeconds, subStepMs, lastProcessed |
| 115137 | 132 | `ServerClock` | server clock | serverNow, renderNow, setRenderTau, now, rtt, smoothedRtt, jitter, lastServerTime, patchInterval, setPatchInterval |
| 115269 | 81 | `xs` |  | constructor, patchRate, applyReflection, applyOptions, ackInput, reset, handle |
| 115375 | 86 | `nl` |  | constructor, unpack, unpackMultiple, _mergeStructures, decode |
| 116190 | 540 | `il` |  | constructor, useBuffer, position, position, clearSharedData |
| 116935 | 118 | `Om` |  | constructor, connect, send, sendUnreliable, frame, close, readIncomingData, readIncomingUnreliableData, readLoop, onChannelFailure |
| 117054 | 42 | `rp` |  | constructor, send, sendUnreliable, connect, close, isOpen |
| 117107 | 44 | `bs` |  | constructor, connect, send, sendUnreliable, reconnect, close, isOpen |
| 117265 | 346 | `Room` | Colyseus room | constructor, connect, leave, onMessage, ping, send, request, sendRequest, cancelRequest, sendUnreliable |
| 117690 | 80 | `HttpApi` | Colyseus HTTP | constructor, fetchFn, request, get, post, delete, patch, put, executeRequest |
| 117826 | 102 | `Auth` | Colyseus auth | constructor, token, token, onChange, getUserData, registerWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, sendPasswordResetEmail, signInWithProvider |
| 117939 | 183 | `MultiplayerClient` | Colyseus client | constructor, selectByLatency, joinOrCreate, create, join, joinById, reconnect, consumeSeatReservation, getLatency, createMatchMakeRequest |
| 118226 | 131 | `NetClient` | network client | constructor, connect, roomId, queue, flush, chat, report, voteKick, loadout, switchTeam |
| 118399 | 77 | `sp` |  | constructor, render |
| 118476 | 57 | `dp` |  | constructor, setSize, render |
| 118791 | 188 | `Ambient` | ambient | constructor, onGunshot, update, updateBirds, place, updateFlag, updateTraffic, updatePuffs, puff, newPuff |
| 119078 | 85 | `fp` |  | constructor, addPedestal, addRack, addPlate, addItem, finish, setAvailable, buildPlates |
| 119189 | 103 | `wp` |  | constructor, onPedestal, onRack, onDummy, setAvailable |
| 120347 | 225 | `MapProps` | map props | constructor, add, cut, clear, update, carrierOf, along, axes, ortho, place |
| 120644 | 56 | `vp` |  | constructor, hide, update |
| 120716 | 43 | `Ip` |  | constructor, hide, update |
| 120781 | 135 | `kp` |  | constructor, puff, thrown, backblast, burst, update |
| 120993 | 49 | `zp` |  | constructor, add, clear |
| 121094 | 149 | `Glass` | breakable glass | constructor, crack, syncCracks, show, burst, update |
| 121350 | 209 | `Bottles` | glass / bottles | constructor, hit, walkInto, panesBack, apply, crack, show, burst, update |
| 121574 | 130 | `Np` |  | constructor, setAspect, start, inIntro, update, textures, paintVeil |
| 122237 | 328 | `Viewmodel` | viewmodel | constructor, aim, setSkin, setSize, muzzleIn, fire, select, reachFrom, update, playBeats |
| 123894 | 58 | `Vp` |  | add, build |
| 125173 | 304 | `Renderer` | renderer | drawCalls, constructor, setQuality, topPixelRatio, setPixelRatio, setMap, rebuildArt, applyLook, setRemotes, setFov |
| 125777 | 44 | `rw` |  | add, notice, push, mute, unmute, isMuted, visible |

## Notes

- Start at `Game.frame` (the 60 Hz loop), `Game.startOffline`, `Predictor.reconcile`,
  `Hud.setFps`, `Renderer.render` and `Input.sample`. `NetClient` and the Colyseus clock are
  present in this production map but removed from the installed offline/lean build.
- Method and property names survive minification; local variable names do not.
- Line numbers refer to `readable/main.named.js`. `readable/main.js` has the identical line map
  with the original minified class names. `readable/main.fast.js` shifts lines after `ComicPass`
  by about 150; `readable/main.lean.js` cuts the network/schema cluster and has no compatible
  line map.
