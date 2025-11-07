import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface GestureConfidence {
  gesture: string;
  confidence: number;
}

interface ConfidenceMeterProps {
  predictions: GestureConfidence[];
}

export default function ConfidenceMeter({ predictions }: ConfidenceMeterProps) {
  return (
    <Card data-testid="card-confidence-meter">
      <CardHeader>
        <CardTitle>Confidence Levels</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="space-y-2" data-testid={`confidence-item-${index}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" data-testid={`text-gesture-${index}`}>
                {prediction.gesture}
              </span>
              <span className="text-sm font-mono text-muted-foreground" data-testid={`text-percentage-${index}`}>
                {Math.round(prediction.confidence * 100)}%
              </span>
            </div>
            <Progress 
              value={prediction.confidence * 100} 
              className="h-3"
              data-testid={`progress-${index}`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
