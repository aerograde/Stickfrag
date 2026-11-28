#!/usr/bin/env bash
# Rebuild a deployable bundle from the recovered, formatted source.
# Input:  readable/main.fast.js  (optimised client; falls back to named/base)
# Output: build/main.js          (minified ESM bundle, not installed by default)
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source="${1:-$root/readable/main.lean.js}"
[ -f "$source" ] || source="$root/readable/main.offline.js"
[ -f "$source" ] || source="$root/readable/main.fast.js"
[ -f "$source" ] || source="$root/readable/main.named.js"
[ -f "$source" ] || source="$root/readable/main.js"
mkdir -p "$root/build"
python3 "$root/tools/esbuild_runner.py" "$source" \
  --bundle --minify --format=esm --target=esnext --legal-comments=inline \
  --outfile="$root/build/main.js"
ls -lh "$root/build/main.js"
