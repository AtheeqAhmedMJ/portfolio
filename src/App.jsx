import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import AboutMe from "./pages/AboutMePage/AboutMe";
import Experience from "./pages/ExperiencePage/ExperiencePage";
import Projects from "./pages/ProjectInventoryPage/ProjectInventoryPage";
import Prowess from "./pages/ProwessPage/ProwessPage";
import Achievements from "./pages/AchievementsPage/AchievementsPage";
import OtherWorks from "./pages/OtherWorksPage/OtherWorksPage";
import ContactPage from "./pages/ContactPage/ContactPage";

import LeadershipPage from "./components/AchievementsPageSections/LeadershipPage/LeadershipPage";
import AuthorPage from "./components/AchievementsPageSections/PublishedAuthorPage/PublishedAuthorPage";
import AwardsPage from "./components/AchievementsPageSections/AwardsCertificationPage/AwardsCertificationPage";
import AwardsRecognitionPage from "./components/AchievementsPageSections/AwardsCertificationPage/AwardsRecognitionPage";
import CertificationsPage from "./components/AchievementsPageSections/AwardsCertificationPage/CertificationsPage";

import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import Music from "./components/Music/Music";

function Layout({ children }) {
  const location = useLocation();
  const isOtherWorks = location.pathname === "/other-works";

  return (
    <>
      <NavBar />
      <SideBar />
      {!isOtherWorks && <Music />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
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
          <Route path="/achievements/awards/recognition" element={<AwardsRecognitionPage />} />
          <Route path="/achievements/awards/certifications" element={<CertificationsPage />} />
          <Route path="/other-works" element={<OtherWorks />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
