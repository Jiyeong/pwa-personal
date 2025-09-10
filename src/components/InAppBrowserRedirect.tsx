// src/components/InAppBrowserRedirect.tsx
import { useEffect, useCallback } from 'react';

export function InAppBrowserRedirect() {
  /*
  * 참고 문헌 : https://burndogfather.com/271
  * */
  const copyToClipboard = useCallback((val: string) => {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = val;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }, []);

  const inappBrowserOut = useCallback(() => {
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);

    alert('URL주소가 복사되었습니다.\n\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.');
    window.location.href = 'x-safari-https://' + currentUrl.replace(/https?:\/\//i, '');
    // window.location.href = 'x-web-search://?';
    // window.location.href = `x-web-search://?redirect=${encodeURIComponent(currentUrl)}`;

  }, [copyToClipboard]);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const targetUrl = window.location.href;

    if (userAgent.match(/kakaotalk/i)) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`;
      // 카카오의 경우 인앱 탈출 후, 인앱에서 실행된 브라우저 닫기
      setTimeout(() => {
        if(userAgent.match(/iphone|ipad|ipod/i)){
          location.href = 'kakaoweb://closeBrowser';
        } else{
          location.href = 'kakaotalk://inappbrowser/close';
        }
      }, 1000)
    } else if (userAgent.match(/line/i)) {
      const separator = targetUrl.includes('?') ? '&' : '?';
      window.location.href = `${targetUrl}${separator}openExternalBrowser=1`;
    } else if (userAgent.match(/inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1]/i)) {
      if (userAgent.match(/iphone|ipad|ipod/i)) {
        document.body.innerHTML = `
          <div style="min-height: 100vh; background: white; padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
            <h2 style="padding-top: 48px; font-size: 24px; font-weight: bold;">
              인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.
            </h2>
            <div style="margin-top: 24px; color: #666;">
              <p>아래 버튼을 눌러 Safari를 실행해주세요</p>
              <p>Safari가 열리면, 주소창을 길게 터치한 뒤,</p>
              <p>'붙여놓기 및 이동'을 누르면</p>
              <p>정상적으로 이용할 수 있습니다.</p>
              <button 
                onclick="window.openInSafari()"
                style="margin-top: 24px; padding: 12px 24px; background-color: #007AFF; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold;"
              >
                Safari로 열기
              </button>
            </div>
          </div>
        `;
        (window as any).openInSafari = inappBrowserOut;
      } else {
        window.location.href = `intent://${targetUrl.replace(/https?:\/\//i, '')}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    }
  }, [inappBrowserOut]);

  return null;
}