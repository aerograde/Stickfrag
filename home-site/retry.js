// Reloads a module script that failed to load, under a new URL (client/scriptRetry.mjs).
function retryModule(el) {
  var n = (Number(el.dataset.retry) || 0) + 1;
  var delays = [0,1,2,4,8,15,30];
  var src = el.getAttribute('src').replace(/[?&]retry=\d+$/, '');
  var note = document.querySelector('.loading-step');
  if (note && n >= 2) note.textContent = 'Could not load the game. Trying again';
  setTimeout(function () {
    var next = document.createElement('script');
    next.type = 'module';
    next.dataset.retry = n;
    next.src = src + (src.indexOf('?') < 0 ? '?' : '&') + 'retry=' + n;
    next.onload = function () { if (note) note.textContent = 'Loading the game'; };
    el.replaceWith(next);
  }, delays[Math.min(n, delays.length) - 1] * 1000);
}
// Only our own scripts: Cloudflare injects a beacon from another origin that our CSP blocks, and
// retrying it every 30 s made 2,247 of 2,330 CSP reports a day (item 739).
function isOwnScript(el) {
  var src = el.getAttribute('src');
  if (!src) return false;
  try { return new URL(src, location.href).origin === location.origin; } catch (err) { return false; }
}
document.addEventListener('error', function (e) {
  var el = e.target;
  if (el && el.tagName === 'SCRIPT' && el.type === 'module' && isOwnScript(el)) retryModule(el);
}, true);
