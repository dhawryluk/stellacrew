import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { galleryImages } from "../data/galleryData";
import 'react-loading-skeleton/dist/skeleton.css';

const categories = ["All", "Male BEFF", "Female BEFF", "Vehicles"];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredImages = activeTab === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.cat === activeTab);

  return (
        <div className="min-h-screen bg-bg pt-32 pb-20 px-6 font-sans">
            <SkeletonTheme baseColor="#0a0a0a" highlightColor="#d4af3710">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-accent/10 pb-8">
            <div>
              <span className="text-accent text-[10px] font-black tracking-[0.5em] uppercase mb-2 block">Visual_Archive_v2.0</span>
              <h1 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                The <span className="text-accent/50">Gallery</span>
              </h1>
            </div>
            <div className="mt-6 md:mt-0 text-right opacity-40 font-mono text-[9px] uppercase tracking-widest">
              Total_Entries: {galleryImages.length} // Category: {activeTab}
            </div>
          </div>

          <div className="mb-12 max-w-2xl border-l-2 border-accent/30 pl-6 py-2">
            <span className="text-accent font-mono text-[10px] font-black tracking-[0.2em] uppercase block mb-2">
              // Deployment_Note
            </span>
            <p className="text-text-main/60 text-xs uppercase tracking-widest leading-relaxed font-bold italic">
              The assets showcased below represent a fraction of our operational capabilities. 
              These are <span className="text-text-main">visual benchmarks</span>—every build is 
              fully customizable to your specific requirements by <span className="text-accent">StellaCrew Experts.</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-10 py-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 border-2 ${
                  activeTab === cat
                    ? "bg-accent text-bg border-accent shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                    : "border-white/5 text-text-main/30 hover:border-accent/40 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {isLoading ? (
              Array(12).fill(0).map((_, i) => (
                <div key={i} className="mb-6"><Skeleton height={350} borderRadius="0" /></div>
              ))
            ) : (
              filteredImages.map((image) => (
                <div key={image.id} className="relative group overflow-hidden bg-panel border border-white/5 break-inside-avoid transition-all duration-700 hover:border-accent/40">
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-auto brightness-75 group-hover:brightness-100 transition-all duration-1000 scale-100 group-hover:scale-105"
                  />

                  <div className="absolute left-0 w-full h-px bg-accent/60 shadow-[0_0_10px_#d4af37] opacity-0 group-hover:animate-scan pointer-events-none z-30"></div>

                  <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-[9px] text-accent font-black tracking-[0.5em] mb-1 uppercase italic">{image.cat}</span>
                    <h3 className="text-2xl text-white font-black uppercase tracking-tighter leading-none">{image.title}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SkeletonTheme>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 z-50 p-4 border border-accent/40 bg-bg/80 backdrop-blur-md text-accent transition-all duration-500 hover:bg-accent hover:text-bg ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="square" 
          strokeLinejoin="bevel"
        >
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
}