import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const TERMINAL_LINES = [
  { delay: 0,    text: "> BEFF SYSTEM BOOT",            color: "rgba(212,175,55,0.9)" },
  { delay: 120,  text: "> loading slot registry...",     color: "rgba(212,175,55,0.5)" },
  { delay: 280,  text: "  [OK] TOPS       — 48 draws",  color: "rgba(255,255,255,0.3)" },
  { delay: 400,  text: "  [OK] TORSO      — 36 draws",  color: "rgba(255,255,255,0.3)" },
  { delay: 520,  text: "  [OK] LEGS       — 29 draws",  color: "rgba(255,255,255,0.3)" },
  { delay: 640,  text: "  [OK] SHOES      — 31 draws",  color: "rgba(255,255,255,0.3)" },
  { delay: 760,  text: "  [OK] ACCESSORIES— 17 draws",  color: "rgba(255,255,255,0.3)" },
  { delay: 900,  text: "> scanning textures...",         color: "rgba(212,175,55,0.5)" },
  { delay: 1060, text: "  C1 DRIVE  verified",          color: "rgba(100,220,130,0.7)" },
  { delay: 1180, text: "  C2 DRIVE  verified",          color: "rgba(100,220,130,0.7)" },
  { delay: 1320, text: "> gender index loaded",          color: "rgba(255,255,255,0.3)" },
  { delay: 1460, text: "  MALE    ready",                color: "rgba(255,255,255,0.25)" },
  { delay: 1540, text: "  FEMALE  ready",                color: "rgba(255,255,255,0.25)" },
  { delay: 1680, text: "> flip map compiled",            color: "rgba(212,175,55,0.5)" },
  { delay: 1820, text: "> companion links resolved",     color: "rgba(212,175,55,0.5)" },
  { delay: 1980, text: "------------------------------", color: "rgba(212,175,55,0.15)" },
  { delay: 2060, text: "  STATUS: READY",                color: "rgba(212,175,55,0.95)" },
];

function TerminalPanel() {
  const ref = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    timers.current.forEach(clearTimeout);
    timers.current = [];

    TERMINAL_LINES.forEach(({ delay, text, color }) => {
      const t = setTimeout(() => {
        const line = document.createElement("div");
        line.style.cssText = [
          `color:${color}`,
          "white-space:pre",
          "font-size:9px",
          "line-height:1.75",
          "font-family:ui-monospace,SFMono-Regular,monospace",
          "letter-spacing:.04em",
          "opacity:0",
          "transition:opacity 100ms ease",
        ].join(";");
        line.textContent = text;
        el.appendChild(line);
        requestAnimationFrame(() => { line.style.opacity = "1"; });
        el.scrollTop = el.scrollHeight;
      }, delay);
      timers.current.push(t);
    });

    const cursorEl = document.createElement("div");
    cursorEl.style.cssText = [
      "margin-top:6px",
      "display:inline-block",
      "width:7px",
      "height:11px",
      "background:rgba(212,175,55,0.8)",
      "animation:beff-blink 1s step-end infinite",
    ].join(";");
    const ct = setTimeout(() => { if (ref.current) ref.current.appendChild(cursorEl); }, 2200);
    timers.current.push(ct);

    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <div
      ref={ref}
      style={{ scrollbarWidth: "none", overflow: "hidden" }}
    />
  );
}

export default function BeffHero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full bg-[#0a0a0a] border border-accent/30 mb-20 overflow-hidden">
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.15) 50%, transparent 50%)",
          backgroundSize: "100% 4px",
        }}
      />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-24 bg-accent/5 blur-2xl pointer-events-none" />

      <style>{`@keyframes beff-blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch">

        {/* ── Left: copy + stats ── */}
        <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/8 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <div className="absolute inset-0 w-1.5 h-1.5 bg-accent rounded-full animate-ping opacity-40" />
            </div>
            <span className="text-accent/70 text-[8px] font-bold uppercase tracking-[0.5em]">
              Outfit Module: v.01 — Active
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-3 italic leading-none">
            BEFF
          </h1>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic leading-none">
            <span className="text-accent">Component Index</span>
          </h1>

          <p className="text-white/35 text-[10px] uppercase tracking-widest leading-relaxed mb-10 max-w-xs">
            Browse drawable slots, textures, and flip configurations.
            Identify components before executing the outfit protocol.
          </p>

          <div className="flex gap-8 mb-10">
            {[
              ["2", "Genders"],
              ["11", "Slot Types"],
              ["C1/C2", "Color Drives"],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="text-accent text-lg font-black tracking-tight leading-none">{val}</div>
                <div className="text-white/25 text-[8px] uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/beff/components")}
            className="group inline-flex items-center gap-4 border border-accent/60 bg-accent/8 hover:bg-accent/15 hover:border-accent px-8 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-accent transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.08)] hover:shadow-[0_0_30px_rgba(212,175,55,0.18)]"
          >
            Browse Components
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </button>
        </div>

        {/* ── Right: terminal panel ── */}
        <div
          onClick={() => navigate("/beff/components")}
          className="w-full lg:w-80 relative cursor-pointer group overflow-hidden min-h-72 lg:min-h-0 flex flex-col"
          style={{ background: "linear-gradient(160deg, #080d08 0%, #060906 100%)" }}
        >
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/40 group-hover:border-accent/70 transition-colors duration-300 z-10 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/40 group-hover:border-accent/70 transition-colors duration-300 z-10 pointer-events-none" />
          <div className="absolute bottom-12 left-3 w-4 h-4 border-b border-l border-accent/40 group-hover:border-accent/70 transition-colors duration-300 z-10 pointer-events-none" />
          <div className="absolute bottom-12 right-3 w-4 h-4 border-b border-r border-accent/40 group-hover:border-accent/70 transition-colors duration-300 z-10 pointer-events-none" />

          {/* Hover tint */}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/4 transition-colors duration-300 pointer-events-none" />

          {/* Chrome bar */}
          <div className="flex items-center gap-1.5 px-6 pt-5 pb-2 border-b border-white/6 shrink-0">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <span className="ml-2 text-[8px] font-mono text-white/20 uppercase tracking-widest">
              beff_index.sys
            </span>
          </div>

          {/* Output area */}
          <div className="flex-1 px-5 py-4 pb-12">
            <TerminalPanel />
          </div>

          {/* Bottom strip */}
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-5 py-3 border-t border-white/6 bg-black/70">            <span className="text-accent/30 group-hover:text-accent/55 transition-colors duration-200 text-[8px] font-bold tracking-[0.6em] uppercase">
              Outfit Protocol
            </span>
            <span className="text-accent/70 group-hover:text-accent text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-200">
              Open Index →
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}