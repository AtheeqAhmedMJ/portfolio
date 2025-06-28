import React from 'react';
import AboutMeBackground from "../../components/Backgrounds/AboutMeBackground.jsx";
import './AboutMe.css';
import fog1 from '/src/assets/Images/fog1.png';
import fog2 from '/src/assets/Images/fog2.png';
import fog3 from '/src/assets/Images/fog3.png';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';

const AboutMe = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      
      <div className="AboutMe-Card">
        <h2 className="Title">About Me</h2>
        <p className="About">
          Hi, I’m Mohamed Atheeq Ahmed M J, a passionate and versatile developer with a deep interest in full-stack development, MERN stack, AI/ML solutions, and IoT-based systems. Currently pursuing my B.Tech in Computer Science & IoT at GITAM, I love building innovative products that blend cutting-edge technology with real-world utility.
          <br /><br />
          I’ve led and contributed to various impactful projects — from developing cross-platform applications like MediaSphere, a unified media suite built with Electron.js, to building secure and scalable backend systems such as Health Box, a real-time hospital management platform powered by Spring Boot and React.
          <br /><br />
          As the Ex-President of GITAM’s flagship tech club, CodeX, I’ve organized coding contests, hackathons, and tech fests that shaped the university’s tech culture. I take pride in fostering communities where students can grow their coding, design, and leadership skills.
          <br /><br />
          Beyond technology, I explore creativity through graphic design, content creation, and writing indie literary gems like <i>Au Revoir Goodbye Till We Meet Again</i> and <i>The Vestige</i>, reflecting my belief in the harmony of technical skill and artistic expression.
          <br /><br />
          When I’m not immersed in development or writing, I enjoy experimenting with tools like Blender, Spline3D, and Adobe Suite to create immersive designs and visuals.
        </p>
      </div>

      <AboutMeBackground />

      <div className="fog-container">
        <div className="fog"></div>
        <img src={fog1} alt="Fog layer 1" className="fog-layer layer1" />
        <img src={fog2} alt="Fog layer 2" className="fog-layer layer2" />
        <img src={fog3} alt="Fog layer 3" className="fog-layer layer3" />
      </div>
      <div className="Barcode-Message">
           YOU HAVE BOARDED<br />
           MILLENNIUM FALCON - ABOUT ME
      </div>

      <div className="rain-container">
        {Array.from({ length: 200 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 2;
          return (
            <div
              key={i}
              className="raindrop-wrapper"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`
              }}
            >
              <div className="raindrop"></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AboutMe;
