import React, { useMemo, useRef, useEffect, useState } from 'react';
import './GraphicDesignSection.css';

const GraphicDesignSection = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use WebP versions for ~90% smaller files
  const imageNames = useMemo(() => [
    'design1.webp',
    'design2.webp',
    'design3.webp',
    'design4.webp',
    'design5.webp',
    'design6.webp',
  ], []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (e.deltaY !== 0) { e.preventDefault(); el.scrollLeft += e.deltaY; }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setCurrentIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToPoster = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="graphic-design-section fade-in">
      <div className="horizontal-scroll-wrapper" ref={scrollRef}>
        {imageNames.map((name, idx) => (
          <div key={idx} className="design-card">
            <img
              src={`/GraphicDesign/${name}`}
              alt={`Design ${idx + 1}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {currentIndex > 0 && (
        <button className="nav-button prev" onClick={() => scrollToPoster(currentIndex - 1)}>←</button>
      )}
      {currentIndex < imageNames.length - 1 && (
        <button className="nav-button next" onClick={() => scrollToPoster(currentIndex + 1)}>→</button>
      )}
    </div>
  );
};

export default GraphicDesignSection;
