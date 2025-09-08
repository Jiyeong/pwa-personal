// src/pages/Download.tsx
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export function DownloadPage() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      setPlatform('ios');
    } else if (/Android/.test(navigator.userAgent)) {
      setPlatform('android');
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">앱 설치하기</h1>

        {platform === 'ios' && (
            <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-center">
                <Share2 className="w-12 h-12 text-blue-500" />
              </div>
              <ol className="space-y-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  하단의 공유 버튼을 눌러주세요
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  "홈 화면에 추가" 버튼을 선택해주세요
                </li>
              </ol>
            </div>
        )}

        {platform === 'android' && deferredPrompt && (
            <Button
                onClick={handleInstall}
                className="w-full py-6 text-lg"
            >
              <Download className="mr-2" />
              앱 설치하기
            </Button>
        )}
      </div>
  );
}