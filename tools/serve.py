#!/usr/bin/env python3
"""Fast local server for the StickFrag mirror.

Serves stickfrag.com/ as the document root, prefers precompressed .br/.gz
neighbours produced by tools/build.py, and sets long-lived cache headers for
content-hashed URLs.

    python3 tools/serve.py
    open "http://127.0.0.1:8123/play/?name=player&offline&map=yard"
"""

from __future__ import annotations

import argparse
import mimetypes
import posixpath
import shutil
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "stickfrag.com"

MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".png": "image/png",
    ".ico": "image/x-icon",
    ".txt": "text/plain; charset=utf-8",
    ".light": "application/octet-stream",
    ".map": "application/json; charset=utf-8",
}
COMPRESSIBLE = {".html", ".css", ".js", ".mjs", ".json", ".svg", ".txt", ".map"}
IMMUTABLE = "public, max-age=31536000, immutable"
ONE_DAY = "public, max-age=86400"


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    server_version = "StickFragMirror/1.0"

    def do_GET(self) -> None:
        self._serve(head=False)

    def do_HEAD(self) -> None:
        self._serve(head=True)

    def _serve(self, head: bool) -> None:
        url = urlsplit(self.path)
        raw = unquote(url.path)
        relative = posixpath.normpath(raw).lstrip("/")
        target = (SITE / relative).resolve()

        if not target.is_relative_to(SITE):
            self.send_error(400, "Bad path")
            return

        if target.is_dir():
            if not raw.endswith("/"):
                self.send_response(301)
                self.send_header("Location", raw + "/")
                self.send_header("Content-Length", "0")
                self.end_headers()
                return
            target = target / "index.html"

        if not target.is_file():
            self.send_error(404, "Not found")
            return

        body, encoding = self._encoded(target)
        content_type = MIME.get(target.suffix.lower()) or mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        cache = self._cache_control(url.query, raw)

        self.send_response(200)
        self.send_header("Content-Type", content_type)
        if encoding:
            self.send_header("Content-Encoding", encoding)
        self.send_header("Content-Length", str(body.stat().st_size))
        self.send_header("Cache-Control", cache)
        self.send_header("Vary", "Accept-Encoding")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.end_headers()

        if not head:
            with body.open("rb") as stream:
                shutil.copyfileobj(stream, self.wfile)

    def _encoded(self, target: Path) -> tuple[Path, str | None]:
        if target.suffix.lower() not in COMPRESSIBLE:
            return target, None
        accept = self.headers.get("Accept-Encoding", "").lower()
        for encoding, suffix in (("br", ".br"), ("gzip", ".gz")):
            if encoding not in accept and "*" not in accept:
                continue
            candidate = target.with_name(target.name + suffix)
            # brotli stores the input mtime rounded to whole seconds, so compare seconds.
            if candidate.is_file() and int(candidate.stat().st_mtime) >= int(target.stat().st_mtime):
                return candidate, encoding
        return target, None

    def _cache_control(self, query: str, raw: str) -> str:
        if "v=" in query or raw.startswith("/chunks/"):
            return IMMUTABLE
        if raw.endswith(".html") or raw.endswith("/"):
            return "no-cache"
        return ONE_DAY

    def log_message(self, fmt: str, *args: object) -> None:
        print(f"{self.address_string()} {fmt % args}", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8123)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()

    if not (SITE / "play" / "index.html").is_file():
        raise SystemExit(f"missing {SITE / 'play' / 'index.html'}")

    server = ThreadingHTTPServer((args.host, args.port), Handler)
    url = f"http://{args.host}:{args.port}/play/?name=player&offline&map=yard"
    print(f"StickFrag mirror: {url}")
    print("Ctrl+C to stop")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
