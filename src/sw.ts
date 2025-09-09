import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare let self: ServiceWorkerGlobalScope

// 메시지 수신 처리
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 서비스 워커가 활성화되면 즉시 클라이언트 제어 시작
clientsClaim();

// Workbox의 precache 매니페스트 처리
precacheAndRoute(self.__WB_MANIFEST)