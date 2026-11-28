"""Play without pointer lock.

A match normally captures the pointer, which is what makes aiming work. Some
contexts cannot grant it at all: a document written into ``about:blank``, a
sandboxed or blob ``http`` frame, an embedded preview, a browser that denies the
request. The game used to accept that state as "you cannot play": the frame loop
stayed paused on the resume panel, and the mouse did nothing.

This layer turns every one of those cases into a playable fallback instead:

* movement, firing, weapon switching and the rest of the keyboard stay live,
* mouse movement turns the view without a lock (the cursor is not captured, so
  it can still leave the window; the banner says so),
* the resume panel is dismissed because the input counts as active,
* a short banner explains the controls and disappears on its own,
* if a lock is later granted, the fallback turns itself off again.

The pointer-lock request is also guarded: a browser that throws synchronously,
or does not implement ``requestPointerLock`` at all, lands in the same fallback
rather than breaking the click handler.
"""

from __future__ import annotations

from patchlib import sub

FALLBACK_METHODS = """    sfHintT = 0;
    sfFallbackMode() {
      if (this.locked || this.sfFallback) return;
      this.sfFallback = !0, this.menuFree = !0,
      this.stats.lock("fallback: move the mouse to look, no capture");
      try {
        globalThis.__sfNoLock = !0,
        globalThis.dispatchEvent(new CustomEvent("sf:nolock"));
      } catch {}
      this.sfHint();
    }
    sfHint() {
      try {
        let e = document.getElementById("sf-nolock");
        e || (e = document.createElement("div"), e.id = "sf-nolock",
          (document.body || document.documentElement).appendChild(e));
        e.textContent = "MOUSE CAPTURE UNAVAILABLE \\u2014 MOVE THE MOUSE TO LOOK, CLICK TO FIRE";
        e.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);" +
          "z-index:9999;background:#15111c;color:#fff4dc;border:2px solid #fff4dc;" +
          "padding:10px 16px;font:800 12px/1.5 ui-sans-serif,system-ui,sans-serif;" +
          "letter-spacing:.06em;text-align:center;pointer-events:none";
        clearTimeout(this.sfHintT), this.sfHintT = setTimeout(() => e.remove(), 20000);
      } catch {}
    }
"""


def fallback_input(text: str) -> str:
    """Teach the input layer to work when the pointer cannot be captured."""
    # A flag beside the other input state.
    text = sub(
        text,
        "fallback:flag",
        "    rawWanted = !0;",
        "    rawWanted = !0;\n    sfFallback = !1;",
    )
    # Active means the simulation runs; an uncaptured mouse is still input.
    text = sub(
        text,
        "fallback:active",
        "      return this.locked || this.menuFree || this.devices.some((e) => e.active);",
        "      return this.locked || this.menuFree || this.sfFallback || "
        "this.devices.some((e) => e.active);",
    )
    # Wheel switching.
    text = sub(
        text,
        "fallback:wheel",
        "          this.locked && (\n          t.preventDefault(),",
        "          (this.locked || this.sfFallback) && (\n          t.preventDefault(),",
    )
    # Mouse buttons, which is also how firing works.
    text = sub(
        text,
        "fallback:mousedown",
        "        !this.locked ||\n        this.menu ||\n        this.mouseTaken || (",
        "        (!this.locked && !this.sfFallback) ||\n        this.menu ||\n        this.mouseTaken || (",
    )
    # Look. movementX/movementY exist without a lock; the view turns, the cursor
    # still moves, and the banner explains the trade.
    text = sub(
        text,
        "fallback:mousemove",
        "        if (!this.locked || this.menu) return;",
        "        if ((!this.locked && !this.sfFallback) || this.menu) return;",
    )
    # A granted lock takes over again and the banner goes away.
    text = sub(
        text,
        "fallback:lockchange",
        "        this.locked ?\n        this.menuFree = !1 :\n"
        "        this.menuFree || (this.keys.clear(), this.mouseButtons = 0, this.aimOn = !1);",
        "        this.locked ?\n"
        "        (this.menuFree = !1, this.sfFallback = !1,\n"
        "          globalThis.__sfNoLock = !1, clearTimeout(this.sfHintT),\n"
        "          document.getElementById(\"sf-nolock\")?.remove()) :\n"
        "        this.menuFree || this.sfFallback || "
        "(this.keys.clear(), this.mouseButtons = 0, this.aimOn = !1);",
    )
    # The methods, placed with the other lock bookkeeping.
    text = sub(
        text,
        "fallback:methods",
        "    lockAsk = 0;\n    lock() {",
        "    lockAsk = 0;\n" + FALLBACK_METHODS + "    lock() {",
    )
    # A browser without the API, or one that throws before returning a promise.
    text = sub(
        text,
        "fallback:request-guard",
        "          let A = i ? \"raw\" : \"plain\",\n"
        "            a = i ? this.canvas.requestPointerLock({ unadjustedMovement: !0 }) : "
        "this.canvas.requestPointerLock();\n",
        "          let A = i ? \"raw\" : \"plain\", a;\n"
        "          try {\n"
        "            a = i ? this.canvas.requestPointerLock({ unadjustedMovement: !0 }) : "
        "this.canvas.requestPointerLock();\n"
        "          } catch (err) {\n"
        "            this.sfFallbackMode();\n"
        "            return;\n"
        "          }\n",
    )
    # A failed request, after it has already tried plain instead of raw. The old
    # code kept retrying for four seconds behind the paused panel; the fallback
    # is what the player needs, and it can still upgrade to a lock later.
    text = sub(
        text,
        "fallback:request-failed",
        "                d(`${By} refused`), e === this.lockAsk && (this.menuFree = !1);",
        "                d(`${By} refused`), e === this.lockAsk && this.sfFallbackMode();",
    )
    text = sub(
        text,
        "fallback:retry-exhausted",
        "              this.menuFree = !1;\n              return;",
        "              this.sfFallbackMode();\n              return;",
    )
    text = sub(
        text,
        "fallback:promise-rejected",
        "              this.stats.lock(`${A} refused: ${s}`), Lde.has(s) || !i ? n(i) : t(!1);",
        "              if (this.stats.lock(`${A} refused: ${s}`), !i) {\n"
        "                this.sfFallbackMode();\n"
        "                return;\n"
        "              }\n"
        "              t(!1);",
    )
    return text


def embed_url_guard(text: str) -> str:
    """Do not rewrite the URL of the document a match is embedded in.

    The game canonicalises the map selection with location.replace(). In the
    single file's match iframe that replaces the shell document, losing the
    embed sentinel (and the top falls back unnecessarily). The wrapper/blob
    documents have no useful reload URL either.
    """
    text = sub(
        text,
        "fallback:embed-map-url",
        ", location.replace(`${location.pathname}?${e}`);",
        ", (globalThis.__SF_EMBED || globalThis.__SF_NO_URL_WRITE || "
        "location.replace(`${location.pathname}?${e}`));",
    )
    text = sub(
        text,
        "fallback:embed-load-url",
        "  location.replace(`${location.pathname}${AX(location.search, e, o, t)}`),",
        "  (globalThis.__SF_EMBED || globalThis.__SF_NO_URL_WRITE || "
        "location.replace(`${location.pathname}${AX(location.search, e, o, t)}`)),",
    )
    return text


STEPS = [
    ("fallback: pointer-less play", fallback_input),
    ("fallback: embedded URL writes", embed_url_guard),
    (
        "fallback: invite base",
        lambda text: sub(
            text,
            "fallback:invite-base",
            "`${location.origin}${location.pathname}`",
            "(globalThis.__SF_INVITE_BASE || `${location.origin}${location.pathname}`)",
            count=2,
        ),
    ),
]
