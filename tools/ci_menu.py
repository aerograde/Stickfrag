#!/usr/bin/env python3
"""Start the static server and run the headless menu/SVG matrix.

This is the cross-platform CI entry point. It does not start a match, so it
works on runners with no GPU. `tools/test_browsers.py` is the full gameplay
matrix for a GPU machine.
"""

from __future__ import annotations

import os
import socket
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HOST = "127.0.0.1"
PORT = 8123


def port_open() -> bool:
    try:
        with socket.create_connection((HOST, PORT), 0.25):
            return True
    except OSError:
        return False


def main() -> int:
    env = os.environ.copy()
    env.setdefault("STICKFRAG_HEADLESS", "1")
    server = None
    if not port_open():
        server = subprocess.Popen(
            [sys.executable, "tools/serve.py"],
            cwd=ROOT,
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.STDOUT,
        )
        deadline = time.time() + 20
        while time.time() < deadline and not port_open():
            time.sleep(0.2)
        if not port_open():
            print("ci_menu: the static server did not start", file=sys.stderr)
            return 1
    try:
        return subprocess.call(
            [sys.executable, "tools/test_menu_matrix.py", *sys.argv[1:]],
            cwd=ROOT,
            env=env,
        )
    finally:
        if server is not None:
            server.terminate()
            try:
                server.wait(10)
            except subprocess.TimeoutExpired:
                server.kill()


if __name__ == "__main__":
    raise SystemExit(main())
