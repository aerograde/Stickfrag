#!/usr/bin/env python3
"""Build stickfrag.html: one self-contained document, home screen included.

Layout of the single file
-------------------------
  <style id="sf-home-css">            the landing page's stylesheets
  <style id="sf-game-css" disabled>   the game's stylesheets
  <template id="sf-game-dom">         the game's body markup, inert
  <div id="sf-home-root">             the live landing page markup
  <script>                            home bundle (haven, locker, room code)
  <script type="text/plain" id="sf-game-src">  the bundled game, not executed
  <script>                            the shell: swaps screens, boots on PLAY

Why the game is parked as text instead of living in a live <script>
-------------------------------------------------------------------
The game creates its WebGL renderer, compiles its shaders and builds the map at
module top level: the renderer is constructed while the module body runs, not
inside a function, and a browser only releases a WebGL context on teardown. So
loading it eagerly behind the home screen would cost a full GPU context, the map
geometry and roughly 90 MB of heap before the player has pressed anything.

Instead the module text sits in a `type="text/plain"` script. That is inert: it
is never parsed or executed, and its content is just a string until asked for. On
PLAY the text becomes a module through a blob URL. Verified from file:// as well
as http.

Why the two screens swap rather than stack
------------------------------------------
They collide. The stylesheets share 50 class names (.btn, .daily-row, .empty,
.big, ...) and the two bodies use six of the same element ids (#gear, #feedback,
#fb-close, #fb-send, #fb-status, #fb-text). One document cannot hold both
unscoped. So the home markup is live, the game markup sits in a <template> (which
getElementById and CSS selectors never see), and exactly one stylesheet is
enabled at a time.
"""

from __future__ import annotations

import base64
import json
import re
import secrets
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "stickfrag.com"
PLAY = SITE / "play"
BUILD = ROOT / "build"
OUT = SITE / "stickfrag.html"
SVG = SITE / "stickfrag.svg"

# Public MQTT brokers the peer layer signals over, named so the policy stays explicit.
BROKER_ORIGINS = " ".join(
    f"wss://{host}:{port}" for host, port in (
        ("broker.emqx.io", 8084),
        ("broker.hivemq.com", 8884),
        ("test.mosquitto.org", 8081),
    )
)

BRAND_SWAPS = [("STICKFRAG.COM", "STICKFRAG.HTML"), ("stickfrag.com", "stickfrag.html")]

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
  background: rgba(21,17,28,.82); font: 600 14px/1.4 ui-sans-serif, system-ui, sans-serif; }
#sf-p2p.on { display: grid; }
#sf-p2p .box { width: min(560px, 92vw); background: #fff4dc; color: #15111c;
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

# The landing page ships as a long, scrolling site: the hero, then a news row, a
# week card, a pricing block and a footer. This build is one screen, so everything
# below the hero is not part of it and the page does not scroll at all.
#
# The layout itself is left to the page: its gear screen is a grid whose stage has
# a fixed 2:1 aspect ratio, and overriding those heights squashes the menu cards.
# The only thing added here is that the stage gives up its height once a step is
# open, because the mode list needs it to stay above the fold.
HOME_LOCK_CSS = """
html, body { height: 100%; overflow: hidden; }
#sf-home-root { height: 100%; overflow: hidden; background: var(--sky, #b9def0); }
#sf-home-root main { height: 100%; overflow: hidden; }
#sf-home-root main > :not(.gear) { display: none !important; }
#sf-home-root #gear { min-height: 100%; }
/* The server browser step is not part of this build, so its entry point would
   open a blank screen. Everything else on the start step stays. */
#sf-home-root #start-servers { display: none !important; }
#sf-home-root footer, #sf-home-root nav[aria-label="Footer"] { display: none !important; }
#sf-home-root #gear:not([data-step='gear']) .gear-stage {
  aspect-ratio: auto;
  height: 26vh;
  min-height: 130px;
}
"""

P2P_MARKUP = """
<div id="sf-p2p" aria-hidden="true">
  <div class="box" role="dialog" aria-label="Connect without a broker">
    <h3>CONNECT BY CODE</h3>
    <p id="sf-p2p-help"></p>
    <textarea id="sf-p2p-code" spellcheck="false" autocapitalize="off"></textarea>
    <div class="row">
      <button id="sf-p2p-copy" type="button">COPY MY CODE</button>
      <button id="sf-p2p-accept" type="button" class="dark">USE THEIR CODE</button>
    </div>
  </div>
</div>
<script nonce="__NONCE__">
// Broker-free join. The host publishes an offer code; the joiner pastes it and
// gets a return code to send back. Fallback for when the free brokers are down.
(() => {
  const el = (id) => document.getElementById(id);
  const panel = el('sf-p2p');
  if (!panel) return;
  const help = el('sf-p2p-help');
  const box = el('sf-p2p-code');
  const show = (text, mode) => {
    panel.classList.add('on');
    panel.dataset.mode = mode;
    help.textContent = text;
    if (mode === 'host') el('sf-p2p-accept').textContent = 'SHOW OFFER AGAIN';
  };
  window.__sfCodeUI = { show, panel, help, box };
  // Escape closes it; C opens it again for the broker-free fallback.
  panel.addEventListener('click', (e) => { if (e.target === panel) panel.classList.remove('on'); });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') panel.classList.remove('on');
    if (e.key === 'c' || e.key === 'C') {
      if (document.pointerLockElement) return;   // typing in game, not a shortcut
      show(panel.dataset.mode === 'host'
        ? 'Share this offer code with a friend, then paste their return code here.'
        : 'Paste the host offer code, then send the return code back.', panel.dataset.mode || 'join');
    }
  });
  el('sf-p2p-copy').addEventListener('click', () => navigator.clipboard?.writeText(box.value));
  el('sf-p2p-accept').addEventListener('click', async () => {
    const api = window.__sfCodeApi;
    if (!api) return;
    if (panel.dataset.mode === 'host') {
      box.value = (await api.offer()) || '';
      return;
    }
    const code = await api.accept(box.value.trim());
    if (code) {
      box.value = code;
      help.textContent = 'Send this return code back to the host.';
      el('sf-p2p-copy').textContent = 'COPY RETURN CODE';
    }
  });
})();
</script>
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
  // constructor must keep the readyState constants: the MQTT client compares
  // against WebSocket.OPEN, and a missing constant silently disables every send.
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

SHELL = r"""
// ---------------------------------------------------------------------------
// The shell: one document, two screens, one game context at a time.
// ---------------------------------------------------------------------------
(() => {
  const qs = new URLSearchParams(location.search);
  const homeRoot = document.getElementById('sf-home-root');
  const gameTpl = document.getElementById('sf-game-dom');
  const gameSrc = document.getElementById('sf-game-src');
  const homeCss = document.getElementById('sf-home-css');
  const gameCss = document.getElementById('sf-game-css');
  const ICONS = __ICONS__;

  // Only the landing stylesheet is active on the home screen. The `disabled`
  // content attribute does nothing on a <style> element; the IDL property does.
  gameCss.disabled = true;

  let started = false;
  const gq = new Map(); // parameters the shell is about to set

  // The landing page references a few images by absolute path, which would
  // resolve against the filesystem root when opened from disk. Use the inlined
  // copies instead.
  const rebaseImages = (root) => {
    for (const el of root.querySelectorAll('img[src^="/"]')) {
      const key = el.getAttribute('src').slice(1);
      if (ICONS[key]) el.setAttribute('src', ICONS[key]);
    }
    for (const el of root.querySelectorAll('[style]')) {
      const css = el.getAttribute('style');
      if (!css.includes('url(/')) continue;
      el.setAttribute('style', css.replace(
        /url\(\/([^)]+)\)/g,
        (m, key) => (ICONS[key] ? `url(${ICONS[key]})` : m)
      ));
    }
  };

  // The game reads its boot parameters from the query string when the module
  // starts, so they have to be in place before the blob is imported.
  const applyBootParams = () => {
    const p = new URLSearchParams(location.search);
    gq.forEach((v, k) => p.set(k, v));
    const peer = p.get('peer');
    if (peer) p.delete('offline'); else p.set('offline', '');
    for (const k of ['code', 'region', 'review', 'overwatch', 'case', 'studio', 'replay', 'clip'])
      if (!gq.has(k)) p.delete(k);
    if (!peer) p.delete('room');
    let n = '';
    try { n = (localStorage.getItem('name') || '').trim(); } catch {}
    if (!/^[A-Za-z0-9_]{3,16}$/.test(n)) n = (p.get('name') || '').trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(n)) n = 'player';
    p.set('name', n);
    if (!p.get('map')) p.set('map', 'yard');
    window.__SF_NAME = n;
    // The game reads these from location.search. Publish the same set here so it
    // can still pick them up when the address bar cannot be written, which is the
    // case inside the SVG wrapper's srcdoc frame.
    window.__SF_BOOT_PARAMS = Object.fromEntries(p);
    // Cosmetic: keep the address bar in step so a reload lands in the same
    // match. Skipped rather than thrown when the document has no addressable
    // URL, which is the case when this file is running inside the SVG wrapper.
    try {
      const next = location.pathname + '?' + p.toString();
      if (next !== location.pathname + location.search) history.replaceState(null, '', next);
    } catch {}
  };

  const startGame = async () => {
    if (started) return true;
    started = true;

    // Swap the screens. The home markup leaves the document entirely, so its
    // stylesheet and ids cannot reach the game; the game markup arrives from
    // the inert template.
    // Keep the markup, hide it. The landing bundle has a few writes scheduled
    // two animation frames out (the XP bar, for one); if the nodes are gone it
    // dereferences null. Hidden is enough to take the screen out of play.
    homeRoot.style.display = 'none';
    homeRoot.setAttribute('aria-hidden', 'true');
    homeCss.disabled = true;
    const homeLock = document.getElementById('sf-home-lock');
    if (homeLock) homeLock.disabled = true;
    gameCss.disabled = false;
    document.body.appendChild(gameTpl.content.cloneNode(true));
    document.body.classList.add('sf-playing');

    const src = gameSrc.textContent;
    gameSrc.remove();
    const url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
    try {
      return await import(url);
    } finally {
      // Evaluated; neither the blob nor its text is needed again.
      URL.revokeObjectURL(url);
    }
  };
  window.__sfStartGame = startGame;

  const enter = async (peer, code) => {
    if (code) gq.set('room', code);
    gq.set('peer', peer);
    applyBootParams();
    try {
      await startGame();
    } catch (err) {
      console.error('could not start the game', err);
    }
  };

  // The landing page owns the whole menu flow (PLAY -> mode -> how -> map ->
  // start). Nothing here may intercept those clicks: PLAY is a submit button
  // inside #gear-join, so swallowing that form's submit froze the menu.
  //
  // The one control that cannot work as-is is the room-code JOIN: the page asks
  // the (long gone) matchmaking server which room that code is. Peers here find
  // each other over the broker instead, so that path is handled locally.
  const codeFrom = (form) => {
    const field =
      (form && form.querySelector('input')) || document.getElementById('code-input');
    const raw = ((field && field.value) || '').trim().toUpperCase();
    const m = /[?&]room=([A-Z0-9]{6})/i.exec(raw);
    const value = (m ? m[1] : raw).replace(/[^A-Z0-9]/g, '');
    return /^[A-Z0-9]{6}$/.test(value) ? value : null;
  };

  document.addEventListener('submit', (e) => {
    const form = e.target instanceof Element ? e.target : null;
    if (!form || !form.matches('#code-join')) return;
    const code = codeFrom(form);
    if (!code) return; // invalid code: let the page show its own message
    e.preventDefault();
    e.stopImmediatePropagation();
    enter('join', code);
  }, true);

  // The landing page launches by assigning to location.href. Instead of letting
  // that navigate (and re-parse this whole file), take the URL it built and
  // start the match in place. It carries mode, map and the room details, which
  // is exactly what the game reads from the query string anyway.
  window.__sfGo = (url) => {
    try {
      // Parse the query string on its own instead of resolving against
      // location.href. Relative resolution needs an ordinary base URL, and an
      // SVG-wrapped copy runs from about:srcdoc where that throws. Only the
      // parameters matter here, so this works anywhere.
      const q = url.indexOf('?');
      const params = new URLSearchParams(q >= 0 ? url.slice(q + 1) : '');
      if (!params.get('map')) params.set('map', 'yard');
      // A match chosen from the menu is hosted locally. That is what gives it a
      // real match object (mode, scoreboard, team scores, ability pickups)
      // instead of the bare offline sandbox.
      if (!params.get('peer')) params.set('peer', 'host');
      params.forEach((v, k) => gq.set(k, v));
      applyBootParams();
      startGame().catch((err) => console.error('could not start the game', err));
    } catch (err) {
      // Anything unexpected falls back to the real navigation.
      console.error('menu launch failed, navigating instead', err);
      location.href = url;
    }
  };

  // The invite a friend pastes. On the live site this pointed at /play/; here it
  // has to come back to this file and ask for the peer join path.
  window.__sfInvite = (code, map, game) => {
    const p = new URLSearchParams({ peer: 'join' });
    if (code) p.set('room', code);
    if (map) p.set('map', map);
    if (game) p.set('mode', game);
    return location.origin + location.pathname + '?' + p.toString();
  };

  rebaseImages(homeRoot);
  applyBootParams();

  // Training is a normal host match with bots in it, so it needs nothing new on
  // the simulation side. The live site has no such tile (its bots live on the
  // server and fill real rooms), so it is added here, next to QUICK JOIN.
  (() => {
    const modes = document.getElementById('start-modes');
    if (!modes) return;
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.id = 'start-training';
    tile.className = 'choice mode-tile';
    tile.setAttribute('aria-label', 'Training: a free-for-all against bots');
    tile.innerHTML = '<span class="tile-name">TRAINING</span><span class="tile-join">4 BOTS \\u203A</span>';
    tile.addEventListener('click', () => {
      window.__sfGo(location.pathname + '?peer=host&mode=ffa&bots=4&map=yard');
    });
    modes.appendChild(tile);
    // The site's grid is sized for five rows; give it the sixth.
    modes.style.gridTemplateRows = 'repeat(6, 1fr)';
    modes.style.height = 'calc(6 * var(--tile-row) + 5 * var(--tile-gap))';
  })();

  // Reload has to land somewhere sensible. A URL that names a mode is a match
  // that was already chosen; ?peer= is an invite link. Both go straight in, and
  // a bare home URL stays on the menu.
  if (qs.has('peer') || qs.has('mode') || qs.has('play')) {
    qs.forEach((v, k) => gq.set(k, v));
    applyBootParams();
    startGame().catch((err) => console.error('could not start the game', err));
  }
})();
"""


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def asset_uri(rel: str, mime: str) -> str | None:
    path = SITE / rel.lstrip("/")
    if not path.is_file():
        return None
    return "data:%s;base64,%s" % (mime, base64.b64encode(path.read_bytes()).decode("ascii"))


def rewrite_css_urls(css: str) -> str:
    """Point every site-root url() at its inlined copy.

    A reference to a file that is not in the mirror can never load, so that whole
    background layer is dropped rather than left to 404: the declaration then
    paints its remaining layer, which is the gradient behind the missing still.
    """
    def swap(m):
        quote, rel = m.group(1), m.group(2)
        if not rel.startswith("/"):
            return m.group(0)
        mime = "image/svg+xml" if rel.endswith(".svg") else "image/webp"
        uri = asset_uri(rel, mime)
        if not uri:
            return ""
        return "url(%s%s%s)" % (quote, uri, quote)
    css = re.sub(
        r"url\(([\"\']?)(/[^)\"\']+)\1\)(?:\s+[^,;{}]*)?(?:,\s*)?", swap, css
    )
    return re.sub(r"background(?:-image)?:\s*,", "background:", css)


def rewrite_markup_srcs(html: str) -> str:
    """Point every site-root src/ href at its inlined copy."""
    def swap(m):
        attr, quote, rel = m.group(1), m.group(2), m.group(3)
        if not rel.startswith("/"):
            return m.group(0)
        mime = "image/svg+xml" if rel.endswith(".svg") else "image/webp"
        uri = asset_uri(rel, mime)
        if not uri:
            return m.group(0)
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


def home_body() -> str:
    """The landing page's body markup, minus its scripts (the bundle replaces them)."""
    html = read(SITE / "index.html")
    m = re.search(r"<body[^>]*>(.*)</body>", html, re.S)
    if not m:
        raise SystemExit("no body in index.html")
    body = m.group(1)
    body = re.sub(r'<script[^>]*src="[^"]*"[^>]*>\s*</script>', "", body)
    body = re.sub(r"<script(?![^>]*nonce)[^>]*>.*?</script>", "", body, flags=re.S)
    return body


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
    css_home = rewrite_css_urls(home_css())
    css_game = rewrite_css_urls(read(SITE / "game.all.css"))
    js_game = game_js()
    body_home = rewrite_markup_srcs(home_body())
    body_game = rewrite_markup_srcs(game_body())

    nonce = secrets.token_urlsafe(12)
    assets = inline_assets()
    shell = SHELL.replace("__ICONS__", json.dumps(icon_map(), separators=(",", ":")))

    doc = f"""<!doctype html>
<!--
  stickfrag.html - the whole game in one self-contained file.
  Generated by tools/build-single.py; rebuild with ./tools/build-all.sh.

  The home screen and the game share this document but never at the same time:
  the home markup is live, the game markup is inert inside a <template>, and the
  game's module text is parked in a type="text/plain" script until PLAY is
  pressed. See SHELL in the builder for why.
-->
<html lang="en" translate="no">
  <head>
    <meta charset="utf-8" />
    <meta name="google" content="notranslate" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'nonce-{nonce}' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob: data:; worker-src 'self' blob:; connect-src 'self' blob: {BROKER_ORIGINS}; object-src 'none'; base-uri 'self'; form-action 'self'"
    />
    <title>StickFrag</title>
    <meta name="description" content="StickFrag, standalone: a stickman shooter in one file." />
    <link rel="icon" href="data:," />
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
    <style id="sf-home-lock">{HOME_LOCK_CSS}</style>
    <style id="sf-game-css">{css_game}</style>
    <style id="sf-pips">{PIP_CSS}</style>
    <style id="sf-p2p-css">{P2P_CSS}</style>
  </head>
  <body>
<template id="sf-game-dom">{body_game}</template>
<div id="sf-home-root">{body_home}</div>
{P2P_MARKUP.replace("__NONCE__", nonce)}
<script type="text/plain" id="sf-game-src">{js_game}</script>
<script nonce="{nonce}">{NET_OFF}</script>
<script nonce="{nonce}">{home_js}</script>
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
