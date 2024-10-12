// Service Worker Kurulumu
self.addEventListener('install', function(event) {
  console.log('Service Worker kuruldu.');
  event.waitUntil(
    caches.open('ruyabet-cache').then(function(cache) {
      return cache.addAll([
        '/ruya/',               // Ana sayfa
        'index.html',     // Doğru yol
        'offline.html',   // Eğer offline.html dosyanız varsa
        'logo192.png',    // İkonlar
        'logo512.png'     // İkonlar
      ]);
    })
  );
});

// Service Worker Aktivasyonu
self.addEventListener('activate', function(event) {
  console.log('Service Worker etkinleştirildi.');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== 'ruyabet-cache') {
            console.log('Eski cache temizleniyor:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event ile Cache Kullanımı
self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match('/ruya/offline.html');
      })
    );
  }
});
