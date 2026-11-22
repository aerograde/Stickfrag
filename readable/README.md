# recovered source

Five representations of the production `stickfrag.com/play/main.js`:

- `main.js` — formatting-only recovery (Prettier). Names are exactly the bundle's minified
  names. Fidelity reference.
- `main.named.js` — same code with 36 subsystem classes renamed (`Game`, `Hud`, `Predictor`,
  `Renderer`, `NetClient`, `ServerClock`, …). Scope-aware and inferred from preserved fields
  and methods; see `docs/NAMES.md`.
- `main.fast.js` — 126,821 lines. The standalone/performance layer (`tools/optimize.py`): FPS on
  by default, low-latency WebGL context, HIGH shadows every other frame, FPS-governed world-only
  motion blur, `?lite` LOW preset, offline frame-path skips, cached paper, lazy results podium,
  no missing-asset requests. It adds a `TemporalBlend` class after `ComicPass`, so line numbers
  after that point shift by about 150 relative to the first two files.
- `main.offline.js` — 126,821 lines. `main.fast.js` with `NetClient`, `MultiplayerClient`, `EC`,
  `Room`, `Auth` and `HttpApi` removed (`tools/strip-net.js`). The offline boot does not use them.
- `main.lean.js` — 119,059 lines. `main.offline.js` with the Colyseus schema/encoder/transport
  cluster cut (`tools/cut-sdk.py`). This is the installed source. The cut drops lines, so its
  line numbers no longer match the documented anchors; use `main.named.js`/`main.fast.js` for
  navigation.

`play/main.js` is built from `main.lean.js`; the untouched production bundle is
`build/main.original.js`.

`tools/build-source.sh` builds `main.lean.js` by default with esbuild to `build/main.js`. The
formatted source and the rebuilt bundles were run offline and compared against production. Some
captures looked different until the capture budget changed; both bundles produce both frames, so
that was animation timing, not semantics.

What is gone: original identifiers (except methods/properties), TypeScript types, comments and
module boundaries. What works: reading, patching and rebuilding behavior.

Commands:

```bash
./tools/beautify.sh      # production main.js -> readable/main.js
node tools/rename.js     # readable/main.js -> readable/main.named.js + docs/NAMES.md
python3 tools/optimize.py # named -> readable/main.fast.js
node tools/strip-net.js   # fast -> readable/main.offline.js
python3 tools/cut-sdk.py  # offline -> readable/main.lean.js (installed)
./tools/build-source.sh   # lean -> build/main.js
```

`tools/rename.js` and `tools/strip-net.js` need Babel's parser/traverse/generator:

```bash
npm i --no-save @babel/parser @babel/traverse @babel/generator
```

See `docs/RECOVERY.md` for the source search and `docs/OPTIMIZATIONS.md` for the client changes.
