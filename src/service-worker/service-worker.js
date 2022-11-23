const STATIC_CACHE_NAME = 'static-data-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-data-v1';

const CACHE_CONTAINING_ERROR_MESSAGES = 'any';

const URLS = [
  '/',
  '/leaderboard',
  '/forum',
  '/about',
  '/signin',
  '/signup',
  '/profile',
  '/images/favicon.jpg',
  '/main.css',
  '/bundle.js',
  '/server.js',
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
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open(DYNAMIC_CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // fallback mechanism
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
