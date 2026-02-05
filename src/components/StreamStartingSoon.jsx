import React from "react";
import BackgroundStars from "./BackgroundStars";
// 1. IMPORT the video from your assets folder
import highlightReel from "../assets/videos/stella-highlights.mp4";

export default function StreamStartingSoon() {
  return (
    <div className="relative w-full aspect-video bg-[#0B0B0B] flex items-center justify-center overflow-hidden text-white border-[12px] border-[#D4AF37]/10">
      {/* 1. CINEMATIC BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
        >
          {/* 2. USE the imported variable as the source */}
          <source src={highlightReel} type="video/mp4" />
        </video>

        {/* CRT / Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      </div>

      <BackgroundStars />

      {/* 2. MAIN CONTENT (Replaces Timer with Status) */}
      <div className="relative z-10 text-center">
        <div className="inline-block border border-[#D4AF37]/30 px-6 py-2 mb-6 bg-black/60 backdrop-blur-md">
          <h3 className="text-[#D4AF37] font-black text-sm md:text-lg tracking-[0.8em] uppercase animate-pulse">
            Establishing Signal
          </h3>
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-4 italic uppercase">
          STELLA<span className="text-accent">CREW</span>
        </h1>

        <div className="flex items-center justify-center gap-4 text-gray-400">
          <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
          <p className="text-xs md:text-sm tracking-[0.5em] uppercase font-bold">
            Initializing Gold Standard Protocol
          </p>
          <div className="h-[1px] w-12 bg-[#D4AF37]/40"></div>
        </div>
      </div>

      {/* 3. LIVE DATA FEED (Top Left) */}
      <div className="absolute top-12 left-12 space-y-2 hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-mono text-gray-300 tracking-widest uppercase">
            Encryption_Active
          </span>
        </div>
        <div className="text-[9px] font-mono text-gray-500 space-y-1">
          <p>SRC: SAV_EDITOR_XB36</p>
          <p>TEX: MP100_CLR_160</p>
          <p>WHL: BESPOKE_VRF</p>
        </div>
      </div>

      {/* Bottom Ticker bar (Kept your original marquee logic) */}
      <div className="absolute bottom-0 w-full bg-[#D4AF37] py-2 overflow-hidden shadow-[0_-10px_30px_rgba(212,175,55,0.2)]">
        <div className="whitespace-nowrap flex gap-12 animate-[marquee_20s_linear_infinite]">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="text-black text-[10px] font-bold uppercase tracking-widest"
            >
              STELLACREW /// NEW MODS LIVE IN VAULT /// GTA ONLINE: ELITE SIGNAL
              /// THE GOLD STANDARD /// ARCHITECTS OF EXCELLENCE ///
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-8 right-8 text-right">
        <p className="text-[#D4AF37] text-[10px] font-mono tracking-widest">
          SYSTEM_STATUS: OPTIMAL
        </p>
        <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
          ID_772_SC_ALPHA
        </p>
      </div>
    </div>
  );
}
