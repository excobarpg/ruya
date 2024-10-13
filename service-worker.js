var CACHE_NAME = 'ruyabet-cache-v1',
    urlsToCache = [
        '/index.html',
        '/manifest.json',
        '/bg-rb.png',
        '/landinglogo.png',
        '/css/style.css'
    ];

// Cache dosyalarını yükle
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache açıldı');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache'lenmiş kaynakları fetch et
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});

// Eski cache'leri sil
self.addEventListener('activate', function(event) {
    var cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
