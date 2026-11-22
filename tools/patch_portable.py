"""Make the single-file build truly self-contained when opened from disk.

Everything else is already inlined; the five weapon icons in the loadout HUD are
not. They are fetched from the site root as `/loadout-<id>.webp`, which resolves
to the filesystem root under `file://` and 404s.

Rather than asking anyone to keep five small files beside the page, they are
embedded as data URIs. Base64 costs about a third on top of ~15 KB of WebP, which
is nothing against a 5.8 MB bundle, and it means `stickfrag.html` genuinely runs
from anywhere on its own.
"""

from __future__ import annotations

import base64
from pathlib import Path

from patchlib import sub

ROOT = Path(__file__).resolve().parent.parent
ICON_DIR = ROOT / "stickfrag.com"


def icon_table() -> dict[str, str]:
    """Map each loadout icon id to a data URI of the real image."""
    table: dict[str, str] = {}
    for path in sorted(ICON_DIR.glob("loadout-*.webp")):
        key = path.stem.removeprefix("loadout-")
        data = base64.b64encode(path.read_bytes()).decode("ascii")
        table[key] = f"data:image/webp;base64,{data}"
    if not table:
        raise AssertionError("no loadout icons found to inline")
    return table


def inline_icons(text: str) -> str:
    """Replace both icon URL templates with a data-URI lookup."""
    table = icon_table()
    entries = ",\n".join(f"  {k!r}: {v!r}" for k, v in sorted(table.items()))
    table_src = f"globalThis.__sfIcons = {{\n{entries}\n}};\n"

    # The palette lookup: `/loadout-<id>.webp` -> the inlined image.
    text = sub(
        text,
        "single:icon-path",
        "  let o = `/loadout-${e}.webp`;",
        "  let o = (globalThis.__sfIcons || {})[e] || \"\";",
    )
    # The <img> that renders it.
    text = sub(
        text,
        "single:icon-img",
        '  return de`<img src="/loadout-${o}.webp" alt="" draggable="false">`;',
        '  return de`<img src="${(globalThis.__sfIcons || {})[o] || ""}" alt="" draggable="false">`;',
    )
    return sub(text, "single:icon-table", "async function She() {", table_src + "async function She() {")


STEPS = [
    ("single: inline icons", inline_icons),
]
