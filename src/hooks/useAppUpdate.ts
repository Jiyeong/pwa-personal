import { useState, useEffect, useCallback} from 'react'

export function useAppUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      console.log('서비스 워커가 지원되지 않는 브라우저입니다.');
      return;
    }

    const handleUpdate = async (registration: ServiceWorkerRegistration) => {
      // 현재 활성화된 서비스 워커
      const currentWorker = registration.active;

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          // 새로운 서비스 워커가 설치되었고 이전 버전이 활성화되어 있는 경우
          if (newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
          ) {
            console.log('새로운 서비스 워커가 설치됨:', newWorker.scriptURL);
            setUpdateAvailable(true);
            setUpdateError(null);
          }
        });
      });
    };
    // 서비스 워커 컨트롤러 변경 감지
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('서비스 워커 컨트롤러가 변경됨');
    });

    // 초기 서비스 워커 등록 확인
    navigator.serviceWorker.ready
        .then(handleUpdate)
        .catch(error => {
          setUpdateError('서비스 워커 초기화 중 오류가 발생했습니다.');
          console.error('Service Worker 오류:', error);
        });

    // 주기적으로 업데이트 확인 (선택사항)
    const checkInterval = setInterval(async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.update();
      } catch (error) {
        console.error('업데이트 확인 중 오류:', error);
      }
    // }, 1000 * 60 * 60); // 1시간마다 확인
    }, 20000); // 20초 마다 확인

    return () => {
      clearInterval(checkInterval);
    };
  }, []);


  const updateApp = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      if (registration.waiting) {

        // 대기 중인 서비스 워커에게 skipWaiting 메시지 전송
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });

        // 새로운 서비스 워커가 활성화될 때까지 대기
        const waitForActivation = new Promise<void>((resolve) => {
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            resolve();
          });
        });

        // 활성화 대기
        await waitForActivation;

        // 업데이트 상태 초기화
        setUpdateAvailable(false);

        // 페이지 새로고침
        window.location.reload();
      }
    } catch (error) {
      setUpdateError('앱 업데이트 중 오류가 발생했습니다.');
      console.error('업데이트 오류:', error);
    }
  }, []);

  return { updateAvailable, updateError, updateApp };
}
