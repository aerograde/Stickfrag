#!/usr/bin/env python3
"""Install the real home screen (the "haven") and point its PLAY at the game.

The home page is vendored verbatim in home-site/ from stickfrag.com: its markup,
its 15 stylesheets, its chunks, and lobby.js (the 3D room renderer). Nothing about
its look is re-implemented here.

What this script changes, and only this:
  1. Visible brand text: stickfrag.com -> stickfrag.html.
  2. PLAY: the real page routes through a mode/server picker whose data comes from
     matchmaking endpoints that do not exist in a standalone build. A small shim
     sends PLAY (and the room buttons) straight into the game with the typed
     nickname, which is the same journey minus the dead steps.
"""

from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "stickfrag.com"
HOME = ROOT / "home-site"

SHIM = r"""
<script>
// Standalone shim: the home page's own PLAY path continues into a mode/server
// picker backed by matchmaking endpoints that a standalone build does not have.
// Send the player straight into the game instead, carrying the nickname and map
// they already chose. Everything visual on this page is the real thing.
(() => {
  const GAME = "/play/";
  const params = () => new URLSearchParams(location.search);

  function nickname() {
    const el = document.getElementById("gear-name");
    const typed = el && !el.hidden ? el.value.trim() : "";
    if (/^[A-Za-z0-9_]{3,16}$/.test(typed)) return typed;
    try {
      const saved = (localStorage.getItem("name") || "").trim();
      if (/^[A-Za-z0-9_]{3,16}$/.test(saved)) return saved;
    } catch {}
    return "player";
  }

  function enter(extra) {
    const q = new URLSearchParams();
    q.set("name", nickname());
    q.set("offline", "");
    q.set("map", params().get("map") || "yard");
    for (const [k, v] of Object.entries(extra || {})) q.set(k, v);
    location.href = GAME + "?" + q.toString();
  }

  // PLAY, then whichever way the player wanted to get in.
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest && e.target.closest(
        "#start-quick, #start-create, #start-servers, .play-big, .js-play, #gear-join button, #code-create, #invite-go"
      );
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      const room = (document.getElementById("invite-code")?.textContent || "").trim();
      if (el.id === "start-create" && room) enter({ room });
      else enter();
    },
    true
  );

  // The form's own submit must not run the dead name-check path.
  document.addEventListener(
    "submit",
    (e) => {
      if (e.target && e.target.id === "gear-join") {
        e.preventDefault();
        e.stopPropagation();
        enter();
      }
    },
    true
  );
})();
</script>
"""

BRAND = [
    # The wordmark is composed of two spans, so patch both.
    ('STICKFRAG<span class="tld">.COM</span>', 'STICKFRAG<span class="tld">.HTML</span>'),
    ("STICKFRAG.COM", "STICKFRAG.HTML"),
    ("stickfrag.com", "stickfrag.html"),
]


def install() -> None:
    if not (HOME / "index.html").is_file():
        raise SystemExit("home-site/index.html missing; vendor the home page first")
    for item in HOME.iterdir():
        dest = SITE / item.name
        if item.is_dir():
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(item, dest)
        else:
            shutil.copy2(item, dest)
    print(f"installed home-site -> {SITE.relative_to(ROOT)}")


def rebrand() -> None:
    page = SITE / "index.html"
    html = page.read_text(encoding="utf-8")
    before = html
    for old, new in BRAND:
        html = html.replace(old, new)
    # The links into the game stay exactly where the real page points them.
    if "</body>" not in html:
        raise SystemExit("index.html has no </body>")
    html = html.replace("</body>", SHIM + "</body>", 1)
    page.write_text(html, encoding="utf-8")
    print(f"rebranded home page ({len(before):,} -> {len(html):,} bytes)")


def main() -> None:
    install()
    rebrand()
    # The game page's own title and metadata.
    play = SITE / "play" / "index.html"
    if play.is_file():
        t = play.read_text(encoding="utf-8")
        t = t.replace("https://stickfrag.com/play/", "https://stickfrag.html/play/")
        play.write_text(t, encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
