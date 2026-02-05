import EnforcementImage from "../assets/IMG_2012.webp";

export default function FeaturedAsset() {
  return (
    <div className="w-full mb-32 group">
      <div className="relative overflow-hidden border border-accent/20 bg-bg flex flex-col lg:flex-row items-center shadow-2xl">
        
        {/* Hot Badge */}
        <div className="absolute top-6 left-6 z-30 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em]">
            Hot Right Now
          </span>
        </div>

        <div className="w-full lg:w-3/5 h-100 overflow-hidden relative">
          <img
            src={EnforcementImage}
            alt="Elite Asset"
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
          <div className="absolute inset-0 bg-bg/60 group-hover:bg-accent/10 transition-colors duration-700"></div>

          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-bg hidden lg:block"></div>
        </div>

        <div className="w-full lg:w-2/5 p-12 lg:-ml-20 z-20">
          <h4 className="text-accent font-mono text-[10px] mb-2 tracking-[0.3em] uppercase opacity-80">
            LTD EDITION PROTOCOL
          </h4>
          
          <h2 className="text-4xl md:text-5xl font-black text-text-main uppercase tracking-tighter mb-6 leading-none">
            Stella{" "}
            <span className="text-accent italic text-3xl">Enforcement</span>{" "}
            Pack
          </h2>
          
          <p className="text-text-main/70 text-sm mb-8 leading-relaxed max-w-sm font-medium">
            Our most requested modded asset collection. Fully optimized for 
            high-performance servers. Includes 12 custom variants and exclusive 
            textures.
          </p>

          <div className="flex items-center gap-6">
            <button className="bg-accent text-bg px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-accent-hover active:bg-accent-active transition-all shadow-[0_10px_30px_rgba(212,175,55,0.15)] relative overflow-hidden">
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-linear-to-r from-transparent to-white/20 opacity-40 group-hover:animate-[shine_3s_ease-in-out_infinite]" />
              Acquire Now — $49.99
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none opacity-10">
           <div className="absolute bottom-4 right-4 w-full h-full border-b border-r border-accent"></div>
        </div>
      </div>
    </div>
  );
}