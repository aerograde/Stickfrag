"""Boot a match at a small viewport and report how it renders.

The glitching reported on low-end devices has to be reproduced before it can be
fixed, so this loads the single file, starts a match, waits for it to become
ready, then reports framerate, renderer info, canvas backing size, context loss
and any errors. Screenshots go to /tmp for inspection.

    python3 tools/diag_game.py            # 360x640, dpr 1
    python3 tools/diag_game.py 412 732 2  # size and dpr
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8123"
SHOT = Path("/tmp/stickfrag-small")

# Runs once, samples frames with a self-scheduling rAF, and stores the result so
# a later call can read it. A single long evaluate dies when the page navigates.
SAMPLE = r"""() => {
  if (globalThis.__sfSample) return Promise.resolve('already');
  const g = globalThis.__sfGame;
  const c = document.getElementById('game');
  const r = g && g.renderer;
  const gl = r && r.getContext ? r.getContext() : null;
  let renderer = null;
  if (gl) {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'masked';
  }
  const state = {
    canvasCss: c ? { w: c.clientWidth, h: c.clientHeight } : null,
    canvasBacking: c ? { w: c.width, h: c.height } : null,
    pixelRatio: r ? r.getPixelRatio() : null,
    drawingBuffer: gl ? { w: gl.drawingBufferWidth, h: gl.drawingBufferHeight } : null,
    lost: gl ? gl.isContextLost() : null,
    renderer,
    drawCalls: r && r.info ? r.info.render.calls : null,
    tris: r && r.info ? r.info.render.triangles : null,
    programs: r && r.info ? r.info.programs.length : null,
    memGeometries: r && r.info ? r.info.memory.geometries : null,
    memTextures: r && r.info ? r.info.memory.textures : null,
    quality: g ? (g.quality ?? null) : null,
    dpr: devicePixelRatio,
    frames: 0,
    fps: 0,
    lags: [],
  };
  globalThis.__sfSample = state;
  let last = performance.now();
  const t0 = last;
  const loop = () => {
    const now = performance.now();
    const dt = now - last;
    last = now;
    state.frames++;
    if (dt > 50) state.lags.push(+dt.toFixed(0));
    state.fps = +(state.frames / ((now - t0) / 1000)).toFixed(1);
    state.seconds = +((now - t0) / 1000).toFixed(1);
    if (now - t0 < 12000) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  return 'started';
}"""


def read_state(page) -> dict | None:
    return page.evaluate("() => globalThis.__sfSample || null")


def main() -> int:
    w = int(sys.argv[1]) if len(sys.argv) > 1 else 360
    h = int(sys.argv[2]) if len(sys.argv) > 2 else 640
    dpr = float(sys.argv[3]) if len(sys.argv) > 3 else 1
    gpu = "--gpu" in sys.argv

    args = [] if gpu else ["--enable-unsafe-swiftshader"]
    errors: list[str] = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=args)
        ctx = browser.new_context(
            viewport={"width": w, "height": h},
            device_scale_factor=dpr,
            has_touch=w < 500,
        )
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append(str(e)[:300]))
        page.on("console", lambda m: errors.append("console: " + m.text[:250]) if m.type == "error" else None)

        page.goto(f"{BASE}/stickfrag.html?peer=host&mode=ffa&bots=3&map=yard&name=tester",
                  wait_until="load", timeout=120_000)
        try:
            page.wait_for_function("() => globalThis.__sfGame && globalThis.__sfGame.ready", timeout=120_000)
        except Exception as exc:  # noqa: BLE001
            print("game never became ready:", exc)
            page.screenshot(path=str(SHOT) + "-boot.png")
            print(json.dumps({"errors": errors[:8]}, indent=2))
            browser.close()
            return 1

        page.evaluate(SAMPLE)
        page.wait_for_timeout(13000)
        info = read_state(page)
        page.screenshot(path=str(SHOT) + f"-{w}x{h}@{dpr:g}.png")
        browser.close()

    print(json.dumps({"viewport": [w, h, dpr], "info": info, "errors": errors[:8]}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
