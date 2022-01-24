'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "bcee532d0f15495a8d0dc82e2f858c9a",
"assets/assets/images/forget_password.png": "d013bdde716e54d703f1f304f9a09a83",
"assets/assets/images/icon.png": "d7f33e345d605291389371f2e299132e",
"assets/assets/images/Logo.png": "0bc2d7f29d2467ac2d08e03e21fb2a0f",
"assets/assets/images/Logo2.png": "1842ba7dc76c0e6bbf57e456daa3b8ba",
"assets/assets/images/no-avatar.png": "a7ce18dec9affaf5ab51395ac967ae78",
"assets/assets/images/otp.png": "ded9f9d844bd0e25d4ae1dd6b0179a51",
"assets/assets/images/sign_in.png": "c21342039eaf092cc968103715b8ab28",
"assets/assets/images/sign_up.png": "701d52bb3144b3806d3afe2e484992c9",
"assets/assets/svg/binh_thuong.svg": "ccd3920d59b22fad96e26ba692d83c31",
"assets/assets/svg/building.svg": "8f2ec52bc28340c7aacb412c8515a7f1",
"assets/assets/svg/cho_xet_duyet.svg": "c7f6bd7c8bb60a5dfcf847bf09baa5da",
"assets/assets/svg/duong_tinh.svg": "d780141f23411298b04974d11199b3c3",
"assets/assets/svg/female.svg": "680dd626a5c33722d5b4ad1393c05b11",
"assets/assets/svg/Location.svg": "71a7f44f526108e9c72468d70df59161",
"assets/assets/svg/male.svg": "74a56eb1141b63f3a0492ba923f3913c",
"assets/assets/svg/nghi_ngo.svg": "7ca2b69c05feda183e16f82f615b3b77",
"assets/assets/svg/nghi_nhiem.svg": "d076f649b89efc9c1af87d517bcdc5cb",
"assets/assets/svg/No_avatar.svg": "7636eaf8ef9c08f2c4b3cf6b567a16f8",
"assets/assets/svg/ovaldecoration.svg": "9f9249a268727ecc4466c0972646381f",
"assets/assets/svg/Phone.svg": "0a4cb4525d2bc8123613e82542b52f57",
"assets/assets/svg/sap_hoan_thanh_cach_ly.svg": "d718c39df0e362d7a2bf79eb89d749c3",
"assets/assets/svg/toi_han_xet_nghiem.svg": "0c6b2cf04efcec9086be082c4a625367",
"assets/assets/svg/xet_nghiem_cap_nhat.svg": "4d2b109ff6a21b403711b3a5c48a606e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "238eaa89b15067852cae260c1aa4e6bb",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "1519f3c590688d8620a2f387a8061824",
"/": "1519f3c590688d8620a2f387a8061824",
"main.dart.js": "be10e7bdde65cb3272c3bf2ef40569fa",
"manifest.json": "eb26218a8c10fb7c0571b66e1bfbf03b",
"splash/img/dark-1x.png": "ececb4f8a3f638e484cc92e257d84512",
"splash/img/dark-2x.png": "b9c449ff71936d8952a1860bac5abac0",
"splash/img/dark-3x.png": "ce24ca750e0b8674ae6f15afcfb959db",
"splash/img/dark-4x.png": "55959e3589f270dfa2a3e79fc2e421e1",
"splash/img/light-1x.png": "ececb4f8a3f638e484cc92e257d84512",
"splash/img/light-2x.png": "b9c449ff71936d8952a1860bac5abac0",
"splash/img/light-3x.png": "ce24ca750e0b8674ae6f15afcfb959db",
"splash/img/light-4x.png": "55959e3589f270dfa2a3e79fc2e421e1",
"splash/style.css": "64227ec06c71fef909f75868ada72c30",
"version.json": "117b0bd8be913e4af6f6733af5f57469"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
