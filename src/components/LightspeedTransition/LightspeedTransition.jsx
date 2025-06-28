import { useEffect, useRef, useState } from 'react';
import './LightspeedTransition.css';

const LightspeedTransition = ({ children }) => {
  const videoRef = useRef(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [fadeOutVideo, setFadeOutVideo] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const navType =
      performance.getEntriesByType("navigation")[0]?.type ||
      performance.navigation?.type;

    const isReloadOrInitial =
      navType === 'reload' || navType === 'navigate' || navType === 0;

    if (isReloadOrInitial && window.location.pathname === '/') {
      setShouldPlay(true);
    } else {
      setShowContent(true);
    }
  }, []);

  const handleMouseEnter = () => {
    if (hasStarted || !shouldPlay) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.currentTime = 0;

    video.play().then(() => {
      setHasStarted(true);
      video.addEventListener('ended', () => {
        setFadeOutVideo(true);
        setTimeout(() => setShowContent(true), 500); // match fade duration
      });
    }).catch((err) => {
      console.warn("Playback failed on mouse interaction:", err);
      setShowContent(true);
    });
  };

  return (
    <div className="page-wrapper" onMouseEnter={handleMouseEnter}>
      {shouldPlay && !showContent && (
        <video
          ref={videoRef}
          className={`lightspeed-video ${fadeOutVideo ? 'fade-out' : ''}`}
          src="/videoList/HyperSpeed.mp4"
          type="video/mp4"
          playsInline
          preload="auto"
          // autoplay removed: we want to trigger it manually
        />
      )}
      {showContent && <div className="page-content">{children}</div>}
    </div>
  );
};

export default LightspeedTransition;
