#!/usr/bin/env bash
# Regenerate readable/main.js from the production bundle.
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$root/readable"
cp "$root/stickfrag.com/play/main.js" "$root/readable/main.js"
cd "$root"
npx --yes prettier@3 --no-config --print-width 120 --write readable/main.js
wc -l readable/main.js
