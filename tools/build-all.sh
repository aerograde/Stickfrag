#!/usr/bin/env bash
# Build everything from the recovered source, in one command.
#
#   readable/main.lean.js
#     -> patch layers (tools/patch-build.py)
#     -> readable/main.stickfrag.js
#     -> build/main.js            (esbuild)
#     -> stickfrag.com/play/main.js
#     -> stickfrag.com/stickfrag.html  (single self-contained file)
#
# Every patch is an exact-match replacement, so a moved upstream fails the build
# instead of silently producing a half-patched client.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

echo "== patching =="
python3 tools/patch-build.py perf wheel net abilities abilities_bind portable

echo "== syntax =="
node --check readable/main.stickfrag.js

echo "== bundling =="
npx --yes esbuild@0.25 readable/main.stickfrag.js \
  --bundle --minify --format=esm --target=esnext --legal-comments=inline \
  --outfile=build/main.js
ls -lh build/main.js

echo "== installing =="
cp build/main.js stickfrag.com/play/main.js

echo "== home screen bundle =="
python3 tools/build-home-bundle.py

echo "== single file =="
python3 tools/build-single.py

echo "== single file, svg wrapper =="
python3 tools/build-svg.py

echo "== done =="
ls -lh stickfrag.com/stickfrag.html stickfrag.com/stickfrag.svg stickfrag.com/play/main.js
