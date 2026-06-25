import React, { useEffect, useState, useRef } from 'react';

const AboutMeBackground = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [imagesVisible, setImagesVisible] = useState(false);
  const containerRef = useRef(null);

  // Lazy-load background image
  useEffect(() => {
    const img = new Image();
    img.src = '/Images/Mil-Landscape.webp'; // ✅ Corrected path
    img.onload = () => setBgLoaded(true);
  }, []);

  // Lazy-load spaceship & glow using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImagesVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="about-bg"
      ref={containerRef}
      style={{
        backgroundImage: bgLoaded
          ? 'url(/Images/Mil-Landscape.webp)' // ✅ Corrected path
          : 'none',
      }}
    >
      {imagesVisible && (
        <>
          <img
            src="/Images/Milinium-Falcon.webp" // ✅ Corrected path
            alt="Spaceship"
            className="spaceship"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/Images/glow.webp" // ✅ Corrected path
            alt="Thruster Glow"
            className="thruster-glow"
            loading="lazy"
            decoding="async"
          />
        </>
      )}

      <style>{`
        .about-bg {
          width: 100vw;
          height: 100vh;
          background: center / 105% no-repeat;
          position: relative;
          overflow: hidden;
          animation: backgroundDrift 15s ease-in-out infinite;
        }

        .spaceship {
          position: absolute;
          top: 50%;
          left: 75%;
          transform: translate(-50%, -50%);
          width: clamp(200px, 45vw, 600px);
          pointer-events: none;
          animation: float 4s ease-in-out infinite;
          z-index: 2;
          will-change: transform;
        }

        .thruster-glow {
          position: absolute;
          top: 63%;
          left: 82%;
          transform: translate(-70%, -90%) rotate(33deg);
          width: clamp(80px, 15vw, 300px);
          pointer-events: none;
          animation: glowPulse 2s ease-in-out infinite, float 4s ease-in-out infinite;
          z-index: 1;
          will-change: transform, opacity, filter;
        }

        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
          100% { transform: translate(-50%, -50%) translateY(0); }
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

        @media (max-width: 1023px) {
          .about-bg {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMeBackground;
