"""The SVG, from file://, end to end: menu, mode list, a live match, pointer lock."""

from __future__ import annotations

import json
from pathlib import Path

from playwright.sync_api import sync_playwright

SVG = (
    Path(__file__).resolve().parent.parent / "stickfrag.com" / "stickfrag.svg"
).as_uri() + "?name=tester"
SHOT = Path("/tmp/sf-svg")


def main() -> int:
    SHOT.mkdir(exist_ok=True)
    errors: list[str] = []
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
        ctx = b.new_context(viewport={"width": 1100, "height": 760})
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: errors.append(str(e)[:220]))
        pg.goto(SVG, wait_until="load", timeout=120_000)

        pg.wait_for_timeout(6000)
        pg.screenshot(path=str(SHOT / "1-menu.png"))

        game = pg.frames[-1]
        state = game.evaluate(
            """() => ({
              play: !!document.querySelector('.play-big'),
              tiles: document.querySelectorAll('#start-modes .mode-tile').length,
              bar: !!document.querySelector('header.bar'),
              footer: !!document.querySelector('footer'),
              sections: [...document.querySelectorAll('main > *')]
                .filter((e) => e.getBoundingClientRect().height > 0).length,
              page: document.scrollingElement.scrollHeight,
            })"""
        )

        game.fill("#gear-name", "tester")
        game.click(".play-big")
        game.wait_for_timeout(1200)
        pg.screenshot(path=str(SHOT / "2-modes.png"))

        game.evaluate("() => document.querySelectorAll('#start-modes .mode-tile')[0].click()")
        game.wait_for_function("() => globalThis.__sfGame && globalThis.__sfGame.ready", timeout=120_000)
        game.wait_for_timeout(4000)
        pg.screenshot(path=str(SHOT / "3-match.png"))

        match = game.evaluate(
            """() => {
              const g = globalThis.__sfGame, r = g.renderer, t3 = r.renderer;
              const gl = t3.getContext(), c = gl.canvas;
              return {
                mode: g.match ? g.match.mode : null,
                quality: r.quality,
                buffer: [c.width, c.height],
                css: [c.clientWidth, c.clientHeight],
                calls: t3.info.render.calls,
                locked: !!document.pointerLockElement,
              };
            }"""
        )

        # The frame is focused on load; a real click activates the game. In a
        # headless browser the lock is refused, so the fallback is the expected
        # playable state there. Either one is a working input.
        pg.mouse.click(550, 380)
        pg.wait_for_timeout(1200)
        playable = game.evaluate(
            """() => ({
              locked: !!document.pointerLockElement,
              fallback: !!globalThis.__sfGame?.input?.sfFallback,
              active: !!globalThis.__sfGame?.input?.active,
            })"""
        )

        # HOME asks the launcher for a fresh document, which frees the match's
        # module cache and GL context. The SVG page reloads and starts a new
        # inline frame; wait for that frame's menu.
        game.evaluate("() => globalThis.__sfHome && globalThis.__sfHome()")
        pg.wait_for_timeout(3000)
        home = None
        for _ in range(40):
            for candidate in [f for f in pg.frames if f is not pg.main_frame]:
                try:
                    if candidate.query_selector(".play-big"):
                        home = candidate.evaluate(
                            """() => ({
                              play: !!document.querySelector('.play-big'),
                              menuLen: (document.getElementById('gear') || {}).innerHTML?.length ?? 0,
                              gameGone: !document.getElementById('game'),
                              page: document.scrollingElement.scrollHeight,
                            })"""
                        )
                        break
                except Exception:
                    pass
            if home:
                break
            pg.wait_for_timeout(500)
        if home is None:
            home = {"play": False, "menuLen": 0, "gameGone": False, "page": 0}
        pg.screenshot(path=str(SHOT / "4-home.png"))
        b.close()

    checks = {
        "frame runs an HTML document": state["play"],
        "header restored": state["bar"],
        "footer restored": state["footer"],
        "page is the full site": state["page"] > 2000 and state["sections"] >= 5,
        "mode tiles render": state["tiles"] >= 5,
        "match starts": match["mode"] == "tdm",
        "HUD buffers at css size": match["buffer"][0] <= match["css"][0] * 2 + 2,
        "input playable (lock or fallback)": playable["active"]
        and (playable["locked"] or playable["fallback"]),
        "HOME returns to a fresh menu": home["play"] and home["gameGone"] and home["menuLen"] > 1000,
        "no errors": not errors,
    }
    print(json.dumps({"state": state, "match": match, "playable": playable,
                      "home": home, "errors": errors[:4]}, indent=2))
    for k, v in checks.items():
        print(f"  {'ok  ' if v else 'FAIL'} {k}")
    ok = all(checks.values())
    print("RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
