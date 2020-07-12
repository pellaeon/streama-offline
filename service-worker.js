importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
importScripts('https://unpkg.com/idb@5.0.4/build/cjs/index.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('install', (event) => {
  event.waitUntil(async function () {
      console.log(idb);
  });
});