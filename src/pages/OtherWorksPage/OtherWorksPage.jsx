import React from 'react';
import OtherWorksPageBackground from "/src/components/Backgrounds/OtherWorksBackground";
import NavBar from '/src/components/NavBar/NavBar';
import './OtherWorksPage.css';
import SideBar from '../../components/SideBar/SideBar';

const OtherWorksPage = () => {
  return (
    <>
      <OtherWorksPageBackground />
      <NavBar />
      <SideBar />
          <div className="Barcode-Message">
           YOU HAVE BOARDED<br />
           STAR DESTROYER - OTHER WORKS
      </div>
    </>
  );
};

export default OtherWorksPage;
