import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className='Nav-Bar'>
      <ul>
        <li><Link to="/about">ABOUT ME</Link></li>
        <li><Link to="/projects">PROJECT INVENTORY</Link></li>
        <li><Link to="/prowess">PROWESS</Link></li>
        <li><Link to="/experience">EXPERIENCE</Link></li>
        <li><Link to="/achievements">ACHIEVEMENTS</Link></li>
        <li><Link to="/other-works">OTHER WORKS</Link></li>
      </ul>
    </div>
  );
};

export default NavBar;
