const STATIC_CACHE_NAME = 'static-data-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-data-v1';

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

self.addEventListener('fetch', async (event) => {
  const { request } = event;
  event.respondWith(cacheData(request));
});

async function cacheData(request) {
  const cashedRequest = await caches.match(request);
  return cashedRequest ?? networkFirst(request);
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());

    return response;
  } catch (error) {
    return await cache.match(request);
  }
}
