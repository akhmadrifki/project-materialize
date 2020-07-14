const CACHE_NAME = "cache-v2.3";
let urlsToCache = [
  "manifest.json",
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/portfolio.html",
  "/pages/contact.html",
  "pages/testimoni.html",
  "/css/materialize.min.css",
  "/css/custom.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/regsw.js",
  "/images/icon-48.png",
  "/images/icon-72.png",
  "/images/icon-96.png",
  "/images/icon-144.png",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/images/office.jpg",
  "/images/profile.jpg",
  "/images/akhmad.png",
  "/images/konten.jpg",
  "/images/singa.png",
  "/images/burung.png",
  "/images/tulis.png",
  "/images/kunci.png",
  "/images/hp.png",
  "/images/chipset.png",
  "/images/airterjun.png",
  "/images/wakatobi.png",
  "/images/jogja.png",
  "/testimoni/1.png",
  "/testimoni/2.png",
  "/testimoni/3.png",
  "/testimoni/4.jpg",
  "/testimoni/5.jpg",
  "/testimoni/6.jpg",
  "/testimoni/7.jpg",
  "/testimoni/8.jpg",
  "/testimoni/9.jpg",
  "/testimoni/10.jpg",
  "/testimoni/11.jpg",
  "/testimoni/12.png",
  "/testimoni/13.png",
  "/testimoni/14.png",
  "/testimoni/15.png"




];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

    self.addEventListener("activate", function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheName != CACHE_NAME) {
                console.log("ServiceWorker: cache " + cacheName + " dihapus");
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });