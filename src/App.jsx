import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import AboutMe from './pages/AboutMePage/AboutMe';
import Experience from './pages/ExperiencePage/ExperiencePage';
import Projects from './pages/ProjectInventoryPage/ProjectInventoryPage';
import Prowess from './pages/ProwessPage/ProwessPage';
import Achievements from './pages/AchievementsPage/AchievementsPage';
import OtherWorks from './pages/OtherWorksPage/OtherWorksPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LeadershipPage from './components/AchievementsPageSections/LeadershipPage/LeadershipPage.jsx';
import AuthorPage from './components/AchievementsPageSections/PublishedAuthorPage/PublishedAuthorPage.jsx';
import AwardsPage from './components/AchievementsPageSections/AwardsCertificationPage/AwardsCertificationPage.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/prowess" element={<Prowess />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/achievements/leadership" element={<LeadershipPage />} />
          <Route path="/achievements/author" element={<AuthorPage />} />
          <Route path="/achievements/awards" element={<AwardsPage />} />
          <Route path="/other-works" element={<OtherWorks />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
