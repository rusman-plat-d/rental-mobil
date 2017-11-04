// https://developers.google.com/web/fundamentals/getting-started/primers/service-workers

// ------------------------------
// Pre Cache and Update
// ------------------------------
importScripts('./workbox-sw.prod.v2.1.1.js');

/**
 * Create an instance of WorkboxSW.
 * Setting clientsClaims to true tells our service worker to take control as
 * soon as it's activated.
 */
const workboxSW = new WorkboxSW({ clientsClaim: true });

/**
 * precache() is passed a manifest of URLs and versions, and does the following
 * each time the service worker starts up:
 *   - Adds all new URLs to a cache.
 *   - Refreshes the previously cached response if the URL isn't new, but the
 *     revision changes. This will also trigger a Broadcast Channel API message
 *     sent to the channel 'precache-updates'.
 *   - Removes entries for URLs that used to be in the list, but aren't anymore.
 *   - Sets up a fetch handler to respond to any requests for URLs in this
 *     list using a cache-first strategy.
 *
 * DO NOT CREATE OR UPDATE THIS LIST BY HAND!
 * Instead, add one of our tools (workbox-cli, workbox-webpack-plugin, or
 * workbox-build) to your existing build process, and have that regenerate the
 * manifest at the end of every build.
 */

// An array of file details include a `url` and `revision` parameter.
workboxSW.precache([
  {
    "url": "3rdpartylicenses.txt",
    "revision": "f21fddc4bfda4d4f7a5ec3122216ddb8"
  },
  {
    "url": "assets/angular144.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "assets/Cursors/cursor_click_x.cur",
    "revision": "62116811ccbe9a18aefd73c3c53f920e"
  },
  {
    "url": "assets/Cursors/cursorani_wait.ani",
    "revision": "19fbc7da41b2b10ef1e28366ee96bc6f"
  },
  {
    "url": "assets/iconfont/codepoints",
    "revision": "7e4ff73a88c8dd11addf69672d6648d5"
  },
  {
    "url": "assets/iconfont/material-icons.css",
    "revision": "ff3e74b8aab07604027161591fd4adf2"
  },
  {
    "url": "assets/iconfont/MaterialIcons-Regular.eot",
    "revision": "e79bfd88537def476913f3ed52f4f4b3"
  },
  {
    "url": "assets/iconfont/MaterialIcons-Regular.ijmap",
    "revision": "ed6a98d002bc0b535dd8618f3ae05fe7"
  },
  {
    "url": "assets/iconfont/MaterialIcons-Regular.svg",
    "revision": "60b333913565d0fd467d8616af325557"
  },
  {
    "url": "assets/iconfont/MaterialIcons-Regular.ttf",
    "revision": "a37b0c01c0baf1888ca812cc0508f6e2"
  },
  {
    "url": "assets/iconfont/MaterialIcons-Regular.woff",
    "revision": "012cf6a10129e2275d79d6adac7f3b02"
  },
  {
    "url": "assets/iconfont/MaterialIcons-Regular.woff2",
    "revision": "570eb83859dc23dd0eec423a49e147fe"
  },
  {
    "url": "assets/iconfont/README.md",
    "revision": "af86b7534f90b905f1adb4b71a160dca"
  },
  {
    "url": "assets/idb-keyval-min.js",
    "revision": "81dfde4d837c26e0aad2d73a373c239a"
  },
  {
    "url": "assets/launcher-icon-2x.jpg",
    "revision": "dd35bb7abe5cab4a9a66b90fa69f1df0"
  },
  {
    "url": "assets/launcher-icon-3x.jpg",
    "revision": "2f12e82197b1cf645ec7e632daf66e65"
  },
  {
    "url": "assets/launcher-icon-4x.jpg",
    "revision": "784f3874cafe9a6bcd378d42720bc8d3"
  },
  {
    "url": "assets/materialize/materialize.min.css",
    "revision": "dea286d7996bc9ab3a8d9c2076d2a97d"
  },
  {
    "url": "assets/materialize/materialize.min.js",
    "revision": "cc9619ce5783311514713f7c7b892522"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Bold.woff",
    "revision": "eed9aab5449cc9c8430d7d258108f602"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Bold.woff2",
    "revision": "c0f1e4a4fdfb8048c72e86aadb2a247d"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Light.woff",
    "revision": "ea36cd9a0e9eee97012a67b8a4570d7b"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Light.woff2",
    "revision": "3c37aa69cd77e6a53a067170fa8fe2e9"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Medium.woff",
    "revision": "cf4d60bc0b1d4b2314085919a00e1724"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Medium.woff2",
    "revision": "1561b424aaef2f704bbd89155b3ce514"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Regular.woff",
    "revision": "3cf6adf61054c328b1b0ddcd8f9ce24d"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Regular.woff2",
    "revision": "5136cbe62a63604402f2fedb97f246f8"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Thin.woff",
    "revision": "44b78f142603eb69f593ed4002ed7a4a"
  },
  {
    "url": "assets/materialize/roboto/Roboto-Thin.woff2",
    "revision": "1f35e6a11d27d2e10d28946d42332dc5"
  },
  {
    "url": "assets/ng.png",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  },
  {
    "url": "assets/scss/custom-theme.scss",
    "revision": "ccf2230aeb467531e86fdd6f45bec0cd"
  },
  {
    "url": "assets/scss/grid.cmd",
    "revision": "2bd818f18bf943709985fc7e59a7da34"
  },
  {
    "url": "assets/scss/grid.css",
    "revision": "9ad429ff12ce65881203dc3fff9d1cf4"
  },
  {
    "url": "assets/scss/grid.min.css",
    "revision": "fe5823668a09a6129eb1c46b27edff2a"
  },
  {
    "url": "assets/scss/grid.scss",
    "revision": "5f40fe8bb59aad9cd5ae396fa0c7c638"
  },
  {
    "url": "assets/sw-register.js",
    "revision": "9ff79c12b91428cf7fee2a738f7bd62d"
  },
  {
    "url": "cursor_click_x.62116811ccbe9a18aefd.cur",
    "revision": "62116811ccbe9a18aefd73c3c53f920e"
  },
  {
    "url": "favicon.ico",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  },
  {
    "url": "fontawesome-webfont.674f50d287a8c48dc19b.eot",
    "revision": "674f50d287a8c48dc19ba404d20fe713"
  },
  {
    "url": "fontawesome-webfont.912ec66d7572ff821749.svg",
    "revision": "912ec66d7572ff821749319396470bde"
  },
  {
    "url": "fontawesome-webfont.af7ae505a9eed503f8b8.woff2",
    "revision": "af7ae505a9eed503f8b8e6982036873e"
  },
  {
    "url": "fontawesome-webfont.b06871f281fee6b241d6.ttf",
    "revision": "b06871f281fee6b241d60582ae9369b9"
  },
  {
    "url": "fontawesome-webfont.fee66e712a8a08eef580.woff",
    "revision": "fee66e712a8a08eef5805a46892932ad"
  },
  {
    "url": "index.html",
    "revision": "a1eb5ed541eb91bd0b8012379927c089"
  },
  {
    "url": "inline.93b7987183c6d1998e6c.bundle.js",
    "revision": "2382cfc6fc400371500b573d1276cae3"
  },
  {
    "url": "inline.ddeda6874777b1bdcfd4.bundle.js",
    "revision": "8cb6b594122e1267b4b92b7c8687ade5"
  },
  {
    "url": "inline.fde5d931344c49c1e0bd.bundle.js",
    "revision": "6351bb0f59a55c888d010eabdb456e10"
  },
  {
    "url": "main.3de1a12a69a95fb1c4d6.bundle.js",
    "revision": "3e46c037c3da400298948c0d0d038f41"
  },
  {
    "url": "main.827e6a867f7df6044086.bundle.js",
    "revision": "820a3bd989b8e1a6ddaf7ec0320e3719"
  },
  {
    "url": "main.95acde3f66314afdc8a0.bundle.js",
    "revision": "3ab3244c9dbd00e06fc42dfaa0999149"
  },
  {
    "url": "manifest.json",
    "revision": "9f2d5ece1ff36de8ac6aae64ba42b26a"
  },
  {
    "url": "manifest.webapp",
    "revision": "6acd21f7d6876591ddd1d38586b4bf0b"
  },
  {
    "url": "MaterialIcons-Regular.012cf6a10129e2275d79.woff",
    "revision": "012cf6a10129e2275d79d6adac7f3b02"
  },
  {
    "url": "MaterialIcons-Regular.570eb83859dc23dd0eec.woff2",
    "revision": "570eb83859dc23dd0eec423a49e147fe"
  },
  {
    "url": "MaterialIcons-Regular.a37b0c01c0baf1888ca8.ttf",
    "revision": "a37b0c01c0baf1888ca812cc0508f6e2"
  },
  {
    "url": "MaterialIcons-Regular.e79bfd88537def476913.eot",
    "revision": "e79bfd88537def476913f3ed52f4f4b3"
  },
  {
    "url": "offline.html",
    "revision": "282a587bae8aafa5f5f25fb76d441c57"
  },
  {
    "url": "polyfills.38ec5d53f1c5f07ee0b1.bundle.js",
    "revision": "14bff8c9cbd98eb30137aff363095056"
  },
  {
    "url": "polyfills.e2fcc06af8af5f94b438.bundle.js",
    "revision": "e0492945aa9a920bb184f71cc3073a93"
  },
  {
    "url": "Roboto-Bold.c0f1e4a4fdfb8048c72e.woff2",
    "revision": "c0f1e4a4fdfb8048c72e86aadb2a247d"
  },
  {
    "url": "Roboto-Bold.eed9aab5449cc9c8430d.woff",
    "revision": "eed9aab5449cc9c8430d7d258108f602"
  },
  {
    "url": "Roboto-Light.3c37aa69cd77e6a53a06.woff2",
    "revision": "3c37aa69cd77e6a53a067170fa8fe2e9"
  },
  {
    "url": "Roboto-Light.ea36cd9a0e9eee97012a.woff",
    "revision": "ea36cd9a0e9eee97012a67b8a4570d7b"
  },
  {
    "url": "Roboto-Medium.1561b424aaef2f704bbd.woff2",
    "revision": "1561b424aaef2f704bbd89155b3ce514"
  },
  {
    "url": "Roboto-Medium.cf4d60bc0b1d4b231408.woff",
    "revision": "cf4d60bc0b1d4b2314085919a00e1724"
  },
  {
    "url": "Roboto-Regular.3cf6adf61054c328b1b0.woff",
    "revision": "3cf6adf61054c328b1b0ddcd8f9ce24d"
  },
  {
    "url": "Roboto-Regular.5136cbe62a63604402f2.woff2",
    "revision": "5136cbe62a63604402f2fedb97f246f8"
  },
  {
    "url": "Roboto-Thin.1f35e6a11d27d2e10d28.woff2",
    "revision": "1f35e6a11d27d2e10d28946d42332dc5"
  },
  {
    "url": "Roboto-Thin.44b78f142603eb69f593.woff",
    "revision": "44b78f142603eb69f593ed4002ed7a4a"
  },
  {
    "url": "robots.txt",
    "revision": "6f94032faf83ae58741013c8fee07cb3"
  },
  {
    "url": "scripts.18478eece26de24b8b9d.bundle.js",
    "revision": "931c2862949089b7569b163a3db933bf"
  },
  {
    "url": "styles.7b9356c9f7101d954dc5.bundle.css",
    "revision": "7b9356c9f7101d954dc532aca75c761c"
  },
  {
    "url": "styles.80a02d7ccf13ce9add32.bundle.css",
    "revision": "80a02d7ccf13ce9add32af2354e3d791"
  },
  {
    "url": "styles.f0ef26a38482afc4719a.bundle.css",
    "revision": "f0ef26a38482afc4719a06e4e89a9d90"
  },
  {
    "url": "uploads/supir/angular144-0.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-1.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-10.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-11.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-12.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-13.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-14.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-15.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-16.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-17.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-18.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-19.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-2.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-20.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-21.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-22.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-23.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-24.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-25.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-26.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-27.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-3.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-4.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-5.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-6.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-7.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-8.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144-9.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/angular144.png",
    "revision": "995fb48f5afe74ed27281c8e14f18819"
  },
  {
    "url": "uploads/supir/bg - Copy-0.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-1.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-2.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-3.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-4.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-5.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-6.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-7.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-8.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy-9.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg - Copy.png",
    "revision": "8d6891f607c57a1efde8bfc8bb9ee15c"
  },
  {
    "url": "uploads/supir/bg.png",
    "revision": "2ac4c09bd833a308d906a220f8e0a199"
  },
  {
    "url": "uploads/supir/f1-0.png",
    "revision": "1a59cd049c7cf3b75bc15a7fd79e4c06"
  },
  {
    "url": "uploads/supir/f1-1.png",
    "revision": "1a59cd049c7cf3b75bc15a7fd79e4c06"
  },
  {
    "url": "uploads/supir/f1-2.png",
    "revision": "1a59cd049c7cf3b75bc15a7fd79e4c06"
  },
  {
    "url": "uploads/supir/f1-3.png",
    "revision": "1a59cd049c7cf3b75bc15a7fd79e4c06"
  },
  {
    "url": "uploads/supir/f1.png",
    "revision": "1a59cd049c7cf3b75bc15a7fd79e4c06"
  },
  {
    "url": "uploads/supir/f2-0.png",
    "revision": "f824b7d1f186e7dd907fbae54ebd2ec9"
  },
  {
    "url": "uploads/supir/f2.png",
    "revision": "f824b7d1f186e7dd907fbae54ebd2ec9"
  },
  {
    "url": "uploads/supir/gg-0.png",
    "revision": "7cb70ded6cd1ea367c7d5bb118886093"
  },
  {
    "url": "uploads/supir/gg-1.png",
    "revision": "7cb70ded6cd1ea367c7d5bb118886093"
  },
  {
    "url": "uploads/supir/gg.png",
    "revision": "7cb70ded6cd1ea367c7d5bb118886093"
  },
  {
    "url": "uploads/supir/Untitled-0.png",
    "revision": "1694cfcb48c278304acf67cfc614508d"
  },
  {
    "url": "uploads/supir/Untitled-1.png",
    "revision": "1694cfcb48c278304acf67cfc614508d"
  },
  {
    "url": "uploads/supir/Untitled-2.png",
    "revision": "1694cfcb48c278304acf67cfc614508d"
  },
  {
    "url": "uploads/supir/Untitled-3.png",
    "revision": "1694cfcb48c278304acf67cfc614508d"
  },
  {
    "url": "uploads/supir/Untitled.png",
    "revision": "1694cfcb48c278304acf67cfc614508d"
  },
  {
    "url": "uploads/supir/Untitled2-0.png",
    "revision": "da8e87cb3cec8308169229c2aad3ea8f"
  },
  {
    "url": "uploads/supir/Untitled2-1.png",
    "revision": "da8e87cb3cec8308169229c2aad3ea8f"
  },
  {
    "url": "uploads/supir/Untitled2.png",
    "revision": "da8e87cb3cec8308169229c2aad3ea8f"
  },
  {
    "url": "vendor.f05cc9321015837ea377.bundle.js",
    "revision": "c3c94cb114987201dd2d5641ed0c210a"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js.map",
    "revision": "6fc68cbf40e4e2f38d2889fdaf5bc58a"
  },
  {
    "url": "workbox-sw.prod.v2.1.1.js",
    "revision": "2a5638f9e33d09efc487b96804a0aa11"
  },
  {
    "url": "workbox-sw.prod.v2.1.1.js.map",
    "revision": "50032bbb3a40ae0047a5a44cd95ff06c"
  }
]);

/**
 * Requests for URLs that aren't precached can be handled by runtime caching.
 * Workbox has a flexible routing system, giving you control over which caching
 * strategies to use for which kind of requests.
 *
 * registerRoute() takes a RegExp or a string as its first parameter.
 *   - RegExps can match any part of the request URL.
 *   - Strings are Express-style routes, parsed by
 *     https://github.com/nightwolfz/path-to-regexp
 *
 * registerRoute() takes a caching strategy as its second parameter.
 * The built-in strategies are:
 *   - cacheFirst
 *   - cacheOnly
 *   - networkFirst
 *   - networkOnly
 *   - staleWhileRevalidate
 * Advice about which strategies to use for various assets can be found at
 * https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
 *
 * Each strategy can be configured with additional options, controlling the
 * name of the cache that's used, cache expiration policies, which response
 * codes are considered valid (useful when you want to cache opaque responses)
 * and whether updates to previously cached responses should trigger a message
 * using the BroadcastChannel API.
 *
 * The following routes show this flexibility put to use.
 */

/**
 * Set up a route that will match any URL requested that ends in .json.
 * Handle those requests using a network-first strategy.
 */
// workboxSW.router.registerRoute(
//   /\.json$/,
//   workboxSW.strategies.networkFirst()
// );

/**
 * Set up a route that will match any URL requested that has /api/ in it.
 * Handle those requests using a network-first strategy, but with a timeout.
 * If there's no network response before the timeout, then return the previous
 * response from the cache instead.
 */

workboxSW.router.registerRoute(
	/\/api\/(.*)/,
	// workboxSW.strategies.networkFirst({ networkTimeoutSeconds: 1 })
	workboxSW.strategies.cacheFirst({ cacheName: 'hero-api' })
);

// don't need this since we have fallback
// const networkFirstStrategy = workboxSW.strategies.networkFirst();
// workboxSW.router.registerRoute('/home/', networkFirstStrategy);
// workboxSW.router.registerRoute('/heroes/', networkFirstStrategy);
// workboxSW.router.registerRoute('/villains/', networkFirstStrategy);

/**
 * This URL will be used as a fallback if a navigation request can't be fulfilled.
 * Normally this URL would be precached so it's always available.
 * This is particularly useful for single page apps where requests should go to a single URL.
 */
workboxSW.router.registerNavigationRoute('/index.html');












// -------------------------------------------------------
// background sync
// -------------------------------------------------------
self.importScripts('assets/idb-keyval-min.js');

// self.addEventListener('sync', event => {
//   swLog('I heard a sync event!', event);
//   if (event.tag === 'my-pwa-messages') {
//     event.waitUntil(getMessagesFromOutbox()
//       .then(messages => Promise.all(mapAndSendMessages(messages)))
//       .catch(err => swLog('unable to send messages to server', err))
//       .then(response => removeMessagesFromOutBox(response))
//     );
//   }
// });

function getMessagesFromOutbox() {
	const key = 'pwa-messages';
	return idbKeyval.get(key).then(values => {
		values = values || '[]';
		const messages = JSON.parse(values) || [];
		return messages;
	});
}

function mapAndSendMessages(messages) {
	return messages.map(
		message => sendMessage(message)
			.then(response => response.json())
			.catch(err => swLog('server unable to handle the message', message, err))
	);
}

function sendMessage(message) {
	const headers = {
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json'
	};
	const msg = {
		method: 'POST',
		body: JSON.stringify(message),
		headers: headers
	};
	return fetch('/messages', msg).then((response) => {
		swLog('message sent!', message);
		return response;
	});
}

function removeMessagesFromOutBox(response) {
	// If the first worked,let's assume for now they all did
	if (response && response.length && response[0] && response[0].result === 'success') {
		return idbKeyval.clear()
			.then(() => swLog('messages removed from outbox'))
			.catch(err => swLog('unable to remove messages from outbox', err));
	}
	return Promise.resolve(true);
}


// -------------------------------------------------------
// push
// -------------------------------------------------------
// https://github.com/web-push-libs/web-push
self.addEventListener('push', event => {
	const body = event.data.text() || 'A little push';
	swLog(`Push received and had this data: "${event.data.text()}"`);

	const title = 'Push Demo';
	const options = {
		body: body,
		icon: 'assets/ng.png',
		badge: 'assets/ng.png'
	};

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
	swLog('Notification click Received.');

	event.notification.close();

	// We are calling event.waitUntil() again
	// to ensure the browser doesn't terminate
	// our service worker before our new window has been displayed.
	event.waitUntil(clients.openWindow('https://johnpapa.net'));
});

// const applicationServerPublicKey = 'BMZuj1Uek9SeT0myecw8TQxr4dB6Vl4X7c4abMzAA4KR72DsKnVcSpZr6svYgkwNSerKsz7vdZ1kfzwFc0TmH3o';
const applicationServerPublicKey =
	'BNKV7LJ5IFajn46I7FWroeSCMKtyOQPAGguMCn_-mVfyVjr_pvvQn0lW_KMoOAMqEAd4qhFHZhG6GEsDTPSJJ8I';

self.addEventListener('pushsubscriptionchange', event => {
	swLog(`'pushsubscriptionchange' event fired.`);
	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	event.waitUntil(
		self.registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: applicationServerKey
		})
			.then(newSubscription => {
				// TODO: Send to application server
				swLog('New subscription: ', newSubscription);
			})
	);
});



// -------------------------------------------------------
// logging
// -------------------------------------------------------
function swLog(eventName, event) {
	console.log('[Service Worker] ' + eventName);
	if (event) {
		console.log(event);
	}
}
