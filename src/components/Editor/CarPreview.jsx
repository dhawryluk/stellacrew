export default function CarPreview({
  config,
  crewVisible,
  crewTarget = "both",
}) {
  const wheelImg = config.wheelStyle?.img || "/no-stock.png";

  // Helper to handle standard hex and chameleon gradients
  const getBackground = (colorObj) => {
    if (!colorObj || !colorObj.hex) return "#111";
    const hex = colorObj.hex.toString().replace(/;+$/, "");

    // If it's a Chameleon/Gradient string, return as is.
    // Otherwise, ensure it has a single # prefix.
    return hex.includes("gradient") || hex.includes("linear")
      ? hex
      : `#${hex.replace("#", "")}`;
  };

  const showCrewOnPrimary =
    crewVisible && (crewTarget === "primary" || crewTarget === "both");
  const showCrewOnSecondary =
    crewVisible && (crewTarget === "secondary" || crewTarget === "both");

  return (
    <div className="relative w-full aspect-[21/9] bg-[#050505] rounded-sm border border-white/5 overflow-hidden shadow-2xl">
      {/* GLOBAL CARBON TEXTURE */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* SPECULAR HIGHLIGHTS */}
      <div className="absolute inset-0 z-40 pointer-events-none opacity-30 mix-blend-screen bg-linear-to-tr from-transparent via-white/20 to-transparent"></div>

      <div className="flex flex-col h-full w-full">
        {/* PRIMARY BLOCK: THE "BASE TEXTURE" (e.g. MP100 #160) */}
        <div
          className="relative flex-1 flex items-start p-4 transition-all duration-700"
          style={{
            background: getBackground(config.primary),
          }}
        >
          {/* CREW OVERLAY: Mimics the Save Editor custom RGB overlaying the base texture */}
          {showCrewOnPrimary && (
            <div
              className="absolute inset-0 z-20 mix-blend-multiply opacity-90"
              style={{ backgroundColor: config.crew.hex }}
            />
          )}

          <div className="absolute inset-0 z-20 opacity-30 mix-blend-soft-light bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <span className="relative z-50 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 italic">
            {showCrewOnPrimary ? "CREW OVERLAY ACTIVE" : "PRIMARY BASE"}
          </span>
        </div>

        {/* SECONDARY BLOCK */}
        <div
          className="relative flex-1 flex items-start p-4 border-t-2 border-black/60 transition-all duration-700"
          style={{
            background: getBackground(config.secondary),
          }}
        >
          {showCrewOnSecondary && (
            <div
              className="absolute inset-0 z-20 mix-blend-multiply opacity-80"
              style={{ backgroundColor: config.crew.hex }}
            />
          )}
          <span className="relative z-50 text-[10px] font-black uppercase tracking-[0.4em] text-white/60 italic">
            {showCrewOnSecondary ? "CREW OVERLAY ACTIVE" : "SECONDARY BASE"}
          </span>
        </div>
      </div>

      {/* PEARLESCENT LAYER */}
      {config.pearl?.hex && config.pearl.hex !== "transparent" && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-all duration-700"
          style={{
            background: `linear-gradient(135deg, transparent 0%, #${config.pearl.hex.replace(
              "#",
              "",
            )}66 50%, transparent 100%)`,
            mixBlendMode: "screen",
            opacity: 0.6,
          }}
        />
      )}

      {/* THE WHEEL UNIT (Optimized for Benny's/Bespoke) */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 z-50 scale-110">
        <div className="relative">
          {/* RIM COLOR RING - Handles gradients or flat colors */}
          <div
            className="absolute inset-0 -m-2.5 rounded-full z-10"
            style={{
              background: getBackground(config.rim),
              padding: "10px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
            }}
          />
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-[#080808] overflow-hidden flex items-center justify-center shadow-2xl relative">
            <img
              src={wheelImg}
              className="w-full h-full object-contain z-20"
              alt="Wheel"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/200x200/111/EAB308?text=MOD+WHEEL";
              }}
            />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,1)] z-30 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
