export {}
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (e: ExtendableEvent) => {
  e.waitUntil()
});