const CACHE_NAME = "korean-chingu-v8";
const APP_FILES = [
  "./index.html?v=8",
  "./styles.css?v=8",
  "./app.js?v=8",
  "./grammar.js?v=8",
  "./vocabulary.js?v=8",
  "./freddie-examples.js?v=8",
  "./manifest.webmanifest?v=8",
  "./icon.svg?v=8"
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
    event.respondWith(fetch(request, { cache: "no-cache" }).catch(() => caches.match("./index.html?v=8")));
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
