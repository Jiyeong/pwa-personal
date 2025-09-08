// src/hooks/useAppUpdate.ts
import { useEffect, useState } from 'react';

export function useAppUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const wb = window.navigator.serviceWorker;
    if (!wb) return;

    wb.ready.then((registration) => {
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateAvailable(true);
          }
        });
      });
    });
  }, []);

  const updateApp = async () => {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    window.location.reload();
  };

  return { updateAvailable, updateApp };
}