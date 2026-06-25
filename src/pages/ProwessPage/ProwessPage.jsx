import React, { useEffect, useState } from 'react';
import ProwessBackground from '../../components/Backgrounds/ProwessBackground';
import './ProwessPage.css';
import prowess from '/src/assets/data/prowess';

const ProwessPage = () => {
  const allCategories = prowess.flatMap(section => section.categories || []);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ProwessBackground />
      <div className="Barcode-Message-Right">
        YOU HAVE ARRIVED AT<br />
        PLANET HOTH - PROWESS
      </div>
      <h1 className="title">PROWESS</h1>

      <div className={`Instructions ${!showInstructions ? 'hidden' : ''}`}>
        <h2> Scroll Down<br />For More</h2>
      </div>

      <div className="single-prowess-wrapper">
        <div className="single-prowess-card">
          <h2 className="prowess-title">MY SKILLS & EXPERTISE</h2>
          <div className="prowess-scroll-container">
            {allCategories.map((category, idx) => (
              <div key={idx} className="prowess-category">
                <h3 className="category-label">{category.label}</h3>
                <ul className="category-list">
                  {category.items.map((item, i) => (
                    <li key={i} className="category-item">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProwessPage;
