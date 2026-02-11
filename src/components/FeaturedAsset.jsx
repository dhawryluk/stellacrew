import { services } from "../data/vaultData";

export default function FeaturedAsset() {
  const featured = services.find((item) => item.id === 6) || services[0];

  return (
    <div className="w-full mb-32 group">
      <div className="relative overflow-hidden border border-accent/20 bg-[#0a0a0a] flex flex-col lg:flex-row items-center">
        
        <div className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-bg/80 backdrop-blur-md px-3 py-1 border border-accent/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-accent text-[9px] font-black uppercase tracking-[0.4em]">
            Priority_Manifest
          </span>
        </div>

        <div className="w-full lg:w-3/5 h-112.5 overflow-hidden relative">
          <img
            src={featured.img}
            alt={featured.name}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0a0a0a] hidden lg:block"></div>
        </div>

        <div className="w-full lg:w-2/5 p-12 lg:-ml-20 z-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-accent/50"></div>
            <h4 className="text-accent font-black text-[10px] tracking-[0.5em] uppercase">
              LTD_EDITION_PROTOCOL
            </h4>
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-text-main uppercase tracking-tighter mb-6 leading-[0.9] italic">
            {featured.name.split(' ').slice(0, -1).join(' ')}{" "}
            <span className="text-accent/80 block text-4xl mt-2">{featured.name.split(' ').pop()}</span>
          </h2>

          <p className="text-text-main/40 text-xs uppercase font-bold mb-8 leading-relaxed max-w-sm border-l border-white/10 pl-6">
            {featured.detail}
          </p>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => window.location.href = featured.stripeLink}
              className="bg-accent text-bg px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-text-main transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Acquire Now — {featured.price}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 right-8 opacity-[0.03] text-text-main text-9xl font-black italic pointer-events-none select-none">
          #{featured.id}
        </div>
      </div>
    </div>
  );
}