import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PulseLoader } from 'react-spinners';
import './VideoEditingSection.css';

const videoList = [
  {
    url: 'https://ia902902.us.archive.org/11/items/codex-video-final-enhanced/CODEX%20VIDEO%20FINAL%28ENHANCED%29.mp4',
    label: 'CODEX Final Enhanced',
  },
  {
    url: 'https://ia600908.us.archive.org/14/items/code-x-life-animated/CodeX%20Life%20Animated.mp4',
    label: 'CODE-X Life Animated',
  },
  {
    url: 'https://archive.org/download/edit-03/Edit-03.mp4',
    label: 'Edit 03',
  },
  {
    url: 'https://archive.org/download/edit-04/Edit-04.mp4',
    label: 'Edit 04',
  },
];


const VideoEditingSection = () => {
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentVideo = useMemo(() => videoList[currentIndex], [currentIndex]);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
    setIsLoading(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
    setIsLoading(true);
  }, []);

  const handleVideoReady = () => {
    setIsLoading(false);
  };

  return (
    <div className="video-editing-section">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        WORKS
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Video Editing Projects
      </motion.p>

      <div className="video-player-container">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loader"
              className="loading-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PulseLoader color="#00baff" size={10} />
              <p className="loading-text">Loading video... this may take a few seconds.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.video
          key={currentVideo.url}
          ref={videoRef}
          width="640"
          controls
          preload="metadata"
          onCanPlayThrough={handleVideoReady}
          style={{ display: isLoading ? 'none' : 'block' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <source src={currentVideo.url} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        <motion.p
          className="video-filename"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {currentVideo.label}
        </motion.p>

        <p className="video-help">
          Having trouble loading?{' '}
          <a href={currentVideo.url} target="_blank" rel="noopener noreferrer">
            Click here to open the video directly.
          </a>
        </p>

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
