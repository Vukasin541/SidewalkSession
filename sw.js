const CACHE_NAME = "sidewalk-session-v1";
const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./game.js",
    "./manifest.webmanifest",
    "./vendor/three.module.js",
    "./icons/icon.svg",
    "./icons/icon-large.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key !== CACHE_NAME)
                .map((key) => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                const clonedResponse = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedResponse));
                return networkResponse;
            });
        })
    );
});