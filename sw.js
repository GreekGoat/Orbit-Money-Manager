const CACHE_NAME = 'orbit-cache-v7';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=4.1',
  './app.js?v=4.1',
  './manifest.json',
  './icon-180.png',
  './icon-512.png',
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS).catch(function(){ /* ignore individual failures */ });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event){
  const req = event.request;
  if(req.method !== 'GET') return;

  // NETWORK-FIRST for page navigations: a fresh deploy shows up on the very
  // next online launch. Cache is only the offline fallback.
  if(req.mode === 'navigate'){
    event.respondWith(
      fetch(req).then(function(response){
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(req, clone); });
        return response;
      }).catch(function(){
        return caches.match(req).then(function(c){ return c || caches.match('./index.html'); });
      })
    );
    return;
  }

  // CACHE-FIRST for versioned assets (?v=N in the HTML busts these naturally).
  event.respondWith(
    caches.match(req).then(function(cached){
      if(cached) return cached;
      return fetch(req).then(function(response){
        if(response.ok){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(req, clone); });
        }
        return response;
      }).catch(function(){
        return cached;
      });
    })
  );
});
