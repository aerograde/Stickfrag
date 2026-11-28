"""Wrap the single-file build in an SVG document.

An `.svg` opened directly is an *XML* document, not an HTML one: `document.body`
is null, and `document.createElement("canvas")` returns an `SVGElement` with no
`getContext`. The game cannot run inside it.

So the SVG carries the untouched HTML and launches it in a document that can run
it. The launcher has one job, and does it in this order:

1. **Store the HTML in IndexedDB.** The single file is put into a `stickfrag`
   database as a Blob, together with the boot script that adapts it to the
   wrapper. This is the file the new tab will read. It is best-effort: private
   modes and some file:// origins refuse storage, and the launcher still works
   from memory in that case.
2. **Launch it in `about:blank`.** A new tab is opened with a tiny bootstrap.
   That bootstrap reads the file from IndexedDB and becomes it with
   `document.write`. If IndexedDB is unavailable in the tab, it asks the opener
   for the file and the opener writes it directly. No server is involved.
3. **On `file://`, prefer an inline blob frame.** A double-clicked SVG should
   just open the game in place, and Chromium grants pointer lock inside a blob
   frame from `file://`. If the frame fails, the launcher falls back to the tab
   path on the next retry.

The payload sits in CDATA rather than an attribute because the file is ~10 MB and
contains thousands of quotes and ampersands; CDATA needs no escaping. It is safe
only because neither the payload nor the bootstrap contains `]]>` -- `build()`
refuses otherwise.
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

  <!-- Shown until the game takes over: the launcher on http(s), or a brief
       splash before the inline frame on file://. -->
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
          letter-spacing="2" fill="#7d7690">CLICK ANYWHERE TO START</text>
  </svg>

  <foreignObject id="sf-frame-holder" x="0" y="0" width="100%" height="100%"
                 style="display:none">
    <iframe xmlns="http://www.w3.org/1999/xhtml" id="sf-frame"
            allow="pointer-lock; fullscreen; gamepad; accelerometer; gyroscope"
            style="width:100%;height:100%;border:0;display:block;background:#16121c"></iframe>
  </foreignObject>

  <!-- The tiny document a new about:blank tab starts from. It reads the stored
       file and becomes it. Kept as text so the launcher can substitute the
       wrapper's URL and query before writing it. -->
  <script type="text/plain" id="sf-boot-template"><![CDATA[<!doctype html>
<meta charset="utf-8">
<title>STICKFRAG</title>
<style>
  html, body { margin: 0; height: 100%; background: #16121c; color: #fff4dc;
    font: 800 14px/1.6 ui-sans-serif, system-ui, sans-serif; letter-spacing: .14em; }
  body { display: grid; place-content: center; text-align: center; }
</style>
<div id="s">LOADING STICKFRAG</div>
<script>
(function () {
  var q = "__SF_Q__", base = "__SF_BASE__";
  var status = document.getElementById("s");
  var told = false;
  function need(reason) {
    if (told) return;
    told = true;
    status.textContent = reason || "ASKING THE LAUNCHER FOR THE FILE";
    try { opener.postMessage({ __sf: "need-file" }, "*"); } catch (e) {}
  }
  function write(html, boot) {
    if (!html || !boot) { need("THE STORED GAME IS EMPTY"); return; }
    window.__SF_LOAD_SOURCE = "idb";
    var read = html.text ? html.text() : Promise.resolve(html);
    read.then(function (h) {
      var at = h.indexOf("</head>");
      document.open();
      document.write(at < 0 ? boot + h : h.slice(0, at) + boot + h.slice(at));
      document.close();
      try { opener.postMessage({ __sf: "launched" }, "*"); } catch (e) {}
    }, function () { need("THE STORED GAME COULD NOT BE READ"); });
  }
  try {
    var req = indexedDB.open("stickfrag", 1);
    req.onupgradeneeded = function () {
      var db = req.result;
      if (!db.objectStoreNames.contains("files")) db.createObjectStore("files");
    };
    req.onerror = function () { need("STORAGE IS UNAVAILABLE"); };
    req.onsuccess = function () {
      var db = req.result;
      try {
        var tx = db.transaction("files", "readonly");
        var get = tx.objectStore("files").get("stickfrag.html");
        get.onerror = function () { need("THE STORED GAME COULD NOT BE READ"); };
        get.onsuccess = function () {
          var v = get.result;
          if (!v || !v.html || !v.boot) { need("NO STORED GAME YET"); return; }
          write(v.html, v.boot);
        };
      } catch (e) { need("STORAGE IS UNAVAILABLE"); }
    };
  } catch (e) { need("STORAGE IS UNAVAILABLE"); }
})();
</script>
]]></script>

  <script type="text/plain" id="sf-source"><![CDATA[__SF_PAYLOAD__]]></script>
  <script><![CDATA[
  (function () {
    var node = document.getElementById("sf-source");
    var hint = document.getElementById("sf-hint");
    var note = document.getElementById("sf-note");
    var screen = document.getElementById("sf-screen");
    var holder = document.getElementById("sf-frame-holder");
    var frame = document.getElementById("sf-frame");
    var bootTpl = document.getElementById("sf-boot-template");
    if (!node) return;

    var q = "", base = "";
    try {
      var href = String(location.href || "");
      var at = href.indexOf("?");
      if (at >= 0) q = href.slice(at);
      base = href.split("?")[0].split("#")[0];
    } catch (e) {}

    var payload = "";
    var blobUrl = null;
    var popup = null;
    var launched = false;
    var launching = false;
    var refilling = false;
    var pending = false;
    var forceTab = false;
    var storage = "idle"; // idle | storing | ready | failed
    var fromDisk = false;
    try { fromDisk = location.protocol === "file:"; } catch (e) {}
    // HOME returns to the menu, not into the same room again. The launch query
    // (peer/room/mode/map/play) belongs to the first match only.
    var menuQ = "";
    try {
      var mq = new URLSearchParams(q);
      var strip = ["peer", "room", "mode", "map", "play", "bots", "nobots", "offline", "embed", "slot"];
      for (var si = 0; si < strip.length; si++) mq.delete(strip[si]);
      var ms = mq.toString();
      menuQ = ms ? "?" + ms : "";
    } catch (e) { menuQ = q; }

    function safe(v) { return JSON.stringify(v).replace(/</g, "\\\\u003c"); }

    function readPayload() {
      if (!payload) payload = node.textContent || "";
      return payload;
    }

    function status(text) { if (hint) hint.textContent = text; }
    function footnote(text) { if (note) note.textContent = text; }

    function nonceOf(html) {
      var m = /<script nonce="([^"]+)"/.exec(html);
      return m ? ' nonce="' + m[1] + '"' : "";
    }

    // Everything the payload needs before its own scripts run: a storage shim
    // for opaque origins, the wrapper flags, the query and the invite base.
    // The payload must not frame its own URL -- inside the wrapper that URL is
    // the SVG, not a game -- so it runs in place in this disposable document.
    // HOME asks the launcher for a fresh document instead; nesting a second
    // blob frame inside this one is not stable in Chromium.
    function makeBoot(html, query) {
      var qq = query === undefined ? q : query;
      return "<script" + nonceOf(html) + ">(function(){" +
        "try{localStorage.setItem('__sf_probe','1');localStorage.removeItem('__sf_probe');" +
        "localStorage.getItem('__sf_probe')}catch(e){" +
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
        "window.__SF_NO_SELF_FRAME=true;" +
        "window.__SF_FORCE_EMBED=true;" +
        "window.__SF_IN_PLACE=true;" +
        "window.__SF_RELOAD_ON_HOME=true;" +
        "window.__SF_INVITE_BASE=" + safe(base) + ";" +
        (qq ? "window.__SF_PARENT_QUERY=" + safe(qq) + ";" : "") +
        "})();" + "</" + "script>";
    }

    function withBoot(html, query) {
      var boot = makeBoot(html, query);
      var at = html.indexOf("</head>");
      return at < 0 ? boot + html : html.slice(0, at) + boot + html.slice(at);
    }

    function bootDocument() {
      if (!bootTpl) return "";
      return bootTpl.textContent
        .split('"__SF_Q__"').join(safe(q))
        .split('"__SF_BASE__"').join(safe(base));
    }

    // --- IndexedDB ---------------------------------------------------------
    function store() {
      var html = readPayload();
      var value = { html: new Blob([html], { type: "text/html" }), boot: makeBoot(html) };
      storage = "storing";
      try {
        var req = indexedDB.open("stickfrag", 1);
        req.onupgradeneeded = function () {
          var db = req.result;
          if (!db.objectStoreNames.contains("files")) db.createObjectStore("files");
        };
        req.onerror = function () { storage = "failed"; ready(); };
        req.onsuccess = function () {
          try {
            var tx = req.result.transaction("files", "readwrite");
            tx.objectStore("files").put(value, "stickfrag.html");
            tx.oncomplete = function () {
              storage = "ready";
              ready();
            };
            tx.onerror = tx.onabort = function () { storage = "failed"; ready(); };
          } catch (e) { storage = "failed"; ready(); }
        };
      } catch (e) { storage = "failed"; ready(); }
    }

    // --- launcher ----------------------------------------------------------
    function show() {
      if (screen) screen.style.display = "";
      if (holder) holder.setAttribute("style", "display:none");
    }

    function hide() {
      if (screen) screen.style.display = "none";
      if (holder) holder.setAttribute("style", "display:block");
    }

    function ready() {
      if (launched) return;
      if (pending) {
        pending = false;
        // A file:// inline launch does not need a fresh gesture. A tab does:
        // this callback comes from IndexedDB, so window.open would be blocked.
        if (fromDisk && !forceTab) {
          launch();
          return;
        }
        show();
        status("READY — CLICK TO START");
        footnote("THE GAME IS STORED — CLICK ANYWHERE TO OPEN IT");
        return;
      }
      status("CLICK TO START");
      footnote("IF NOTHING HAPPENS, CLICK ANYWHERE");
      if (fromDisk && !forceTab) launch();
    }

    function failInline(why) {
      if (blobUrl) {
        try { URL.revokeObjectURL(blobUrl); } catch (e) {}
        blobUrl = null;
      }
      try { frame.removeAttribute("src"); } catch (e) {}
      launched = false;
      launching = false;
      forceTab = true;
      show();
      status("COULD NOT START IN PLACE");
      footnote(why || "CLICK TO TRY THE TAB INSTEAD");
    }

    function openInline() {
      try {
        var html = withBoot(readPayload());
        hide();
        blobUrl = URL.createObjectURL(new Blob([html], { type: "text/html" }));
        frame.src = blobUrl;
        status("");
        footnote("RUNNING IN THIS PAGE");
        launched = true;
        launching = false;
        var done = false;
        var guard = setTimeout(function () {
          if (!done) failInline("THE INLINE FRAME DID NOT LOAD");
        }, 20000);
        frame.addEventListener("load", function () {
          if (done) return;
          done = true;
          clearTimeout(guard);
          var loadedUrl = blobUrl;
          blobUrl = null;
          setTimeout(function () {
            if (loadedUrl) {
              try { URL.revokeObjectURL(loadedUrl); } catch (e) {}
            }
          }, 1500);
        });
        return true;
      } catch (e) {
        return false;
      }
    }

    function openTab() {
      var win = null;
      try { win = window.open("about:blank", "_blank"); } catch (e) { win = null; }
      if (!win) {
        status("THE BROWSER BLOCKED THE TAB");
        footnote("ALLOW POP-UPS FOR THIS PAGE, THEN CLICK AGAIN");
        return false;
      }
      popup = win;
      try { win.focus(); } catch (e) {}
      try {
        var doc = win.document;
        doc.open();
        doc.write(bootDocument());
        doc.close();
      } catch (e) {
        try { win.close(); } catch (c) {}
        status("THE TAB COULD NOT BE WRITTEN");
        footnote("ALLOW POP-UPS AND TRY AGAIN");
        return false;
      }
      launched = true;
      launching = false;
      hide();
      status("");
      footnote("RUNNING IN THE TAB THAT JUST OPENED");
      // A closed tab must not leave the launcher hidden forever. `closed` is
      // readable cross-origin, so this works without any message from it.
      var watch = setInterval(function () {
        if (!launched) { clearInterval(watch); return; }
        if (popup && popup.closed) {
          clearInterval(watch);
          launched = false;
          launching = false;
          show();
          status("CLICK TO START");
          footnote("THE TAB WAS CLOSED — CLICK ANYWHERE TO OPEN IT AGAIN");
        }
      }, 1000);
      return true;
    }

    function launch() {
      if (launched || launching) return true;
      // The about:blank tab reads the stored file. Wait for the store rather
      // than racing it and falling back to a direct write every time.
      if (storage === "storing") {
        pending = true;
        status("PREPARING");
        return false;
      }
      launching = true;
      try {
        if (!forceTab && fromDisk && openInline()) return true;
        if (openTab()) return true;
      } catch (e) {}
      launched = false;
      launching = false;
      show();
      return false;
    }

    function retry() {
      if (!launched) launch();
    }

    document.documentElement.addEventListener("click", retry);

    // HOME from the inline frame: navigate the same iframe to a fresh copy of
    // the payload. The old game realm (module cache, listeners, GL context) is
    // destroyed by the navigation. Reloading the whole SVG page would also
    // work, but Firefox refuses the follow-up blob load from a reloaded
    // file:// document.
    function refillInline() {
      if (refilling) return;
      refilling = true;
      show();
      status("RETURNING TO THE MENU");
      footnote("LOADING");
      try { frame.src = "about:blank"; } catch (e) {}
      setTimeout(function () {
        try {
          var html = withBoot(readPayload(), menuQ);
          if (blobUrl) {
            try { URL.revokeObjectURL(blobUrl); } catch (e) {}
            blobUrl = null;
          }
          blobUrl = URL.createObjectURL(new Blob([html], { type: "text/html" }));
          var guard = setTimeout(function () {
            if (!launched) { refilling = false; return; }
            refilling = false;
            launched = false;
            launching = false;
            show();
            status("COULD NOT RETURN TO THE MENU");
            footnote("CLICK TO START AGAIN");
          }, 20000);
          var back = function () {
            if (frame.src !== blobUrl) return;
            frame.removeEventListener("load", back);
            clearTimeout(guard);
            refilling = false;
            hide();
            status("");
            footnote("RUNNING IN THIS PAGE");
          };
          frame.addEventListener("load", back);
          frame.src = blobUrl;
          launched = true;
          launching = false;
        } catch (e) {
          refilling = false;
          launched = false;
          launching = false;
          show();
          status("COULD NOT RETURN TO THE MENU");
          footnote("CLICK TO START AGAIN");
        }
      }, 80);
    }

    function refillTab() {
      try {
        var doc = popup.document;
        doc.open();
        doc.write(withBoot(readPayload(), menuQ));
        doc.close();
        try { popup.focus(); } catch (e) {}
      } catch (e) {
        launched = false;
        launching = false;
        show();
        status("COULD NOT RETURN TO THE MENU");
        footnote("CLICK TO START AGAIN");
      }
    }

    addEventListener("message", function (event) {
      var data = event.data || {};
      if (data.__sf === "home") {
        if (popup && event.source === popup) {
          refillTab();
          return;
        }
        if (frame && event.source === frame.contentWindow) {
          refillInline();
          return;
        }
      }
      if (!popup || event.source !== popup) return;
      if (data.__sf === "need-file") {
        try {
          var doc = popup.document;
          doc.open();
          doc.write(withBoot(readPayload()));
          doc.close();
          try { popup.postMessage({ __sf: "launched" }, "*"); } catch (e) {}
        } catch (e) {
          launched = false;
          launching = false;
          show();
          status("THE TAB COULD NOT READ THE GAME");
          footnote("CLOSE THE TAB, ALLOW POP-UPS, AND CLICK AGAIN");
        }
      }
      // `launched` is informational; the payload stays for HOME.
    });

    // Read the payload once and put it in IndexedDB before offering the button.
    readPayload();
    if (!payload || payload.length < 1000) {
      status("THE GAME PAYLOAD IS MISSING");
      footnote("REBUILD THE SVG BEFORE OPENING IT");
      return;
    }
    status("PREPARING");
    footnote("STORING THE GAME FOR OFFLINE PLAY");
    store();
    // Storage can take a moment for 10 MB; never leave the launcher dead.
    setTimeout(function () { if (storage !== "ready" && !launched) ready(); }, 2500);
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
