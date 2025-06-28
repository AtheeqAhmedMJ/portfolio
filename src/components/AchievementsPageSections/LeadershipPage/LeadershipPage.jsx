import React from 'react';
import NavBar from '../../NavBar/NavBar';
import SideBar from '../../SideBar/SideBar';
import './LeadershipPage.css';

const LeadershipPage = () => {
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

      <h1 className="achievements-title">Leadership & Community Impact</h1>

      <div className="green-holo-card">
        <p className="achievement-detail-text">
          My leadership journey at GITAM has been centered around CodeX — the university’s flagship technical club — where I served as App Development Lead and later as Acting President & Non-Tech Admin. These roles allowed me to drive initiatives that elevated student-led learning, collaboration, and innovation on campus.
        </p>

        <ul className="achievement-detail-list">
          <li>Organized workshops like <em>“OOPs, It's Java”</em>, <em>IoT Bootcamp</em>, and the <em>Web-Series</em>.</li>
          <li>Led <strong>Code-a-thon</strong>, GITAM’s largest competitive programming event.</li>
          <li>Helped engineer the backend for the <em>VMN App</em> to support student ventures using Spring Boot.</li>
          <li>Mentored SIH teams and built a live mentor-matching portal for the hackathon.</li>
          <li>Designed gamified booths at Esperanza,The impact and success of the club recognized by the Pro-Vice Chancellor.</li>
          <li>Delivered logic-programming hybrids during <em>Code n Math</em> (GUSAC Carnival).</li>
        </ul>

        <p className="achievement-detail-text">
          In 2024, I led the nomination and documentation campaign that won CodeX the <strong>Best Club Award</strong> at <em>GITAM ACE Awards '24</em>. This involved aligning our impact with institutional values and presenting a compelling narrative to university leadership.
        </p>

        <ul className="achievement-detail-list">
          <li>Drafted official award documentation and reports on behalf of the club.</li>
          <li>Directed content for LinkedIn, campaign visuals, and outreach strategy.</li>
          <li>Maintained digital storytelling through CodeX’s LinkedIn presence.</li>
          <li>Mentored junior core members and transitioned best practices forward.</li>
        </ul>

        <p className="achievement-detail-text">
          These experiences reflect my commitment to building a strong, inclusive tech community — driven by collaboration, creativity, and consistency.
        </p>
      </div>
    </div>
  );
};

export default LeadershipPage;
