import React from 'react';
import NavBar from '../../NavBar/NavBar';
import SideBar from '../../SideBar/SideBar';
import AwardImage from '/src/assets/Images/Award.png'; // ✅ Assuming public alias works
import './AwardsCertificationPage.css';

const AwardsCertificationPage = () => {
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

      <h1 className="achievements-title">Awards & Certifications</h1>

      <div className="orange-holo-card">
        <p className="achievement-detail-text">
          Recognition isn’t just about achievement — it’s about impact, persistence, and consistency. These awards represent not only what I’ve done, but how I’ve done it: through collaboration, creativity, and leadership.
        </p>

        <ul className="achievement-detail-list">
          <li>
            <strong>Nominated – Achiever of the Year (ACE Awards ’23)</strong><br />
            Recognized for my consistent contributions to leadership, community engagement, and student innovation at GITAM.
          </li>

          <li>
            <strong>Winner – Best Club of the Year (ACE Awards ’23)</strong><br />
            As Acting President and Non-Tech Admin of CodeX, I led the campaign and documentation that secured this win — highlighting a year of meaningful tech initiatives and collaboration.
            <br />
            <a
              href="https://www.linkedin.com/posts/atheeq-ahmed-82193b26a_its-not-only-about-the-memories-you-make-activity-7199835798404276225-H23s?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEH9jdkBP2ugyJtMvMCMEY9XTfDTVYt3hsI"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Ovo',
                color: '#FFDE93',
                textDecoration: 'underline',
                fontSize: '15px',
                display: 'inline-block',
                marginTop: '6px'
              }}
            >
              Read the story on LinkedIn →
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={AwardImage}
            alt="ACE Award Certificate"
            style={{
              width: '540px',
              marginBottom: '16px',
              borderRadius: '12px',
              boxShadow: '0 0 14px 4px rgba(255, 140, 0, 0.5)' // Orange glow
            }}
          />

          <h3 style={{ color: '#FFDE93', fontFamily: 'Geo', marginTop: '20px' }}>Certifications</h3>

          <ul className="achievement-detail-list">
            <li><strong>AI-ML Virtual Internship</strong> – EduSkills, AICTE, Google Developers (Jan–Mar 2024)</li>
            <li><strong>Android Developer Virtual Internship</strong> – EduSkills, AICTE, Google Developers (Sep–Nov 2023)</li>
            <li>
              <strong>Deep Learning for Object Detection</strong> – MathWorks, Coursera (Mar 13, 2025)
              <br />
              <a href="https://coursera.org/verify/3RAVBQCUD4HT" target="_blank" rel="noopener noreferrer">Verify</a>
            </li>
            <li><strong>Jira SCRUM Project + Agile Tools</strong> – Coursera Projects (Mar 11, 2025)</li>
            <li>
              &nbsp;&nbsp;&nbsp;&nbsp;↳ <a href="https://coursera.org/verify/KY7HCL2YQ4WM" target="_blank" rel="noopener noreferrer">Create a SCRUM Project</a><br />
              &nbsp;&nbsp;&nbsp;&nbsp;↳ <a href="https://coursera.org/verify/A4I4IG1DBIDO" target="_blank" rel="noopener noreferrer">Create User Stories</a><br />
              &nbsp;&nbsp;&nbsp;&nbsp;↳ <a href="https://coursera.org/verify/ZHEA3X9LLZJE" target="_blank" rel="noopener noreferrer">Get Started with Jira</a>
            </li>
            <li>
              <strong>Software Improvements (Reviews & Metrics)</strong> – University of Alberta
              <br />
              <a href="https://coursera.org/verify/BZH5N47TCBPL" target="_blank" rel="noopener noreferrer">Verify</a>
            </li>
            <li>
              <strong>C for Everyone: Programming Fundamentals</strong> – UC Santa Cruz
              <br />
              <a href="https://coursera.org/verify/VPSY65QM5AKK" target="_blank" rel="noopener noreferrer">Verify</a>
            </li>
            <li>
              <strong>Intro to Computers & Productivity Software</strong> – HKUST
              <br />
              <a href="https://coursera.org/verify/SERPDBETYPYC" target="_blank" rel="noopener noreferrer">Verify</a>
            </li>
            <li><strong>Go for Gold – Gold Level</strong> – Accenture (Jan 31, 2025)</li>
            <li><strong>IEEE Student Membership</strong> – Valid through Dec 31, 2024</li>
          </ul>

          <a
            href="/Certification/Certification.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Ovo',
              color: '#FFDE93',
              textDecoration: 'underline',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            View Certificate (PDF)
          </a>
        </div>
      </div>
    </div>
  );
};

export default AwardsCertificationPage;
