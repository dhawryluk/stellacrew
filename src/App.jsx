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
import ResourcesPage from "./pages/resourcesPage";
import SuccessPage from "./pages/successPage";
import TermsPage from "./pages/termsPage";
import VaultPage from "./pages/vaultPage";

import Footer from "./components/Footer";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isStreamOverlay = location.pathname === "/stream-overlay";

  return (
    <>
      {!isStreamOverlay && <NavBar />}
      {children}
      {!isStreamOverlay && <Footer />}
    </>
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
      <main className="min-h-screen bg-bg">
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vault" element={<VaultPage />} />
            {/* <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/stream-overlay" element={<StreamStartingSoon />} /> */}
            <Route path="/resources" element={<ResourcesPage />} />{" "}
            {/* <Route path="/car-builder" element={<CarColorEditor />} /> */}
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </LayoutWrapper>
      </main>
    </Router>
  );
}
