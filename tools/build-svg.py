"""Wrap the single-file build in an SVG document.

An `.svg` opened directly is an *XML* document, not an HTML one: `document.body`
is null, and `document.createElement("canvas")` returns an `SVGElement` with no
`getContext`. The game cannot run inside it.

So the SVG carries the untouched HTML and runs it in a nested browsing context.
There are two, and which one is used depends on where the file came from:

* **`file://` -- an inline `<iframe>`, in place.** This is the normal case for a
  single file somebody double-clicks. The payload becomes a blob URL and the
  iframe navigates to it. Verified in Chromium: WebGL2 works, localStorage works,
  and `requestPointerLock` succeeds, so the mouse can be captured for aiming.
  (`about:srcdoc` is not used: pointer lock fails there with a
  `WrongDocumentError`, which would leave the game unplayable.)
* **`http(s)` -- a new tab, as before.** Chromium refuses pointer lock inside a
  blob document served over http, so the popup path stays for that case. It is
  also what makes an `?peer=join&room=...` invite link work when served.

The payload sits in CDATA rather than an attribute because the file is ~10 MB and
contains thousands of quotes and ampersands; CDATA needs no escaping. It is safe
only because the build contains no `]]>` -- `build()` refuses otherwise.
"""

from __future__ import annotations

import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "stickfrag.com" / "stickfrag.html"
OUT = ROOT / "stickfrag.com" / "stickfrag.svg"

TEMPLATE = """<?xml version="1.0" encoding="UTF-8"?>
<!-- No viewBox and no preserveAspectRatio on purpose. An SVG with a viewBox
     scales its contents to fit, which would hand the frame a fixed 1000x620
     stage at any window size: on a phone the game would render 497 px wide
     inside a 360 px window and stay there. Without one, SVG lengths are CSS
     pixels and the frame fills the real viewport. The launcher keeps its own
     coordinate space in a nested svg element. -->
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
     style="background:#16121c;display:block"
     role="application" aria-label="StickFrag">
  <title>STICKFRAG</title>
  <defs>
    <linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1d1730"/>
      <stop offset="1" stop-color="#0d0a13"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#sf-sky)"/>

  <!-- Shown only until the inline frame takes over (file://), or as the launcher
       when the browser will not run the game in place (http). -->
  <svg id="sf-screen" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet"
       x="0" y="0" width="100%" height="100%">
    <text x="500" y="268" text-anchor="middle"
          font-family="Impact, 'Arial Black', 'Helvetica Neue', sans-serif"
          font-size="116" font-weight="900" letter-spacing="8"
          fill="#ff2a4d" stroke="#000" stroke-width="12"
          paint-order="stroke" stroke-linejoin="round">STICKFRAG</text>

    <text id="sf-hint" x="500" y="330" text-anchor="middle"
          font-family="'Helvetica Neue', Arial, sans-serif" font-size="21"
          letter-spacing="4" fill="#c9c4d6">LOADING</text>

    <g id="sf-button" style="cursor:pointer">
      <rect x="368" y="376" width="264" height="70" rx="8"
            fill="#ff2a4d" stroke="#000" stroke-width="6"/>
      <text x="500" y="423" text-anchor="middle"
            font-family="Impact, 'Arial Black', sans-serif" font-size="30"
            letter-spacing="3" fill="#fff" stroke="#000" stroke-width="4"
            paint-order="stroke">OPEN THE GAME</text>
    </g>

    <text id="sf-note" x="500" y="500" text-anchor="middle"
          font-family="'Helvetica Neue', Arial, sans-serif" font-size="15"
          letter-spacing="2" fill="#7d7690">IF IT DOES NOT START, CLICK ANYWHERE</text>
  </svg>

  <foreignObject id="sf-frame-holder" x="0" y="0" width="100%" height="100%"
                 style="display:none">
    <iframe xmlns="http://www.w3.org/1999/xhtml" id="sf-frame"
            allow="pointer-lock; fullscreen; gamepad; accelerometer; gyroscope"
            style="width:100%;height:100%;border:0;display:block;background:#16121c"></iframe>
  </foreignObject>

  <script type="text/plain" id="sf-source"><![CDATA[__SF_PAYLOAD__]]></script>
  <script><![CDATA[
  (function () {
    var node = document.getElementById("sf-source");
    var hint = document.getElementById("sf-hint");
    var screen = document.getElementById("sf-screen");
    var holder = document.getElementById("sf-frame-holder");
    var frame = document.getElementById("sf-frame");
    if (!node) return;

    // The query string has to survive, because that is how an invite link names
    // its room. An SVG document has no usable location.search when opened from
    // disk, so it is read from the document URL directly.
    var q = "";
    try {
      var href = String(location.href || "");
      var at = href.indexOf("?");
      if (at >= 0) q = href.slice(at);
    } catch (e) {}

    var blobUrl = null;

    function payloadHtml() {
      return node.textContent;
    }

    // The query string cannot ride on a blob URL: appending one makes the URL
    // invalid and the frame never loads. The parameters are injected as a script
    // into the payload's <head> instead, before its own scripts run. It reuses
    // the payload's nonce, because the payload's CSP allows only nonced scripts.
    //
    // A blob document from file:// has a null origin, and touching localStorage
    // there throws. The payload only keeps a nickname and the settings in it, so
    // a memory-backed Storage is enough to keep the menu and the game working,
    // and it is installed before anything reads them.
    function withQuery(html, query) {
      var nonce = "";
      var m = /<script nonce="([^"]+)"/.exec(html);
      if (m) nonce = ' nonce="' + m[1] + '"';
      var boot =
        "<script" + nonce + ">" +
        "(function(){" +
        "try{window.localStorage.getItem('x')}catch(e){" +
        "var mem=function(){var d={};return{" +
        "getItem:function(k){return Object.prototype.hasOwnProperty.call(d,k)?d[k]:null}," +
        "setItem:function(k,v){d[k]=String(v)}," +
        "removeItem:function(k){delete d[k]}," +
        "clear:function(){d={}}," +
        "key:function(i){return Object.keys(d)[i]??null}," +
        "get length(){return Object.keys(d).length}" +
        "}};" +
        "for(var n of ['localStorage','sessionStorage']){try{" +
        "Object.defineProperty(window,n,{value:mem(),configurable:true})}catch(_){}}" +
        "}" +
        "})();" +
        (query ? "window.__SF_PARENT_QUERY=" + JSON.stringify(query) + ";" : "") +
        "</" + "script>";
      var at = html.indexOf("</head>");
      if (at < 0) return boot + html;
      return html.slice(0, at) + boot + html.slice(at);
    }

    // The in-place path. A blob URL keeps a real origin, which is what pointer
    // lock needs; about:srcdoc fails with WrongDocumentError, so it is not used.
    function openInline() {
      try {
        var blob = new Blob([withQuery(payloadHtml(), q)], { type: "text/html" });
        blobUrl = URL.createObjectURL(blob);
        frame.src = blobUrl;
        screen.style.display = "none";
        holder.setAttribute("style", "display:block");
        node.textContent = "";
        return true;
      } catch (e) {
        return false;
      }
    }

    function openTab() {
      var win = null;
      try { win = window.open("about:blank", "_blank"); } catch (e) { win = null; }
      if (!win) return false;
      try {
        var doc = win.document;
        doc.open();
        doc.write(payloadHtml());
        doc.close();
      } catch (e) {
        try { win.close(); } catch (c) {}
        return false;
      }
      try { win.focus(); } catch (e) {}
      node.textContent = "";
      if (hint) hint.textContent = "RUNNING IN THE TAB THAT JUST OPENED";
      return true;
    }

    var fromDisk = false;
    try { fromDisk = location.protocol === "file:"; } catch (e) {}

    var started = false;
    function launch() {
      if (started) return true;
      if (fromDisk && openInline()) {
        started = true;
        return true;
      }
      started = openTab();
      return started;
    }

    // Try straight away, then let a click retry: browsers refuse window.open
    // without a gesture, and the file:// path needs nothing at all.
    if (!launch()) {
      if (hint) hint.textContent = "CLICK TO START";
      var retry = function () {
        if (launch()) {
          document.documentElement.removeEventListener("click", retry);
          return;
        }
        if (hint) hint.textContent = "THE BROWSER BLOCKED THE TAB — ALLOW POP-UPS AND CLICK AGAIN";
      };
      document.documentElement.addEventListener("click", retry);
    } else if (hint) {
      hint.textContent = "";
    }
  })();
  ]]></script>
</svg>
"""


def build() -> None:
    html = SRC.read_text(encoding="utf-8")
    if "]]>" in html:
        sys.exit("build-svg: payload contains ']]>', which would end the CDATA block")
    doc = TEMPLATE.replace("__SF_PAYLOAD__", html)
    # An SVG is parsed as XML, so a stray token is a blank page, not a warning.
    try:
        ET.fromstring(doc)
    except ET.ParseError as exc:
        sys.exit(f"build-svg: the wrapper is not well-formed XML: {exc}")
    OUT.write_text(doc, encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}  {OUT.stat().st_size:,} bytes")


if __name__ == "__main__":
    build()
