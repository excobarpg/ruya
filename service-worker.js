var CACHE_NAME = 'my-site-cache-v1',
    MAX_AGE = 86400000,  // 24 saat (milisaniye cinsinden)
    urlsToCache = [
        '/index.html',
        '/manifest.json',
        '/bg-rb.png',
        '/landinglogo.png',
        '/css/style.css',  // Stil dosyanızı ekleyin (örnek)
        '/js/app.js'  // JavaScript dosyanızı ekleyin (örnek)
    ];

// Kurulum aşamasında cache'e dosyaları ekler
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache oluşturuldu: ', CACHE_NAME);
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch olayında cache kontrolü
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            var lastModified, fetchRequest;

            // Eğer cache'de veri varsa, cache'den döndür
            if (cachedResponse) {
                lastModified = new Date(cachedResponse.headers.get('last-modified'));

                // Cache'deki verinin yaşı MAX_AGE'i geçtiyse, veriyi yenile
                if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
                    fetchRequest = event.request.clone();
                    return fetch(fetchRequest).then(function(response) {
                        var fetchResponse = response.clone();

                        if (!fetchResponse || fetchResponse.status !== 200) {
                            return cachedResponse;  // Hata varsa eski cache'i kullan
                        }

                        caches.open(CACHE_NAME).then(function(cache) {
                            cache.put(event.request, fetchResponse);
                        });

                        return response;
                    }).catch(function() {
                        return cachedResponse;  // Hata durumunda eski cache'e dön
                    });
                }
                return cachedResponse;
            }

            // Cache'de veri yoksa doğrudan ağdan veriyi çek
            return fetch(event.request);
        })
    );
});

// Cache'i güncellemek için activate olayını kullanın (eski versiyonları siler)
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
