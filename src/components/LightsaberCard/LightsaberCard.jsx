import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LightsaberCard.css';

const LightsaberCard = ({ title, videoSrc, glowColor, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
  };

  return (
    <div
      className="lightsaber-card"
      style={{ boxShadow: `0 0 20px ${glowColor}`, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="lightsaber-video"
      />
      <div className="lightsaber-title" style={{ color: glowColor }}>
        {title}
      </div>
    </div>
  );
};

export default LightsaberCard;
