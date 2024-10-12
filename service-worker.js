self.addEventListener('install', function(event) {
  console.log('Service Worker: Kurulum tamamlandı.');
  event.waitUntil(
    caches.open('static-cache').then(function(cache) {
      return cache.addAll([
        '/offline.html', // Çevrimdışı sayfan
        '/manifest.json', // manifest dosyan
        '/logo.png', // logo gibi statik dosyalar
        '/landinglogo.png'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker: Aktif.');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== 'static-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('offline.html');
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
