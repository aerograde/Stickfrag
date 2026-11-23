"""Test the one file this build ships.

`stickfrag.html` contains both screens: the real landing page from stickfrag.com
and the match. The home screen is live on load and the game only boots when a mode
is chosen, so this asserts the whole path a player actually takes.

What this asserts:
  * the home screen is the *whole* site: header, hero, news rows, #play, footer,
    and it scrolls exactly as it does live (this is what was broken on a small
    screen: the page was locked to one viewport and clipped),
  * the game is not started until asked, so the menu costs no WebGL context,
  * PLAY demands a nickname, then opens the mode list (the real flow),
  * choosing a mode boots that mode in place, with team scores for team modes,
  * the HUD resolves its own #gear, not the menu's, so a match never wipes the menu,
  * HOME returns to the menu in place, with the menu intact,
  * a second match can start after returning home,
  * JOIN by room code produces a real peer URL,
  * the file is self-contained (no external requests).
"""

from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123"
SHOT = Path("/tmp/stickfrag-single")

SIZES = [(1280, 800), (1024, 640), (412, 732), (360, 640)]


def home_shape(page) -> dict:
    return page.evaluate(
        """() => {
          const rows = [...document.querySelectorAll('main > *')]
            .filter((e) => e.getBoundingClientRect().height > 0)
            .map((e) => e.id || e.className.toString().split(' ')[0]);
          const doc = document.scrollingElement;
          return {
            bar: !!document.querySelector('header.bar'),
            footer: !!document.querySelector('footer'),
            rows,
            scrolls: doc.scrollHeight > innerHeight + 4,
            page: doc.scrollHeight,
            overflowX: doc.scrollWidth > innerWidth + 4,
            haven: !!document.getElementById('gear-canvas'),
            play: !!document.querySelector('.play-big'),
            join: !!document.getElementById('code-input'),
            gameNotStarted: !globalThis.__sfGame,
            deadLinks: [...document.querySelectorAll('a[href]')]
              .map((a) => a.getAttribute('href'))
              .filter((h) => h.startsWith(('/leaderboard/', '/ideas/', '/maps/',
                '/weapons/', '/chromebook/', '/how-to-play/', '/creators/', '/updates/',
                '/support/')) || h.endsWith(('-terms.html', 'imprint.html', 'privacy.html',
                'terms.html'))),
          };
        }"""
    )


def main() -> int:
    errors: list[str] = []
    external: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--disable-gpu-vsync"])

        # --- the home screen ------------------------------------------------
        home = browser.new_page(viewport={"width": 1280, "height": 800})
        home.on("pageerror", lambda e: errors.append("home: " + str(e)))
        home.on(
            "console",
            lambda m: errors.append("home: " + m.text) if m.type == "error" else None,
        )
        home.on(
            "request",
            lambda r: external.append(r.url)
            if not r.url.startswith(("http://127.0.0.1:8123", "data:", "blob:"))
            else None,
        )
        home.goto(f"{BASE}/stickfrag.html", wait_until="load", timeout=90000)
        home.wait_for_timeout(6000)

        home_state = home_shape(home)
        home.screenshot(path=str(SHOT) + "-home.png")

        # --- the same page at small sizes -----------------------------------
        small = {}
        for w, h in SIZES[1:]:
            small[f"{w}x{h}"] = home_shape(home) if (w, h) == (1024, 640) else None
        sizes = {}
        for w, h in SIZES:
            page = browser.new_page(viewport={"width": w, "height": h})
            page.on("pageerror", lambda e: errors.append(f"{w}x{h}: " + str(e)))
            page.goto(f"{BASE}/stickfrag.html", wait_until="load", timeout=90000)
            page.wait_for_timeout(3500)
            sizes[f"{w}x{h}"] = home_shape(page)
            page.screenshot(path=f"{SHOT}-{w}x{h}.png")
            page.close()

        # --- PLAY opens the mode list ---------------------------------------
        # The nickname is required first, exactly as on the site.
        home.click(".play-big")
        home.wait_for_timeout(800)
        gate = home.evaluate(
            "() => document.getElementById('gear-error')?.textContent ?? ''"
        )
        home.fill("#gear-name", "tester")
        home.click(".play-big")
        home.wait_for_timeout(1200)
        modes = home.evaluate(
            """() => ({
              step: document.getElementById('gear')?.dataset.step,
              tiles: [...document.querySelectorAll('#start-modes .mode-tile')]
                .map((b) => (b.textContent || '').trim().toUpperCase()),
              tileHeight: Math.round(
                document.querySelector('#start-modes .mode-tile')
                  ?.getBoundingClientRect().height ?? 0
              ),
            })"""
        )
        home.screenshot(path=str(SHOT) + "-modes.png")

        # --- choosing a mode starts that mode -------------------------------
        home.click("#start-modes .mode-tile")
        home.wait_for_timeout(16000)
        live = home.evaluate(
            """() => {
              const menu = document.getElementById('gear');
              return {
                ready: globalThis.__sfGame?.ready === true,
                mode: globalThis.__sfGame?.match?.mode ?? null,
                teamScores: globalThis.__sfGame?.match?.teamScores ?? null,
                role: globalThis.__sfPeerDbg?.()?.role ?? null,
                fpsText: document.getElementById('fps')?.textContent?.trim() ?? null,
                homeHidden: (function () {
                  const el = document.getElementById('sf-home-root');
                  return !el || getComputedStyle(el).display === 'none';
                })(),
                // The HUD's own #gear must be the game's, never the menu's.
                gearInHome: !!(menu && menu.closest('#sf-home-root')),
                menuIntact: (document.querySelector('#sf-home-root .play-big') !== null),
              };
            }"""
        )
        home.screenshot(path=str(SHOT) + "-play.png")

        # --- HOME returns in place ------------------------------------------
        home.evaluate("() => globalThis.__sfHome()")
        home.wait_for_timeout(2000)
        back = home.evaluate(
            """() => ({
              play: !!document.querySelector('.play-big'),
              menuLen: (document.getElementById('gear') || {}).innerHTML?.length ?? 0,
              gameGone: !document.getElementById('game'),
              homeShown: getComputedStyle(document.getElementById('sf-home-root')).display !== 'none',
              lobbyLive: globalThis.__sfLobbyBoot ? globalThis.__sfLobbyBoot.live : null,
              search: location.search,
            })"""
        )
        home.screenshot(path=str(SHOT) + "-home-again.png")

        # --- and a second match starts --------------------------------------
        second = home.evaluate(
            """() => {
              const t = document.querySelectorAll('#start-modes .mode-tile')[1];
              if (!t) return false;
              t.click();
              return true;
            }"""
        )
        home.wait_for_timeout(16000)
        again = home.evaluate(
            """() => ({
              ready: globalThis.__sfGame?.ready === true,
              mode: globalThis.__sfGame?.match?.mode ?? null,
            })"""
        )
        home.close()

        # --- reloading restores the same match ------------------------------
        reload_page = browser.new_page(viewport={"width": 1280, "height": 800})
        reload_page.on("pageerror", lambda e: errors.append("reload: " + str(e)))
        reload_page.goto(
            f"{BASE}/stickfrag.html?peer=host&mode=tdm&map=yard&name=tester",
            wait_until="load",
            timeout=90000,
        )
        reload_page.wait_for_timeout(16000)
        reloaded = reload_page.evaluate(
            "() => ({ ready: globalThis.__sfGame?.ready === true, mode: globalThis.__sfGame?.match?.mode ?? null })"
        )
        reload_page.close()

        # --- JOIN by room code ----------------------------------------------
        join = browser.new_page(viewport={"width": 1280, "height": 800})
        join.on("pageerror", lambda e: errors.append("join: " + str(e)))
        join.goto(f"{BASE}/stickfrag.html", wait_until="load", timeout=90000)
        join.wait_for_timeout(5000)
        join.fill("#code-input", "K7QX2M")
        join.press("#code-input", "Enter")
        join.wait_for_timeout(2500)
        join_url = join.url
        join.close()

        browser.close()

    out = {
        "home": home_state,
        "sizes": {k: {"scrolls": v["scrolls"], "page": v["page"],
                      "overflowX": v["overflowX"], "play": v["play"]}
                  for k, v in sizes.items()},
        "nameGate": gate,
        "modes": {
            "step": modes["step"],
            "tileHeight": modes["tileHeight"],
            "tileCount": len(modes["tiles"]),
        },
        "live": live,
        "homeAgain": back,
        "secondMatch": again,
        "reloaded": reloaded,
        "joinUrl": join_url,
        "externalRequests": external[:5],
        "errors": errors[:10],
    }
    print(json.dumps(out, indent=2))

    want_rows = {"gear", "squad", "duo", "thanks-row", "play", "support"}
    ok = (
        # The whole site is present and scrolls, at every size.
        home_state["bar"]
        and home_state["footer"]
        and want_rows.issubset(set(home_state["rows"]))
        and home_state["scrolls"]
        and home_state["page"] > 2000
        and not home_state["overflowX"]
        and all(
            v["scrolls"] and v["play"] and not v["overflowX"]
            for v in sizes.values()
        )
        # No dead links anywhere on the page.
        and not home_state["deadLinks"]
        and home_state["haven"]
        and home_state["play"]
        and home_state["join"]
        # The point of parking the module: sitting on the menu must not pay for
        # a WebGL context or the 5.7 MB game.
        and home_state["gameNotStarted"]
        # PLAY must demand a name, then open the mode list.
        and bool(gate)
        and modes["step"] == "start"
        and any("TEAM DEATHMATCH" in t for t in modes["tiles"])
        and modes["tileHeight"] > 30
        and live["ready"]
        and live["mode"] == "tdm"
        and live["teamScores"] is not None
        and live["role"] == "host"
        and "FPS" in (live["fpsText"] or "")
        and live["homeHidden"]
        # The HUD must never resolve to the menu's nodes.
        and live["gearInHome"] is False
        and live["menuIntact"]
        # HOME comes back in place, and the menu is still whole.
        and back["play"]
        and back["menuLen"] > 100_000
        and back["gameGone"]
        and back["homeShown"]
        and back["lobbyLive"] is True
        and "peer=" not in (back["search"] or "")
        # And a second match can start.
        and second
        and again["ready"]
        and again["mode"] == "ffa"
        and reloaded["ready"]
        and reloaded["mode"] == "tdm"
        and "peer=join" in join_url
        and not errors
        and not external
    )
    print("\nRESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
