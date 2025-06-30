import React from 'react';
import './AchievementsPage.css';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import LightsaberCard from '../../components/LightsaberCard/LightsaberCard';

const AchievementsPage = () => {
  return (
    <div className="achievements-page">
      <div className="bg-image" />
      <div className="stars-bg">
        <div className="stars" />
        <div className="stars2" />
        <div className="stars3" />
      </div>

      <NavBar />
      <SideBar />

      <h1 className="achievements-title">ACHIEVEMENTS</h1>

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
          <div className="Barcode-Message">
           YOU HAVE ARRIVED AT<br />
           HALL OF HEROES - ACHIEVEMENTS
      </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
