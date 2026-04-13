const CACHE_NAME = 'dieta-antonio-v2';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['/dieta-antonio/', '/dieta-antonio/index.html']);
    }).catch(() => {
      // Fallback silenzioso se i file non sono raggiungibili
      return Promise.resolve();
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request).catch(() => caches.match('/dieta-antonio/index.html'));
    })
  );
});
