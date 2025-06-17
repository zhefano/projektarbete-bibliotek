// Service Worker for caching and offline functionality
const CACHE_NAME = 'mattisskogens-library-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/books.html',
  '/regi.html',
  '/styles.css',
  '/books.css',
  '/stylefor.css',
  '/js/main.js',
  '/script.js',
  '/data.json',
  '/icons/book-open-icon.png',
  '/icons/search-icon.png',
  '/icons/three-horizontal-lines-icon.png',
  '/icons/thin-arrow-right-icon.png',
  '/icons/time-clock-icon.png',
  '/icons/maps-pin-black-icon.png',
  '/images/heroBW.jpg',
  '/images/telephone.jpg',
  '/images/grupprum.png',
  '/images/lecture.jpg'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});