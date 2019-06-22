const cacheName = 'v1';

const cacheAssests = [
    '/images/flower.jpeg',
    '/images/sea.jpeg',
    '/index.html',
    '/about.html'
];

//call install event
self.addEventListener('install', e => {
    console.log('SW::INSTALLED');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('SW::CACHING FILES');
            console.log(cache, "ll");
            cache.addAll(cacheAssests);
        })
        .then(() => self.skipWaiting())
        .catch(err => console.log('SW::CACHE ERR'))
    );
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