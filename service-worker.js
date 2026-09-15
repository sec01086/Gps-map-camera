/* GPS Map Camera — service worker
   Caches the app shell so the app itself opens offline after the first visit.
   Map tiles / address lookups are cached separately by the app in IndexedDB
   (see the "offline map download" feature in Settings) — this worker just
   makes sure it's also opportunistically cached for repeat visits.
*/
const CACHE_NAME = 'gpsmapcamera-shell-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests
  if (req.method !== 'GET') return;

  const isMapOrGeo = url.hostname.endsWith('tile.openstreetmap.org') ||
                      url.hostname.endsWith('nominatim.openstreetmap.org');

  if (isMapOrGeo) {
    // Stale-while-revalidate: answer fast from cache, refresh in background.
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then((cached) => {
          const networkFetch = fetch(req)
            .then((res) => { if (res && res.ok) cache.put(req, res.clone()); return res; })
            .catch(() => cached);
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  if (url.origin === self.location.origin) {
    // App shell: cache-first, fall back to network, refresh cache when online.
    event.respondWith(
      caches.match(req).then((cached) => {
        const networkFetch = fetch(req)
          .then((res) => {
            if (res && res.ok) caches.open(CACHE_NAME).then((c) => c.put(req, res.clone()));
            return res;
          })
          .catch(() => cached || caches.match('./index.html'));
        return cached || networkFetch;
      })
    );
  }
});
