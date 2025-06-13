const CACHE_NAME = 'roll-calculator-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/constants.ts',
  '/types.ts',
  '/icon-192x192.svg',
  '/icon-512x512.svg',
  // Zasoby zewnętrzne takie jak Tailwind CSS i React z esm.sh
  // będą buforowane przez standardowy mechanizm cache przeglądarki lub podczas obsługi zdarzenia 'fetch'.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Dodajemy główne zasoby aplikacji.
        // cache.addAll może się nie udać, jeśli któryś z zasobów jest niedostępny
        // lub jest odpowiedzią "opaque" bez odpowiednich nagłówków CORS.
        // Dla większej odporności, można dodawać zasoby indywidualnie i obsługiwać błędy.
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).catch(err => {
              console.warn(`Failed to cache ${url} during install: ${err}`);
            });
          })
        );
      })
  );
  self.skipWaiting(); // Aktywuj nowego Service Workera natychmiast
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return; // Obsługuj tylko żądania GET
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Zwróć zbuforowaną odpowiedź, jeśli istnieje
        }

        // Jeśli nie ma w cache, pobierz z sieci
        return fetch(event.request.clone()).then(
          (networkResponse) => {
            if (!networkResponse) {
              return networkResponse;
            }

            let canCache = false;
            // Dla zasobów z tej samej domeny (type 'basic') lub z CORS (type 'cors'), sprawdzamy status 200
            if (networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
              canCache = true;
            } else if (networkResponse.type === 'opaque') {
              // Dla zasobów "opaque" (np. z CDN bez CORS), buforujemy je, ale nie możemy sprawdzić statusu.
              canCache = true;
            }

            if (canCache) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          }
        ).catch(() => {
          // Opcjonalnie: można tu zwrócić stronę offline, jeśli sieć zawiedzie
          // np. return caches.match('/offline.html');
          // Na razie, pozwalamy przeglądarce obsłużyć błąd (zwykle wyświetla stronę błędu sieci)
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Usuń stare wersje cache
          }
        })
      );
    })
  );
  return self.clients.claim(); // Przejmij kontrolę nad otwartymi klientami
});