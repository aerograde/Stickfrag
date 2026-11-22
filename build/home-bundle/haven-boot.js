// Blocking on purpose: the class is on the root element before the first paint (client/landing.html).
if (!/[?&]armory(=|&|$)/.test(location.search)) document.documentElement.classList.add('haven-boot');
