import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import SideBar from '../../SideBar/SideBar';
import BackButton from '/src/components/BackButton/BackButton';
import './AwardsCertificationPage.css';

const CertInitials = ({ name }) => {
  const words = name.replace(/[^a-zA-Z ]/g, '').split(' ').filter(Boolean);
  const initials =
    words.length >= 2
      ? words[0][0] + words[words.length - 1][0]
      : words[0]?.slice(0, 2) ?? '??';

  return (
    <div className="cert-card__avatar">
      {initials.toUpperCase()}
    </div>
  );
};

const CertCard = ({ cert }) => (
  <div className="cert-card">
    {/* Silver shimmer strip */}
    <div className="cert-card__strip" />

    <div className="cert-card__inner">
      {/* Header */}
      <div className="cert-card__header">
        <CertInitials name={cert.name} />
        <div className="cert-card__meta">
          <span className="cert-card__platform">{cert.issuer}</span>
          <span className="cert-card__date">{cert.date}</span>
        </div>
      </div>

      {/* Cert name */}
      <h3 className="cert-card__name">{cert.name}</h3>

      {/* Tags */}
      <div className="cert-card__tags">
        {cert.tags.map((t) => (
          <span key={t} className="cert-card__tag">{t}</span>
        ))}
      </div>
    </div>

    {/* Footer */}
    {cert.url ? (
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="cert-card__verify"
      >
        Verify Certificate ↗
      </a>
    ) : (
      <div className="cert-card__verify cert-card__verify--none">
        No public verify link
      </div>
    )}
  </div>
);

/* ── Certifications data ── */
const CERTIFICATIONS = [
  {
    id: 1,
    name: 'Java Complete Course Using Visual Studio Code',
    issuer: 'Udemy',
    date: 'Aug 2025',
    tags: ['Java', 'Programming'],
    url: 'https://ude.my/UC-0f79a048-2308-48a7-8f38-3c53e60d6759',
  },
  {
    id: 2,
    name: 'ReactJs — The Complete ReactJs Course For Beginners',
    issuer: 'Udemy',
    date: 'Jul 2025',
    tags: ['React', 'Frontend'],
    url: 'https://ude.my/UC-574c8c14-eeba-45b7-b14c-aeaca3e1b320',
  },
  {
    id: 3,
    name: 'CSS — Basics to Advanced for Front End Development',
    issuer: 'Udemy',
    date: 'Jul 2025',
    tags: ['CSS', 'Frontend'],
    url: 'https://ude.my/UC-255ae25a-3e71-42db-96a6-f3fc2f382dc3',
  },
  {
    id: 4,
    name: 'CSS Complete Course For Beginners',
    issuer: 'Udemy',
    date: 'Jul 2025',
    tags: ['CSS', 'Frontend'],
    url: 'https://ude.my/UC-816cc59b-44c1-4c10-b77c-60e93dee2f6b',
  },
  {
    id: 5,
    name: 'Git for Beginners',
    issuer: 'Udemy',
    date: 'Jul 2025',
    tags: ['Git', 'DevOps'],
    url: 'https://ude.my/UC-946ffd3e-e115-4d2e-98bb-a2d05f4b81f7',
  },
  {
    id: 6,
    name: 'Introduction to Networking for Cyber Professionals',
    issuer: 'Zscaler Academy',
    date: 'Jul 2025',
    tags: ['Networking', 'Cybersecurity'],
    url: 'https://verify.skilljar.com/c/6iqbuy89rpn3',
  },
  {
    id: 7,
    name: 'Deep Learning for Object Detection',
    issuer: 'MathWorks / Coursera',
    date: 'Mar 2025',
    tags: ['AI', 'ML', 'Computer Vision'],
    url: 'https://coursera.org/verify/3RAVBQCUD4HT',
  },
  {
    id: 8,
    name: 'Reviews & Metrics for Software Improvements',
    issuer: 'University of Alberta / Coursera',
    date: 'Mar 2025',
    tags: ['Software Engineering'],
    url: 'https://coursera.org/verify/BZH5N47TCBPL',
  },
  {
    id: 9,
    name: 'Get Started with Jira',
    issuer: 'Coursera Project Network',
    date: 'Mar 2025',
    tags: ['Agile', 'Jira'],
    url: 'https://coursera.org/verify/ZHEA3X9LLZJE',
  },
  {
    id: 10,
    name: 'How to Create a Jira SCRUM Project',
    issuer: 'Coursera Project Network',
    date: 'Mar 2025',
    tags: ['Agile', 'Jira'],
    url: 'https://coursera.org/verify/KY7HCL2YQ4WM',
  },
  {
    id: 11,
    name: 'Create User Stories in Jira',
    issuer: 'Coursera Project Network',
    date: 'Mar 2025',
    tags: ['Agile', 'Jira'],
    url: 'https://coursera.org/verify/A4I4IG1DBIDO',
  },
  {
    id: 12,
    name: 'Go for Gold — Gold Level',
    issuer: 'Accenture iAspire',
    date: 'Jan 2025',
    tags: ['Leadership'],
    url: null,
  },
  {
    id: 13,
    name: 'JavaScript Fundamentals Course for Beginners',
    issuer: 'Udemy',
    date: 'Jan 2025',
    tags: ['JavaScript', 'Frontend'],
    url: 'https://ude.my/UC-9a2dc8a1-526f-4616-b9c8-05b52666be4c',
  },
  {
    id: 14,
    name: 'Dart Programming: Comprehensive Training for All Levels',
    issuer: 'Udemy',
    date: 'Oct 2024',
    tags: ['Dart', 'Flutter', 'Programming'],
    url: 'https://ude.my/UC-24e8f2ec-74f3-44d1-879a-01298915995a',
  },
  {
    id: 15,
    name: 'AI-ML Virtual Internship',
    issuer: 'EduSkills / AICTE / Google',
    date: 'Jan–Mar 2024',
    tags: ['AI', 'ML', 'Google'],
    url: null,
  },
  {
    id: 16,
    name: 'Java Training Complete Course 2022',
    issuer: 'Udemy',
    date: 'Feb 2024',
    tags: ['Java', 'Programming'],
    url: 'https://ude.my/UC-8eb9fd98-5d22-48c8-bb94-a91c17a1876f',
  },
  {
    id: 17,
    name: 'IEEE Student Membership',
    issuer: 'IEEE — Bangalore Section',
    date: 'Valid through Dec 2024',
    tags: ['Membership'],
    url: null,
  },
  {
    id: 18,
    name: 'Android Developer Virtual Internship',
    issuer: 'EduSkills / AICTE / Google',
    date: 'Sep–Nov 2023',
    tags: ['Android', 'Google'],
    url: null,
  },
  {
    id: 19,
    name: 'C for Everyone: Programming Fundamentals',
    issuer: 'UC Santa Cruz / Coursera',
    date: 'Jan 2023',
    tags: ['C', 'Programming'],
    url: 'https://coursera.org/verify/VPSY65QM5AKK',
  },
  {
    id: 20,
    name: 'Intro to Computers & Office Productivity Software',
    issuer: 'HKUST / Coursera',
    date: 'Dec 2022',
    tags: ['Productivity'],
    url: 'https://coursera.org/verify/SERPDBETYPYC',
  },
];

const ALL_TAGS = [...new Set(CERTIFICATIONS.flatMap((c) => c.tags))].sort();

/* ── Page ── */
const CertificationsPage = () => {
  const [search, setSearch]     = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const filtered = CERTIFICATIONS.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      q === '' ||
      c.name.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q));
    const matchTag = activeTag === null || c.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

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


      <BackButton />

      <h1 className="achievements-title">Certifications</h1>

      {/* ── All content inside the scrollable card ── */}
      <div className="orange-holo-card">

        <p className="achievement-detail-text">
          {CERTIFICATIONS.length} verified credentials across AI/ML, full-stack
          development, cloud, agile, and more. Each one earned, not collected.
        </p>

        {/* Search */}
        <div className="cert-search-wrap">
          <input
            type="text"
            className="cert-search"
            placeholder="Search by name, issuer, or skill…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tag filter */}
        <div className="cert-tags-filter">
          <button
            className={`cert-tag-btn ${activeTag === null ? 'cert-tag-btn--active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              className={`cert-tag-btn ${activeTag === tag ? 'cert-tag-btn--active' : ''}`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <p className="cert-count">
          Showing {filtered.length} of {CERTIFICATIONS.length} certificates
        </p>

        {/* Grid */}
        <div className="cert-grid">
          {filtered.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
          {filtered.length === 0 && (
            <p className="cert-empty">No certificates match your search.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default CertificationsPage;