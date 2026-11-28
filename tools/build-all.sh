#!/usr/bin/env bash
# Build everything from the recovered source, in one command.
#
# The real work lives in tools/build-all.py so the same build runs on Windows,
# Linux and macOS. This wrapper is kept because it is the documented entry point.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

exec python3 tools/build-all.py "$@"
