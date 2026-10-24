/* أعمالي — عامل الخدمة: يحفظ ملفات البرنامج ليعمل دون إنترنت.
   غيّر رقم الإصدار V مع كل تحديث للبرنامج حتى يصل التحديث. */
var V='a3mali-2026-10-24a';
var FILES=['./','index.html','manifest.webmanifest','fonts/fonts.css','fonts/readex-arabic.woff2','fonts/readex-latin.woff2','fonts/ruqaa-arabic.woff2','icons/apple-touch-icon.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k.indexOf('a3mali-')===0&&k!==V;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  var req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==location.origin)return;
  if(req.mode==='navigate'){e.respondWith(caches.match('index.html').then(function(r){return r||fetch(req);}));return;}
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(function(r){return r||fetch(req);}));
});
