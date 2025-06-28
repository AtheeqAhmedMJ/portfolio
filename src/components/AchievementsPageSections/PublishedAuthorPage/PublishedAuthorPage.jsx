import React from 'react';
import NavBar from '../../NavBar/NavBar';
import SideBar from '../../SideBar/SideBar';
import './PublishedAuthorPage.css';

const PublishedAuthorPage = () => {
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

      <h1 className="achievements-title">Published Author</h1>

      <div className="blue-holo-card">
        <p className="achievement-detail-text">
          Writing is not just a creative outlet for me — it’s an extension of how I perceive the world. Through fiction, I translate emotion into narrative, and complexity into clarity. My books are personal, raw, and deeply layered — helping me connect with readers and explore the edges of what it means to be human.
        </p>

        <p className="achievement-detail-text">
          As an independent author, I’ve published two successful titles that are available globally in paperback and hardcover across platforms including Amazon, Apple Books, Google Books, and Kobo.
        </p>

        <ul className="achievement-detail-list">
          <li>
            <strong>Au Revoir – Goodbye Till We Meet Again</strong><br />
            An emotionally-charged coming-of-age novel following Marvin, a young boy unexpectedly thrown into a journey of self-discovery, loss, and reunion. When nostalgia drives him to break into an establishment to reconnect with long-lost friends, he finds more than just familiar faces — he unravels the ghosts of his past.  
            <br />
            Blending romance, suspense, humor, and heartbreak, the novel explores the transformative nature of growing up and healing. Marvin’s daring escapades and emotional trials offer readers a rollercoaster of laughs and tears — a raw, relatable experience of youth, friendship, and resilience.  
            <br />
            <a
              href="https://www.amazon.in/-/hi/Mohamed-Atheeq-Ahmed/dp/B0CQ989CMH"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Amazon →
            </a>
          </li>

          <li>
            <strong>The Vestige</strong><br />
            A surreal descent into psychological and supernatural horror, The Vestige tells the tale of a forgotten painter — R.M. — who traps souls within cursed portraits to fuel his magnum opus. A group of teens, drawn to his abandoned cabin, unknowingly walk into a twisted gallery where brushstrokes bleed, canvases scream, and inspiration demands suffering.
            <br />
            As the friends descend into madness, they’re hunted, broken, and transformed into living brushstrokes on R.M.’s ever-evolving masterpiece. The line between art and reality collapses. Each scream is a stroke. Each soul, a signature. Because in R.M.’s world, death isn’t the end — it’s the beginning of your exhibition.
            <br />
            "The Vestige" is a haunting story about obsession, creation, and the price of being remembered. Once you’ve seen R.M.’s work, he’s already painting you.
            <br />
            <a
              href="https://www.amazon.in/Vestige-Mohamed-Atheeq-Ahmed-Mj/dp/B0F9W6NHWN"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Amazon →
            </a>
          </li>
        </ul>

        <p className="achievement-detail-text">
          These works are more than stories — they’re fragments of my identity. Through them, I’ve learned how to speak with honesty, design with emotion, and lead with imagination. Whether I’m coding, writing, or presenting — the storyteller in me never leaves.
        </p>
      </div>
    </div>
  );
};

export default PublishedAuthorPage;
