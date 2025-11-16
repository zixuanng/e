import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, CameraOff, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface ControlPanelProps {
  isCameraActive: boolean;
  isSpeechEnabled: boolean;
  onToggleCamera: () => void;
  onToggleSpeech: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function ControlPanel({
  isCameraActive,
  isSpeechEnabled,
  onToggleCamera,
  onToggleSpeech,
  isDarkMode = false,
  onToggleDarkMode,
}: ControlPanelProps) {
  return (
    <Card data-testid="card-control-panel">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant={isCameraActive ? 'destructive' : 'default'}
            onClick={onToggleCamera}
            data-testid="button-toggle-camera"
            className="min-w-[160px]"
          >
            {isCameraActive ? (
              <>
                <CameraOff className="mr-2 h-5 w-5" />
                Stop Camera
              </>
            ) : (
              <>
                <Camera className="mr-2 h-5 w-5" />
                Start Camera
              </>
            )}
          </Button>

          <Button
            size="lg"
            variant={isSpeechEnabled ? 'default' : 'outline'}
            onClick={onToggleSpeech}
            disabled={!isCameraActive}
            data-testid="button-toggle-speech"
            className="min-w-[160px]"
          >
            {isSpeechEnabled ? (
              <>
                <Volume2 className="mr-2 h-5 w-5" />
                Speech On
              </>
            ) : (
              <>
                <VolumeX className="mr-2 h-5 w-5" />
                Speech Off
              </>
            )}
          </Button>

          {onToggleDarkMode && (
            <Button
              size="lg"
              variant="outline"
              onClick={onToggleDarkMode}
              data-testid="button-toggle-theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
