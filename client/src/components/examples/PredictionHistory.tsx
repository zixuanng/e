import PredictionHistory from '../PredictionHistory';

export default function PredictionHistoryExample() {
  const mockPredictions = [
    { timestamp: '14:32:45', gesture: 'Stop', confidence: 0.92 },
    { timestamp: '14:32:43', gesture: 'Yes', confidence: 0.88 },
    { timestamp: '14:32:41', gesture: 'OK', confidence: 0.95 },
    { timestamp: '14:32:38', gesture: 'I Love You', confidence: 0.79 },
    { timestamp: '14:32:35', gesture: 'No', confidence: 0.84 },
  ];

  return <PredictionHistory predictions={mockPredictions} />;
}
