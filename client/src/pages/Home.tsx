import { useState, useEffect, useRef } from 'react';
import * as tmImage from '@teachablemachine/image';
import WebcamFeed from '@/components/WebcamFeed';
import ConfidenceMeter from '@/components/ConfidenceMeter';
import GestureCard from '@/components/GestureCard';
import StatsPanel from '@/components/StatsPanel';
import PredictionHistory from '@/components/PredictionHistory';
import ControlPanel from '@/components/ControlPanel';

interface Prediction {
  timestamp: string;
  gesture: string;
  confidence: number;
}

interface GestureConfidence {
  gesture: string;
  confidence: number;
}

const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/BOtrRZ4ho/';

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentGesture, setCurrentGesture] = useState('');
  const [currentConfidence, setCurrentConfidence] = useState(0);
  const [predictions, setPredictions] = useState<GestureConfidence[]>([]);
  const [history, setHistory] = useState<Prediction[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    avgConfidence: 0,
    rate: 0,
  });

  const modelRef = useRef<tmImage.CustomMobileNet | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationFrameRef = useRef<number>();
  const lastGestureRef = useRef('');
  const recognitionCountRef = useRef(0);
  const confidenceSumRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelURL = MODEL_URL + 'model.json';
        const metadataURL = MODEL_URL + 'metadata.json';
        const model = await tmImage.load(modelURL, metadataURL);
        modelRef.current = model;
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, []);

  const predict = async () => {
    if (!modelRef.current || !videoRef.current) return;

    try {
      const predictions = await modelRef.current.predict(videoRef.current);
      
      const formatted: GestureConfidence[] = predictions.map(p => ({
        gesture: p.className,
        confidence: p.probability,
      }));

      formatted.sort((a, b) => b.confidence - a.confidence);
      setPredictions(formatted);

      if (formatted[0].confidence > 0.7) {
        const gesture = formatted[0].gesture;
        const confidence = formatted[0].confidence;

        setCurrentGesture(gesture);
        setCurrentConfidence(confidence);

        if (gesture !== lastGestureRef.current && confidence > 0.8) {
          lastGestureRef.current = gesture;
          recognitionCountRef.current++;
          confidenceSumRef.current += confidence;

          const now = new Date();
          const timestamp = now.toLocaleTimeString('en-US', { hour12: false });
          
          setHistory(prev => [{
            timestamp,
            gesture,
            confidence,
          }, ...prev.slice(0, 9)]);

          if (isSpeechEnabled && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(gesture);
            utterance.rate = 1.2;
            speechSynthesis.speak(utterance);
          }

          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          setStats({
            total: recognitionCountRef.current,
            avgConfidence: confidenceSumRef.current / recognitionCountRef.current,
            rate: recognitionCountRef.current / elapsed,
          });
        }
      }

      animationFrameRef.current = requestAnimationFrame(predict);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  const handleVideoReady = (video: HTMLVideoElement) => {
    videoRef.current = video;
    if (modelRef.current && isCameraActive) {
      startTimeRef.current = Date.now();
      predict();
    }
  };

  const handleToggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    if (!isCameraActive) {
      recognitionCountRef.current = 0;
      confidenceSumRef.current = 0;
      lastGestureRef.current = '';
      startTimeRef.current = Date.now();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  };

  const handleToggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    if (!isSpeechEnabled && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-app-title">
                AI Hand Gesture Recognition
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Real-time sign language detection powered by TensorFlow.js
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <ControlPanel
            isCameraActive={isCameraActive}
            isSpeechEnabled={isSpeechEnabled}
            isDarkMode={isDarkMode}
            onToggleCamera={handleToggleCamera}
            onToggleSpeech={handleToggleSpeech}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <WebcamFeed
                isActive={isCameraActive}
                onVideoReady={handleVideoReady}
                currentGesture={currentGesture}
                confidence={currentConfidence}
              />
              
              <StatsPanel
                totalRecognitions={stats.total}
                averageConfidence={stats.avgConfidence}
                recognitionRate={stats.rate}
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <GestureCard gesture={currentGesture} confidence={currentConfidence} />
              <ConfidenceMeter predictions={predictions} />
              <PredictionHistory predictions={history} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
