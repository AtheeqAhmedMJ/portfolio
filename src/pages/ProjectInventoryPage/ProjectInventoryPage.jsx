import React, { useRef, useEffect, useState } from 'react';
import './ProjectInventoryPage.css';
import projects from '/src/assets/data/projects';
import Landscape1 from '/src/assets/Images/Landscape-1.png';
import Landscape2 from '/src/assets/Images/Landscape-2.png';
import Landscape3 from '/src/assets/Images/Landscape-3.png';
import Mando from '/src/assets/Images/Mando-Img.png';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';

const ProjectInventoryPage = () => {
  const scrollRef = useRef(null);
  const backgroundRef = useRef(null);
  const [showWind, setShowWind] = useState(false);
  const windTimeout = useRef(null);

  useEffect(() => {
    let scrollX = 0;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollX += e.deltaY;

      const content = scrollRef.current;
      const maxScroll = content.scrollWidth - window.innerWidth;
      if (scrollX < 0) scrollX = 0;
      if (scrollX > maxScroll) scrollX = maxScroll;

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
        ></div>
      );
    });
  };

  return (
    <>
      <NavBar />
      <SideBar />
      {generateWindLines()}
          <div className="Barcode-Message1">
           YOU HAVE ARRIVED AT<br />
           TATOOINE - PROJECT INVENTORY
      </div>
      <div className="parallax-wrapper">
        <div className="parallax-background" ref={backgroundRef}>
          <img src={Landscape1} alt="Landscape 1" />
          <img src={Landscape2} alt="Landscape 2" />
          <img src={Landscape3} alt="Landscape 3" />
          <img src={Landscape1} alt="Landscape 1 Duplicate" />
          <img src={Landscape2} alt="Landscape 2 Duplicate" />
          <img src={Landscape3} alt="Landscape 3 Duplicate" />
        </div>
                <h1 className="Title">PROJECT INVENTORY </h1>


        <div className="Mando">
          <img src={Mando} alt="Foreground-Img" />
        </div>

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
