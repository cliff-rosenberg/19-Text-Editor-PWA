// from the Workbox docs:
// "A number of common patterns, especially around routing and caching, are common enough that they can be standardized into reusable recipes."
// "Workbox makes these available in an easy-to-consume package, allowing you to get up-and-running with a highly functional service worker quickly."

// "The 'offlineFallback' recipe allows your service worker to serve a web page, image, or font if there's a routing error for any of the three, for instance if a user is offline and there isn't a cache hit."
// "The 'warmStrategyCache' recipe allows you to load provided URLs into your cache during the service worker's install phase, caching them with the options of the provided strategy." 
// "This can be used as an alternative to precaching if you know the specific URLs you'd like to cache, want to warm the cache of a route, or similar places where you'd like cache URLs during installation."
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');

// "workbox-strategies provides the most common caching strategies so it's easy to apply them in your service worker."
// "CacheFirst is the best option for offline web apps using non-critical assetsthat can be gradually cached."
// "If there is a Response in the cache, the Request will be fulfilled using the cached response and the network will not be used at all."
// "If there isn't a cached response, the Request will be fulfilled by a network request and the response will be cached so that the next request is served directly from the cache."
const { CacheFirst } = require('workbox-strategies');

// "workbox-routing is a module which makes it easy to "route" these requests to different functions that provide responses."
// "registerRoute method: Easily register a RegExp, string, or function with a caching strategy to a singleton Router instance."
// "This method will generate a Route for you if needed and call workbox-routing.Router#registerRoute. "
const { registerRoute } = require('workbox-routing');

// "The workbox-cacheable-response module provides a standard way of determining whether a response should be cached based on its numeric status code, 
// the presence of a header with a specific value, or a combination of the two."
// "CacheableResponsePlugin is a class implementing the cacheWillUpdate lifecycle callback. This makes it easier to add in cacheability checks to requests made via Workbox's built-in strategies."
const { CacheableResponsePlugin } = require('workbox-cacheable-response');

// "The workbox-expiration is a plugin that allows you to limit the number of entries in a cache and / or remove entries that have been cached for a long period of time."
const { ExpirationPlugin } = require('workbox-expiration');

// "workbox-precaching expects an array of objects with a url and revision property. This array is sometimes referred to as a precache manifest"
// "The 'precacheAndRoute' method will add entries to the precache list and add a route to respond to fetch events."
// "This is a convenience method that will call workbox-precaching.precache and workbox-precaching.addRoute in a single call."
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// start Workbox setup here
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// setup asset caching here
registerRoute(
  // this defines the callback function which filters the requests for JS and CSS files to be cached
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      // a plugin that will cache responses with these headers 
      // to a maximum age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
