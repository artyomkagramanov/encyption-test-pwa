/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { get } from 'idb-keyval';

clientsClaim();

self.__WB_MANIFEST

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {

  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method !== "GET") return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async () => {
      if (event.request.url.includes(':key')) {
        console.log('url is', event.request.url)
        const keyValue = await get('video_key');
        console.log('key val is SW: ' + keyValue);
        return fetch('https://adultmembersites.com/api/'+keyValue);
      }
      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })()
  );
});

// Any other custom service worker logic can go here.
