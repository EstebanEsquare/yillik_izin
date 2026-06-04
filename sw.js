const CACHE_NAME = 'izin-takip-v3'; // Her büyük güncellemede bu versiyonu artır
const ASSETS = ['index.html', 'manifest.json'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});

// Yeni sürüme geçişte eski cache'i sil
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
    );
});