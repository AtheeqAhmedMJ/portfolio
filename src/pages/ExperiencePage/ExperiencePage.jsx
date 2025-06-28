import React, { useEffect, useRef, useState } from 'react';
import './ExperiencePage.css';
import experiences from '../../assets/data/experiences';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import MillenniumFalconImage from '../../assets/Images/TopViewMillenniumFalcon.png';

const ExperiencePage = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.height = '';
    };
  }, []);

  return (
    <div className="experience-page">
      <div className="bg-image-scroll" />
<div className="stars-bg">
  <div className="nebula-layer"></div>
  <div className="stars"></div>
  <div className="stars2"></div>
  <div className="stars3"></div>
  <div className="stars-twinkle"></div>
  <div className="shooting-stars">
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
    <div className="shooting-star"></div>
  </div>
</div>
      <NavBar />
      <SideBar />
      <div className="Barcode-Message">
           YOU HAVE ARRIVED AT A<br />
           GALAXY FAR FAR AWAY - EXPERIENCE
      </div>
<img className="TopViewMillennium" src={MillenniumFalconImage} alt="Millennium Falcon Top View" />


      <div className="experience-container timeline-wrapper">
        <h1 className="title">EXPERIENCE</h1>

        <div className="timeline-center-line">
          {experiences.map((experience, index) => {
            const extractedYear = experience.duration.match(/\b(20\d{2})\b/)?.[0] || 'Year';
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`timeline-entry ${isLeft ? 'left' : 'right'}`}
              >
                <div className="timeline-node">
                  <div className="timeline-year">{extractedYear}</div>
                </div>

                <div
                  className={`experience-card timeline-card ${
                    visibleCards.includes(index) ? 'visible' : ''
                  }`}
                  data-index={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                >
                  <div className="card-header">
                    <h2 className="role-title">{experience.role}</h2>
                    <h3 className="company-name">@ {experience.company}</h3>
                    <span className="duration-badge">{experience.duration}</span>
                  </div>

                  <div className="card-content">
                    <h4 className="section-title">Responsibilities & Highlights:</h4>
                    <ul className="description-list">
                      {experience.description?.map((point, idx) => (
                        <li key={idx} className="description-item">
                          <span className="bullet">▸</span>
                          <span className="desc-text">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    
  );
};

export default ExperiencePage;
