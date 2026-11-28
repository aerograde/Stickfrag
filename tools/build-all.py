#!/usr/bin/env python3
"""Build everything from the recovered source, in one command, on any OS.

    readable/main.lean.js
      -> patch layers (tools/patch-build.py)
      -> readable/main.stickfrag.js
      -> build/main.js            (esbuild, pinned version)
      -> stickfrag.com/play/main.js
      -> stickfrag.com/stickfrag.html  (single self-contained file)
      -> stickfrag.com/stickfrag.svg   (same payload, wrapper)

Every patch is an exact-match replacement, so a moved upstream fails the build
instead of silently producing a half-patched client.

This orchestrator exists because `build-all.sh` needs bash and `npx` resolves to
`npx.cmd` on Windows. The shell script now just calls this file; running
`python3 tools/build-all.py` directly works everywhere.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BUILD = ROOT / "build"
SITE = ROOT / "stickfrag.com"
PY = sys.executable


def run(args: list[str]) -> None:
    print("==", " ".join(args[:3]), "..." if len(args) > 3 else "")
    subprocess.run(args, check=True, cwd=ROOT)


def main() -> None:
    node = shutil.which("node")
    if not node:
        raise SystemExit(
            "build: Node.js was not found on PATH. Install Node.js 18+ first, "
            "then run the build again."
        )

    print("== patching ==")
    run(
        [
            PY,
            "tools/patch-build.py",
            "perf",
            "wheel",
            "net",
            "abilities",
            "abilities_bind",
            "portable",
            "fallback",
        ]
    )

    print("== syntax ==")
    # The client is ESM with top-level await, and it has no package.json. Node's
    # syntax detection assumes CommonJS for a bare .js, so check a .mjs copy.
    check = BUILD / "check.mjs"
    BUILD.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(ROOT / "readable" / "main.stickfrag.js", check)
    try:
        run([node, "--check", str(check)])
    finally:
        check.unlink(missing_ok=True)

    print("== bundling ==")
    run(
        [
            PY,
            "tools/esbuild_runner.py",
            "readable/main.stickfrag.js",
            "--bundle",
            "--minify",
            "--format=esm",
            "--target=esnext",
            "--legal-comments=inline",
            "--outfile=build/main.js",
        ]
    )

    print("== installing ==")
    shutil.copyfile(BUILD / "main.js", SITE / "play" / "main.js")

    print("== home screen bundle ==")
    run([PY, "tools/build-home-bundle.py"])

    print("== single file ==")
    run([PY, "tools/build-single.py"])

    print("== single file, svg wrapper ==")
    run([PY, "tools/build-svg.py"])

    print("== done ==")
    for path in (
        SITE / "stickfrag.html",
        SITE / "stickfrag.svg",
        SITE / "play" / "main.js",
    ):
        print(f"{path.relative_to(ROOT)}  {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
