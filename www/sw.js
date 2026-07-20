const CACHE = "shadow-diary-v1";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // 本地文件走缓存优先；跨域的 CDN 脚本走网络优先（保证核心库总是最新）
  const url = new URL(e.request.url);
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
  } else {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
