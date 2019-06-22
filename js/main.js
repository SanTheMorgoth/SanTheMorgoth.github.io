if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../sw_cached_pages.js')
        .then(() => console.log('SW::REGISTERED'))
        .catch(() => console.log('SW::ERR'))
   });
}
