// ---------------------------------------------------------------------------
// The shell: one menu document, and one disposable browsing context per match.
//
// The menu owns this document. A match never runs here: it gets an iframe of
// its own and is destroyed when the player goes HOME. That is not cosmetic. An
// ES module cannot be unloaded, so a match imported into this document keeps
// the whole game, its WebGL context, its listeners and its timers alive after
// HOME; every PLAY/ HOME cycle used to add roughly 80 MB and a GL context.
// Removing the iframe removes the realm, and with it all of that.
//
// Two ways a match frame is filled:
//
//   * over http(s) it loads this same file with `?embed=1`. A real document is
//     the only context Chromium grants pointer lock to; a blob or about:blank
//     document is refused with WrongDocumentError.
//   * from disk, or when this document has no addressable URL (the SVG
//     wrapper's about:blank tab), a game-only document is built from the parked
//     CSS, HUD markup and module and loaded from a blob URL. A blob iframe from
//     file:// is allowed to capture the pointer.
//
// The parked game is not a second copy of the menu: it is inert text until a
// match is asked for.
//
// The shell also owns the query, the nickname, the invite URL and the return
// path. HOME is a message from the match frame, so it works for a blob frame
// (opaque origin) as well as a same-origin one.
// ---------------------------------------------------------------------------
(() => {
  const qs = new URLSearchParams(location.search);
  const homeRoot = document.getElementById('sf-home-root');
  const gameTpl = document.getElementById('sf-game-dom');
  const p2pTpl = document.getElementById('sf-p2p-dom');
  const p2pSrc = document.getElementById('sf-p2p-src');
  const gameSrc = document.getElementById('sf-game-src');
  const gameCss = document.getElementById('sf-game-css');
  const homeCss = document.getElementById('sf-home-css');
  const homeLock = document.getElementById('sf-home-lock');
  const narrowCss = document.getElementById('sf-narrow-hud');
  const pipsCss = document.getElementById('sf-pips');
  const p2pCss = document.getElementById('sf-p2p-css');
  const ICONS = __ICONS__;
  const GAME_ASSETS = __GAME_ASSETS__;
  const NONCE = "__NONCE__";

  const FORCE_EMBED = !!globalThis.__SF_FORCE_EMBED;
  const IN_PLACE = !!globalThis.__SF_IN_PLACE;
  const IS_EMBED = qs.has('embed') || FORCE_EMBED;
  // A parent waiting for an isolated match uses this to tell our document
  // apart from a host error page (X-Frame-Options, a proxy error, a bad URL).
  if (IS_EMBED) globalThis.__SF_EMBED = true;

  // This stylesheet is for a game document. It is parked here as text so the
  // blob builder can read it, and must never style the menu. `media="not all"`
  // keeps it inert even before this script runs.
  gameCss.disabled = true;
  gameCss.media = 'not all';

  let started = false;
  const gq = new Map();
  let gameNodes = [];
  let gameSource = null;
  let layer = null;
  let frame = null;
  let frameUrl = null;
  let startGuard = 0;
  let homeStyle = null;
  let bodyStyle = null;

  const json = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

  const validName = (v) => /^[A-Za-z0-9_]{3,16}$/.test(v || '');

  const storedName = () => {
    try {
      const n = (localStorage.getItem('name') || '').trim();
      if (validName(n)) return n;
    } catch {}
    return '';
  };

  // The client is WebGL2 throughout. Detect it before hiding the menu so a
  // machine with the API disabled gets an explanation instead of a black match.
  const hasWebGL2 = () => {
    try {
      if (typeof WebGL2RenderingContext === 'undefined') return false;
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      if (!gl) return false;
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
      return true;
    } catch {
      return false;
    }
  };

  // The landing page references a few images by absolute path, which would
  // resolve against the filesystem root when opened from disk. Use the inlined
  // copies instead.
  const rebaseImages = (root) => {
    for (const el of root.querySelectorAll('img[src^="/"]')) {
      const key = el.getAttribute('src').slice(1);
      if (ICONS[key]) el.setAttribute('src', ICONS[key]);
    }
    for (const el of root.querySelectorAll('[style]')) {
      const css = el.getAttribute('style');
      if (!css.includes('url(/')) continue;
      el.setAttribute(
        'style',
        css.replace(/url\(\/([^)]+)\)/g, (m, key) => (ICONS[key] ? `url(${ICONS[key]})` : m))
      );
    }
  };

  // One canonical parameter set: the menu's choice, the URL, and the nickname
  // all end up here. A whitelist matters: an old invite's peer/room must not
  // survive into the next solo match.
  const normalize = (source) => {
    const p = new URLSearchParams();
    if (source) {
      if (typeof source.forEach === 'function') source.forEach((v, k) => p.set(k, v));
      else for (const k of Object.keys(source)) p.set(k, source[k]);
    }
    let peer = p.get('peer');
    // Live room links predate this shell and use ?code=; the peer layer reads
    // the room. Map it before the cleanup so a code link can still join.
    const legacyCode = (p.get('code') || '').trim().toUpperCase();
    if (legacyCode && !p.get('room')) p.set('room', legacyCode);
    if (!peer && legacyCode) {
      peer = 'join';
      p.set('peer', peer);
    }
    if (peer) p.delete('offline');
    else p.set('offline', '');
    for (const k of [
      'code', 'region', 'review', 'overwatch', 'case', 'studio', 'replay', 'clip', 'embed',
    ]) {
      p.delete(k);
    }
    if (!peer) p.delete('room');
    let n = storedName();
    if (!n && validName(p.get('name'))) n = p.get('name').trim();
    if (!n) n = 'player';
    p.set('name', n);
    if (!p.get('map')) p.set('map', 'yard');
    globalThis.__SF_NAME = n;
    return p;
  };

  const updateTopUrl = (p) => {
    const clean = new URLSearchParams(p);
    clean.delete('embed');
    try {
      const q = clean.toString();
      history.replaceState(null, '', location.pathname + (q ? '?' + q : ''));
    } catch {}
  };

  // Inside the SVG wrapper the document URL is not the file the player is
  // looking at, so the wrapper injects the right base.
  const inviteBase = () => {
    let base = globalThis.__SF_INVITE_BASE;
    if (!base) {
      try {
        base = location.origin + location.pathname;
      } catch {}
    }
    if (!base || base === 'null' || /^(blob|about|data):/.test(base)) {
      try {
        base = location.href.split('?')[0].split('#')[0];
      } catch {}
    }
    return base || '';
  };

  const canSelfFrame = () => {
    try {
      if (globalThis.__SF_NO_SELF_FRAME) return false;
      if (!/^https?:$/.test(location.protocol)) return false;
      if (!/^https?:/.test(location.href)) return false;
      return true;
    } catch {
      return false;
    }
  };

  // --- in-place mode ------------------------------------------------------
  // This document is already the disposable context: a blob frame from the SVG,
  // a popup, or the http `?embed=1` document. The game runs here, and HOME puts
  // the menu back in the same document. No second frame.
  const swapToGame = () => {
    gameCss.disabled = false;
    gameCss.media = 'all';
    homeCss.disabled = true;
    if (homeLock) homeLock.disabled = true;
    document.body.classList.add('sf-playing');
    if (homeStyle === null) homeStyle = homeRoot.getAttribute('style');
    if (bodyStyle === null) bodyStyle = document.body.getAttribute('style');
    const frag = gameTpl.content.cloneNode(true);
    gameNodes = [...frag.children];
    document.body.insertBefore(frag, homeRoot);
    homeRoot.style.display = 'none';
    homeRoot.setAttribute('aria-hidden', 'true');
    if (p2pTpl) {
      const p2p = p2pTpl.content.cloneNode(true);
      gameNodes.push(...p2p.children);
      document.body.appendChild(p2p);
    }
    if (p2pSrc) {
      const s = document.createElement('script');
      s.nonce = NONCE;
      s.textContent = p2pSrc.textContent;
      gameNodes.push(s);
      document.body.appendChild(s);
    }
    // Two live WebGL contexts on a weak GPU is a slideshow. The lobby's room is
    // rebuilt when HOME comes back.
    globalThis.__sfLobbyRelease?.();
  };

  const swapToHome = () => {
    stopInPlace();
    document.exitPointerLock?.();
    for (const node of gameNodes) node.remove();
    gameNodes = [];
    // The frame loop appends the pip pool to <body>; the fallback hint does the
    // same. Neither is part of the game markup, so remove them explicitly.
    for (const id of ['soundpips', 'sf-nolock']) document.getElementById(id)?.remove();
    document.body.classList.remove('sf-playing');
    if (bodyStyle === null) document.body.removeAttribute('style');
    else document.body.setAttribute('style', bodyStyle);
    bodyStyle = null;
    homeRoot.style.display = '';
    if (homeStyle === null) homeRoot.removeAttribute('style');
    else homeRoot.setAttribute('style', homeStyle);
    homeStyle = null;
    homeRoot.removeAttribute('aria-hidden');
    homeCss.disabled = false;
    if (homeLock) homeLock.disabled = false;
    gameCss.disabled = true;
    gameCss.media = 'not all';
    window.scrollTo(0, 0);
    globalThis.__sfLobbyRestore?.();
    gq.clear();
    const url = new URLSearchParams(location.search);
    for (const k of [
      'peer', 'room', 'mode', 'map', 'bots', 'nobots', 'play', 'embed', 'offline', 'slot',
    ]) {
      url.delete(k);
    }
    try {
      const q = url.toString();
      history.replaceState(null, '', location.pathname + (q ? '?' + q : ''));
    } catch {}
    started = false;
  };

  const applyBootParams = () => {
    // The SVG wrapper injects its own query as a script before ours runs; the
    // document URL cannot carry it.
    let extra = '';
    try {
      if (window.parent && window.parent !== window) extra = globalThis.__SF_PARENT_QUERY || '';
    } catch {}
    const p = new URLSearchParams(extra);
    new URLSearchParams(location.search).forEach((v, k) => p.set(k, v));
    gq.forEach((v, k) => p.set(k, v));
    const n = normalize(p);
    globalThis.__SF_BOOT_PARAMS = Object.fromEntries(n);
    return n;
  };

  const showError = (message) => {
    let el = document.getElementById('sf-error');
    if (!el) {
      el = document.createElement('div');
      el.id = 'sf-error';
      el.addEventListener('click', () => el.remove());
      document.body.appendChild(el);
    }
    el.textContent = message + ' — CLICK TO DISMISS';
  };

  // The in-place path imports the parked module from a blob URL. A failure must
  // put the menu back instead of leaving a dead screen.
  const stopInPlace = () => {
    document.exitPointerLock?.();
    const g = globalThis.__sfGame;
    if (!g) return;
    try {
      g.frame = () => {}; // the loop schedules itself; this stops it after one
    } catch {}
    try {
      g.net?.close?.();
    } catch {}
    try {
      g.audio?.close?.();
    } catch {}
    try {
      g.renderer?.renderer?.forceContextLoss?.();
    } catch {}
    try {
      g.renderer?.renderer?.dispose?.();
    } catch {}
    globalThis.__sfGame = null;
  };

  const startInPlace = async () => {
    if (started) return true;
    if (!hasWebGL2()) {
      showError('This game needs WebGL 2. Enable it in the browser and try again.');
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ __sf: 'failed', message: 'WebGL 2 unavailable' }, '*');
        }
      } catch {}
      return false;
    }
    const p = applyBootParams();
    started = true;
    swapToGame();
    let url = null;
    try {
      gameSource ??= gameSrc.textContent;
      gameSrc.remove();
      url = URL.createObjectURL(new Blob([gameSource], { type: 'text/javascript' }));
      return await import(url);
    } catch (err) {
      console.error('the match could not start', err);
      swapToHome();
      showError('The match could not start.');
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ __sf: 'failed', message: String(err && err.message || err) }, '*');
        }
      } catch {}
      throw err;
    } finally {
      if (url) {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      }
    }
  };
  globalThis.__sfStartGame = startInPlace;

  // --- isolated mode ------------------------------------------------------
  // Build a complete game document: game CSS, HUD markup, the module parked as
  // text, and a boot script that turns it into a real match. Used when this
  // document has no http URL to point an iframe at.
  const buildGameDoc = (p) => {
    const css = [
      gameCss.textContent || '',
      narrowCss ? narrowCss.textContent : '',
      pipsCss ? pipsCss.textContent : '',
      p2pCss ? p2pCss.textContent : '',
    ].join('\n');
    const markup = gameTpl.innerHTML + (p2pTpl ? p2pTpl.innerHTML : '');
    const js = gameSrc ? gameSrc.textContent : '';
    const p2p = p2pSrc ? p2pSrc.textContent : '';
    const netOff = document.getElementById('sf-net-off')?.textContent || '';
    if (!js) throw new Error('the parked game module is missing');
    const csp =
      "default-src 'none'; script-src 'nonce-" + NONCE + "' blob:; " +
      "style-src 'unsafe-inline'; img-src data: blob:; font-src data:; " +
      "media-src blob: data:; worker-src blob:; connect-src blob:; " +
      "object-src 'none'; base-uri 'none'; form-action 'none'";
    // A blob document has an opaque origin: localStorage throws there. The
    // shim must probe writes too, because some modes allow reads and refuse
    // writes, and the game writes its settings and nickname on boot.
    const boot =
      '(function(){' +
      "try{localStorage.setItem('__sf_probe','1');localStorage.removeItem('__sf_probe');" +
      "localStorage.getItem('__sf_probe')}catch(e){" +
      'var mem=function(){var d={};return{' +
      'getItem:function(k){return Object.prototype.hasOwnProperty.call(d,k)?d[k]:null},' +
      'setItem:function(k,v){d[k]=String(v)},' +
      'removeItem:function(k){delete d[k]},' +
      'clear:function(){d={}},' +
      'key:function(i){return Object.keys(d)[i]??null},' +
      'get length(){return Object.keys(d).length}' +
      '}};' +
      "for(var n of ['localStorage','sessionStorage']){try{" +
      'Object.defineProperty(window,n,{value:mem(),configurable:true})}catch(_){}}' +
      '}' +
      'window.__SF_BOOT_PARAMS=' + json(Object.fromEntries(p)) + ';' +
      'window.__SF_INVITE_BASE=' + json(inviteBase()) + ';' +
      'window.__SF_NO_URL_WRITE=true;' +
      'window.__SF_ASSETS=' + json(GAME_ASSETS) + ';' +
      '(function(){var table=window.__SF_ASSETS||{};' +
      'var fix=function(v){return (typeof v==="string"&&table[v])?table[v]:v};' +
      'var setAttr=Element.prototype.setAttribute;' +
      'Element.prototype.setAttribute=function(name,value){' +
      'return setAttr.call(this,name,name==="src"?fix(value):value)};' +
      'var prots=[HTMLImageElement.prototype,HTMLSourceElement.prototype];' +
      'for(var i=0;i<prots.length;i++){var d=Object.getOwnPropertyDescriptor(prots[i],"src");' +
      'if(!d||!d.set)continue;(function(desc){Object.defineProperty(prots[i],"src",{' +
      'get:desc.get,set:function(v){desc.set.call(this,fix(v))},configurable:true})})(d)}})();' +
      // HOME is a message so it works when this document is a blob (opaque
      // origin, no access to the opener). A direct open falls back to history.
      'window.__sfHome=function(){try{' +
      "if(window.parent&&window.parent!==window)window.parent.postMessage({__sf:'home'},'*');" +
      'else if(history.length>1)history.back();' +
      '}catch(e){}return true};' +
      // The menu removes the frame after asking it to stop. Releasing the
      // render loop, sockets and GL context first means the frame's heap and
      // GPU memory are available immediately instead of when the browser gets
      // around to tearing the detached frame down.
      'addEventListener("message",function(e){var d=e.data||{};if(d.__sf!=="stop")return;' +
      'try{document.exitPointerLock()}catch(_){}' +
      'var g=window.__sfGame;if(!g)return;' +
      'try{g.frame=function(){}}catch(_){}' +
      'try{g.net&&g.net.close&&g.net.close()}catch(_){}' +
      'try{g.audio&&g.audio.close&&g.audio.close()}catch(_){}' +
      'try{g.renderer&&g.renderer.renderer&&g.renderer.renderer.forceContextLoss()}catch(_){}' +
      'try{g.renderer&&g.renderer.renderer&&g.renderer.renderer.dispose()}catch(_){}' +
      'window.__sfGame=null;});' +
      'var s=document.getElementById("sf-game-src");var src=s?s.textContent:"";if(s)s.remove();' +
      'try{var u=URL.createObjectURL(new Blob([src],{type:"text/javascript"}));' +
      'import(u).catch(function(e){console.error("the match could not start",e);' +
      "try{window.parent.postMessage({__sf:'failed',message:String(e&&e.message||e)},'*')}catch(_){}})" +
      '.finally(function(){setTimeout(function(){URL.revokeObjectURL(u)},2000)});' +
      '}catch(e){console.error("the match could not start",e);' +
      "try{window.parent.postMessage({__sf:'failed',message:String(e&&e.message||e)},'*')}catch(_){}}" +
      '})();';
    return (
      '<!doctype html><html lang="en" translate="no"><head><meta charset="utf-8">' +
      '<meta http-equiv="Content-Security-Policy" content="' +
      csp.replace(/"/g, '&quot;') +
      '">' +
      '<meta name="google" content="notranslate">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<style>' + css + '</style></head><body class="sf-playing">' +
      markup +
      '<script type="text/plain" id="sf-game-src">' + js + '</script>' +
      '<script nonce="' + NONCE + '">' + netOff + '</script>' +
      '<script nonce="' + NONCE + '">' + boot + '</script>' +
      '<script nonce="' + NONCE + '">' + p2p + '</script>' +
      '</body></html>'
    );
  };

  const endMatch = () => {
    if (startGuard) {
      clearTimeout(startGuard);
      startGuard = 0;
    }
    document.exitPointerLock?.();
    const old = frame;
    const oldLayer = layer;
    frame = null;
    layer = null;
    if (old) {
      // Ask the match to let go of its frame loop, sockets and GL context
      // before the element goes away. A detached frame otherwise keeps that
      // heap and GPU memory until the browser happens to collect it.
      try {
        old.contentWindow?.postMessage({ __sf: 'stop' }, '*');
      } catch {}
      try {
        const w = old.contentWindow;
        const g = w && w !== window ? w.__sfGame : null;
        if (g) {
          try {
            g.frame = () => {};
          } catch {}
          try {
            g.net?.close?.();
          } catch {}
          try {
            g.audio?.close?.();
          } catch {}
          try {
            g.renderer?.renderer?.forceContextLoss?.();
          } catch {}
          try {
            g.renderer?.renderer?.dispose?.();
          } catch {}
          try {
            w.__sfGame = null;
          } catch {}
        }
      } catch {}
    }
    if (oldLayer) oldLayer.style.display = 'none';
    // The cross-origin (blob) frame can only be stopped by its own message
    // handler; give that a beat before detaching it.
    setTimeout(() => {
      try {
        old?.remove();
      } catch {}
      try {
        oldLayer?.remove();
      } catch {}
    }, 120);
    if (frameUrl) {
      try {
        URL.revokeObjectURL(frameUrl);
      } catch {}
      frameUrl = null;
    }
    document.body.classList.remove('sf-playing');
    if (bodyStyle === null) document.body.removeAttribute('style');
    else document.body.setAttribute('style', bodyStyle);
    bodyStyle = null;
    homeRoot.style.display = '';
    homeRoot.removeAttribute('aria-hidden');
    homeCss.disabled = false;
    if (homeLock) homeLock.disabled = false;
    window.scrollTo(0, 0);
    gq.clear();
    const url = new URLSearchParams(location.search);
    for (const k of [
      'peer', 'room', 'mode', 'map', 'bots', 'nobots', 'play', 'embed', 'offline', 'slot',
    ]) {
      url.delete(k);
    }
    try {
      const q = url.toString();
      history.replaceState(null, '', location.pathname + (q ? '?' + q : ''));
    } catch {}
    started = false;
  };

  const startMatch = (source) => {
    if (started) return;
    if (!hasWebGL2()) {
      showError('This game needs WebGL 2. Enable it in the browser and try again.');
      return;
    }
    started = true;
    const p = normalize(source);
    gq.clear();
    p.forEach((v, k) => gq.set(k, v));
    globalThis.__SF_BOOT_PARAMS = Object.fromEntries(p);
    updateTopUrl(p);
    if (homeStyle === null) homeStyle = homeRoot.getAttribute('style');
    if (bodyStyle === null) bodyStyle = document.body.getAttribute('style');
    homeRoot.style.display = 'none';
    homeRoot.setAttribute('aria-hidden', 'true');
    document.body.classList.add('sf-playing');
    // The lobby is not released here. Its IntersectionObserver stops its
    // render loop while the menu is hidden, and the match has its own context
    // in its own frame; tearing the room down and rebuilding it on every HOME
    // was pure churn (and used to leak the scene).

    layer = document.createElement('div');
    layer.id = 'sf-game-layer';
    const loading = document.createElement('div');
    loading.id = 'sf-game-loading';
    loading.innerHTML = '<b>STICKFRAG</b><span>LOADING THE MATCH</span>';
    frame = document.createElement('iframe');
    frame.id = 'sf-game-frame';
    frame.title = 'StickFrag match';
    frame.setAttribute(
      'allow',
      'pointer-lock; fullscreen; gamepad; accelerometer; gyroscope; autoplay'
    );
    layer.appendChild(loading);
    layer.appendChild(frame);
    document.body.appendChild(layer);

    let settled = false;
    let selfFrame = false;
    let selfProbe = 0;
    const fail = (message) => {
      if (settled) return;
      settled = true;
      if (startGuard) {
        clearTimeout(startGuard);
        startGuard = 0;
      }
      if (selfProbe) {
        clearInterval(selfProbe);
        selfProbe = 0;
      }
      endMatch();
      showError(message || 'The match could not start.');
    };
    const focusFrame = () => {
      // Keyboard input goes to the focused document. Without this the match
      // runs unfocused: WASD stays with the menu and the game's own pacing
      // deliberately slows down.
      try {
        frame.focus();
      } catch {}
      try {
        frame.contentWindow?.focus();
      } catch {}
    };
    const revokeGameDoc = () => {
      if (!frameUrl) return;
      const u = frameUrl;
      frameUrl = null;
      setTimeout(() => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      }, 1500);
    };
    const useGameDoc = (why) => {
      // The self frame is preferable (a real http document gets pointer lock),
      // but a host can block iframing its own file. The blob game document is
      // self-contained and the game's pointer-lock fallback keeps it playable.
      if (!started || !frame || frameUrl) return;
      selfFrame = false;
      if (selfProbe) {
        clearInterval(selfProbe);
        selfProbe = 0;
      }
      try {
        const html = buildGameDoc(p);
        frameUrl = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
        if (startGuard) {
          clearTimeout(startGuard);
          startGuard = 0;
        }
        startGuard = setTimeout(() => {
          startGuard = 0;
          if (!settled) {
            fail('The match did not start: ' + (why || 'the game document did not load'));
          }
        }, 30000);
        frame.src = frameUrl;
      } catch (err) {
        fail('The match could not be prepared: ' + (err && err.message ? err.message : err));
      }
    };
    const onLoad = () => {
      if (!started) return;
      if (selfFrame) {
        // A new iframe can deliver a load event for its initial about:blank
        // document before the real navigation commits. Starting the five-second
        // probe there would replace a healthy match. Only a real self document
        // gets a verdict, and the 30-second guard stays armed until it does.
        let docUrl = '';
        try {
          docUrl = frame.contentWindow.document.URL || '';
        } catch {}
        if (!docUrl || docUrl === 'about:blank') return;
      }
      if (startGuard) {
        clearTimeout(startGuard);
        startGuard = 0;
      }
      if (selfFrame) {
        // The shell in this same file sets __SF_EMBED while it parses. If this
        // document is a host error page it never appears; give it five seconds
        // after load, then build the blob game document instead.
        if (selfProbe) clearInterval(selfProbe);
        let tries = 0;
        selfProbe = setInterval(() => {
          let ours = false;
          try {
            ours = !!frame.contentWindow.__SF_EMBED;
          } catch {}
          if (ours) {
            clearInterval(selfProbe);
            selfProbe = 0;
            settled = true;
            loading.remove();
            focusFrame();
            return;
          }
          if (!started) {
            clearInterval(selfProbe);
            selfProbe = 0;
            return;
          }
          if (++tries > 10) {
            clearInterval(selfProbe);
            selfProbe = 0;
            useGameDoc('the match frame was blocked by the host');
          }
        }, 500);
        return;
      }
      settled = true;
      loading.remove();
      focusFrame();
      revokeGameDoc();
    };
    frame.addEventListener('load', onLoad);
    frame.addEventListener('error', () => {
      if (selfFrame) useGameDoc('the match frame could not be loaded');
      else if (!frameUrl) fail('The match could not start.');
    });
    startGuard = setTimeout(() => {
      startGuard = 0;
      if (settled) return;
      if (selfFrame) useGameDoc('the match frame did not load');
      else fail('The match did not start. The browser may have blocked it.');
    }, 30000);

    selfFrame = canSelfFrame();
    if (selfFrame) {
      const u = new URL(location.href);
      const q = new URLSearchParams(p);
      q.set('embed', '1');
      u.search = '?' + q.toString();
      u.hash = '';
      frame.src = u.href;
    } else {
      useGameDoc('the game document could not be built');
    }
  };

  // The match frame's only upward calls are HOME and a boot failure.
  addEventListener('message', (event) => {
    if (!frame || event.source !== frame.contentWindow) return;
    const data = event.data || {};
    if (data.__sf === 'home') endMatch();
    else if (data.__sf === 'failed') {
      endMatch();
      showError('The match could not start.');
    }
  });

  globalThis.__sfHome = () => {
    if (IS_EMBED) {
      // The SVG wrapper cannot give a second match a fresh module here, and a
      // nested blob frame is not stable. It owns the disposable document, so
      // it reloads or rewrites it instead.
      if (globalThis.__SF_RELOAD_ON_HOME) {
        stopInPlace();
        try {
          const target =
            window.parent && window.parent !== window ? window.parent : window.opener;
          target?.postMessage({ __sf: 'home' }, '*');
        } catch {}
        return true;
      }
      if (IN_PLACE || window.parent === window) {
        swapToHome();
        return true;
      }
      try {
        window.parent.postMessage({ __sf: 'home' }, '*');
      } catch {}
      return true;
    }
    endMatch();
    return true;
  };

  // --- landing page wiring ------------------------------------------------
  rebaseImages(homeRoot);
  // Establish the boot parameters (nickname, map, offline flag) even before a
  // mode is chosen. The menu does not consume them, but the wrapper's own
  // diagnostics and the launch path both read the same set.
  applyBootParams();

  addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.__sf === 'stop' && IS_EMBED) stopInPlace();
  });

  // A match is started either in this document (it is already a disposable
  // context: the SVG's frame, the http embed frame) or in a fresh frame of its
  // own. Everything above the launch target is the same menu flow.
  const go = (source) => {
    const params = normalize(source);
    gq.clear();
    params.forEach((v, k) => gq.set(k, v));
    if (IS_EMBED) {
      startInPlace().catch(() => {});
      return;
    }
    startMatch(params);
  };

  // The landing page launches by assigning to location.href. Take the URL it
  // built and start a match instead of re-parsing this whole file.
  globalThis.__sfGo = (url) => {
    try {
      const at = url.indexOf('?');
      const params = new URLSearchParams(at >= 0 ? url.slice(at + 1) : '');
      if (!params.get('map')) params.set('map', 'yard');
      if (!params.get('peer')) params.set('peer', 'host');
      // Remember the host's room so the page's own server browser can list it.
      if (params.get('peer') === 'host') {
        try {
          const code = params.get('room') || 'LOCAL1';
          const key = 'sf:rooms';
          const list = JSON.parse(localStorage.getItem(key) || '[]').filter(
            (r) => r.code !== code
          );
          list.unshift({
            code,
            mode: params.get('mode') || 'ffa',
            map: params.get('map') || 'yard',
            players: 1,
          });
          localStorage.setItem(key, JSON.stringify(list.slice(0, 8)));
        } catch {}
      }
      go(params);
    } catch (err) {
      console.error('menu launch failed, navigating instead', err);
      location.href = url;
    }
  };

  globalThis.__sfInvite = (code, map, game) => {
    const p = new URLSearchParams({ peer: 'join' });
    if (code) p.set('room', code);
    if (map) p.set('map', map);
    if (game) p.set('mode', game);
    return inviteBase() + '?' + p.toString();
  };

  // The old matchmaker is gone. A short code only starts a join match locally;
  // the actual pairing is the long JOIN/ANSWER panel inside the match.
  const codeFrom = (form) => {
    const field = (form && form.querySelector('input')) || document.getElementById('code-input');
    const raw = ((field && field.value) || '').trim().toUpperCase();
    const m = /[?&]room=([A-Z0-9]{6})/i.exec(raw);
    const value = (m ? m[1] : raw).replace(/[^A-Z0-9]/g, '');
    return /^[A-Z0-9]{6}$/.test(value) ? value : null;
  };

  document.addEventListener(
    'submit',
    (event) => {
      const form = event.target instanceof Element ? event.target : null;
      if (!form || !form.matches('#code-join')) return;
      const code = codeFrom(form);
      if (!code) return; // invalid code: let the page show its own message
      event.preventDefault();
      event.stopImmediatePropagation();
      go(Object.assign(Object.fromEntries(new URLSearchParams(location.search)), {
        peer: 'join',
        room: code,
      }));
    },
    true
  );

  // Training is a normal host match with bots in it, so it needs nothing new on
  // the simulation side. The live site has no such tile (its bots live on the
  // server and fill real rooms), so it is added here, next to QUICK JOIN.
  (() => {
    const modes = document.getElementById('start-modes');
    if (!modes) return;
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.id = 'start-training';
    tile.className = 'choice mode-tile';
    tile.setAttribute('aria-label', 'Training: a free-for-all against bots');
    tile.innerHTML =
      '<span class="tile-name">TRAINING</span><span class="tile-join">4 BOTS \u203A</span>';
    tile.addEventListener('click', () => {
      globalThis.__sfGo(location.pathname + '?peer=host&mode=ffa&bots=4&map=yard');
    });
    modes.appendChild(tile);
    // The site's grid is sized for five rows; give it the sixth.
    modes.style.gridTemplateRows = 'repeat(6, 1fr)';
    modes.style.height = 'calc(6 * var(--tile-row) + 5 * var(--tile-gap))';
  })();

  // A URL that names a mode is a match that was already chosen; ?peer is an
  // invite link; ?play is the direct sandbox. A bare URL stays on the menu.
  // Wrapper documents (the SVG launcher) cannot put the query on the blob or
  // about:blank URL, so they pass it as __SF_PARENT_QUERY instead.
  let launch = null;
  if (qs.has('peer') || qs.has('mode') || qs.has('play')) {
    launch = qs;
  } else if (IS_EMBED && globalThis.__SF_PARENT_QUERY) {
    const parentQuery = new URLSearchParams(globalThis.__SF_PARENT_QUERY);
    if (parentQuery.has('peer') || parentQuery.has('mode') || parentQuery.has('play')) {
      launch = parentQuery;
    }
  }
  if (launch) go(new URLSearchParams(launch));
})();
