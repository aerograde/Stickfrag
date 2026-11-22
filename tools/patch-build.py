#!/usr/bin/env python3
"""Build readable/main.stickfrag.js from the recovered lean source by applying patches."""

from __future__ import annotations

import sys

from patchlib import run
import importlib


def load(name):
    return importlib.import_module(name)


def main() -> None:
    layers = sys.argv[1:] or ["perf"]
    steps = []
    for layer in layers:
        mod = load(f"patch_{layer}".replace("patch_patch_", "patch_"))
        print(f"layer: {layer}")
        steps.extend(getattr(mod, "STEPS"))
    run(steps)


if __name__ == "__main__":
    main()
