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
if(self.Notification.permission === 'granted'){
  
  displayNotification();
}
// else if(self.Notification.permission !== 'denied'){
//   
//   if(registration.active && registration.active.state=='activated') {
//   self.Notification.requestPermission(function(result) {
//     if (result === 'granted') {
  
//    displayNotification();
//     }
//   });
// }
self.addEventListener('message', function (evt) {
  if(evt.data.command=="displayNotification"){
    displayNotification()
  }
  
})
function displayNotification() {
  
if(registration.active && registration.active.state=='activated')
      registration.showNotification('title',{
    body: 'body text',
    badge: 'http://www.endlessicons.com/wp-content/uploads/2012/10/badge-icon-614x460.png',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_FbTmkdO6kdqD16ci_Vn4p4P6NoHS4D0l6wYptIfmK5t5KaU',
    image: './images/mstile-150x150.png',
    tag:'foo', //so multiple notif with same tag appear once
    rentoify: true,//vibrate or make a sound if new notif with same tag appears
    data: {'obj': 'hello data'},

    requireInteraction: true,//will stay till action
    actions: [{
      //max actions true
      //they are kind of buttons
      //helpful in persistant
      action: 'accept',
      title: 'Accept offer',
      icon: './images/favicon-16x16.png'
    },
    {
      //they are kind of buttons
      //helpful in persistant
      action: 'reject',
      title: 'Reject offer',
      icon: './images/favicon-16x16.png'
    }],
    silent: false,
    sound:'',//no browser support
    vibrate: [200, 100, 200], //super mario theme
    dir: 'rtl',
    lang: 'en-us',
    timestamp: Date.now
    


  });

}

self.addEventListener('notificationclick',evt=>{
    if(evt.action){
        console.log('notification clicked');
        
        switch(evt.action){
          case 'accept':
          console.log('accepted');
          evt.notification.close()
          case 'reject':
          console.log('rejected');
          evt.notification.close()
          default:
          console.log('body');
        }
    }
});


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