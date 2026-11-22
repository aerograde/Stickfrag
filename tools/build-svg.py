"""Wrap the single-file build in an SVG document.

An `.svg` opened directly is an *XML* document, not an HTML one, and that matters:

- `document.documentElement` is the `<svg>` root, so `document.body` is null and
  every `document.body.appendChild(...)` in the game throws.
- `document.createElement("canvas")` resolves against the document's default
  namespace, which is SVG, so it returns an `SVGElement` named canvas with no
  `getContext`. Three.js needs real canvases for its textures and the lobby.

So the game cannot run *inside* the SVG document. This wrapper instead carries the
untouched HTML in a CDATA block and writes it into a fresh `about:blank` tab, which
is a real HTML document: `document.body`, `createElement`, canvas and pointer lock
all behave exactly as they do when the .html is opened directly, because it is the
same bytes.

Browsers refuse `window.open` without a user gesture, so the launch is attempted on
load and the whole SVG is also a button that retries on click.

The payload sits in CDATA rather than an attribute because the file is 9.5 MB and
contains thousands of quotes and ampersands; CDATA needs no escaping. It is safe
here only because the build contains no `]]>` -- `build()` refuses otherwise.
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "stickfrag.com" / "stickfrag.html"
OUT = ROOT / "stickfrag.com" / "stickfrag.svg"

TEMPLATE = """<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
     viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet"
     style="background:#16121c;display:block;cursor:pointer"
     role="link" aria-label="Open StickFrag in a new tab">
  <title>STICKFRAG</title>
  <defs>
    <linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1d1730"/>
      <stop offset="1" stop-color="#0d0a13"/>
    </linearGradient>
  </defs>

  <rect width="1000" height="620" fill="url(#sf-sky)"/>

  <g id="sf-screen">
    <text x="500" y="268" text-anchor="middle"
          font-family="Impact, 'Arial Black', 'Helvetica Neue', sans-serif"
          font-size="116" font-weight="900" letter-spacing="8"
          fill="#ff2a4d" stroke="#000" stroke-width="12"
          paint-order="stroke" stroke-linejoin="round">STICKFRAG</text>

    <text id="sf-hint" x="500" y="330" text-anchor="middle"
          font-family="'Helvetica Neue', Arial, sans-serif" font-size="21"
          letter-spacing="4" fill="#c9c4d6">OPENING IN A NEW TAB\u2026</text>

    <g id="sf-button">
      <rect x="368" y="376" width="264" height="70" rx="8"
            fill="#ff2a4d" stroke="#000" stroke-width="6"/>
      <text x="500" y="423" text-anchor="middle"
            font-family="Impact, 'Arial Black', sans-serif" font-size="30"
            letter-spacing="3" fill="#fff" stroke="#000" stroke-width="4"
            paint-order="stroke">OPEN THE GAME</text>
    </g>

    <text x="500" y="500" text-anchor="middle"
          font-family="'Helvetica Neue', Arial, sans-serif" font-size="15"
          letter-spacing="2" fill="#7d7690">CLICK ANYWHERE IF THE TAB DOES NOT OPEN</text>
  </g>

  <script type="text/plain" id="sf-source"><![CDATA[__SF_PAYLOAD__]]></script>
  <script><![CDATA[
  (function () {
    var node = document.getElementById("sf-source");
    var hint = document.getElementById("sf-hint");
    if (!node) return;
    var payload = node.textContent;

    function launch() {
      var win = null;
      try { win = window.open("about:blank", "_blank"); } catch (e) { win = null; }
      if (!win) return false;
      try {
        var doc = win.document;
        doc.open();
        doc.write(payload);
        doc.close();
      } catch (e) {
        try { win.close(); } catch (c) {}
        return false;
      }
      try { win.focus(); } catch (e) {}
      // The new tab is the game now; this one only reports where it went.
      node.textContent = "";
      if (hint) hint.textContent = "RUNNING IN THE TAB THAT JUST OPENED";
      return true;
    }

    // Try straight away: some browsers allow it, and the ones that do not will
    // simply return null. The whole document is a retry button either way.
    var done = launch();
    if (!done && hint) hint.textContent = "CLICK TO START";

    document.documentElement.addEventListener("click", function () {
      if (launch()) return;
      if (hint) hint.textContent = "THE BROWSER BLOCKED THE TAB \u2014 ALLOW POP-UPS AND CLICK AGAIN";
    });
  })();
  ]]></script>
</svg>
"""


def build() -> None:
    html = SRC.read_text(encoding="utf-8")
    if "]]>" in html:
        sys.exit("build-svg: payload contains ']]>', which would end the CDATA block")
    OUT.write_text(TEMPLATE.replace("__SF_PAYLOAD__", html), encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}  {OUT.stat().st_size:,} bytes")


if __name__ == "__main__":
    build()
