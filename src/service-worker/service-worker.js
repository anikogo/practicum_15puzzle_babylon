const STATIC_CACHE_NAME = 'static-data-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-data-v1';
const CACHE_CONTAINING_ERROR_MESSAGES = 'any';

const URLS = [
  '/',
  '/images/favicon.jpg',
  '/main.css',
];

self.addEventListener('install', (event) => {
  console.log('install');
    event.waitUntil(
      caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');

        return cache.addAll(URLS);
      })
      .catch(err => {
        console.log(err);

        throw err;
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(() => true)
          .map((name) => caches.delete(name))
      )
    })
  );
});

addEventListener('fetch', function(event) {
  if(!event.request.url.startsWith('http')) {
    //skip request
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function(res) {
                return caches.open(DYNAMIC_CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());

                    return res;
                  })
              })
              .catch(function(err) {
                return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                  .then(function(cache) {
                    return cache.match('/offline.html');
                  });
              });
          }
        })
    );
  }
});  
