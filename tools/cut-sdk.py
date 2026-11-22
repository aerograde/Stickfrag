#!/usr/bin/env python3
"""Cut the dormant Colyseus schema/encoder/transport cluster from the offline client.

Input:  readable/main.offline.js  (produced by tools/strip-net.js)
Output: readable/main.lean.js

The offline path never constructs a room, decodes a schema patch or sends input.
The cluster runs from `var J0` to the game camera-shake helper `b7e`; cut the
whole span. Function bodies elsewhere that mention removed names are dead and
are not evaluated offline.
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src_path = root / "readable" / "main.offline.js"
dst_path = root / "readable" / "main.lean.js"

src = src_path.read_text(encoding="utf-8")
start = src.index("var J0 = class r {")
end = src.index("\nfunction b7e(", start)
out = src[:start] + src[end:]
dst_path.write_text(out, encoding="utf-8")
print(f"cut {end - start:,} chars / {src.count(chr(10)) - out.count(chr(10)):,} lines")
print(f"wrote {dst_path}: {out.count(chr(10)) + 1:,} lines")
