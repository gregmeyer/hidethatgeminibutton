self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            try {
                await self.registration.navigationPreload.enable();
                console.log('Navigation preload enabled.');
            } catch (error) {
                console.error('Error enabling navigation preload:', error);
            }
        })()
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
                console.log('Using preload response for:', event.request.url);
                return preloadResponse;
            }

            try {
                const response = await fetch(event.request);
                return response;
            } catch (error) {
                console.error('Fetch failed:', event.request.url, error);
                return new Response('Offline', { status: 503 });
            }
        })()
    );
});
