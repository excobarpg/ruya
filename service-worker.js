self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        return fetch('https://linkredirect-ry.com/appsite'); // Doğrudan bu linke yönlendirme yapar
      })()
    );
  }
});
