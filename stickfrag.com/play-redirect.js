// This page only plays. Without a name, go to the play menu on the home page and keep this
// URL's choices (a map), except for a room link. main.ts repeats the check with the full name filter.
// The browser's back and forward buttons also go to the menu: this page joins whatever its URL
// says, so stepping through history dropped players back into every match they had left.
(() => {
  const toMenu = () => location.replace('/' + location.search + '#gear');
  if (performance.getEntriesByType('navigation')[0]?.type === 'back_forward') return toMenu();
  // A page restored from the back-forward cache has a dead connection anyway.
  addEventListener('pageshow', (e) => e.persisted && toMenu());
  let name = new URLSearchParams(location.search).get('name') || '';
  try {
    name ||= localStorage.getItem('name') || '';
  } catch {}
  // A room link (?room= or ?code=) stays: main.ts asks for the name on this page. A replay
  // (?replay, ?clip) plays without a name in a dev build; main.ts sends it on in production.
  const q = new URLSearchParams(location.search);
  const stays = ['room', 'code', 'replay', 'clip', 'review', 'overwatch', 'case', 'studio'].some((k) => q.has(k));
  if (!/^[A-Za-z0-9_]{3,16}$/.test(name.trim()) && !stays) toMenu();
  // The mirror has no map loading images; skip the request instead of 404ing on every load.
})();
