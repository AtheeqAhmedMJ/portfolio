import React, { useRef, useState, useMemo } from 'react';
import './VideoEditingSection.css';

const VideoEditingSection = () => {
  const videoRef = useRef();

  const videoUrls = useMemo(() => {
    const filenames = ['Edit-01.mp4', 'Edit-02.mp4','Edit-03.mp4','Edit-04.mp4']; 
    return filenames.map(name => `/videoList/${name}`);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % videoUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + videoUrls.length) % videoUrls.length);
  };

  return (
    <div className="video-editing-section">
      <h2>WORKS</h2>
      <p>Video Editing Projects</p>

      <div className="video-player-container">
        {videoUrls.length > 0 ? (
          <>
            <video
              key={videoUrls[currentIndex]}
              ref={videoRef}
              width="640"
              controls
            >
              <source src={videoUrls[currentIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="video-filename">
              {videoUrls[currentIndex].split('/').pop()}
            </p>
          </>
        ) : (
          <p>No videos found.</p>
        )}

        <div className="controls">
          <button onClick={handlePrev}>⏮ Previous</button>
          <button onClick={handlePlayPause}>⏯ Play / Pause</button>
          <button onClick={handleNext}>⏭ Next</button>
        </div>
      </div>
    </div>
  );
};

export default VideoEditingSection;
