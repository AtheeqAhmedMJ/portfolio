import React, { useMemo, useRef, useEffect, useState } from 'react';
import './GraphicDesignSection.css';

const GraphicDesignSection = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageNames = useMemo(() => [
    'design1.jpeg',
    'design2.jpeg',
    'design3.jpeg',
    'design4.jpeg'
  ], []);

  // Enable horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Update index on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const newIndex = Math.round(el.scrollLeft / el.clientWidth);
      setCurrentIndex(newIndex);
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to a specific poster
  const scrollToPoster = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollX = index * el.clientWidth;
    el.scrollTo({ left: scrollX, behavior: 'smooth' });
  };

  return (
    <div className="graphic-design-section fade-in">
      <div className="horizontal-scroll-wrapper" ref={scrollRef}>
        {imageNames.map((name, idx) => (
          <div key={idx} className="design-card">
            <img src={`/GraphicDesign/${name}`} alt={`Design ${idx + 1}`} />
          </div>
        ))}
      </div>

      {/* Prev Button - visible only after first poster */}
      {currentIndex > 0 && (
        <button className="nav-button prev" onClick={() => scrollToPoster(currentIndex - 1)}>
          ←
        </button>
      )}

      {/* Next Button - visible only if not last */}
      {currentIndex < imageNames.length - 1 && (
        <button className="nav-button next" onClick={() => scrollToPoster(currentIndex + 1)}>
          →
        </button>
      )}
    </div>
  );
};

export default GraphicDesignSection;
