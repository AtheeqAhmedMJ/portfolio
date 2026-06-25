import React from 'react';
import './CreditsSection.css';

const CreditsPage = () => {
  return (
    <div className="credits-container">
      <div className="crawl-wrapper">
        <div className="crawl">
          <h1 className="crawl-title">EPISODE IX<br/>THE FINAL DEPLOY</h1>

          <p>Directed, Designed & Developed by Atheeq Ahmed MJ</p>

          <p>Theme Music:<br />
            “Calm Space Music” by Pixabay<br />
            <a href="https://cdn.pixabay.com/download/audio/2025/03/11/audio_03e017e1e5.mp3?filename=calm-space-music-312291.mp3" target="_blank" rel="noopener noreferrer">
              Listen on Pixabay
            </a>
          </p>
          <p>Image Credits:<br />
               UHDpaper & 4kwallpapers.com <br />
            Special thanks to Pinterest and the referenced website
          </p>

          <p>3D Models by Sketchfab Artists:</p>
          <ul>
            <li>
              <a href="https://sketchfab.com/3d-models/star-wars-r2-d2-49cfb94da49e4635bdcb788e0e129a87" target="_blank" rel="noopener noreferrer">
                R2-D2 by Sketchfab Artist
              </a>
            </li>
            <li>
              <a href="https://sketchfab.com/3d-models/death-star-star-wars-3d5f01485e9e4e8b9d995d7764341afe" target="_blank" rel="noopener noreferrer">
                Death Star by Sketchfab Artist
              </a>
            </li>
            <li>
              <a href="https://sketchfab.com/3d-models/star-wars-imperial-class-star-destroyer-fa18d537db4d4020a443c1802ec0f88e" target="_blank" rel="noopener noreferrer">
                Imperial Star Destroyer by Sketchfab Artist
              </a>
            </li>
          </ul>

          <p>Special Thanks to:<br />
            Figma<br />
            And everyone who believed in this journey.
          </p>

          <p>May the Code Be With You — Always.</p>
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;
