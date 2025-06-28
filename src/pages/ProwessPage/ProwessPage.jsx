import React from 'react';
import ProwessBackground from '../../components/Backgrounds/ProwessBackground';
import './ProwessPage.css';
import NavBar from '../../components/NavBar/NavBar';
import prowess from '/src/assets/data/prowess';
import SideBar from '../../components/SideBar/SideBar';

const ProwessPage = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <ProwessBackground />
      <div className="Barcode-Message">
           YOU HAVE ARRIVED AT<br />
           PLANET HOTH - PROWESS
      </div>
      <h1 className="title">PROWESS</h1>
      <div className="prowess-container">
        {prowess.map(section => (
          <div key={section.id} className="prowess-card">
            <h2 className="prowess-title">{section.title}</h2>

            {section.categories ? (
              section.id === 1 ? (
                <div className="prowess-categories">
                  <div>
                    {section.categories.slice(0, 1).concat(section.categories.slice(2, 3)).map((category, idx) => (
                      <div key={idx} className="prowess-category">
                        <h3 className="category-label">{category.label}</h3>
                        <ul className="category-list">
                          {category.items.map((item, i) => (
                            <li key={i} className="category-item">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div>
                    {section.categories.slice(1, 2).concat(section.categories.slice(3, 4)).map((category, idx) => (
                      <div key={idx} className="prowess-category">
                        <h3 className="category-label">{category.label}</h3>
                        <ul className="category-list">
                          {category.items.map((item, i) => (
                            <li key={i} className="category-item">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                section.categories.map((category, idx) => (
                  <div key={idx} className="prowess-category">
                    <h3 className="category-label">{category.label}</h3>
                    <ul className="category-list">
                      {category.items.map((item, i) => (
                        <li key={i} className="category-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )
            ) : (
              <ul className="category-list">
                {section.items.map((item, i) => (
                  <li key={i} className="category-item">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProwessPage;
