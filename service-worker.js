var cacheName='petstore v-1';
var cacheFiles=[
    'index.html',
    'products.js',
    'style.css',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.png',
];

self.addEventListener('ínstall',(e) =>{
    console.log('[service Worker]install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[service Worker]Caching all files');
            return cache.addAll(cacheFiles); 
        })
    )
});

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(r){
            //download the file if it is not in the cache
            return r || fetch(e.request).then(function(response){

                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request,response.clone());
                    return response;
                })
            })
        })
    )
})