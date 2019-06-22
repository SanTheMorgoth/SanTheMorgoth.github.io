const cacheName = 'v1';

const cacheAssests = [
    '/images/flower.jpeg'
];

//call install event
self.addEventListener('install', e => {
    console.log('SW::INSTALLED');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('SW::CACHING FILES');
            cache.addAll(cacheAssests);
        })
        .then(() => self.skipWaiting())
        .catch(err => console.log('SW::CACHE ERR'))
    );
});

self.addEventListener('activate', e => {
    console.log('SW::ACTIVATED');
});