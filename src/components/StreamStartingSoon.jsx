import highlightReel from "../assets/videos/stella-highlights.mp4";

export default function StreamStartingSoon() {
  return (
    <div className="relative w-full aspect-video bg-bg flex items-center justify-center overflow-hidden text-white border border-white/5">
      
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-3000"
        >
          <source src={highlightReel} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] bg-size-[100%_3px,3px_100%] pointer-events-none"></div>
        
        <div className="absolute left-0 w-full h-0.5 bg-accent/40 shadow-[0_0_15px_#d4af37] animate-scan pointer-events-none opacity-50"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="inline-block border-l-2 border-accent px-8 py-1 mb-8 bg-black/40 backdrop-blur-sm">
          <h3 className="text-accent font-black text-xs md:text-sm tracking-[1em] uppercase animate-pulse">
            Establishing_Signal
          </h3>
        </div>

        <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter text-white mb-2 uppercase leading-none">
          STELLA<span className="text-accent/50">CREW</span>
        </h1>

        <div className="flex items-center justify-center gap-6 text-text-main/40">
          <div className="h-px w-24 bg-linear-to-r from-transparent to-accent/30"></div>
          <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase font-bold italic">
            Initializing Gold Standard Protocol
          </p>
          <div className="h-px w-24 bg-linear-to-l from-transparent to-accent/30"></div>
        </div>
      </div>

      <div className="absolute top-12 left-12 space-y-4 hidden md:block">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-accent animate-ping"></div>
          <span className="text-[10px] font-black font-mono text-accent tracking-[0.3em] uppercase">
            UPLINK_ENCRYPTED
          </span>
        </div>
      <div className="text-[10px] font-mono text-white/30 space-y-1 border-l border-white/10 pl-4">
        <p className="flex justify-between gap-4">
          <span>SIGNAL:</span> 
          <span className="text-white/60 uppercase tracking-widest text-[9px]">Ultra_Low_Latency</span>
        </p>
        <p className="flex justify-between gap-4">
          <span>BITRATE:</span> 
          <span className="text-white/60 uppercase tracking-widest text-[9px]">8500_KBPS_STABLE</span>
        </p>
        <p className="flex justify-between gap-4">
          <span>SERVER:</span> 
          <span className="text-white/60 uppercase tracking-widest text-[9px]">LS_SOUTH_CENTRAL</span>
        </p>
        <p className="flex justify-between gap-4">
          <span>FRAME:</span> 
          <span className="text-white/60 uppercase tracking-widest text-[9px]">240_FPS_LOCKED</span>
        </p>
      </div>
      </div>

      <div className="absolute top-12 right-12 text-right hidden md:block">
        <p className="text-accent text-[10px] font-black tracking-widest uppercase">
          System_Status: Optimal
        </p>
        <p className="text-white/20 text-[9px] font-mono tracking-widest uppercase mt-1">
          Node_ID: 772_SC_ALPHA
        </p>
      </div>

      <div className="absolute bottom-0 w-full bg-accent py-3 overflow-hidden shadow-[0_-15px_40px_rgba(212,175,55,0.2)]">
        <div className="whitespace-nowrap flex gap-16 animate-[marquee_25s_linear_infinite]">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="text-bg text-[11px] font-black uppercase tracking-[0.5em] italic"
            >
              STELLACREW /// ARCHITECTS OF EXCELLENCE /// NEW ASSETS DEPLOYED TO VAULT /// THE GOLD STANDARD /// OPERATING ON PS5 & PC /// 
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}