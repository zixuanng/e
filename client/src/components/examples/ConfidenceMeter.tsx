import ConfidenceMeter from '../ConfidenceMeter';

export default function ConfidenceMeterExample() {
  const mockPredictions = [
    { gesture: 'Stop', confidence: 0.92 },
    { gesture: 'Yes', confidence: 0.45 },
    { gesture: 'No', confidence: 0.23 },
    { gesture: 'OK', confidence: 0.12 },
    { gesture: 'I Love You', confidence: 0.08 },
  ];

  return <ConfidenceMeter predictions={mockPredictions} />;
}
