"""Shared entry helpers for the standalone build's tests.

The single file has no hand-rolled menu any more. It boots straight into the game
with a valid nickname, which is what the real product does: the home page is the
landing page (index.html), and stickfrag.html is the match itself.
"""

from __future__ import annotations

URL = "http://127.0.0.1:8123/stickfrag.html?name=tester"


def open_game(page, extra: str = "", timeout: int = 90000):
    """Load the game and wait until it is actually simulating."""
    page.goto(URL + extra, wait_until="load", timeout=timeout)
    page.wait_for_function(
        "() => !!globalThis.__sfGame && globalThis.__sfGame.ready === true",
        timeout=timeout,
    )
    page.wait_for_timeout(600)
    return page


def fps(page) -> str:
    return (page.evaluate("() => document.getElementById('fps')?.textContent || ''") or "").strip()
