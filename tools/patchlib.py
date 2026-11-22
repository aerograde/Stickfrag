"""Exact-match source patching for the recovered StickFrag bundle.

The bundle is a formatted minified artifact with no source map, so every patch is
anchored on an exact code fragment and must apply exactly once. A patch that does
not match is an error, never a silent skip: upstream code moving is precisely the
case where a partial build would ship something nobody verified.
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEAN = ROOT / "readable" / "main.lean.js"
OUT = ROOT / "readable" / "main.stickfrag.js"


class PatchError(RuntimeError):
    pass


def sub(text: str, name: str, old: str, new: str, count: int = 1) -> str:
    found = text.count(old)
    if found != count:
        raise PatchError(
            f"[{name}] expected {count} match(es), found {found}.\n"
            f"--- fragment ---\n{old[:400]}"
        )
    return text.replace(old, new, count)


def insert_before(text: str, name: str, anchor: str, payload: str) -> str:
    return sub(text, name, anchor, payload + anchor)


def insert_after(text: str, name: str, anchor: str, payload: str) -> str:
    return sub(text, name, anchor, anchor + payload)


def load(path: Path = LEAN) -> str:
    if not path.is_file():
        raise PatchError(f"missing source: {path}")
    return path.read_text(encoding="utf-8")


def save(text: str, path: Path = OUT) -> None:
    path.write_text(text, encoding="utf-8")


def run(steps, src: Path = LEAN, dst: Path = OUT) -> None:
    """Apply a list of (name, function) steps to src and write dst."""
    text = load(src)
    before = len(text)
    for name, fn in steps:
        try:
            text = fn(text)
        except PatchError as exc:
            print(f"FAILED {name}\n{exc}", file=sys.stderr)
            raise SystemExit(1)
        print(f"  ok  {name}")
    save(text, dst)
    print(f"wrote {dst.relative_to(ROOT)}  ({before:,} -> {len(text):,} bytes)")
