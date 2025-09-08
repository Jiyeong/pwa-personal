import { useState } from 'react'
import { Camera } from 'lucide-react'
import { Button } from './ui/button'

export function CameraButton() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      setStream(mediaStream);
      setError('');

      // 비디오 요소 생성 및 스트림 연결
      const videoElement = document.createElement('video');
      videoElement.srcObject = mediaStream;
      videoElement.play();

      // 비디오를 표시할 컨테이너에 추가
      const container = document.getElementById('camera-container');
      if (container) {
        container.innerHTML = '';
        container.appendChild(videoElement);
      }
    } catch (err) {
      setError('카메라를 시작할 수 없습니다.');
      console.error('카메라 접근 에러:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);

      // 비디오 요소 제거
      const container = document.getElementById('camera-container');
      if (container) {
        container.innerHTML = '';
      }
    }
  };

  return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Button
              onClick={startCamera}
              disabled={!!stream}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            카메라 켜기
          </Button>
          {stream && (
              <Button
                  onClick={stopCamera}
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
              >
                카메라 끄기
              </Button>
          )}
        </div>
        {error && (
            <div className="text-sm text-red-500">{error}</div>
        )}
        <div
            id="camera-container"
            className="w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden"
        />
      </div>
  );
}