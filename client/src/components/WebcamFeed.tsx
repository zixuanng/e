import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WebcamFeedProps {
  isActive: boolean;
  onVideoReady?: (video: HTMLVideoElement) => void;
  currentGesture?: string;
  confidence?: number;
}

export default function WebcamFeed({ isActive, onVideoReady, currentGesture, confidence }: WebcamFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isActive && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 640, height: 480 } })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
              if (onVideoReady && videoRef.current) {
                onVideoReady(videoRef.current);
              }
            };
          }
        })
        .catch((err) => {
          setError('Camera access denied. Please allow camera permissions.');
          console.error('Camera error:', err);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isActive]);

  const shouldPulse = confidence && confidence > 0.8;

  return (
    <Card 
      className={`relative overflow-hidden ${shouldPulse ? 'ring-2 ring-primary animate-pulse' : ''}`}
      data-testid="webcam-container"
    >
      <div className="relative aspect-[4/3] bg-muted">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <p className="text-center text-muted-foreground" data-testid="text-error">{error}</p>
          </div>
        ) : !isActive ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground" data-testid="text-inactive">Camera Inactive</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
            data-testid="video-feed"
          />
        )}
        
        {currentGesture && confidence && confidence > 0.5 && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold" data-testid="text-current-gesture">{currentGesture}</span>
              <Badge variant="secondary" data-testid="badge-confidence">
                {Math.round(confidence * 100)}%
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
