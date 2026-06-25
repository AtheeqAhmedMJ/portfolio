import { useRef, useState, useEffect } from 'react';
import './Music.css';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function Music() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = volume;
      audio.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleFirstClick = () => {
      const audio = audioRef.current;
      if (audio && !hasAutoTriggered && !isPlaying) {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setHasAutoTriggered(true);
          })
          .catch((err) => console.warn('Autoplay failed:', err));
      }
    };

    window.addEventListener('mousedown', handleFirstClick);

    return () => {
      window.removeEventListener('mousedown', handleFirstClick);
    };
  }, [hasAutoTriggered, isPlaying]);

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasAutoTriggered(true);
        })
        .catch((err) => console.warn('Play failed:', err));
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      const newMuted = !isMuted;
      audio.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVol;
      if (newVol === 0) {
        audio.muted = true;
        setIsMuted(true);
      } else {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <>
      <div className="music-trigger-area" />

      <div className="music-control-panel">
        {isPlaying ? (
          <button onClick={handlePause}>
            <FaPause />
          </button>
        ) : (
          <button onClick={handlePlay}>
            <FaPlay />
          </button>
        )}
        <button onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          className="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>

      <audio ref={audioRef} src="./Audio/Theme.mp3" />
    </>
  );
}
