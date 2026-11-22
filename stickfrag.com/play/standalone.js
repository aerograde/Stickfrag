// Standalone client boot. Runs before play-redirect.js, so the URL it rewrites is
// the one the game reads at module start.
//
// A peer match (?peer=host or ?peer=join) must reach the network path, so those
// URLs are NOT forced offline and keep their room code. Everything else plays the
// offline sandbox, which is the default for this build.
(() => {
  const q = new URLSearchParams(location.search);
  const peer = q.get('peer');
  if (peer) q.delete('offline');
  else q.set('offline', '');
  for (const k of ['code', 'region', 'review', 'overwatch', 'case', 'studio', 'replay', 'clip'])
    q.delete(k);
  if (!peer) q.delete('room');
  if (!/^[A-Za-z0-9_]{3,16}$/.test((q.get('name') || '').trim())) q.set('name', 'player');
  const next = location.pathname + '?' + q.toString();
  if (next !== location.pathname + location.search) history.replaceState(null, '', next);
})();
