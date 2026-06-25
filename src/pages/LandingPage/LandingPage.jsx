import { useEffect, useState } from 'react';
import LandingBackground from '../../components/Backgrounds/LandingBackground';
import './LandingPage.css';

export default function LandingPage() {
  const [showOverlay, setShowOverlay] = useState(true);
 
  useEffect(() => {
    const timeout = setTimeout(() => setShowOverlay(false), 1800);
    return () => clearTimeout(timeout);
  }, []);
 
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {showOverlay && <div className="fade-in-overlay"></div>}
      <LandingBackground />
     
      <h1 className="Main-Title">ATHEEQ AHMED MJ</h1>
      <h2 className="Subtitle">A DEVELOPER | STORYTELLER</h2>
      <div className="Barcode-Message1">
           YOU HAVE REACHED<br />
           HOME BASE - DEATH STAR
      </div>
    </div>
  );
}