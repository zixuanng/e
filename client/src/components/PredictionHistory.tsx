import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Prediction {
  timestamp: string;
  gesture: string;
  confidence: number;
}

interface PredictionHistoryProps {
  predictions: Prediction[];
}

export default function PredictionHistory({ predictions }: PredictionHistoryProps) {
  return (
    <Card data-testid="card-prediction-history">
      <CardHeader>
        <CardTitle>Recent Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {predictions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8" data-testid="text-no-predictions">
                No predictions yet
              </p>
            ) : (
              predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/50 hover-elevate"
                  data-testid={`prediction-item-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground" data-testid={`text-timestamp-${index}`}>
                      {prediction.timestamp}
                    </span>
                    <span className="font-medium" data-testid={`text-gesture-${index}`}>
                      {prediction.gesture}
                    </span>
                  </div>
                  <Badge variant="secondary" data-testid={`badge-confidence-${index}`}>
                    {Math.round(prediction.confidence * 100)}%
                  </Badge>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
