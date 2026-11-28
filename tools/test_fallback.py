"""No-pointer-lock fallback: a match must be playable when capture is refused.

Chromium refuses pointer lock in `about:blank`, many sandboxed frames and blob
documents served over http. The game used to sit on the resume panel forever in
those contexts. This asserts the fallback controls instead: the panel goes away,
mouse movement turns the view, clicking fires and the wheel switches weapons.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

from test_entry import game_frame

URL = "http://127.0.0.1:8123/stickfrag.html?peer=host&mode=ffa&map=yard&name=tester"

DENY = """
Object.defineProperty(HTMLCanvasElement.prototype, "requestPointerLock", {
  configurable: true,
  writable: true,
  value: function () {
    return Promise.reject(new DOMException("denied for test", "NotAllowedError"));
  },
});
"""


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True, args=["--enable-unsafe-swiftshader"])
        ctx = b.new_context(viewport={"width": 1100, "height": 760})
        ctx.add_init_script(DENY)
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append(str(e)[:200]))
        page.on(
            "console",
            lambda m: errors.append("console: " + m.text[:160]) if m.type == "error" else None,
        )
        page.goto(URL, wait_until="load", timeout=90_000)
        game = game_frame(page)
        game.wait_for_function("() => !!globalThis.__sfGame?.ready", timeout=90_000)
        page.wait_for_timeout(2500)

        # The game asks for the pointer at boot in a host match. The denied
        # request has to land in the fallback, without a stuck resume panel.
        try:
            game.wait_for_function(
                "() => globalThis.__sfGame?.input?.sfFallback === true", timeout=8000
            )
        except Exception:
            pass
        page.wait_for_timeout(300)

        before = game.evaluate(
            """() => {
              const r = document.getElementById('resume');
              const box = r ? r.getBoundingClientRect() : null;
              return {
                active: globalThis.__sfGame.input.active,
                fallback: globalThis.__sfGame.input.sfFallback,
                resumeVisible: !!box && box.width > 1 && box.height > 1,
                hint: (document.getElementById('sf-nolock') || {}).textContent || null,
              };
            }"""
        )

        after = game.evaluate(
            """() => {
              const r = document.getElementById('resume');
              const box = r ? r.getBoundingClientRect() : null;
              return {
                active: globalThis.__sfGame.input.active,
                fallback: globalThis.__sfGame.input.sfFallback,
                resumeVisible: !!box && box.width > 1 && box.height > 1,
                hint: (document.getElementById('sf-nolock') || {}).textContent || null,
                yaw: globalThis.__sfGame.input.yaw,
              };
            }"""
        )

        game.evaluate(
            """() => dispatchEvent(new MouseEvent('mousemove', {
              movementX: 120, movementY: 0, bubbles: true
            }))"""
        )
        page.wait_for_timeout(120)
        yaw_after = game.evaluate("() => globalThis.__sfGame.input.yaw")

        # Holding the trigger fires; a synthetic click can be shorter than a
        # frame, which is a harness artifact rather than the game's behaviour.
        game.evaluate("() => { globalThis.__sfGame.input.menu = false; }")
        ammo_before = game.evaluate("() => globalThis.__sfGame.predictor.state.ammo")
        page.mouse.move(550, 380)
        page.mouse.down()
        page.wait_for_timeout(1800)
        page.mouse.up()
        ammo_after = game.evaluate("() => globalThis.__sfGame.predictor.state.ammo")

        # The wheel switches weapons without a lock.
        slot_before = game.evaluate(
            "() => ({ knife: globalThis.__sfGame.input.knife, sidearm: globalThis.__sfGame.input.sidearm })"
        )
        game.evaluate(
            "() => dispatchEvent(new WheelEvent('wheel', { deltaY: 140, cancelable: true }))"
        )
        page.wait_for_timeout(200)
        slot_after = game.evaluate(
            "() => ({ knife: globalThis.__sfGame.input.knife, sidearm: globalThis.__sfGame.input.sidearm })"
        )

        info = game.evaluate("() => ({ active: globalThis.__sfGame.input.active, health: globalThis.__sfGame.health })")
        b.close()

    checks = {
        "fallback engages": before["fallback"] is True and after["fallback"] is True,
        "input becomes active": before["active"] is True and after["active"] is True,
        "resume panel not shown": before["resumeVisible"] is False and after["resumeVisible"] is False,
        "controls banner shown": "MOVE THE MOUSE" in (before["hint"] or after["hint"] or ""),
        "mouse look turns the view": abs(yaw_after - after["yaw"]) > 0.01,
        "clicking fires": ammo_after < ammo_before,
        "wheel switches": slot_before != slot_after,
        "no errors": not errors,
    }
    print(json.dumps({
        "before": before, "after": after, "yawAfter": yaw_after,
        "ammo": [ammo_before, ammo_after], "slots": [slot_before, slot_after],
        "state": info, "errors": errors[:6],
    }, indent=2))
    for name, ok in checks.items():
        print(f"  {'ok  ' if ok else 'FAIL'} {name}")
    good = all(checks.values())
    print("RESULT:", "PASS" if good else "FAIL")
    return 0 if good else 1


if __name__ == "__main__":
    raise SystemExit(main())
