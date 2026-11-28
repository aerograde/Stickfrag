#!/usr/bin/env python3
"""Death, respawn and damage feedback in a hosted match.

Three separate defects shared one symptom -- "death is bugged":
  * a duplicate `kill` key in the event table replaced the client's own handler,
  * a kill event without a push vector threw inside the renderer, killing the
    frame before the HUD could draw,
  * every bot's respawn cleared the local death state.
This asserts the observable behaviour of all three: the death UI appears, it
survives, firing is blocked, the player comes back, and a bot's respawn does not
end the local death early.
"""

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from test_entry import game_frame

URL = (
    "http://127.0.0.1:8123/stickfrag.html"
    "?peer=host&name=tester&mode=ffa&bots=3&map=yard"
)


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_context(viewport={"width": 1280, "height": 800}).new_page()
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        page.on("console", lambda m: errors.append("c:" + m.text[:160]) if m.type == "error" else None)

        page.goto(URL, wait_until="load", timeout=90000)
        game = game_frame(page)
        game.wait_for_function(
            "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true", timeout=90000
        )
        page.wait_for_timeout(2500)

        # Record the health curve and whether the death UI is up.
        game.evaluate(
            """() => {
              const g = globalThis.__sfGame;
              window.__hp = [];
              window.__deaths = [];
              setInterval(() => {
                window.__hp.push(g.health);
                if (g.death) {
                  const el = document.querySelector('#loadout') || document.querySelector('#death');
                  const box = el ? el.getBoundingClientRect() : null;
                  window.__deaths.push({
                    hp: g.health,
                    visible: !!box && box.width > 40 && box.height > 20,
                    text: (el ? el.textContent : '').replace(/\\s+/g, ' ').trim().slice(0, 40),
                  });
                }
              }, 80);
            }"""
        )

        # Stand still and let the bots land a kill.
        game.wait_for_function("() => !!globalThis.__sfGame.death", timeout=90000)
        page.wait_for_timeout(500)

        dead_state = game.evaluate(
            """() => {
              const g = globalThis.__sfGame;
              const el = document.querySelector('#loadout') || document.querySelector('#death');
              const box = el.getBoundingClientRect();
              return {
                hp: g.health,
                visible: box.width > 40 && box.height > 20,
                text: el.textContent.replace(/\\s+/g, ' ').trim().slice(0, 60),
              };
            }"""
        )

        # Firing while dead must not consume ammo.
        before = game.evaluate("() => globalThis.__sfGame.predictor.state.ammo")
        page.mouse.down()
        page.wait_for_timeout(700)
        page.mouse.up()
        after = game.evaluate("() => globalThis.__sfGame.predictor.state.ammo")

        # The death screen must still be up a moment later: a bot respawning must
        # not clear it.
        page.wait_for_timeout(1500)
        still_dead = game.evaluate("() => !!globalThis.__sfGame.death")

        game.wait_for_function(
            "() => !globalThis.__sfGame.death && globalThis.__sfGame.health > 0", timeout=40000
        )
        respawned = game.evaluate(
            "() => ({ hp: globalThis.__sfGame.health, death: !!globalThis.__sfGame.death })"
        )

        curve = game.evaluate(
            """() => { const a = window.__hp, out = [];
              for (let i = 0; i < a.length; i++) if (i === 0 || a[i] !== a[i - 1]) out.push(a[i]);
              return out; }"""
        )
        death_samples = game.evaluate("() => window.__deaths.length")
        browser.close()

    print("death UI   :", dead_state)
    print("ammo       :", before, "->", after, "(must not drop)")
    print("still dead :", still_dead)
    print("respawned  :", respawned)
    print("hp curve   :", curve[:16])
    print("death seen :", death_samples, "samples")
    print("errors     :", errors[:4] or "none")

    ok = True

    def check(label: str, cond: bool) -> None:
        nonlocal ok
        print(("  PASS  " if cond else "  FAIL  ") + label)
        ok = ok and cond

    check("death UI visible", dead_state["visible"])
    check("death UI names the killer", "by" in dead_state["text"].lower())
    check("no ammo spent while dead", before == after)
    check("death survives bot respawns", still_dead)
    check("player respawns", respawned["hp"] > 0 and not respawned["death"])
    check("death state sampled", death_samples > 0)

    # Health must fall, and must not jump back up except on a respawn (0 -> 100).
    jumps = [(a, b) for a, b in zip(curve, curve[1:]) if b > a and not (a == 0 and b == 100)]
    check("health never climbs mid-life", not jumps)
    check("no page errors", not errors)

    print("RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
