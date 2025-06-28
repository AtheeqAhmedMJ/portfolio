import React, { useState } from 'react';
import './SideBar.css';
import { FaHome, FaEnvelope, FaFileAlt, FaShareAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const openResume = () => {
    window.open('./Resume/Mohamed Atheeq Ahmed Resume.pdf', '_blank');
  };

  const handleShare = () => {
    const url = `${window.location.origin}${location.pathname}`;
    navigator.clipboard.writeText(url)
      .then(() => alert('🔗 Page link copied to clipboard!'))
      .catch(() => alert('Failed to copy link.'));
  };

  return (
    <div
      className={`side-bar ${isExpanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul>
        <li onClick={() => handleNavigate('/')}>
          <FaHome className="icon" />
          {isExpanded && <span>HOME</span>}
        </li>
        <li onClick={() => handleNavigate('/contact')}>
          <FaEnvelope className="icon" />
          {isExpanded && <span>CONTACT</span>}
        </li>
        <li onClick={openResume}>
          <FaFileAlt className="icon" />
          {isExpanded && <span>RESUME</span>}
        </li>
        <li onClick={handleShare}>
          <FaShareAlt className="icon" />
          {isExpanded && <span>SHARE</span>}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
