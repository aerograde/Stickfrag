#!/usr/bin/env python3
"""Build stickfrag.html: one self-contained document, home screen included.

Layout of the single file
-------------------------
  <style id="sf-home-css">            the landing page's stylesheets
  <style id="sf-game-css">            the game's stylesheets (inert in the menu)
  <template id="sf-game-dom">         the game's body markup, inert
  <template id="sf-p2p-dom">          the broker-free connect panel, inert
  <div id="sf-home-root">             the live landing page markup
  <script>                            home bundle (haven, locker, room code)
  <script type="text/plain" id="sf-game-src">  the bundled game, not executed
  <script type="text/plain" id="sf-net-off">   the network stub, also inert
  <script>                            the shell: menu and disposable match frames

Why the game is parked as text instead of living in a live <script>
-------------------------------------------------------------------
The game creates its WebGL renderer, compiles its shaders and builds the map at
module top level: the renderer is constructed while the module body runs, not
inside a function, and a browser only releases a WebGL context on teardown. So
loading it eagerly behind the home screen would cost a full GPU context, the map
geometry and roughly 90 MB of heap before the player has pressed anything.

Instead the module text sits in a `type="text/plain"` script. That is inert: it
is never parsed or executed, and its content is just a string until asked for.

Matches are isolated
--------------------
The menu lives in this document; a match runs in an iframe. Over http the frame
is this same file with ?embed=1 (a real document, which browsers grant pointer
lock to); from disk it is a game-only blob document built from the parked CSS,
markup and module. HOME removes the frame, which releases the module, its
listeners, timers, sockets and WebGL context. An ES module cannot be unloaded
from the menu document, so importing a match in place leaked ~80 MB per cycle.
The HUD and the menu also never share ids or class names.
"""

from __future__ import annotations

import base64
import json
import mimetypes
import re
import secrets
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "stickfrag.com"
PLAY = SITE / "play"
BUILD = ROOT / "build"
OUT = SITE / "stickfrag.html"
SVG = SITE / "stickfrag.svg"

BRAND_SWAPS = [("STICKFRAG.COM", "STICKFRAG.HTML"), ("stickfrag.com", "stickfrag.html")]

# The landing bundle builds the wordmark and its phone hint from literals. These
# are the only visible copies that are safe to rename: a broad replace would
# also hit hostnames and the contact email.
HOME_BRAND_SWAPS = [
    ('"STICKFRAG.COM"', '"STICKFRAG.HTML"'),
    ("Play on your phone: open stickfrag.com on", "Play on your phone: open stickfrag.html on"),
]

# Landing stylesheets, in the exact order the page links them. The order is load
# bearing: landing-servers.css and landing-modelist.css both set --tiles-h for the
# start step with equal specificity, and whichever loads last wins. Reversing them
# collapses the mode list to 112 px.
HOME_CSS = [
    "landing-site.css", "landing-home.css", "landing-cards.css",
    "landing-servers.css", "landing-menu.css", "landing-sections.css",
    "landing-ads.css", "landing-creator.css", "landing-board.css",
    "landing-touch.css", "landing-modelist.css", "daily.css", "streak.css",
    "rewards.css", "account.css",
]

PIP_CSS = """
/* Sound-visualisation pips: the pool belongs to the frame loop, so the container
   lives here rather than in the HUD markup. */
#soundpips { position: fixed; inset: 0; pointer-events: none; z-index: 3; }
#soundpips:empty { display: none; }
.sf-pip {
  position: absolute; left: 50%; top: 50%;
  width: 34px; height: 20px;
  transform-origin: 50% 50%;
  transition: opacity .12s linear;
  border: 3px solid #15111c;
  border-radius: 50% 50% 8px 8px;
  opacity: 0;
}
.sf-pip.step { background: #fff4dc; }
.sf-pip.shot { background: #ffd23f; width: 44px; height: 24px; }
"""

P2P_CSS = """
#sf-p2p { position: fixed; inset: 0; z-index: 60; display: none; place-items: center;
  background: rgba(21,17,28,.82); font: 600 14px/1.4 ui-sans-serif, system-ui, sans-serif;
  pointer-events: none; }
#sf-p2p.on { display: grid; }
#sf-p2p-backdrop { position: absolute; inset: 0; pointer-events: auto; }
#sf-p2p .box { position: relative; z-index: 1; pointer-events: auto;
  width: min(560px, 92vw); background: #fff4dc; color: #15111c;
  border: 3px solid #15111c; box-shadow: 8px 8px 0 #15111c; padding: 20px; }
#sf-p2p h3 { margin: 0 0 6px; font-size: 18px; letter-spacing: .04em; }
#sf-p2p p { margin: 0 0 10px; font-weight: 500; }
#sf-p2p textarea { width: 100%; height: 92px; resize: none; font: 500 12px/1.35 ui-monospace, monospace;
  border: 2px solid #15111c; background: #fffdf7; padding: 8px; box-sizing: border-box; }
#sf-p2p .row { display: flex; gap: 8px; margin-top: 10px; }
#sf-p2p button { flex: 1; font: 800 13px/1 ui-sans-serif, system-ui, sans-serif; padding: 11px;
  border: 3px solid #15111c; background: #ffd23f; cursor: pointer; box-shadow: 4px 4px 0 #15111c; }
#sf-p2p button.dark { background: #15111c; color: #fff4dc; }
"""

# The home page is the real site: it scrolls, and everything below the hero is
# part of it. Nothing here may lock it to one screen -- that was the bug that made
# a small window clip the menu with no way to reach the rest of it.
#
# What is added is scoped to the single-file wrapper only:
#   * #sf-home-root is the page's own body content, so give it the body's flow.
#   * The server-browser entry point is hidden: its step is not part of this build.
SF_HOME_CSS = """
#sf-home-root { display: block; }
"""

# The HUD panels are sized for a desktop window: #health is 220 px wide, the ammo
# card 260 px and #vitals at least 150 px. On a narrow screen they collide and spill
# off the edge. These cap the widths to the viewport; nothing about colour, font or
# geometry changes.
#
# The panels carry `zoom: var(--hud-scale)` (game-hud.css), and zoom multiplies a
# length, so a width that has to fit the screen divides 100vw by the scale -- the
# same rule the site's own narrow-screen HUD rules use.
NARROW_HUD_CSS = """
@media (max-width: 720px) {
  #health { width: min(220px, calc(46vw / var(--hud-scale, 1))); }
  #vitals { right: 10px; bottom: 10px; }
  #ammo { width: min(260px, calc(62vw / var(--hud-scale, 1))); }
  /* The toast is rotated -3deg, which pushes its box a few pixels wider than its
     computed width, so it keeps a margin from the edge. */
  #toast {
    right: 16px;
    bottom: calc(124px / var(--hud-scale, 1));
    max-width: calc(100vw / var(--hud-scale, 1) - 40px);
  }
  /* #xpbar is sized to sit between the health bar and the ammo card:
     calc(100vw - 560px). Below 560px of usable width that is negative, and its
     min-width: 200px then makes it overlap both corners. Give it the width it is
     centred in, and lift it clear of both. */
  #xpbar {
    bottom: calc(84px / var(--hud-scale, 1));
    width: min(360px, calc(100vw / var(--hud-scale, 1) - 20px));
    max-width: none;
    min-width: 0;
  }
  /* The sight hint sits over the ammo card; on a short screen it lands on the
     weapon bar instead. */
  #sightkey { display: none; }
}
@media (max-width: 460px) {
  #health { width: min(220px, calc(50vw / var(--hud-scale, 1))); }
  #ammo { width: min(260px, calc(66vw / var(--hud-scale, 1))); }
  #xpbar { bottom: calc(92px / var(--hud-scale, 1)); }
}
"""

P2P_MARKUP = """
<div id="sf-p2p" aria-hidden="true">
  <div id="sf-p2p-backdrop"></div>
  <div class="box" role="dialog" aria-label="Pair with long codes">
    <h3>CONNECT BY CODE</h3>
    <p id="sf-p2p-help"></p>
    <textarea id="sf-p2p-code" spellcheck="false" autocapitalize="off"></textarea>
    <div class="row">
      <button id="sf-p2p-copy" type="button">COPY JOIN CODE</button>
      <button id="sf-p2p-accept" type="button" class="dark">PASTE CODE</button>
    </div>
  </div>
</div>
"""

# The join panel belongs to a match, not to the menu. It is carried as text and
# injected into the game document, so typing "c" in the nickname field (or on
# the landing page) can never open it. The handler also ignores form fields and
# modifier-key combinations. There is no broker: the joining player creates a
# JOIN code, the host pastes it and returns an ANSWER code, and the joining
# player pastes that back. For 3+ players the host relays WebRTC signalling over
# its data channels so the joiners form direct mesh links.
P2P_SCRIPT = r"""
(() => {
  const el = (id) => document.getElementById(id);
  const panel = el('sf-p2p');
  if (!panel) return;
  const help = el('sf-p2p-help');
  const box = el('sf-p2p-code');
  const copy = el('sf-p2p-copy');
  const accept = el('sf-p2p-accept');
  const typing = (e) => {
    const t = e.target;
    return !!(t && (t.matches?.('input,textarea,select,[contenteditable]') || t.isContentEditable));
  };
  const role = () => (globalThis.__sfPeerDbg?.()?.role === 'host' ? 'host' : 'join');
  const show = (text, mode) => {
    panel.classList.add('on');
    panel.dataset.mode = mode || role();
    help.textContent = text;
    copy.textContent = panel.dataset.mode === 'host' ? 'COPY ANSWER CODE' : 'COPY JOIN CODE';
  };
  const helpFor = () => (role() === 'host'
    ? 'Paste a JOIN code from a player. Send back the ANSWER code that appears.'
    : 'Create your JOIN code and send it to the host. Paste their ANSWER here.');
  window.__sfCodeUI = { show, panel, help, box };
  panel.addEventListener('click', (e) => { if (e.target === panel) panel.classList.remove('on'); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') panel.classList.remove('on');
    if (e.key !== 'c' && e.key !== 'C') return;
    if (typing(e) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (document.pointerLockElement) return;   // playing, not a shortcut
    show(helpFor(), role());
  });
  accept.addEventListener('click', async () => {
    const api = window.__sfCodeApi;
    if (!api) return;
    const text = box.value.trim();
    if (!text) { help.textContent = 'Paste a JOIN or ANSWER code first.'; return; }
    let res;
    try { res = await api.accept(text); } catch (e) { res = false; }
    if (typeof res === 'string' && res) {
      box.value = res;
      help.textContent = 'ANSWER code — send this back to the joining player.';
      copy.textContent = 'COPY ANSWER CODE';
      return;
    }
    if (res === true) {
      box.value = '';
      help.textContent = 'CONNECTED. The match is linked.';
      copy.textContent = 'COPY CODE';
      return;
    }
    help.textContent = 'That code was invalid or has expired.';
  });
  copy.onclick = async () => {
    if (panel.dataset.mode === 'join' && !box.value) {
      const api = window.__sfCodeApi;
      if (!api) return;
      let code;
      try { code = await api.offer(); } catch (e) { code = null; }
      if (typeof code === 'string' && code) {
        box.value = code;
        help.textContent = 'JOIN code — send this to the host. Paste their ANSWER here and press PASTE CODE.';
        copy.textContent = 'COPY JOIN CODE';
        return;
      }
      help.textContent = 'The joining player creates the JOIN code. Paste it here and send back the ANSWER.';
      return;
    }
    try { navigator.clipboard?.writeText(box.value)?.catch?.(() => {}); } catch (e) {}
    box.select?.();
  };
})();
"""

# The menu document only needs the match frame's chrome. The game's own styles
# travel with the game document.
SHELL_CSS = """
#sf-game-layer { position: fixed; inset: 0; z-index: 50; background: #16121c; }
#sf-game-frame { display: block; width: 100%; height: 100%; border: 0; background: #16121c; }
#sf-game-loading {
  position: absolute; inset: 0; z-index: 1; display: grid; place-content: center;
  gap: 12px; text-align: center; background: #16121c; color: #c9c4d6;
  font: 800 13px/1.4 ui-sans-serif, system-ui, sans-serif; letter-spacing: .14em;
}
#sf-game-loading b {
  font: 900 58px/1 Impact, "Arial Black", "Helvetica Neue", sans-serif;
  letter-spacing: 6px; color: #ff2a4d;
  -webkit-text-stroke: 2px #000; paint-order: stroke fill;
}
#sf-error {
  position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%); z-index: 80;
  max-width: min(620px, 92vw); background: #15111c; color: #fff4dc;
  border: 3px solid #ff2a4d; box-shadow: 7px 7px 0 #000; padding: 14px 18px;
  font: 700 13px/1.5 ui-sans-serif, system-ui, sans-serif; cursor: pointer;
}
"""

# The shell is a separate file so it can be checked and read as JavaScript.
SHELL = (Path(__file__).resolve().parent / "single-shell.js").read_text(encoding="utf-8")

# Private windows and storage-blocked machines throw on the first write, not the
# first read. The home bundle runs before the shell, so install a memory-backed
# Storage here, before any page script touches it. The game document and the SVG
# wrapper repeat this probe for their own origins.
STORAGE_SHIM = r"""
(() => {
  const probe = (s) => {
    try {
      s.setItem('__sf_probe', '1');
      s.getItem('__sf_probe');
      s.removeItem('__sf_probe');
      return true;
    } catch (e) {
      return false;
    }
  };
  let ls = null, ss = null;
  try { ls = window.localStorage; } catch (e) {}
  try { ss = window.sessionStorage; } catch (e) {}
  if (ls && ss && probe(ls) && probe(ss)) return;
  const memory = () => {
    const data = {};
    return {
      getItem: (k) => (Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null),
      setItem: (k, v) => { data[k] = String(v); },
      removeItem: (k) => { delete data[k]; },
      clear: () => { for (const k of Object.keys(data)) delete data[k]; },
      key: (i) => Object.keys(data)[i] ?? null,
      get length() { return Object.keys(data).length; }
    };
  };
  for (const name of ['localStorage', 'sessionStorage']) {
    try {
      Object.defineProperty(window, name, { value: memory(), configurable: true });
    } catch (e) {}
  }
})();
"""

# The landing bundle still probes the original matchmaking servers on load. There
# is no server here, so those requests can only fail (and log CSP violations).
# Neutralise them at the same origin the CORS errors point at.
NET_OFF = r"""
// The landing bundle talks to the original matchmaking servers on load. There is
// no server here, so every such request can only fail. Rather than let the
// resulting errors cascade through the UI, answer them locally with the empty
// shape each caller expects: an empty row list, not a bare {}.
(() => {
  const dead = /(^|\.)stickfrag\.com$/;
  // Resolve against a fixed base, never location.href: these run inside the SVG
  // wrapper too, where the document URL is about:srcdoc and relative resolution
  // throws. An absolute URL ignores the base, so this is unchanged for them.
  const BASE = 'http://sf.invalid/';
  const isDead = (href) => {
    try { return dead.test(new URL(href, BASE).hostname); } catch { return false; }
  };

  // Every collection the landing widgets iterate. They read .length and index
  // straight into these, so the shape has to be a real empty list, not a hole.
  const EMPTY = {
    rows: [], events: [], items: [], packs: [], cards: [], owned: [], on: [],
    saved: [], friends: [], players: [], servers: [], measured: [], errors: [],
    days: [], news: [], drops: [], matches: [], history: [], challenges: [],
    counters: {}, share: {}, taken: false, ok: true, xp: 0, level: 0, day: null,
  };

  const reply = (href) => {
    const body = { ...EMPTY };
    // A few callers read a named collection off the top level.
    const key = new URL(href, BASE).pathname.split('/').filter(Boolean).pop();
    if (key && !(key in body)) body[key] = [];
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  const realFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input && input.url;
    if (url && isDead(url)) return Promise.resolve(reply(url));
    return realFetch(input, init);
  };

  // A websocket to a dead host should close immediately, not hang. The stubbed
  // constructor keeps the readyState constants for any remaining site probe that
  // compares against WebSocket.OPEN.
  const RealWS = window.WebSocket;
  const StubWS = function (url, protocols) {
    if (isDead(url)) {
      const stub = {
        url: String(url),
        readyState: 3, bufferedAmount: 0, binaryType: 'blob',
        onopen: null, onclose: null, onerror: null, onmessage: null,
        close() {}, send() {},
        addEventListener() {}, removeEventListener() {},
        dispatchEvent() { return true; },
      };
      setTimeout(() => stub.onclose && stub.onclose({}), 0);
      return stub;
    }
    return new RealWS(url, protocols);
  };
  StubWS.prototype = RealWS.prototype;
  for (const k of ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']) {
    if (k in RealWS) Object.defineProperty(StubWS, k, { value: RealWS[k] });
  }
  window.WebSocket = StubWS;
})();
"""

def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def asset_uri(rel: str, mime: str) -> str | None:
    path = SITE / rel.lstrip("/")
    if not path.is_file():
        return None
    return "data:%s;base64,%s" % (mime, base64.b64encode(path.read_bytes()).decode("ascii"))


# A one-pixel transparent GIF: a missing image still occupies its layer, so a
# shorthand like `background: url(...) center / cover, url(...)` keeps its
# positions and its separating commas. Replacing the whole layer instead used to
# eat `center / cover,` and glue the next image on without a comma.
BLANK_PIXEL = (
    "data:image/gif;base64,"
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
)


def mime_for(rel: str) -> str:
    return mimetypes.guess_type(rel)[0] or "application/octet-stream"


def rewrite_css_urls(css: str) -> str:
    """Point every site-root url() at its inlined copy.

    Only the url() call is replaced. Everything after it -- `center / cover`, a
    following layer, the comma between them -- is CSS the declaration needs and
    is left exactly as it was.
    """
    def swap(m):
        quote, rel = m.group(1), m.group(2)
        if not rel.startswith("/"):
            return m.group(0)
        uri = asset_uri(rel, mime_for(rel)) or BLANK_PIXEL
        return "url(%s%s%s)" % (quote, uri, quote)
    return re.sub(r"url\(([\"\']?)(/[^)\"\']+)\1\)", swap, css)


def rewrite_markup_srcs(html: str) -> str:
    """Point every site-root src/ href at its inlined copy.

    A missing image becomes the transparent pixel rather than a root-absolute
    path, which under file:// resolves to the filesystem root and 404s.
    """
    def swap(m):
        attr, quote, rel = m.group(1), m.group(2), m.group(3)
        if not rel.startswith("/"):
            return m.group(0)
        uri = asset_uri(rel, mime_for(rel)) or BLANK_PIXEL
        return "%s=%s%s%s" % (attr, quote, uri, quote)
    return re.sub(r'(src|href)=([\"\'])(/[^\"\']+\.(?:webp|svg))\2', swap, html)


def inline_assets() -> str:
    """Every image the page can reach, base64'd, keyed by its site-root path.

    Both bundles build asset URLs by concatenation (`/map-${id}.webp`,
    `/items/hat.${hat}.webp`), so there is no fixed list of URLs to rewrite in
    the markup. The page instead carries a path -> data: URI map and installs a
    lookup before any bundle runs. That keeps the file self-contained under
    file://, where a root-absolute path resolves to the filesystem root.
    """
    out = []
    # Skip this build's own outputs. They sit next to the source images, and the
    # SVG wrapper contains the whole game, so picking it up would inline the
    # build into itself -- it added 12.7 MB and one recursion's worth of nonsense.
    skip = {OUT.name, SVG.name}
    for pattern, mime in (("*.webp", "image/webp"), ("*.svg", "image/svg+xml")):
        for path in sorted(SITE.glob(pattern)) + sorted(SITE.glob("items/" + pattern)):
            if path.name in skip:
                continue
            rel = "/" + str(path.relative_to(SITE)).replace("\\", "/")
            b64 = base64.b64encode(path.read_bytes()).decode("ascii")
            out.append('  "%s": "data:%s;base64,%s"' % (rel, mime, b64))
    return "{\n" + ",\n".join(out) + "\n}"


def home_css() -> str:
    return "\n".join(read(SITE / name) for name in HOME_CSS if (SITE / name).exists())


def game_js() -> str:
    js = read(PLAY / "main.js")
    for old, new in BRAND_SWAPS:
        # Only the strings the player reads. A blanket replace also rewrites the
        # hostname in API URLs, which turns server.stickfrag.com into
        # server.stickfrag.html and breaks every request that is still made.
        js = re.sub(
            r"(?<![A-Za-z0-9_.-])" + re.escape(old) + r"(?![A-Za-z0-9_-]|\.[A-Za-z])",
            new,
            js,
        )
    # A literal </script> would close the carrier element early.
    return js.replace("</script", "<\\/script")


def home_body() -> tuple[str, str, str]:
    """The landing page's body markup, and the attributes of its html/body.

    The page's `<html>` carries `data-ads="soon"`, which its own stylesheet uses to
    hide the billboard hero (landing-home.css) exactly as it does live, and
    `<body>` carries the `data-lobby` / `data-halo` scene URLs. Those stay on the
    document the shell builds, so the restored page keeps its real behaviour.

    Its scripts are dropped: the home bundle already contains them, bundled.
    """
    html = read(SITE / "index.html")
    m = re.search(r"<body([^>]*)>(.*)</body>", html, re.S)
    if not m:
        raise SystemExit("no body in index.html")
    body_attrs, body = m.group(1), m.group(2)
    body = re.sub(r'<script[^>]*src="[^"]*"[^>]*>\s*</script>', "", body)
    body = re.sub(r"<script(?![^>]*nonce)[^>]*>.*?</script>", "", body, flags=re.S)
    html_tag = re.search(r"<html([^>]*)>", html)
    attrs = html_tag.group(1) if html_tag else ""
    # lang and translate are set on the wrapper already (translate="no" keeps the
    # HUD's every-frame text rewrites from flipping the page through a translator).
    attrs = re.sub(r'\s+(lang|translate)="[^"]*"', "", attrs)
    return body, attrs, body_attrs


def game_body() -> str:
    """The game's body markup: every HUD id is a hard contract with its constructor."""
    html = read(PLAY / "index.html")
    m = re.search(r"<body[^>]*>(.*?)<script", html, re.S)
    if not m:
        raise SystemExit("no body in play/index.html")
    return m.group(1)


def icon_map() -> dict[str, str]:
    """Data URIs for images the landing page fetches by absolute path."""
    out: dict[str, str] = {}
    for path in sorted((SITE / "items").glob("*.webp")):
        out[f"items/{path.name}"] = (
            f"data:image/webp;base64,{base64.b64encode(path.read_bytes()).decode()}"
        )
    return out


def main() -> None:
    home_js = read(BUILD / "home.js")
    for old, new in HOME_BRAND_SWAPS:
        if old not in home_js:
            raise SystemExit(f"build-single: home brand string not found: {old[:50]}")
        home_js = home_js.replace(old, new)
    landing_js = read(BUILD / "landing.js")
    support_js = read(BUILD / "supportscene.js")
    css_home = rewrite_css_urls(home_css())
    css_game = rewrite_css_urls(read(SITE / "game.all.css"))
    js_game = game_js()
    raw_home, html_attrs, body_attrs = home_body()
    body_home = rewrite_markup_srcs(raw_home)
    # The header wordmark splits the TLD into a span. Rename only that, not the
    # contact email or any hostname.
    if '<span class="tld">.COM</span>' not in body_home:
        raise SystemExit("build-single: header wordmark not found")
    body_home = body_home.replace('<span class="tld">.COM</span>', '<span class="tld">.HTML</span>')
    body_game = rewrite_markup_srcs(game_body())

    nonce = secrets.token_urlsafe(12)
    assets = inline_assets()
    icons = icon_map()
    icons_json = json.dumps(icons, separators=(",", ":"))
    shell = (
        SHELL.replace("__ICONS__", icons_json)
        .replace("__GAME_ASSETS__", icons_json)
        .replace("__NONCE__", nonce)
        # The shell builds game documents, so it contains a literal </script>
        # in a string. Inside this document's inline script that would close the
        # element early. The escaped form is valid JavaScript and produces the
        # same string at runtime.
        .replace("</script", "<\\/script")
    )
    for token in ("__ICONS__", "__GAME_ASSETS__", "__NONCE__"):
        if token in shell:
            raise SystemExit(f"build-single: shell placeholder {token} was not replaced")
    for label, text, close in (
        ("home css", css_home, "</style"),
        ("game css", css_game, "</style"),
        ("game js", js_game, "</script"),
    ):
        if close in text:
            raise SystemExit(f"build-single: {label} contains {close}; it cannot be inlined")
    p2p = P2P_SCRIPT.replace("</script", "<\\/script")
    net_off = NET_OFF.replace("</script", "<\\/script")
    storage_shim = STORAGE_SHIM.replace("</script", "<\\/script")

    doc = f"""<!doctype html>
<!--
  stickfrag.html - the whole game in one self-contained file.
  Generated by tools/build-single.py; rebuild with ./tools/build-all.sh.

  The home page is the real stickfrag.com landing page, whole: the header, the
  hero, the news rows, the #play section and the footer are all here and the page
  scrolls exactly as it does live. The game's markup and module are parked as
  inert text. A match runs in a disposable iframe of its own, so HOME releases
  the module, the WebGL context and every listener with it. See the shell in
  tools/single-shell.js for why.
-->
<html lang="en" translate="no"{html_attrs}>
  <head>
    <meta charset="utf-8" />
    <meta name="google" content="notranslate" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'nonce-{nonce}' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob: data:; worker-src 'self' blob:; connect-src 'self' blob:; frame-src 'self' blob: data:; object-src 'none'; base-uri 'self'; form-action 'self'"
    />
    <title>StickFrag</title>
    <meta name="description" content="StickFrag, standalone: a stickman shooter in one file." />
    <link rel="icon" href="data:," />
    <script nonce="{nonce}">{storage_shim}</script>
    <script nonce="{nonce}">window.__SF_ASSETS = {assets};
(function () {{
  var table = window.__SF_ASSETS || {{}};
  var fix = function (v) {{ return (typeof v === "string" && table[v]) ? table[v] : v; }};
  var setAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {{
    return setAttr.call(this, name, name === "src" ? fix(value) : value);
  }};
  var protos = [HTMLImageElement.prototype, HTMLSourceElement.prototype];
  for (var i = 0; i < protos.length; i++) {{
    var d = Object.getOwnPropertyDescriptor(protos[i], "src");
    if (!d || !d.set) continue;
    (function (desc) {{
      Object.defineProperty(protos[i], "src", {{
        get: desc.get,
        set: function (v) {{ desc.set.call(this, fix(v)); }},
        configurable: true
      }});
    }})(d);
  }}
  document.addEventListener("DOMContentLoaded", function () {{
    var nodes = document.querySelectorAll("[src]");
    for (var j = 0; j < nodes.length; j++) {{
      var want = table[nodes[j].getAttribute("src")];
      if (want) nodes[j].setAttribute("src", want);
    }}
  }});
}})();</script>
    <style id="sf-home-css">{css_home}</style>
    <style id="sf-home-lock">{SF_HOME_CSS}</style>
    <style id="sf-game-css" media="not all">{css_game}</style>
    <style id="sf-narrow-hud">{NARROW_HUD_CSS}</style>
    <style id="sf-pips">{PIP_CSS}</style>
    <style id="sf-p2p-css">{P2P_CSS}</style>
    <style id="sf-shell-css">{SHELL_CSS}</style>
  </head>
  <body{body_attrs} class="sf-home">
<template id="sf-game-dom">{body_game}</template>
<template id="sf-p2p-dom">{P2P_MARKUP}</template>
<div id="sf-home-root">{body_home}</div>
<script type="text/plain" id="sf-game-src">{js_game}</script>
<script type="text/plain" id="sf-p2p-src">{p2p}</script>
<script type="text/plain" id="sf-net-off">{net_off}</script>
<script nonce="{nonce}">window.__SF_EMBED_MATCH = (function () {{
  try {{
    var q = new URLSearchParams(location.search);
    var p = new URLSearchParams(window.__SF_PARENT_QUERY || "");
    var has = function (k) {{ return q.has(k) || p.has(k); }};
    var embed = q.has("embed") || !!window.__SF_FORCE_EMBED;
    return embed && (has("peer") || has("mode") || has("play"));
  }} catch (e) {{ return false; }}
}})();</script>
<script nonce="{nonce}">{NET_OFF}</script>
<script nonce="{nonce}">if (!window.__SF_EMBED_MATCH) {{ {home_js} }}</script>
<script nonce="{nonce}">if (!window.__SF_EMBED_MATCH) {{ {landing_js} }}</script>
<script nonce="{nonce}">if (!window.__SF_EMBED_MATCH) {{ {support_js} }}</script>
<script nonce="{nonce}">{shell}</script>
  </body>
</html>
"""
    OUT.write_text(doc, encoding="utf-8")
    print(
        f"wrote {OUT.relative_to(ROOT)}  {OUT.stat().st_size:,} bytes  "
        f"(home css {len(css_home)/1024:.0f} KB, game css {len(css_game)/1024:.0f} KB, "
        f"game js {len(js_game)/1048576:.2f} MB parked, nonce {nonce})"
    )


if __name__ == "__main__":
    main()
