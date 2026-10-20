/* Kill switch for the service worker the previous version of this site registered.
   The old worker served index.html cache-first, so returning visitors never saw
   the new site. This replacement clears every cache, unregisters itself and
   reloads any open tab. Keep this file so old installs can pick it up. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.clients.claim();
    await self.registration.unregister();
    const tabs = await self.clients.matchAll({ type: 'window' });
    for (const tab of tabs) tab.navigate(tab.url).catch(() => {});
  })());
});
