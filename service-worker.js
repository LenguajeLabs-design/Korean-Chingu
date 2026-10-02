const CACHE_NAME = "korean-chingu-v26";
const APP_FILES = [
  "./index.html?v=26",
  "./styles.css?v=26",
  "./app.js?v=26",
  "./grammar.js?v=26",
  "./vocabulary.js?v=26",
  "./freddie-examples.js?v=26",
  "./exam-rounds.js?v=26",
  "./manifest.webmanifest?v=26",
  "./icon.svg?v=26",
  "./assets/seoul-route-map.jpg?v=26",
  "./assets/royal-seoul-map.jpg?v=26",
  "./assets/downtown-seoul-map.jpg?v=26",
  "./assets/river-seoul-map.jpg?v=26",
  "./assets/gangnam-seoul-map.jpg?v=26",
  "./assets/everyday-seoul-map.jpg?v=26"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request, { cache: "no-cache" }).catch(() => caches.match("./index.html?v=26")));
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    }))
  );
});
