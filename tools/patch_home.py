#!/usr/bin/env python3
"""Prepare the vendored home screen for this build.

The vendored page is the real stickfrag.com landing page. Three things change:

1. The top bar (`header.bar`) goes away: leaderboard, ideas, advertise, prices.
2. The server browser goes away: "All servers", regions, the live list, no-bots.
   The old multiplayer is gone, so a list of servers that no longer exist is a
   lie on the page.
3. Create and Join are rewired to this build's peer URLs
   (`/stickfrag.html?peer=host` and `?peer=join&room=CODE`) instead of the
   retired server flow.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOME = ROOT / "stickfrag.com"


def strip_top_bar(html: str) -> str:
    """Remove the landing page's top navigation bar entirely."""
    # The bar is a single <header class="bar"> ... </header> block.
    out, n = re.subn(
        r'\s*<header class="bar"[^>]*>.*?</header>',
        "",
        html,
        flags=re.DOTALL,
    )
    # Already gone means an earlier step removed it, which is the goal.
    return out


def _remove_element(html: str, marker: str) -> tuple[str, int]:
    """Remove one element by walking its nested tags to the matching close."""
    at = html.find(marker)
    if at < 0:
        return html, 0
    # The opening tag starts at the last '<' before the marker.
    start = html.rfind("<", 0, at)
    tag = re.match(r"<([a-zA-Z][\w-]*)", html[start:])
    if not tag:
        return html, 0
    name = tag.group(1)
    depth = 0
    pos = start
    close = re.compile(rf"<(/?){name}\b[^>]*?(/?)>", re.IGNORECASE)
    while True:
        m = close.search(html, pos)
        if not m:
            return html, 0
        if m.group(2) == "/":  # self-closing
            pass
        elif m.group(1) == "/":
            depth -= 1
            if depth == 0:
                return html[:start] + html[m.end():], 1
        else:
            depth += 1
        pos = m.end()


def strip_server_list(html: str) -> str:
    """Remove the old multiplayer server browser and its step."""
    removed = 0

    # The whole `<div id="step-servers">` panel. It is a div, not a section, and
    # it contains nested divs, so match to its matching close by counting tags.
    html, n = _remove_element(html, 'id="step-servers"')
    removed += n

    # The "All servers" entry point on the start step.
    html, n = re.subn(r'\s*<button[^>]*id="start-servers"[^>]*>.*?</button>', "", html, flags=re.DOTALL)
    removed += n

    return html


# Everything after the hero screen. The home page is meant to be looked at, not
# scrolled: these are the marketing rows below the play card.
BELOW_THE_FOLD = [
    'class="duo thanks-row"',
    'class="duo updates-row"',
    'id="event-row"',
    'class="hero"',
    'class="support soon-only"',
    'class="plate live-only"',
    'class="after live-only"',
    'id="play"',
    'class="squad"',
    'id="event"',
]


def strip_news_rows(html: str) -> str:
    """Remove the below-the-fold marketing: the hero screen is the page."""
    for marker in BELOW_THE_FOLD:
        html, _ = _remove_element(html, marker)
    return html


def strip_footer_nav(html: str) -> str:
    """The footer's page nav links to pages this build does not ship."""
    html, _ = _remove_element(html, 'aria-label="Footer"')
    return html


def strip_footer(html: str) -> str:
    """No footer either: the hero screen is the whole page."""
    html, _ = _remove_element(html, 'class="foot')
    html, _ = _remove_element(html, "<footer")
    return html


def no_scroll(html: str) -> str:
    """One screen: the having screen, nothing below it, no scrollbar."""
    css = """
<style>
  /* One screen: the haven, and nothing to scroll to. */
  html, body { height: 100%; overflow: hidden; background: #a8d8ea; }
  body { overscroll-behavior: none; }
  main { min-height: calc(100vh - 0px) !important; display: flex; }
  main > section.gear { flex: 1; }
  @media (max-height: 760px) {
    section.gear { padding-top: 16px !important; padding-bottom: 20px !important; }
  }
</style>
"""
    return html.replace("</head>", css + "</head>", 1)


# IDs that playmenu.js wires unconditionally. The server browser is gone from the
# page, so these stay as empty hidden stubs: removed from view, present in the
# DOM, and the landing script never dereferences null.
STUBS = [
    ("server-rows", "div"),
    ("server-title", "span"),
    ("server-region", "select"),
    ("server-modes", "div"),
    ("server-find", "input"),
    ("server-nobots-slot", "span"),
    ("server-quick", "button"),
    ("start-servers", "button"),
    ("server-nobots", "button"),
    # Sections this build removes but landing.js still queries.
    ("thanks-row", "section"),
    ("updates-row", "section"),
    ("event-row", "section"),
]


def add_stubs(html: str) -> str:
    """Keep playmenu.js and landing.js from dereferencing nodes that are gone."""
    parts = []
    for node_id, tag in STUBS:
        if f'id="{node_id}"' in html:
            continue
        parts.append(f'<{tag} id="{node_id}" hidden></{tag}>')
    # landing.js also queries these by class for the pricing/hero rows.
    for cls in ("hero-card", "js-why-price"):
        if f'class="{cls}"' not in html and f"{cls}" not in html.split("</body>")[0][-4000:]:
            parts.append(f'<div class="{cls}" hidden></div>')
    if not parts:
        return html
    return html.replace("</body>", "".join(parts) + "</body>", 1)


def drop_landing_script(html: str) -> str:
    """Remove landing.js.

    It renders the advertising calculator and the pricing rows, both of which are
    deleted here, and it writes into those nodes unconditionally. The haven and
    the play card come from haven-boot.js and playmenu.js, not this script.
    """
    html, _ = _remove_element(html, 'src="/landing.js')
    return html


def wire_peer_buttons(html: str) -> str:
    """Create -> host a room, Join -> join by code. No server list involved."""
    shim = """
<script>
// Peer multiplayer for this build. The real landing page drove a server list
// that no longer exists; these two controls now start a host match or join one
// by room code, which is the WebRTC mesh this client actually speaks.
(() => {
  const byId = (id) => document.getElementById(id);
  const rooms = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const newCode = () => Array.from(crypto.getRandomValues(new Uint8Array(6)),
    (n) => rooms[n % rooms.length]).join('');
  const name = () => {
    try { return (localStorage.getItem('name') || '').trim(); } catch { return ''; }
  };
  const go = (qs) => {
    const n = name();
    location.href = '/stickfrag.html?' + qs + (n ? '&name=' + encodeURIComponent(n) : '');
  };

  // Capture phase on document: this runs before the landing page's own
  // handlers, so its server-list flow never sees the click.
  document.addEventListener('click', (e) => {
    const t = e.target instanceof Element && e.target.closest('#code-create, #start-create');
    if (!t || t.closest('[hidden]')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    go('peer=host&room=' + newCode());
  }, true);

  document.addEventListener('submit', (e) => {
    if (!(e.target instanceof Element) || !e.target.matches('#code-join, #gear-join')) return;
    const field = byId('code-input') || e.target.querySelector('input');
    let value = ((field && field.value) || '').trim().toUpperCase();
    const m = /[?&]room=([A-Z0-9]{6})/i.exec(value);
    if (m) value = m[1].toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, '');
    e.preventDefault();
    e.stopImmediatePropagation();
    if (/^[A-Z0-9]{6}$/.test(value)) go('peer=join&room=' + value);
  }, true);

  // Join uses the existing room-code field, which already validates the
  // 6-character alphabet this build's rooms use.
  const joinForm = byId('gear-join') || byId('gear');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      const field = joinForm.querySelector('input[name="room"], input#room, input[type="text"]');
      const value = (field && field.value || '').replace(/[\\s-]/g, '').toUpperCase();
      if (!/^[A-Z0-9]{6}$/.test(value)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      go('peer=join&room=' + value);
    }, true);
  }

  // The old "invite link" copied a server URL. Point it at a room instead.
  const invite = byId('invite-link-copy');
  if (invite) {
    invite.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const code = newCode();
      const url = location.origin + '/stickfrag.html?peer=join&room=' + code;
      navigator.clipboard?.writeText(url);
      invite.textContent = 'LINK COPIED';
      setTimeout(() => { invite.textContent = 'MAKE A ROOM'; }, 1500);
    }, true);
  }
})();
</script>
"""
    if "</body>" not in html:
        raise AssertionError("no </body> to attach the peer shim")
    return html.replace("</body>", shim + "</body>", 1)


def main() -> None:
    index = HOME / "index.html"
    html = index.read_text(encoding="utf-8")
    before = len(html)

    html = strip_top_bar(html)
    html = strip_server_list(html)
    html = strip_news_rows(html)
    html = strip_footer_nav(html)
    html = strip_footer(html)
    html = no_scroll(html)
    html = add_stubs(html)
    html = drop_landing_script(html)
    html = wire_peer_buttons(html)

    index.write_text(html, encoding="utf-8")
    print(f"home page prepared ({before:,} -> {len(html):,} bytes)")


if __name__ == "__main__":
    main()
