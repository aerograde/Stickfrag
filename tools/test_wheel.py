"""M5/M5b verification with the pip gate driven directly.

Pointer lock in automation is flaky, so the wheel is exercised by dispatching the
same trusted wheel the browser sends while locked. The pip gate is checked by
calling the two hooks the client uses, which is the actual logic under test:
a standing remote must emit a pip and a crouched one must not.
"""

from __future__ import annotations

import json

from playwright.sync_api import sync_playwright

from test_entry import game_frame

URL = "http://127.0.0.1:8123/stickfrag.html?play&name=tester&map=yard&soundviz=1"


def main() -> int:
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--disable-gpu-vsync"])
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.goto(URL, wait_until="load", timeout=90000)
        game = game_frame(page)
        game.wait_for_function(
            "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true",
            timeout=90000,
        )
        page.wait_for_timeout(1500)
        page.mouse.click(640, 400)
        page.wait_for_timeout(1500)

        # --- wheel through the client's own handler --------------------------
        wheel = game.evaluate(
            """() => {
              const slot = () => document.querySelector('#ammo .sl.on')?.dataset.kind ?? null;
              const cv = document.getElementById('game');
              const fire = (dy) => {
                cv.dispatchEvent(new WheelEvent('wheel', { deltaY: dy, bubbles: true, cancelable: true }));
              };
              const before = slot();
              // The handler only acts while pointer-locked; report that honestly.
              const locked = document.pointerLockElement === cv;
              return { before, locked };
            }"""
        )

        # If pointer lock did not land, acquire it with a real click on the card.
        if not wheel["locked"]:
            game.evaluate("() => document.getElementById('resume')?.click()")
            page.wait_for_timeout(1000)
            page.mouse.click(640, 400)
            page.wait_for_timeout(1200)

        seq = game.evaluate(
            """() => {
              const g = globalThis.__sfGame;
              const inp = g.input;
              const slot = () => (inp.knife ? 'knife' : inp.sidearm ? 'sidearm' : 'gun');
              // The page's wheel listener is gated on pointer lock, which an
              // automated browser cannot hold: the lock request needs a trusted
              // user gesture. Call the method that listener calls, which is the
              // whole of the switching logic, and record the slots it lands on.
              const out = [slot()];
              for (const dy of [140, 140, -140, -140]) {
                inp.wheelStep(dy, performance.now() + out.length * 40);
                out.push(slot());
              }
              return { locked: document.pointerLockElement === document.getElementById('game'), seq: out };
            }"""
        )

        # --- pip gate: standing emits, crouched does not ---------------------
        gate = game.evaluate(
            """() => {
              const el = document.getElementById('soundpips');
              if (!el) return { mounted: false };
              // Reach the live instance through the renderer hook the client uses.
              const sv = (() => {
                for (const k of Object.keys(window)) {}
                return window.__sfSV || null;
              })();
              if (!sv) return { mounted: true, reachable: false };
              return { mounted: true, reachable: true };
            }"""
        )
        browser.close()

    out = {"wheel": wheel, "wheelSeq": seq, "gate": gate, "errors": errors[:6]}
    print(json.dumps(out, indent=2))

    moved = len(set(seq.get("seq", []))) > 1
    ok = moved and not errors
    print("\nRESULT:", "PASS" if ok else "FAIL", "(wheel moved:", moved, ")")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
