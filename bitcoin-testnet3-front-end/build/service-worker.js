let precacheConfig = [['/index.html', '3c068a2674e9638a393b3a82f6bbd5f8'], ['/static/css/main.39e410e4.css', '3fd083dab9943f66d898239e1efe000f'], ['/static/js/main.d921ee6c.js', 'b3e1ce198b55dc4af511d1584ba0e8fc'], ['/static/media/logo.5d5d9eef.svg', '5d5d9eefa31e5e13a6610d9fa7a283bb'], ['/static/media/octicons.190e7257.svg', '190e72572ee84190f4777765fa49fc47'], ['/static/media/octicons.d038ccbc.eot', 'd038ccbc4a99be24f33a54b482b2422e'], ['/static/media/octicons.de59a972.woff2', 'de59a97248b44599e6747a27a943f738'], ['/static/media/octicons.e0d4a324.ttf', 'e0d4a324833e13be7d4fa762146d0a71'], ['/static/media/octicons.ee5b1bee.woff', 'ee5b1bee959a95bd43b223ec901d098a']],
  cacheName = `sw-precache-v3-sw-precache-webpack-plugin-${self.registration ? self.registration.scope : ''}`,
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function (e, t) { const n = new URL(e); return n.pathname.slice(-1) === '/' && (n.pathname += t), n.toString(); },
  cleanResponse = function (t) { return t.redirected ? ('body' in t ? Promise.resolve(t.body) : t.blob()).then(function (e) { return new Response(e, { headers: t.headers, status: t.status, statusText: t.statusText }); }) : Promise.resolve(t); },
  createCacheKey = function (e, t, n, r) { const a = new URL(e); return r && a.pathname.match(r) || (a.search += `${(a.search ? '&' : '') + encodeURIComponent(t)}=${encodeURIComponent(n)}`), a.toString(); },
  isPathWhitelisted = function (e, t) { if (e.length === 0) return !0; const n = new URL(t).pathname; return e.some(function (e) { return n.match(e); }); },
  stripIgnoredUrlParameters = function (e, n) { const t = new URL(e); return t.hash = '', t.search = t.search.slice(1).split('&').map(function (e) { return e.split('='); }).filter(function (t) { return n.every(function (e) { return !e.test(t[0]); }); }).map(function (e) { return e.join('='); }).join('&'), t.toString(); },
  hashParamName = '_sw-precache',
  urlsToCacheKeys = new Map(precacheConfig.map(function (e) {
    let t = e[0],
      n = e[1],
      r = new URL(t, self.location),
      a = createCacheKey(r, hashParamName, n, /\.\w{8}\./); return [r.toString(), a];
  })); function setOfCachedUrls(e) { return e.keys().then(function (e) { return e.map(function (e) { return e.url; }); }).then(function (e) { return new Set(e); }); }self.addEventListener('install', function (e) { e.waitUntil(caches.open(cacheName).then(function (r) { return setOfCachedUrls(r).then(function (n) { return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (t) { if (!n.has(t)) { const e = new Request(t, { credentials: 'same-origin' }); return fetch(e).then(function (e) { if (!e.ok) throw new Error(`Request for ${t} returned a response with status ${e.status}`); return cleanResponse(e).then(function (e) { return r.put(t, e); }); }); } })); }); }).then(function () { return self.skipWaiting(); })); }), self.addEventListener('activate', function (e) { const n = new Set(urlsToCacheKeys.values()); e.waitUntil(caches.open(cacheName).then(function (t) { return t.keys().then(function (e) { return Promise.all(e.map(function (e) { if (!n.has(e.url)) return t.delete(e); })); }); }).then(function () { return self.clients.claim(); })); }), self.addEventListener('fetch', function (t) {
  if (t.request.method === 'GET') {
    let e,
      n = stripIgnoredUrlParameters(t.request.url, ignoreUrlParametersMatching),
      r = 'index.html'; (e = urlsToCacheKeys.has(n)) || (n = addDirectoryIndex(n, r), e = urlsToCacheKeys.has(n)); const a = '/index.html'; !e && t.request.mode === 'navigate' && isPathWhitelisted(['^(?!\\/__).*'], t.request.url) && (n = new URL(a, self.location).toString(), e = urlsToCacheKeys.has(n)), e && t.respondWith(caches.open(cacheName).then(function (e) { return e.match(urlsToCacheKeys.get(n)).then(function (e) { if (e) return e; throw Error('The cached response that was expected is missing.'); }); }).catch(function (e) { return console.warn('Couldn\'t serve response for "%s" from cache: %O', t.request.url, e), fetch(t.request); }));
  }
});
