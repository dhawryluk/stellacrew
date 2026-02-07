import { services, categories } from "../data/vaultData";
import FeaturedAsset from "../components/FeaturedAsset";
import ServiceModal from "../components/ServiceModal";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // Simulate System Decryption/Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredServices =
    activeTab === "All"
      ? services
      : services.filter((s) => s.category === activeTab);

  const handlePurchase = (link) => {
    if (link === "#" || !link) {
      alert("INQUIRY REQUIRED: Contact StellaCrew Command on Discord.");
      return;
    }
    window.location.href = link;
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 px-6 font-sans selection:bg-accent selection:text-bg">
      <SkeletonTheme baseColor="#0a0a0a" highlightColor="#d4af3710">
        <div className="max-w-7xl mx-auto">
          
          {/* 1. Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-accent text-[10px] font-black tracking-[0.6em] mb-4 uppercase">
              Asset_Acquisition_Terminal
            </span>
            <h1 className="text-6xl font-black text-text-main italic tracking-tighter uppercase leading-none mb-6">
              The <span className="text-accent/50 text-7xl">Vault</span>
            </h1>
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
          </div>

          <FeaturedAsset />

          {/* 2. Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto border-y border-white/5 py-12">
            {[
              { id: "01", title: "Select Tier", desc: "Choose your asset package" },
              { id: "02", title: "Secure Access", desc: "Complete encrypted checkout" },
              { id: "03", title: "Discord Handoff", desc: "Join HQ for asset delivery" },
            ].map((step) => (
              <div key={step.id} className="text-center group border-x border-white/5">
                <span className="text-accent font-mono text-[10px] font-black block mb-2 transition-all group-hover:tracking-[0.4em]">
                  // PROTOCOL_{step.id}
                </span>
                <h4 className="text-text-main text-xs uppercase tracking-[0.3em] font-black">
                  {step.title}
                </h4>
                <p className="text-text-main/30 text-[9px] uppercase mt-2 italic font-bold">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 3. Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-12 py-3 text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-500 border-2 ${
                  activeTab === cat
                    ? "bg-accent text-bg border-accent shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    : "border-white/5 text-text-main/40 hover:border-accent/40 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4. Assets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
            {isLoading ? (
              // --- SKELETON LOADING STATE ---
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-white/5 flex flex-col h-full">
                  <Skeleton height="210px" borderRadius="0" />
                  <div className="p-8 grow">
                    <Skeleton width="40%" height="10px" className="mb-4" />
                    <Skeleton width="80%" height="30px" className="mb-6" />
                    <Skeleton count={2} height="10px" className="mb-2" />
                    <div className="mt-10 space-y-4">
                      <Skeleton height="50px" borderRadius="0" />
                      <Skeleton height="60px" borderRadius="0" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // --- ACTUAL ASSET CARDS ---
              filteredServices.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-700 hover:border-accent/30 flex flex-col h-full"
                >
                  <div className="relative aspect-video overflow-hidden shrink-0">
                    <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bg-bg border-b border-l border-white/5 px-4 py-2 text-accent font-mono text-xs font-black z-20">
                      {item.price}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col grow">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-3 bg-accent/40"></div>
                      <span className="text-[9px] text-accent font-black uppercase tracking-[0.4em]">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-3xl text-text-main font-black uppercase tracking-tighter italic group-hover:text-accent transition-colors leading-none mb-6">
                      {item.name}
                    </h3>
                    <p className="text-text-main/40 text-[10px] uppercase tracking-widest leading-relaxed font-bold grow border-l border-white/5 pl-4 mb-8">
                      {item.detail}
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="w-full border border-white/10 text-text-main/30 py-4 text-[9px] font-black uppercase tracking-[0.5em] transition-all hover:bg-white/2 hover:text-text-main"
                      >
                        Manifest_Details
                      </button>
                      <button
                        onClick={() => handlePurchase(item.stripeLink)}
                        className="w-full bg-accent text-bg py-5 text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-text-main shadow-2xl relative overflow-hidden group/btn"
                      >
                        <span className="relative z-10">Acquire_Access</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SkeletonTheme>

      <ServiceModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}