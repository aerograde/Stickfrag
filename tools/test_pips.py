"""M5b: prove the crouch rule through the real footstep path.

The pip is emitted inside WR(), the same gate that plays remote footsteps. This
test injects a remote player that walks, once standing and once crouched, and
counts the pips that appear. Standing must produce a pip; crouched must not.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:8123/stickfrag.html?play&name=tester&map=yard&soundviz=1"

# The client's own flags value for "crouched" is Ar.Crouched = 1, and
# Ar.Grounded = 2, so a standing walker is 2 and a crouched one is 3.
WALK = """(flags) => {
  const game = globalThis.__sfGame;
  const sv = globalThis.__sfSV;
  const el = document.getElementById('soundpips');
  el.querySelectorAll('.sf-pip').forEach(n => n.remove());
  // WR fires a footstep when the remote has travelled 2.1 m since the last step and
  // moved no more than 2 m in this frame. Seed the accumulator just under the
  // threshold and give it a 1 m step, so one call crosses it.
  game.remotes.length = 0;
  game.remotes.push({ id: 99, x: 12, y: 0, z: 0, vx: 1, vz: 0, yaw: 0, pitch: 0, health: 100, flags });
  game.remoteSteps.set(99, { d: 1.5, x: 11, z: 0, reloading: false });
  globalThis.__sfWR(game);
  const n = el.querySelectorAll('.sf-pip').length;
  game.remotes.length = 0;
  return n;
}"""


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.goto(URL, wait_until="load", timeout=90000)
        page.wait_for_function(
            "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true",
            timeout=90000,
        )
        page.wait_for_function(
            "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true",
            timeout=90000,
        )
        page.wait_for_timeout(1500)

        # Expose the game and the step function for this assertion only.
        ready = page.evaluate(
            """() => ({ game: !!globalThis.__sfGame, sv: !!globalThis.__sfSV, wr: !!globalThis.__sfWR })"""
        )

        stand = page.evaluate(WALK, 2) if ready["wr"] else None
        page.wait_for_timeout(120)
        crouch = page.evaluate(WALK, 3) if ready["wr"] else None

        browser.close()

    out = {"exposed": ready, "standingPips": stand, "crouchedPips": crouch, "errors": errors[:6]}
    print(json.dumps(out, indent=2))
    ok = ready["wr"] and (stand or 0) >= 1 and (crouch or 0) == 0 and not errors
    print("\nRESULT:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
