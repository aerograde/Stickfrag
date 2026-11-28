"""Shared entry helpers for the standalone build's tests.

`stickfrag.html` keeps the menu in the top document and runs every match in a
disposable iframe. A test that wants the game object asks for that frame.
"""

from __future__ import annotations

URL = "http://127.0.0.1:8123/stickfrag.html?name=tester"


def game_frame(page, timeout: int = 90_000):
    """Return the live match frame (the one loading this file with embed=1)."""
    page.wait_for_function(
        "() => [...document.querySelectorAll('iframe')]"
        ".some((f) => (f.src || '').includes('embed=1'))",
        timeout=timeout,
    )
    for frame in page.frames:
        if "embed=1" in (frame.url or ""):
            return frame
    raise RuntimeError("the match frame did not appear")


def any_game_frame(page):
    """The game frame, whichever way it was created (self URL or blob)."""
    for frame in page.frames:
        try:
            if frame.evaluate("() => !!globalThis.__sfGame || !!document.getElementById('game')"):
                return frame
        except Exception:
            pass
    return None


def open_game(page, extra: str = "", timeout: int = 90000):
    """Load a direct match URL and wait until the frame is simulating."""
    page.goto(URL + extra, wait_until="load", timeout=timeout)
    frame = game_frame(page, timeout=timeout)
    frame.wait_for_function(
        "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true",
        timeout=timeout,
    )
    frame.wait_for_timeout(600)
    return frame


def fps(frame) -> str:
    return (frame.evaluate("() => document.getElementById('fps')?.textContent || ''") or "").strip()
