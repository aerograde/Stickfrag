#!/usr/bin/env python3
"""Run the pinned esbuild, on every OS.

The home bundle is patched by exact-match substitutions against minified names,
so the bundler version is part of the build, not an incidental download. A
floating `esbuild@0.25` can change those names and leave the patches unmatched;
this pins the version that the current bundles were built with.

On Windows, `npx` is `npx.cmd`, which `CreateProcess` will not execute directly,
so it goes through `cmd.exe`.
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys

VERSION = "0.25.12"


def run(args: list[str], cwd: str | None = None, quiet: bool = False) -> None:
    npx = shutil.which("npx") or shutil.which("npx.cmd") or shutil.which("npx.exe")
    if not npx:
        raise SystemExit(
            "esbuild_runner: Node.js/npx was not found on PATH.\n"
            "Install Node.js 18+ (https://nodejs.org) and run the build again."
        )
    cmd = [npx, "--yes", f"esbuild@{VERSION}", *args]
    if os.name == "nt" and npx.lower().endswith((".cmd", ".bat")):
        cmd = [os.environ.get("COMSPEC", "cmd.exe"), "/d", "/c", *cmd]
    subprocess.run(
        cmd,
        check=True,
        cwd=cwd,
        stdout=subprocess.DEVNULL if quiet else None,
        stderr=subprocess.STDOUT if quiet else None,
    )


def main(argv: list[str]) -> None:
    if not argv:
        raise SystemExit("usage: esbuild_runner.py <esbuild arguments...>")
    run(argv)


if __name__ == "__main__":
    main(sys.argv[1:])
