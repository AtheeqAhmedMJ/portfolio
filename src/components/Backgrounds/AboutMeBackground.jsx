import React, { useState, useEffect } from 'react';
import backgroundImg from '/src/assets/Images/Mil-Landscape.png';
import spaceshipImg from '/src/assets/Images/Milinium-Falcon.png';
import glow from "/src/assets/Images/glow.png";

const AboutMeBackground = () => {
  const [setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: '105%',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      animation: 'backgroundDrift 15s ease-in-out infinite'
    }}>
      <img 
        src={spaceshipImg} 
        alt="Spaceship" 
        style={{
          position: 'absolute',
          top: '50%',
          left: '75%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          pointerEvents: 'none',
          animation: 'float 4s ease-in-out infinite',
          zIndex: 2
        }} 
      />
      <img 
        src={glow} 
        alt="Thruster Glow" 
        style={{
          position: 'absolute',
          top: '72%',
          left: '82%',
          transform: 'translate(-70%, -90%) scale(1) rotate(33deg)',
          width: '300px',
          pointerEvents: 'none',
          animation: 'glowPulse 2s ease-in-out infinite, float 4s ease-in-out infinite',
          zIndex: 1
        }} 
      />
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
        }

        @keyframes glowPulse {
          0% { opacity: 0.2; transform: translate(-50%, -50%) scale(0.8); filter: blur(2px); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); filter: blur(5px); }
          100% { opacity: 0.2; transform: translate(-50%, -50%) scale(0.8); filter: blur(2px); }
        }

        @keyframes backgroundDrift {
          0% { background-position: 50% 50%; }
          25% { background-position: 53% 47%; }
          50% { background-position: 50% 53%; }
          75% { background-position: 47% 47%; }
          100% { background-position: 50% 50%; }
        }
      `}</style>
    </div>
  );
};

export default AboutMeBackground;
