import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';
import SideBar from '../../SideBar/SideBar';
import BackButton from '/src/components/BackButton/BackButton';
import './AwardsCertificationPage.css';

const AwardsCertificationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="achievements-page">
      <div className="bg-image" />
      <div className="stars-bg">
        <div className="stars" />
        <div className="stars2" />
        <div className="stars3" />
      </div>

      <div className="Barcode-Message">
        YOU HAVE ARRIVED AT<br />
        HALL OF HEROES - ACHIEVEMENTS
      </div>

      <BackButton />

      <h1 className="achievements-title">Awards & Certifications</h1>

      <div className="awards-hub-container">
        <div
          className="awards-hub-card awards-hub-card--awards"
          onClick={() => navigate('/achievements/awards/recognition')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/achievements/awards/recognition')}
        >
          <div className="awards-hub-card__glow awards-hub-card__glow--gold" />
          <div className="awards-hub-card__content">
            <span className="awards-hub-card__eyebrow">Hall of Heroes</span>
            <h2 className="awards-hub-card__title">Awards</h2>
            <p className="awards-hub-card__desc">ACE Awards, nominations & recognition for leadership and impact at GITAM.</p>
          </div>
        </div>

        <div
          className="awards-hub-card awards-hub-card--certs"
          onClick={() => navigate('/achievements/awards/certifications')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/achievements/awards/certifications')}
        >
          <div className="awards-hub-card__glow awards-hub-card__glow--orange" />
          <div className="awards-hub-card__content">
            <span className="awards-hub-card__eyebrow">Verified Credentials</span>
            <h2 className="awards-hub-card__title">Certifications</h2>
            <p className="awards-hub-card__desc">Coursera, Udemy, Google, Zscaler — 20 verified certificates across domains.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsCertificationPage;