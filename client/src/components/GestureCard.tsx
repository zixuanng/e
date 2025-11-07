import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hand } from 'lucide-react';

interface GestureCardProps {
  gesture: string;
  confidence: number;
}

const gestureEmojis: Record<string, string> = {
  'Yes': '👍',
  'No': '👎',
  'Stop': '✋',
  'OK': '👌',
  'I Love You': '🤟',
};

export default function GestureCard({ gesture, confidence }: GestureCardProps) {
  return (
    <Card className="hover-elevate" data-testid="card-current-gesture">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl" data-testid="text-gesture-emoji">
            {gestureEmojis[gesture] || <Hand className="w-16 h-16 text-muted-foreground" />}
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold" data-testid="text-gesture-name">{gesture || 'No Gesture'}</h3>
            <Badge variant="secondary" className="text-lg px-4 py-1" data-testid="badge-gesture-confidence">
              {Math.round(confidence * 100)}% Confident
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
