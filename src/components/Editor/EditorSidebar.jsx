import { Eye, EyeOff, Disc, Pipette, Shuffle } from "lucide-react";

export const EditorSidebar = ({
  config,
  setRim,
  setWheelStyle,
  setWheelCategory,
  wheelCategory,
  lists,
  wheelStyles,
  setPrimary,
  setSecondary,
  crewVisible,
  setCrewVisible,
  setCrewColor,
  crewColor,
  crewTarget,
  setCrewTarget,
}) => {
  const allColors = Array.isArray(lists) ? lists : [];
  const rimPaintList = allColors.filter((c) => c.obtainable_rim === "No");
  const currentCategoryWheels = wheelStyles?.[wheelCategory] || [];

  const getBackground = (colorObj) => {
    if (!colorObj || !colorObj.hex) return "#111";
    const hex = colorObj.hex.toString().replace(/;+$/, "");
    return hex.includes("gradient") || hex.includes("linear")
      ? hex
      : `#${hex.replace("#", "")}`;
  };

  // --- RANDOMIZER LOGIC ---
  const handleRandomize = () => {
    const textures = allColors.filter(
      (c) => c.obtainable_primary === "No" || c.isTexture,
    );
    const randomTexture = textures[Math.floor(Math.random() * textures.length)];
    const randomRim =
      rimPaintList[Math.floor(Math.random() * rimPaintList.length)];

    const categories = Object.keys(wheelStyles);
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const wheelsInCat = wheelStyles[randomCat];
    const randomWheel =
      wheelsInCat[Math.floor(Math.random() * wheelsInCat.length)];

    const randomRGB = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

    setPrimary?.(randomTexture);
    setSecondary?.(randomTexture);
    setRim?.(randomRim);
    setCrewColor?.(randomRGB);
    setWheelCategory?.(randomCat);
    setWheelStyle?.(randomWheel);
    setCrewVisible?.(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. CREW RGB OVERLAY (Prominent State) */}
      <div
        className={`transition-all duration-500 rounded-sm border p-4 shadow-xl ${
          crewVisible
            ? "bg-[#111] border-yellow-500/50 ring-1 ring-yellow-500/20"
            : "bg-[#0d0d0d] border-white/5 opacity-80"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <h3
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                crewVisible ? "text-yellow-500" : "text-gray-500"
              }`}
            >
              Custom Crew RGB
            </h3>
            {crewVisible && (
              <span className="text-[8px] text-yellow-500/50 animate-pulse font-bold uppercase">
                Overlay Active
              </span>
            )}
          </div>
          <button
            onClick={() => setCrewVisible?.(!crewVisible)}
            className={`p-2 rounded-full transition-all ${
              crewVisible
                ? "bg-yellow-500 text-black scale-110 shadow-lg"
                : "bg-white/10 text-gray-500"
            }`}
          >
            {crewVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>

        <div className="space-y-4">
          <select
            value={crewTarget}
            onChange={(e) => setCrewTarget?.(e.target.value)}
            className="w-full bg-[#151515] border border-white/10 text-white text-[9px] uppercase font-black p-3 outline-none focus:border-yellow-500 cursor-pointer"
          >
            <option value="both">Apply RGB to All Textures</option>
            <option value="primary">Apply RGB to Primary Only</option>
            <option value="secondary">Apply RGB to Secondary Only</option>
          </select>

          <div
            className={`relative w-full h-14 rounded-sm border transition-all overflow-hidden ${
              crewVisible ? "border-white/40" : "border-white/10"
            }`}
          >
            <input
              type="color"
              value={crewColor || "#000000"}
              onChange={(e) => setCrewColor?.(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
            />
            <div className="absolute inset-0 flex items-center justify-center text-[11px] font-mono z-10 pointer-events-none text-white mix-blend-difference font-bold tracking-widest">
              {crewColor?.toUpperCase()}
            </div>
            <div
              className="h-full w-full"
              style={{ backgroundColor: crewColor }}
            />
          </div>
        </div>
      </div>

      {/* 2. RIM FINISH */}
      <div className="bg-[#0d0d0d] border border-white/5 p-4 rounded-sm shadow-xl">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 flex items-center gap-2">
          <Pipette size={12} className="text-yellow-500" /> Rim Finish (Mod
          Only)
        </h3>
        <div className="grid grid-cols-6 gap-1.5 max-h-52.5 overflow-y-auto custom-scrollbar p-1">
          {rimPaintList.map((color) => (
            <button
              key={`rim-${color.id}`}
              onClick={() => setRim?.(color)}
              className={`aspect-square rounded-sm border transition-all ${
                config?.rim?.id === color.id
                  ? "border-yellow-500 scale-110 z-10 shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
              style={{ background: getBackground(color) }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* 3. WHEEL STYLE SELECTION */}
      <div className="bg-[#0d0d0d] border border-white/10 p-4 rounded-sm shadow-xl">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
          <Disc size={14} /> Wheel Selection
        </h3>
        <select
          value={wheelCategory}
          onChange={(e) => setWheelCategory?.(e.target.value)}
          className="w-full bg-[#151515] border border-white/10 text-white text-[9px] uppercase font-black p-2.5 mb-4 outline-none focus:border-yellow-500"
        >
          {wheelStyles &&
            Object.keys(wheelStyles).map((key) => (
              <option key={key} value={key}>
                {key.replace(/_/g, " ").toUpperCase()}
              </option>
            ))}
        </select>

        <div className="grid grid-cols-3 gap-2.5 max-h-65 overflow-y-auto pr-2 custom-scrollbar">
          {currentCategoryWheels.map((wheel, idx) => (
            <button
              key={wheel?.id || idx}
              onClick={() => setWheelStyle?.(wheel)}
              className={`relative aspect-square bg-[#111] rounded border transition-all p-1 flex items-center justify-center ${
                config?.wheelStyle?.name === wheel?.name
                  ? "border-yellow-500 bg-yellow-500/5"
                  : "border-white/5 hover:border-white/20"
              }`}
            >
              <img
                src={wheel?.img || "/no-stock.png"}
                alt={wheel?.name}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>

      {/* 4. RANDOMIZE ACTION */}
      <button
        onClick={handleRandomize}
        className="w-full group bg-white hover:bg-yellow-500 text-black py-4 rounded-sm flex items-center justify-center gap-3 transition-all duration-300"
      >
        <Shuffle
          size={16}
          className="group-hover:rotate-180 transition-transform duration-500"
        />
        <span className="text-[11px] font-black uppercase tracking-widest">
          Randomize Build
        </span>
      </button>
    </div>
  );
};
