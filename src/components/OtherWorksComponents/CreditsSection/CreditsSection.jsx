import React from 'react';
import './CreditsSection.css';

const CreditsPage = () => {
  return (
    <div className="credits-container">
      <div className="crawl-wrapper">
        <div className="crawl">
          <h1 className="crawl-title">EPISODE IX<br/>THE FINAL DEPLOY</h1>
          <p>Directed by Mohamed Atheeq Ahmed</p>
          <p>Visuals by The Summarists</p>
          <p>Developed using React, Three.js, and pure Force</p>
          <p>Starship rendered using Galactic Fiber Protocol</p>
          <p>Special Thanks to Chatty, Ace, and the entire crew</p>
          <p>May your journey through this portfolio be immersive</p>
          <p>And as always... May the Code Be With You.</p>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;