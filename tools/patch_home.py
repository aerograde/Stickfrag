#!/usr/bin/env python3
"""Prepare the vendored home screen for this build.

The vendored page is the real stickfrag.com landing page, restored to its full
length: the header bar, the hero, the squad ribbon, the news rows, the `#play`
section, the advertisers plate and the footer are all present, and the page
scrolls exactly as it does live.

Two things change, both because the server the page drove is gone:

1. The server browser. "All servers", regions and the live list came from a
   matchmaking endpoint that does not exist in a standalone build, so the step is
   removed and its entry point with it.
2. Create and Join go to this build's peer URLs (`/stickfrag.html?peer=host`
   and `?peer=join&room=CODE`) instead of the retired server flow.

And one thing changes because of the single-file build itself:

3. Links to pages this build does not ship are removed (owner's choice), rather
   than left to fail when the file is opened from disk. Every removal is counted,
   so a layout change upstream fails the build instead of half-stripping the page.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOME = ROOT / "stickfrag.com"


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


# Pages a single file cannot serve. `/play/` is deliberately absent: the header's
# PLAY button points there on the live site, and the shell rewires it to start the
# match in place instead.
DEAD_PREFIXES = (
    "/leaderboard/", "/ideas/", "/maps/", "/weapons/", "/chromebook/",
    "/how-to-play/", "/creators/", "/updates/", "/support/",
    "imprint.html", "privacy.html", "terms.html", "ad-terms.html",
)

# Elements the page's scripts write into unconditionally. Removing the link itself
# is right, but removing the node it lives in dereferences null and aborts the
# whole script -- which on this page silently stopped the haven from booting at
# all. These keep their element and lose only their target.
NEUTRALISE = ('<a class="slot-news row-card" id="slot-news" href="/updates/">',)

# The card above is filled from local data, which is still worth showing, but its
# "go" chevron points at the updates page, which this build does not ship.
NEWS_CHEVRON_CSS = """
<style>
.slot-news .news-go { display: none; }
</style>
"""

ANCHOR = re.compile(r'<a\b[^>]*?href="([^"]*)"[^>]*>(.*?)</a>', re.S)
RELEASE_TITLE = re.compile(r'<h3><a href="/updates/#[^"]*">(.*?)</a></h3>', re.S)
RELEASE_MORE = re.compile(r'\s*<p class="more">.*?</p>', re.S)


def strip_dead_links(html: str) -> str:
    """Remove links to pages this build does not ship.

    A single file cannot serve /leaderboard/, /maps/ or /updates/, and opening the
    file from disk makes a root-absolute path resolve to the filesystem root, so
    the click can only fail. The owner's choice is to drop them rather than leave
    dead targets on the page.

    The update release titles keep their text: it is content, not navigation, and
    only its link goes. The "and N more" lines exist only to link there, so they
    go whole.
    """
    html, more = RELEASE_MORE.subn("", html)
    html, titles = RELEASE_TITLE.subn(r"<h3>\1</h3>", html)

    # The event/news slot's news link: the element stays (its script fills it by
    # id) and only the target goes, so the card renders and simply does nothing.
    for old in NEUTRALISE:
        if html.count(old) != 1:
            raise SystemExit(f"neutralise site not found exactly once: {old[:60]}")
        html = html.replace(old, old.replace(' href="/updates/"', ""), 1)

    removed = 0

    def drop(m: re.Match[str]) -> str:
        nonlocal removed
        if m.group(1).startswith(DEAD_PREFIXES):
            removed += 1
            return ""
        return m.group(0)

    html = ANCHOR.sub(drop, html)

    left = [
        a.group(1)
        for a in ANCHOR.finditer(html)
        if a.group(1).startswith(DEAD_PREFIXES)
    ]
    if left:
        raise SystemExit(f"dead links survived the strip: {left}")
    # 26 anchors: the page's own content links, in the header, the #play section
    # and the footer, after the news slot's link was neutralised rather than cut.
    if (more, titles, removed) != (2, 2, 26):
        raise SystemExit(
            f"dead-link strip found more={more} titles={titles} removed={removed}, "
            f"expected 2/2/26"
        )
    return html


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
    ("server-nobots", "button"),
]


def add_stubs(html: str) -> str:
    """Keep playmenu.js from dereferencing nodes that are gone."""
    parts = []
    for node_id, tag in STUBS:
        if f'id="{node_id}"' in html:
            continue
        parts.append(f'<{tag} id="{node_id}" hidden></{tag}>')
    if not parts:
        return html
    return html.replace("</body>", "".join(parts) + "</body>", 1)


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

    html = strip_dead_links(html)
    html = add_stubs(html)
    html = wire_peer_buttons(html)
    html = html.replace("</head>", NEWS_CHEVRON_CSS + "</head>", 1)

    index.write_text(html, encoding="utf-8")
    print(f"home page prepared ({before:,} -> {len(html):,} bytes)")


if __name__ == "__main__":
    main()
