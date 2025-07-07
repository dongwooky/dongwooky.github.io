const CACHE_NAME = 'dongwook-portfolio-v1.2';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/profile.jpg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    // Logo files
    '/logos/university-of-toronto.png',
    '/logos/kwangwoon-university.svg',
    '/logos/lg-electronics.png',
    '/logos/kwangwoon-bcml.png',
    '/logos/qualcomm-institute.png',
    '/logos/sk-telecom.png',
    '/logos/korea-ministry-oceans-fisheries.png',
    '/logos/kosombe-conference.png',
    '/logos/korea-information-industry-federation.png',
    // Award images
    '/awards/ministry-award-2021.png',
    '/awards/qualcomm-achievement-2022.jpg',
    '/awards/biomedical-poster-2024.jpg',
    '/awards/kosombe-outstanding-2023.jpg',
    '/awards/kwangwoon-excellence-2022.jpg',
    '/awards/kwangwoon-capstone-2021.jpg',
    '/awards/kiif-bronze-2022.jpg',
    '/awards/kwangwoon-sw-2021.jpg',
    '/awards/scholarship-2022.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache.map(url => new Request(url, {
                    cache: 'no-cache'
                })));
            })
            .catch(error => {
                console.log('Cache installation failed:', error);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(
                    response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                ).catch(error => {
                    // Return offline page for navigation requests
                    if (event.request.destination === 'document') {
                        return caches.match('/404.html');
                    }
                    throw error;
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for form submissions (if supported)
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
        event.waitUntil(
            // Handle background sync for contact form
            console.log('Background sync triggered for contact form')
        );
    }
});

// Push notification handler (for future use)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Portfolio',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Dongwook Kwon Portfolio', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
}); 