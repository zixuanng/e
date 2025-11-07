import WebcamFeed from '../WebcamFeed';

export default function WebcamFeedExample() {
  return (
    <WebcamFeed 
      isActive={false}
      currentGesture="Stop"
      confidence={0.92}
    />
  );
}
