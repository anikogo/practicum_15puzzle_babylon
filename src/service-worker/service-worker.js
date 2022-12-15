// const deleteCache = async (key) => {
//   await caches.delete(key);
// };

// const deleteOldCaches = async () => {
//   const cacheKeepList = ['v1'];
//   const keyList = await caches.keys();
//   const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));

//   await Promise.all(cachesToDelete.map(deleteCache));
// };

const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v1');
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open('v1');

  if ((request.url.indexOf('http') === 0)) { 

    await cache.put(request, response);
  }
};

const networkFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const responseFromCache = await caches.match(request);

    if (responseFromCache) {
      return responseFromCache;
    }
  
    const preloadResponse = await preloadResponsePromise;
    
    if (preloadResponse) {
      console.info('using preload response', preloadResponse);
      putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }
    
    const fallbackResponse = await caches.match(fallbackUrl);

    if (fallbackResponse) {
      return fallbackResponse;
    }

    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache(['/', '/images/favicon.jpg', '/main.css'])
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    networkFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: '/about',
    })
  );
});
