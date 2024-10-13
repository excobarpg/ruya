if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/ruya/service-worker.js')
    .then(function(registration) {
        console.log('Service Worker başarıyla kaydedildi:', registration);
    }).catch(function(error) {
        console.log('Service Worker kaydedilemedi:', error);
    });
}
