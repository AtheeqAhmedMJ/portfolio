import React from 'react';
import './AchievementsPage.css';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import LightsaberCard from '../../components/LightsaberCard/LightsaberCard';

const AchievementsPage = () => {
  return (
    <div className="achievements-page">
      {/* Background Layers */}
      <div className="bg-image" />
      <div className="stars-bg">
        <div className="stars" />
        <div className="stars2" />
        <div className="stars3" />
      </div>

      {/* Navigation */}
      <NavBar />
      <SideBar />

      {/* Barcode Message */}
      <div className="Barcode-Message">
        YOU HAVE ARRIVED AT<br />
        HALL OF HEROES - ACHIEVEMENTS
      </div>

      {/* Page Title */}
      <h1 className="achievements-title">ACHIEVEMENTS</h1>

      {/* Lightsaber Cards */}
      <div className="lightsaber-card-container">
        <LightsaberCard
          title="Leadership & Community Impact"
          videoSrc="/videos/Green-Saber.mp4"
          glowColor="limegreen"
          to="/achievements/leadership"
        />
        <LightsaberCard
          title="Published Author"
          videoSrc="/videos/Blue-Saber.mp4"
          glowColor="deepskyblue"
          to="/achievements/author"
        />
        <LightsaberCard
          title="Awards & Certification"
          videoSrc="/videos/Gold-Saber.mp4"
          glowColor="orange"
          to="/achievements/awards"
        />
      </div>
    </div>
  );
};

export default AchievementsPage;
