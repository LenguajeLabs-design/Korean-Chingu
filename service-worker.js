const CACHE_NAME = "korean-chingu-v28";
const APP_FILES = [
  "./index.html?v=28",
  "./styles.css?v=28",
  "./app.js?v=28",
  "./grammar.js?v=28",
  "./vocabulary.js?v=28",
  "./freddie-examples.js?v=28",
  "./exam-rounds.js?v=28",
  "./manifest.webmanifest?v=28",
  "./icon.svg?v=28",
  "./assets/seoul-route-map.jpg?v=28",
  "./assets/royal-seoul-map.jpg?v=28",
  "./assets/downtown-seoul-map.jpg?v=28",
  "./assets/river-seoul-map.jpg?v=28",
  "./assets/gangnam-seoul-map.jpg?v=28",
  "./assets/everyday-seoul-map.jpg?v=28",
  "./assets/seodaemun-route-map.jpg?v=28",
  "./assets/eastern-parks-map.jpg?v=28",
  "./assets/suwon-fortress-map.jpg?v=28"
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
    event.respondWith(fetch(request, { cache: "no-cache" }).catch(() => caches.match("./index.html?v=28")));
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
