var StaticCache = "Offline-cache";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(StaticCache).then(function (cache) {
      cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/favicon.ico",
        "/logo192.png",
        "/static/js/bundle.js",
        "/static/js/0.chunk.js",
        "/static/js/main.chunk.js",
        "/static/media/background.39af8e88.jpg",
        "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cachesName) {
      return Promise.all(
        cachesName
          .filter(function (cacheName) {
            return cacheName.startsWith("Offline-") && cacheName != StaticCache;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
