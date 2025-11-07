import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsPanelProps {
  totalRecognitions: number;
  averageConfidence: number;
  recognitionRate: number;
}

export default function StatsPanel({ totalRecognitions, averageConfidence, recognitionRate }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card data-testid="card-total-recognitions">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Recognitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" data-testid="text-total-recognitions">{totalRecognitions}</div>
          <p className="text-xs text-muted-foreground mt-1">Gestures detected</p>
        </CardContent>
      </Card>

      <Card data-testid="card-avg-confidence">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" data-testid="text-avg-confidence">
            {Math.round(averageConfidence * 100)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">Prediction accuracy</p>
        </CardContent>
      </Card>

      <Card data-testid="card-recognition-rate">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Recognition Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" data-testid="text-recognition-rate">
            {recognitionRate.toFixed(1)}/s
          </div>
          <p className="text-xs text-muted-foreground mt-1">Detections per second</p>
        </CardContent>
      </Card>
    </div>
  );
}
