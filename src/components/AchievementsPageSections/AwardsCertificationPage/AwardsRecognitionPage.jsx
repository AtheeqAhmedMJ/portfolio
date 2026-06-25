import React from 'react';
import NavBar from '../../NavBar/NavBar';
import SideBar from '../../SideBar/SideBar';
import AwardImage from '/src/assets/Images/Award.webp';
import BackButton from '/src/components/BackButton/BackButton';
import './AwardsCertificationPage.css';

const AwardsRecognitionPage = () => {
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

      <NavBar />
      <SideBar />
      <BackButton />

      <h1 className="achievements-title">Awards</h1>

      {/* ── All content lives inside the scrollable card ── */}
      <div className="orange-holo-card">

        <p className="achievement-detail-text">
          Recognition isn't just about achievement — it's about impact, persistence, and
          consistency. These awards represent not only what I've done, but how I've done
          it: through collaboration, creativity, and leadership.
        </p>

        {/* Nominee card */}
        <div className="award-item-card">
          <div className="award-item-card__badge award-item-card__badge--nominee">
            NOMINEE
          </div>
          <div className="award-item-card__body">
            <h3 className="award-item-card__title">
              Achiever of the Year — ACE Awards '23
            </h3>
            <p className="award-item-card__desc">
              Recognized for consistent contributions to leadership, community engagement,
              and student innovation at GITAM.
            </p>
          </div>
        </div>

        {/* Winner card */}
        <div className="award-item-card">
          <div className="award-item-card__badge award-item-card__badge--winner">
            WINNER
          </div>
          <div className="award-item-card__body">
            <h3 className="award-item-card__title">
              Best Club of the Year — ACE Awards '23
            </h3>
            <p className="award-item-card__desc">
              As Acting President and Non-Tech Admin of CodeX, I led the campaign and
              documentation that secured this win — highlighting a year of meaningful
              tech initiatives and collaboration.
            </p>
            <a
              href="https://www.linkedin.com/posts/atheeq-ahmed-82193b26a_its-not-only-about-the-memories-you-make-activity-7199835798404276225-H23s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEH9jdkBP2ugyJtMvMCMEY9XTfDTVYt3hsI"
              target="_blank"
              rel="noopener noreferrer"
              className="award-item-card__link"
            >
              Read the story on LinkedIn →
            </a>
          </div>
        </div>

        {/* Award photo — inside the card, scrollable to */}
        <div className="award-cert-image-wrap">
          <img
            src={AwardImage}
            alt="ACE Award Ceremony"
            className="award-cert-image"
          />
        </div>

      </div>
    </div>
  );
};

export default AwardsRecognitionPage;