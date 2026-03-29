const CACHE_NAME = "sidewalk-session-v24";
const APP_SHELL = [
    "./",
    "./index.html",
    "./style.css",
    "./game.js",
    "./game.js?v=20260329c",
    "./manifest.webmanifest",
    "./sw.js",
    "./sw.js?v=20260329c",
    "./vendor/three.module.js",
    "./vendor/peerjs.min.js",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/apple-touch-icon-180.png",
    "./icons/icon.svg",
    "./icons/icon-large.svg",
];

function isAppShellRequest(requestUrl) {
    const pathname = requestUrl.pathname;
    return pathname.endsWith("/")
        || pathname.endsWith("/index.html")
        || pathname.endsWith("/game.js")
        || pathname.endsWith("/style.css")
        || pathname.endsWith("/manifest.webmanifest")
        || pathname.endsWith("/sw.js");
}

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

    const requestUrl = new URL(event.request.url);

    if (isAppShellRequest(requestUrl)) {
        event.respondWith(
            fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const clonedResponse = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedResponse));
                }
                return networkResponse;
            }).catch(() => caches.match(event.request))
        );
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