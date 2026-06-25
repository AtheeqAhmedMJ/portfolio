import React, { useEffect, useRef, useState } from 'react';
import './ProwessBackground.css';

const ProwessBackground = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const snowContainerRef = useRef(null);
  const bgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/Images/XwingBackground.webp'; 
    img.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowImages(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Snowflake logic
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

  // Animate drifting background
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
    <div className="prowess-background-container" ref={containerRef}>
      {bgLoaded && (
        <img
          ref={bgRef}
          src="/Images/XwingBackground.webp" 
          alt="XwingBG"
          className="xwing-bg"
          loading="lazy"
          decoding="async"
        />
      )}

      {showImages && (
        <img
          src="/Images/Xwing.webp" // ✅ Corrected path
          alt="Xwing"
          className="xwing-foreground"
          loading="lazy"
          decoding="async"
        />
      )}

      <div ref={snowContainerRef} className="snow-container" />
    </div>
  );
};

export default ProwessBackground;
