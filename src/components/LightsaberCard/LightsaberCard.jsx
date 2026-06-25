import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LightsaberCard.css';

const LightsaberCard = ({ title, videoSrc, glowColor, to }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    if (to) navigate(to);
  };

  const handleLoaded = () => {
    setLoading(false);
  };

  return (
    <div
      className="lightsaber-card"
      style={{ boxShadow: `0 0 20px ${glowColor}`, cursor: 'pointer' }}
      onClick={handleClick}
    >
      {loading && (
        <div
          className="video-spinner"
          style={{ borderTopColor: glowColor }}
        ></div>
      )}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="lightsaber-video"
        onLoadedData={handleLoaded}
      />
      <div className="lightsaber-title" style={{ color: glowColor }}>
        {title}
      </div>
    </div>
  );
};

export default LightsaberCard;
