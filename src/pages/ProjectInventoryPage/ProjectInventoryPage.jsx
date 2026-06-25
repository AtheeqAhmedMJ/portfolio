import React, { useRef, useEffect, useState } from 'react';
import './ProjectInventoryPage.css';
import projects from '/src/assets/data/projects'; 

const ProjectInventoryPage = () => {
  const scrollRef = useRef(null);
  const backgroundRef = useRef(null);
  const [showWind, setShowWind] = useState(false);
  const [imagesVisible, setImagesVisible] = useState(false);
  const windTimeout = useRef(null);
  const observerRef = useRef(null);
    const [showInstructions, setShowInstructions] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 60000); // 1 minute
  
      return () => clearTimeout(timer);
    }, []);

  useEffect(() => {
    let scrollX = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollX += e.deltaY;

      const content = scrollRef.current;
      const maxScroll = content.scrollWidth - window.innerWidth;
      scrollX = Math.max(0, Math.min(scrollX, maxScroll));

      content.style.transform = `translateX(${-scrollX}px)`;

      const totalBgWidth = backgroundRef.current.scrollWidth / 2;
      const bgMove = (scrollX * 0.3) % totalBgWidth;

      backgroundRef.current.style.transform = `translateX(-${bgMove}px)`;

      setShowWind(true);
      clearTimeout(windTimeout.current);
      windTimeout.current = setTimeout(() => setShowWind(false), 500);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Lazy load background and mando image
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImagesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  const generateWindLines = () => {
    if (!showWind) return null;

    return [...Array(10)].map((_, i) => {
      const topPosition = Math.random() * window.innerHeight * 0.9;
      const delay = Math.random() * 0.5;
      const duration = 1 + Math.random() * 1.5;

      return (
        <div
          key={i}
          className="wind-line"
          style={{
            top: `${topPosition}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    });
  };

  return (
    <>
      {generateWindLines()}

      <div className="Barcode-Message-Left">
        YOU HAVE ARRIVED AT<br />
        TATOOINE - PROJECT INVENTORY
      </div>

      <div className={`InstructionsProject ${!showInstructions ? 'hidden' : ''}`}>
        <h2> Scroll Down<br />For More</h2>
      </div>

      <div className="parallax-wrapper" ref={observerRef}>
        <div className="parallax-background" ref={backgroundRef}>
          {imagesVisible && (
            <>
              <img
                src="/Images/Landscape-1.webp"
                alt="Landscape 1"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/Images/Landscape-2.webp"
                alt="Landscape 2"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/Images/Landscape-3.webp"
                alt="Landscape 3"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/Images/Landscape-1.webp"
                alt="Landscape 1 Repeat"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/Images/Landscape-2.webp"
                alt="Landscape 2 Repeat"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/Images/Landscape-3.webp"
                alt="Landscape 3 Repeat"
                loading="lazy"
                decoding="async"
              />
            </>
          )}
        </div>

        <h1 className="Title">PROJECT INVENTORY</h1>

        {imagesVisible && (
          <div className="Mando">
            <img
              src="/Images/Mando-Img.webp"
              alt="Foreground Mando"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <div className="parallax-content" ref={scrollRef}>
          {projects.map((project) => (
            <div key={project.id} className="section">
              <div className="card">
                <h2>Project Title: {project.title}</h2>
                <p><strong>Tech Stack Used:</strong> {project.techStack.join(', ')}</p>
                <p><strong>Summary:</strong> {project.summary}</p>
                <p><strong>Features:</strong></p>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  🔗 View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectInventoryPage;
