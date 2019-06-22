const cacheName = 'v1';

const cacheAssests = [
    '/images/flower.jpeg',
    '/images/sea.jpeg',
];

//call install event
self.addEventListener('install', e => {
    console.log('SW::INSTALLED');
});

self.addEventListener('activate', e => {
    console.log('SW::ACTIVATED');
    e.waitUntil(
        /* Delete the previous version of caches if exists in the cache storage */
        caches.keys().then((cacheNames) => {
            cacheNames.map(cache => {
                if (cache !== cacheName) {
                    caches.delete(cache);
                }
            });
        })
    );
});


self.addEventListener('fetch', e => {
    console.log('SW::FETCH INTERCEPTOR');
    e.respondWith(
        fetch(e.request).then(res => {
            const resClone = res.clone();
            caches.open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
        })
    );
});