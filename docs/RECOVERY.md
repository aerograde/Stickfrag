# Source recovery report

The question was: why do we need the original source, and can we recover it from what we have?

Short answer: the **exact original source is not present anywhere we can reach**. What we *can*
recover is a functionally equivalent, editable, rebuildable source file. That has now been done
and verified.

## What was searched

| Route | Result |
| --- | --- |
| `GET /play/main.js.map` and variants (`?v=`, `.gz`, `.br`, other hosts) | 404 |
| `SourceMap` response header on `main.js` | absent |
| `sourcesContent` / inline data-URI map in the bundle | absent |
| Wayback CDX for `stickfrag.com/play/main.js.map` | no snapshots |
| Wayback CDX for the whole domain (200 indexed URLs) | no `.map`, `.ts`, `/src/` or source files |
| GitHub repository search for `stickfrag` | 0 repositories |
| npm registry search for `stickfrag` | 0 packages |
| Sourcegraph / grep.app for unique internal filenames | no public match (grep.app blocked by a checkpoint) |
| Site imprint | names a private individual; no repository link |

Wayback did preserve four older `main.js` builds (`v=c2f0958b4e`, `d6b0b44daa`, `e84d6b90ba`,
`e9935a904c`). All are minified, none carries an inline map, and the archived map URL was never
captured. They do expose a few more original filenames (`client/src/art/mapLooks.ts`,
`client/src/art/style.ts`, `client/src/html.ts`, `lightBake.ts`, `night.ts`) but no source.

The bundle's own `//# sourceMappingURL=/play/main.js.map` is a dangling reference.

## What was recovered

`readable/main.js` is the production bundle formatted by Prettier (formatting only, no semantic
transformations): 126,617 lines. This is now a working source file, not just a reading aid:

1. It was substituted for the minified module in `play/index.html`.
2. The game was launched offline (`?name=tester&offline&map=yard`) in headless Chrome.
3. Its screenshot matched the production bundle.

`readable/main.named.js` is the same code with 36 subsystem classes renamed (`Game`, `Hud`,
`Predictor`, `Renderer`, `NetClient`, …). The rename is scope-aware, inferred from preserved
fields/methods, and preserves the 126,617-line map. `docs/NAMES.md` records the mapping.

`tools/optimize.py` then applies the standalone/performance layer (`readable/main.fast.js`):
FPS default, low-latency context, half-rate HIGH shadows, FPS-governed motion blur, `?lite`,
offline frame-path skips, cached static paper, lazy results podium, event-fetch removal and
missing-asset request removal. Two pruning passes follow:

```text
readable/main.named.js    (126,617 lines)  rename
        │  tools/optimize.py
        ▼
readable/main.fast.js     (126,821 lines)  performance/standalone
        │  tools/strip-net.js   (NetClient, MultiplayerClient, EC, Room, Auth, HttpApi)
        ▼
readable/main.offline.js  (126,821 lines)
        │  tools/cut-sdk.py     (Colyseus schema/encoder/transport cluster)
        ▼
readable/main.lean.js     (119,059 lines)  installed source
        │  tools/build-source.sh (esbuild)
        ▼
build/main.js             (5,928,789 bytes, 1,082,275 brotli; play/main.js)
```

The lean cut removes the dormant rooms/schema/transport; the offline boot does not construct a
room, decode a patch or send input. The offline bundle was loaded at a 45 s virtual-time budget;
the world rendered with the FPS overlay and no console errors.

The rebuilt bundle was substituted into the page and run offline. Captures looked different at
first; varying the capture budget showed both bundles produce both frames, so the difference was
animation timing, not semantics. The edit → rebuild → play loop is verified.

`docs/SYMBOLS.md` maps the recovered classes and the important method anchors (HUD, predictor,
game loop, input, network client, renderer, clock), since 4,657 top-level declarations are not
navigable by name.

## What cannot be recovered

- Original identifiers. Minification replaced locals and top-level names; method and property
  names survive, which is why the class map is possible.
- TypeScript types, interfaces and generics.
- Comments, except two CSS-in-JS comments and the three.js licence comment that survived.
- Original module boundaries. esbuild inlined everything into one scope; there are no module
  markers to split on.
- Tests, design docs (`play-menu.md`, `private-rooms.md`, `owner-powers.md`) and the server.
- The server's simulation, which was never sent to the browser.

## Why the distinction matters

The recovered source is enough to read, patch and rebuild behavior. It is **not** enough to make
large structural changes with confidence: every edit happens inside one generated file with
mangled locals, no types and no module boundaries. That is the practical reason the original
source is preferable for a serious optimisation effort.

For frame rate specifically, the original source would not change the ceiling: the client already
requests a high-performance GPU context, runs a 60 Hz fixed step, uses baked light data and
defaults to the HIGH preset (1.5× pixel ratio, 4096 shadow maps). Faster than that without
touching visual quality is a rendering-research problem, not a code-availability problem.

## Legal

StickFrag's terms (section 10) forbid copying, publishing or self-hosting the game. This recovered
tree is for personal analysis only.
