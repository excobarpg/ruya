// Service Worker'ı kaydetme
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/ruya/service-worker.js')
        .then(function(registration) {
          console.log('Service Worker başarıyla kaydedildi:', registration.scope);
        })
        .catch(function(error) {
          console.log('Service Worker kaydı başarısız:', error);
        });
    });
}
