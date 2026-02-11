import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import FeaturedVideos from "./components/FeaturedVideos";
import PhilosophyStatement from "./components/PhilosophyStatement";
import BrandStats from "./components/BrandStats";
import DiscordInvite from "./components/DiscordInvite";
import ResourcesPage from "./pages/ResourcesPage";
import SuccessPage from "./pages/SuccessPage";
import TermsPage from "./pages/TermsPage";
import VaultPage from "./pages/VaultPage";
import GalleryPage from "./pages/GalleryPage";
import StreamStartingSoon from "./components/StreamStartingSoon";
import Footer from "./components/Footer";


function LayoutWrapper({ children }) {
  const location = useLocation();
  const isStreamOverlay = location.pathname === "/stream-overlay";

  return (
    <div className={`min-h-screen ${isStreamOverlay ? 'bg-transparent' : 'bg-bg'}`}>
      {!isStreamOverlay && <NavBar />}
      <main>
        {children}
      </main>
      {!isStreamOverlay && <Footer />}
    </div>
  );
}

const HomePage = () => (
  <>
    <Header />
    <FeaturedVideos />
    <PhilosophyStatement />
    <BrandStats />
    <DiscordInvite />
  </>
);

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/stream-overlay" element={<StreamStartingSoon />} />
          <Route path="/resources" element={<ResourcesPage />} />
          {/* <Route path="/car-builder" element={<CarColorEditor />} /> */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

