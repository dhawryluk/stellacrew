import { useState, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CarPreview from "../components/Editor/CarPreview";
import { EditorSidebar } from "../components/Editor/EditorSidebar";

// DATABASE is a flat array of color objects
import DATABASE from "../data/vehicle_colors.json";
import WHEELS_DATABASE from "../data/wheels_list.json";

const CarColorEditor = () => {
  // --- 1. STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("primary");
  const [activeType, setActiveType] = useState("Metallic");
  const [showOnlyTextures, setShowOnlyTextures] = useState(false);
  const [isLinked, setIsLinked] = useState(true);
  const [crewVisible, setCrewVisible] = useState(true);
  const [crewTarget, setCrewTarget] = useState("both");

  // Wheel State
  const initialCategory = Object.keys(WHEELS_DATABASE)[0] || "bennys_originals";
  const [wheelCategory, setWheelCategory] = useState(initialCategory);
  const [wheelStyle, setWheelStyle] = useState(
    WHEELS_DATABASE[initialCategory]?.[0] || {
      name: "Stock",
      img: "/no-stock.png",
    },
  );

  // Default Color Selections (Using IDs based on standard modder defaults)
  const [primary, setPrimary] = useState(
    DATABASE.find((c) => c.id === 0) || DATABASE[0],
  );
  const [secondary, setSecondary] = useState(
    DATABASE.find((c) => c.id === 0) || DATABASE[0],
  );
  const [pearl, setPearl] = useState(
    DATABASE.find((c) => c.name === "None") || {
      name: "None",
      hex: "transparent",
      id: -1,
    },
  );
  const [rim, setRim] = useState(
    DATABASE.find((c) => c.id === 156) || DATABASE[0],
  );
  const [crewColor, setCrewColor] = useState("#FF00FF");

  // --- 2. HELPERS & LOGIC ---
  const formatHex = (hex) => {
    if (!hex || hex === "transparent") return "transparent";
    let clean = hex.toString().trim().replace(/;+$/, "");
    if (
      !clean.includes("gradient") &&
      !clean.includes("rgb") &&
      !clean.startsWith("#")
    ) {
      clean = `#${clean}`;
    }
    return clean;
  };

  // Filter DATABASE for "No" values as requested (Modded/Unobtainable only)
  const currentTabList = useMemo(() => {
    switch (activeTab) {
      case "primary":
        return DATABASE.filter(
          (c) => c.obtainable_primary === "No" || c.isTexture === true,
        );
      case "secondary":
        return DATABASE.filter((c) => c.obtainable_secondary === "No");
      case "pearls":
        return DATABASE.filter((c) => c.obtainable_pearlescent === "No");
      default:
        return DATABASE;
    }
  }, [activeTab]);

  const availableTypes = useMemo(() => {
    return [...new Set(currentTabList.map((item) => item.type))].filter(
      Boolean,
    );
  }, [currentTabList]);

  // Sync the UI type (Metallic, Utility, etc) when tabs change
  useEffect(() => {
    if (availableTypes.length > 0 && !availableTypes.includes(activeType)) {
      setActiveType(availableTypes[0]);
    }
  }, [availableTypes, activeType]);

  const filteredList = useMemo(() => {
    return currentTabList.filter(
      (item) =>
        item.type === activeType && (!showOnlyTextures || item.isTexture),
    );
  }, [currentTabList, activeType, showOnlyTextures]);

  const handleColorSelect = (color) => {
    if (activeTab === "primary") {
      setPrimary(color);
      if (isLinked) setSecondary(color);
    } else if (activeTab === "secondary") {
      setSecondary(color);
    } else if (activeTab === "pearls") {
      setPearl(color);
    }
  };

  const config = useMemo(
    () => ({
      primary: { ...primary, hex: formatHex(primary.hex) },
      secondary: { ...secondary, hex: formatHex(secondary.hex) },
      pearl: { ...pearl, hex: formatHex(pearl.hex) },
      rim: { ...rim, hex: formatHex(rim.hex) },
      crew: { hex: crewColor },
      wheelStyle: wheelStyle,
    }),
    [primary, secondary, pearl, rim, crewColor, wheelStyle],
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
        <header className="mb-8 border-b border-white/5 pb-6">
          <Link
            to="/"
            className="text-[10px] text-gray-500 hover:text-yellow-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-2"
          >
            <ArrowLeft size={14} /> Back to Database
          </Link>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            SCG <span className="text-yellow-500">Architect</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN PREVIEW & COLOR GRID */}
          <div className="lg:col-span-8 space-y-4">
            <CarPreview
              config={config}
              crewVisible={crewVisible}
              crewTarget={crewTarget}
            />

            <div className="bg-[#0d0d0d] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
              <div className="flex border-b border-white/5 bg-[#0a0a0a]">
                {["primary", "secondary", "pearls"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? "bg-yellow-500 text-black"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    {tab === "pearls" ? "Pearl" : tab}
                  </button>
                ))}
              </div>

              {/* Type Filter (Metallic, Chameleon, etc) */}
              <div className="flex gap-2 p-4 bg-[#0d0d0d] border-b border-white/5 overflow-x-auto no-scrollbar">
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter border transition-all whitespace-nowrap ${
                      activeType === type
                        ? "bg-white text-black border-white"
                        : "border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Color Selection Grid */}
              <div className="p-6 h-[400px] overflow-y-auto bg-[#111111] custom-scrollbar">
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10 gap-3">
                  {filteredList.map((color) => {
                    const currentId =
                      activeTab === "secondary"
                        ? secondary.id
                        : activeTab === "pearls"
                          ? pearl.id
                          : primary.id;
                    return (
                      <button
                        key={`${color.id}-${color.name}`}
                        onClick={() => handleColorSelect(color)}
                        className={`relative w-full aspect-square rounded-md transition-all border border-white/10 ${
                          currentId === color.id
                            ? "ring-2 ring-yellow-500 ring-offset-2 ring-offset-[#111111] z-10"
                            : "hover:border-white/40"
                        }`}
                        style={{ background: formatHex(color.hex) }}
                        title={`${color.name} (#${color.id})`}
                      >
                        {color.isTexture && (
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACTIVE SELECTION FOOTER */}
              <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-sm border border-white/20"
                    style={{
                      background:
                        config[activeTab === "pearls" ? "pearl" : activeTab]
                          .hex,
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase font-bold">
                      {activeType}
                    </span>
                    <span className="text-sm font-black italic uppercase text-yellow-500">
                      {
                        config[activeTab === "pearls" ? "pearl" : activeTab]
                          .name
                      }
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsLinked(!isLinked)}
                    className={`text-[9px] font-black px-5 py-2 border rounded-full transition-all ${
                      isLinked
                        ? "bg-white text-black border-white"
                        : "text-gray-500 border-gray-800"
                    }`}
                  >
                    LINK P+S
                  </button>
                  <button
                    onClick={() => setShowOnlyTextures(!showOnlyTextures)}
                    className={`text-[9px] font-black px-5 py-2 border rounded-full transition-all ${
                      showOnlyTextures
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "text-gray-500 border-gray-800"
                    }`}
                  >
                    TEXTURES ONLY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4">
            <EditorSidebar
              config={config}
              lists={DATABASE}
              wheelStyles={WHEELS_DATABASE}
              setRim={setRim}
              setPrimary={setPrimary}
              setSecondary={setSecondary}
              wheelCategory={wheelCategory}
              setWheelCategory={setWheelCategory}
              setWheelStyle={setWheelStyle}
              crewVisible={crewVisible}
              setCrewVisible={setCrewVisible}
              crewColor={crewColor}
              setCrewColor={setCrewColor}
              crewTarget={crewTarget}
              setCrewTarget={setCrewTarget}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarColorEditor;
