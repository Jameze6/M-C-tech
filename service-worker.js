// =========================================================
// M-C TECHNO
// SERVICE WORKER - VERSION 2
// FORCE LA MISE À JOUR DU SITE SUR ANDROID
// =========================================================

const CACHE_NAME = "m-c-tech-v2";

const FILES_TO_CACHE = [
    "/M-C-tech/",
    "/M-C-tech/index.html",
    "/M-C-tech/style.css",
    "/M-C-tech/script.js",
    "/M-C-tech/manifest.json"
];


// =========================================================
// INSTALLATION
// =========================================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME).then(cache => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    // Active immédiatement la nouvelle version
    self.skipWaiting();

});


// =========================================================
// ACTIVATION
// =========================================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys
                    .filter(key => key !== CACHE_NAME)

                    .map(key => caches.delete(key))

            );

        })

    );

    // Prend immédiatement le contrôle du téléphone
    self.clients.claim();

});


// =========================================================
// FICHIERS DU SITE
// =========================================================

self.addEventListener("fetch", event => {

    // Seulement les requêtes GET
    if (event.request.method !== "GET") {
        return;
    }


    event.respondWith(

        fetch(event.request)

            .then(response => {

                // Copier la réponse
                const responseClone =
                    response.clone();


                // Mettre la nouvelle version dans le cache
                caches.open(CACHE_NAME)
                    .then(cache => {

                        cache.put(
                            event.request,
                            responseClone
                        );

                    });


                // Afficher directement la nouvelle version
                return response;

            })

            .catch(() => {

                // Si Internet n'est pas disponible,
                // utiliser le cache
                return caches.match(
                    event.request
                );

            })

    );

});