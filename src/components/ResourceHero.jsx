import { useNavigate } from "react-router-dom";

export default function ResourceHero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-[#0a0a0a] border border-accent/30 mb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.15) 50%, transparent 50%)`,
          backgroundSize: "100% 4px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-24 bg-accent/5 blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
        <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/8 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <div className="absolute inset-0 w-1.5 h-1.5 bg-accent rounded-full animate-ping opacity-40" />
            </div>
            <span className="text-accent/70 text-[8px] font-bold uppercase tracking-[0.5em]">
              System Module: v.042 — Active
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-3 italic leading-none">
            Modded Car
          </h1>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic leading-none">
            <span className="text-accent">Builder</span>
          </h1>

          <p className="text-white/35 text-[10px] uppercase tracking-widest leading-relaxed mb-10 max-w-xs">
            Cross-reference paint codes with rare wheel combinations. Perfect
            your build before the acquisition protocol begins.
          </p>

          <div className="flex gap-8 mb-10">
            {[
              ["222+", "Paint Codes"],
              ["63", "Wheel Styles"],
              ["7", "Vehicle Classes"],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-accent text-lg font-black tracking-tight leading-none">
                  {val}
                </div>
                <div className="text-white/25 text-[8px] uppercase tracking-widest mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/car-builder")}
            className="group inline-flex items-center gap-4 border border-accent/60 bg-accent/8 hover:bg-accent/15 hover:border-accent px-8 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-accent transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.08)] hover:shadow-[0_0_30px_rgba(212,175,55,0.18)]"
          >
            Launch Builder
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">
              →
            </span>
          </button>
        </div>

        <div
          onClick={() => navigate("/car-builder")}
          className="w-full lg:w-80 flex flex-col items-center justify-center p-12 relative min-h-62.5 cursor-pointer group overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d0d0d 0%, #111008 100%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute inset-y-0 left-1/2 w-px bg-linear-to-b from-transparent via-accent/40 to-transparent" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />
          </div>

          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/40 group-hover:border-accent/70 transition-colors duration-300" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/40 group-hover:border-accent/70 transition-colors duration-300" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-accent/40 group-hover:border-accent/70 transition-colors duration-300" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-accent/40 group-hover:border-accent/70 transition-colors duration-300" />

          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300 pointer-events-none" />

          <span
            className="text-9xl font-black italic tracking-tighter leading-none select-none group-hover:opacity-80 transition-opacity duration-300"
            style={{
              color: "rgba(212,175,55,0.35)",
              textShadow:
                "0 0 80px rgba(212,175,55,0.2), 0 0 20px rgba(212,175,55,0.1)",
            }}
          >
            SC
          </span>

          {/* CTA label */}
          <div className="mt-6 border border-accent/50 group-hover:border-accent bg-black/50 group-hover:bg-accent/10 px-5 py-2 transition-all duration-200">
            <span className="text-accent/80 group-hover:text-accent text-[10px] font-black uppercase tracking-[0.25em] whitespace-nowrap transition-colors duration-200">
              Open Builder →
            </span>
          </div>

          <span className="mt-5 text-accent/35 group-hover:text-accent/60 transition-colors duration-200 text-[8px] font-bold tracking-[0.6em] uppercase">
            Stella Protocol
          </span>
        </div>
      </div>
    </div>
  );
}
