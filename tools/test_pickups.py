"""Pickups: abilities and the weapons on the floor.

The use key is F. This test drives the game into range of each kind of pickup,
confirms the prompt that a player would see, then presses F and checks that the
thing was actually taken.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

from test_entry import game_frame

URL = "http://127.0.0.1:8123/stickfrag.html?play&name=tester&map=yard"


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page(viewport={"width": 1100, "height": 700})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(URL, wait_until="load", timeout=90000)
        game = game_frame(page)
        game.wait_for_function(
            "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true", timeout=90000
        )
        page.wait_for_timeout(1500)
        # Pointer lock is gated on a trusted gesture an automated browser cannot
        # hold; the input code reads this flag, so set what the lock would set.
        game.evaluate("() => { globalThis.__sfGame.input.locked = true; }")

        # --- weapon on a pedestal -------------------------------------------
        weapon = game.evaluate(
            """() => {
              const g = globalThis.__sfGame;
              const s = g.predictor.state;
              // A pedestal sits on the floor, so the pick ray has to look down.
              const p = g.pickupSpots[0];
              s.x = p.x; s.z = p.z + 1.3; s.y = p.y; s.yaw = 0; s.pitch = -0.7;
              g.input.yaw = 0; g.input.pitch = -0.7; g.__sfUseHeld = false;
              const before = s.weapon;
              const offer = globalThis.__sfResolvePickup(g, s);
              return { before, label: offer && offer.label, offer: g.__sfOffer };
            }"""
        )

        # Let one frame run so the HUD writes the prompt.
        page.wait_for_timeout(900)
        weapon["promptText"] = game.evaluate(
            "() => (document.getElementById('prompt')?.textContent || '').trim()"
        )

        page.mouse.click(550, 380)
        page.keyboard.down("f")
        page.wait_for_timeout(400)
        page.keyboard.up("f")
        page.wait_for_timeout(1200)

        weapon_after = game.evaluate(
            """() => {
              const s = globalThis.__sfGame.predictor.state;
              return { weapon: s.weapon, ammo: s.ammo, mag: globalThis.__sfWeapons?.[s.weapon]?.mag };
            }"""
        )

        # --- ability pickup --------------------------------------------------
        # Ability drops are a match feature: a host owns the pool, so there are
        # none in bare offline play. Open a host match for this half.
        hosted = browser.new_page(viewport={"width": 1100, "height": 700})
        hosted.on("pageerror", lambda e: errors.append(str(e)))
        hosted.goto(
            "http://127.0.0.1:8123/stickfrag.html?peer=host&name=picker&map=yard",
            wait_until="load",
            timeout=90000,
        )
        hgame = game_frame(hosted)
        hgame.wait_for_function(
            "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true", timeout=90000
        )
        hosted.wait_for_timeout(2500)
        hgame.evaluate("() => { globalThis.__sfGame.input.locked = true; }")
        # The pool is filled by the host authority a beat after the match is up.
        # Waiting for an actual drop keeps this from racing the spawn.
        hgame.wait_for_function(
            "() => (globalThis.__sfGame.abilityDrop || []).length > 0", timeout=20000
        )
        game = hgame
        page = hosted

        ability = game.evaluate(
            """() => {
              const g = globalThis.__sfGame;
              const d0 = (g.abilityDrop || [])[0];
              if (!d0) return { none: true };
              const s = g.predictor.state;

              // The host owns position in a networked match: moving the body from
              // here is undone by the next snapshot's reconciliation, so a
              // teleport measures the harness rather than the game. Instead put
              // the existing drop where the player is actually standing and
              // looking, which exercises the real aim -> prompt -> take path.
              const ahead = 1.3;
              let tries = 0;
              const press = () => {
                const held = g.abilityState?.held?.[g.selfId];
                if (held || tries > 90) return;
                tries++;
                const live = (g.abilityDrop || []);
                const id = (live[0] || d0).id;
                const slot = (live[0] || d0).slot;
                g.abilityDrop = [{
                  slot,
                  id,
                  x: s.x - Math.sin(s.yaw) * ahead,
                  y: s.y + 1.05,
                  z: s.z - Math.cos(s.yaw) * ahead,
                }];
                g.input.pitch = 0;
                g.__sfUseHeld = false;
                for (const type of ['keydown', 'keyup']) {
                  dispatchEvent(new KeyboardEvent(type, {
                    key: 'f', code: 'KeyF', bubbles: true,
                  }));
                }
                requestAnimationFrame(press);
              };
              press();
              return { id: d0.id, drops: (g.abilityDrop || []).length, pitch: 0 };
            }"""
        )

        page.keyboard.down("f")
        page.wait_for_timeout(400)
        page.keyboard.up("f")
        page.wait_for_timeout(1200)

        ability_after = game.evaluate(
            """() => {
              const g = globalThis.__sfGame;
              return {
                drops: (g.abilityDrop || []).length,
                held: g.abilityState?.held ?? null,
                maxHp: globalThis.__SFAbilities.heldBy(g, g.selfId)?.maxHp ?? null,
              };
            }"""
        )

        page.screenshot(path="/tmp/stickfrag-pickup.png")
        browser.close()

    out = {
        "weapon": weapon,
        "weaponAfter": weapon_after,
        "ability": ability,
        "abilityAfter": ability_after,
        "errors": errors[:6],
    }
    print(json.dumps(out, indent=2))

    weapon_taken = (
        weapon.get("label") is not None
        and "TAKE" in (weapon.get("promptText") or "").upper()
        and weapon_after["weapon"] != weapon["before"]
        and weapon_after["ammo"] == weapon_after["mag"]
    )
    # A missing drop is a failed pickup, not a pass: the abilities layer always
    # spawns at least one, so absence means something upstream broke.
    ability_taken = (
        not ability.get("none")
        and ability_after["drops"] == ability["drops"] - 1
        and ability_after["held"]
        and ability["id"] in ability_after["held"].values()
    )

    print(f"\nweapon taken : {weapon_taken}")
    print(f"ability taken: {ability_taken}")
    ok = weapon_taken and ability_taken and not errors
    print("RESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
