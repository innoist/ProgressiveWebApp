importScripts('./node_modules/sw-toolbox/sw-toolbox.js')

var cacheVersion = { 'static': 'static-v5', 'dynamic': 'dynamic-v5' };
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(cacheVersion.static)
    .then(function (cache) {
      return cache.add(['/pages/brands.html']);
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('sw activate', cacheVersion);
});
toolbox.router.get('/src/pages/*', toolbox.cacheFirst, {
  cache: {
    name: cacheVersion.static,
    maxAgeSeconds: 60 * 60 * 60
  }
});
var customOption = false;
if (!customOption) {
  toolbox.router.get('/*', toolbox.networkFirst, {
    networkTimeoutSeconds: 1,
    cache: {
      name: cacheVersion.dynamic,
      maxEntries: 5
    }
  });
}
else {
  //Implementing our own
  toolbox.router.get('/*', function (request, values, options) {
    return toolbox.networkFirst(request, values, options)
      .catch(function (err) {
        
      })
  }, {
      networkTimeoutSeconds: 1,
      cache: {
        name: cacheVersion.dynamic,
        maxEntries: 5
      }
    });
}

/*function fetchAndUpdate(request) {
  return fetch(request)
    .then(function (res) {
      if (res) {
        return caches.open(cacheVersion)
          .then(function (cache) {
            return cache.put(request, res.clone())

              .then(function () {
                return res;
              });

          });
      }
    });
}

self.addEventListener('fetch', function (event) {
  console.log("Request -->", event.request.url);

  event.respondWith(caches.match(event.request)
    .then(function (res) {
      if (res)
        return res;
      if (!navigator.onLine) {
        return new Response('<h1>You are offline</h1>');
      }
      return fetchAndUpdate(event.request);
    })


  )
  // if (!navigator.onLine) {
  //   event.respondWith(new Response('<h1>You are offline</h1>'));

  // }
  // else {
  //   event.respondWith(fetch(event.request));
  // }
});*/