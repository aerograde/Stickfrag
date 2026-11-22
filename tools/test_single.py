"""Test the one file this build ships.

`stickfrag.html` contains both screens: the landing page from stickfrag.com and
the match. The home screen is live on load and the game only boots when a mode is
chosen, so this asserts the whole path a player actually takes.

What this asserts:
  * the home screen renders, has no top bar / server list, and does not scroll,
  * the game is not started until asked, so the menu costs no WebGL context,
  * PLAY demands a nickname, then opens the mode list (the real flow),
  * choosing a mode boots that mode in place, with team scores for team modes,
  * reloading a match URL restores the same mode,
  * JOIN by room code produces a real peer URL,
  * the file is self-contained (no external requests).
"""

from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123"
SHOT = Path("/tmp/stickfrag-single")


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

        home_state = home.evaluate(
            """() => ({
              noTopBar: !document.querySelector('header.bar'),
              // #server-rows survives as a hidden stub for the landing bundle;
              // what matters is that nothing server-list shaped is visible.
              noServerList: ![...document.querySelectorAll('#server-rows')]
                .some((el) => el.getBoundingClientRect().height > 0),
              noAllServers: !/all servers/i.test(document.body.innerText),
              scrolls: document.scrollingElement.scrollHeight > window.innerHeight + 4,
              haven: !!document.getElementById('gear-canvas'),
              play: !!document.querySelector('.play-big'),
              join: !!document.getElementById('code-input'),
              gameNotStarted: !globalThis.__sfGame,
            })"""
        )
        home.screenshot(path=str(SHOT) + "-home.png")

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
            """() => ({
              ready: globalThis.__sfGame?.ready === true,
              mode: globalThis.__sfGame?.match?.mode ?? null,
              teamScores: globalThis.__sfGame?.match?.teamScores ?? null,
              role: globalThis.__sfPeerDbg?.()?.role ?? null,
              fpsText: document.getElementById('fps')?.textContent?.trim() ?? null,
              homeHidden: (function () {
                const el = document.getElementById('sf-home-root');
                return !el || getComputedStyle(el).display === 'none';
              })(),
            })"""
        )
        home.screenshot(path=str(SHOT) + "-play.png")

        # --- reloading restores the same match ------------------------------
        home.reload(wait_until="load", timeout=90000)
        home.wait_for_timeout(16000)
        reloaded = home.evaluate(
            """() => ({
              ready: globalThis.__sfGame?.ready === true,
              mode: globalThis.__sfGame?.match?.mode ?? null,
            })"""
        )
        home.close()

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
        "nameGate": gate,
        "modes": {
            "step": modes["step"],
            "tileHeight": modes["tileHeight"],
            "tileCount": len(modes["tiles"]),
        },
        "live": live,
        "reloaded": reloaded,
        "joinUrl": join_url,
        "externalRequests": external[:5],
        "errors": errors[:10],
    }
    print(json.dumps(out, indent=2))

    ok = (
        home_state["noTopBar"]
        and home_state["noServerList"]
        and home_state["noAllServers"]
        and not home_state["scrolls"]
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
