import React, { useEffect, useRef } from 'react';
import './ProwessBackground.css';
import Xwing from '/src/assets/Images/Xwing.png';
import XwingBG from '../../assets/Images/XwingBG.png'; 

const ProwessBackground = () => {
  const snowContainerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const snowContainer = snowContainerRef.current;

    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      const size = Math.random() * 4 + 2;
      const left = Math.random() * window.innerWidth;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.3 + 0.7;

      snowflake.style.left = `${left}px`;
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.animationDuration = `${duration}s`;
      snowflake.style.animationDelay = `${delay}s`;
      snowflake.style.opacity = opacity;

      snowContainer.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, (duration + delay) * 1000);
    };

    const snowInterval = setInterval(() => {
      for (let i = 0; i < 10; i++) {
        createSnowflake();
      }
    }, 200);

    return () => clearInterval(snowInterval);
  }, []);

  useEffect(() => {
    let xPos = 0;
    let direction = 1;
    const maxShift = 50;
    const speed = 0.1; 

    const animateBackground = () => {
      xPos += speed * direction;

      if (xPos >= maxShift || xPos <= -maxShift) {
        direction *= -1; 
      }

      if (bgRef.current) {
        bgRef.current.style.transform = `translateX(${xPos}px)`;
      }

      requestAnimationFrame(animateBackground);
    };

    animateBackground();
  }, []);

  return (
    <div className="prowess-background-container">
      <img
        ref={bgRef}
        src={XwingBG}
        alt="XwingBG"
        className="xwing-bg"
      />

      <img
        src={Xwing}
        alt="Xwing"
        className="xwing-foreground"
      />

      <div ref={snowContainerRef} className="snow-container"></div>
    </div>
  );
};

export default ProwessBackground;
