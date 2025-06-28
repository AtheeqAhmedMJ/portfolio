import { useEffect, useRef, useState } from 'react';
import './Music.css';

export default function Music() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    let fadeInInterval = null;

    const startAudioWithFade = () => {
      if (!audio) return;

      // Start silent
      audio.volume = 0;
      audio.loop = true;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            let fadeDuration = 3000; // 3 sec fade-in
            let steps = 60;
            let maxVolume = 0.3;
            let step = 0;

            fadeInInterval = setInterval(() => {
              step++;
              audio.volume = Math.min((step / steps) * maxVolume, maxVolume);
              if (step >= steps) clearInterval(fadeInInterval);
            }, fadeDuration / steps);
          })
          .catch((err) => console.warn('Autoplay blocked:', err));
      }
    };

    // Delay actual start by 12s
    const delayTimer = setTimeout(() => {
      startAudioWithFade();
    }, 12000);

    // Listen for other media starting to play — pause our music
    const handlePlay = (event) => {
      if (event.target !== audio && !audio.paused) {
        audio.pause();
      }
    };

    document.addEventListener('play', handlePlay, true);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(fadeInInterval);
      document.removeEventListener('play', handlePlay, true);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="./Audio/Theme.mp3" />
      <button className="music-toggle-btn" onClick={toggleMute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </>
  );
}
