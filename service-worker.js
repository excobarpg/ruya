self.addEventListener('install', function(event) {
  console.log('Service Worker: Kurulum tamamlandı.');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker: Aktif.');
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => {
      return caches.match('offline.html');
    }));
  }
});
