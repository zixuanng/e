import { useState } from 'react';
import ControlPanel from '../ControlPanel';

export default function ControlPanelExample() {
  const [cameraActive, setCameraActive] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ControlPanel
      isCameraActive={cameraActive}
      isSpeechEnabled={speechEnabled}
      isDarkMode={darkMode}
      onToggleCamera={() => {
        setCameraActive(!cameraActive);
        console.log('Camera toggled:', !cameraActive);
      }}
      onToggleSpeech={() => {
        setSpeechEnabled(!speechEnabled);
        console.log('Speech toggled:', !speechEnabled);
      }}
      onToggleDarkMode={() => {
        setDarkMode(!darkMode);
        console.log('Dark mode toggled:', !darkMode);
      }}
    />
  );
}
