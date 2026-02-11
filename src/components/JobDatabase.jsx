import {
  ChevronDown,
  Search,
  Terminal,
  ExternalLink,
  Zap,
} from "lucide-react";

export default function JobDatabase({
  database,
  activePlatform,
  setActivePlatform,
  searchQuery,
  setSearchQuery,
  openCategories,
  toggleCategory,
  filteredCategories,
}) { 
  
  const getPlatformTheme = (platformName) => {
    const name = platformName?.toLowerCase() || "";
    if (name.includes("ps") || name.includes("playstation")) {
      return {
        hex: "#006FCD",
        glow: "rgba(59, 130, 246, 0.3)",
        bg: "bg-blue-500",
      };
    }
    if (name.includes("xbox")) {
      return {
        hex: "#107C11", 
        glow: "rgba(34, 197, 94, 0.3)",
        bg: "bg-green-500",
      };
    }
    return {
      hex: "#d4af37",
      glow: "rgba(212, 175, 55, 0.3)",
      bg: "bg-[#d4af37]",
    };
  };

  const currentTheme = getPlatformTheme(activePlatform);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <div
            className="flex items-center gap-3 mb-2"
            style={{ color: currentTheme.hex }}
          >
            <Terminal size={14} />
            <span className="text-[8px] font-bold tracking-[0.5em] uppercase">
              Intelligence Network
            </span>
          </div>
          <h2 className="text-white text-4xl font-black uppercase tracking-tighter italic leading-none">
            Modded /{" "}
            <span style={{ color: currentTheme.hex }}>Useful Links</span>
          </h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-3">
            <span
              className="w-6 h-px"
              style={{ backgroundColor: currentTheme.hex }}
            ></span>
            ENTRY PROTOCOL: {activePlatform}
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full lg:w-96 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white"
            size={16}
          />
          <input
            type="text"
            placeholder="FILTER INTEL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-white/10 pl-12 pr-4 py-4 text-[10px] text-white focus:outline-none transition-all uppercase tracking-widest font-bold"
            style={{
              borderBottom: `2px solid ${
                searchQuery ? currentTheme.hex : "transparent"
              }`,
            }}
          />
        </div>
      </div>

      {/* PLATFORM SELECTOR */}
      <div className="flex flex-wrap gap-3">
        {database.map((plat) => {
          const isActive = activePlatform === plat.platform;
          const platTheme = getPlatformTheme(plat.platform);

          return (
            <button
              key={plat.platform}
              onClick={() => setActivePlatform(plat.platform)}
              className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 border ${
                isActive
                  ? "text-black border-transparent shadow-2xl"
                  : "bg-transparent text-gray-500 border-white/5 hover:border-white/20 hover:text-white"
              }`}
              style={{
                backgroundColor: isActive ? platTheme.hex : "transparent",
                boxShadow: isActive ? `0 0 30px ${platTheme.glow}` : "none",
                borderColor: isActive ? platTheme.hex : "rgba(255,255,255,0.05)",
              }}
            >
              {plat.platform}
            </button>
          );
        })}
      </div>

      {/* CATEGORIES */}
      <div className="space-y-6">
        {filteredCategories?.map((cat, i) => {
          const isOpen = openCategories.includes(cat.name) || searchQuery.length > 0;

          return (
            <div
              key={i}
              className="border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(cat.name)}
                className="w-full flex items-center justify-between p-8 hover:bg-white/2 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: currentTheme.hex }}
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="text-white text-sm font-black uppercase tracking-[0.4em]">
                    {cat.name}
                  </h3>
                </div>
                <ChevronDown
                  style={{ color: isOpen ? currentTheme.hex : "#4b5563" }}
                  className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  size={20}
                />
              </button>

              {isOpen && (
                <div className="p-8 pt-0 animate-in fade-in slide-in-from-top-4 duration-500">
                  {cat.protocol && (
                    <div
                      className="mb-8 p-5 bg-white/1 border-l-4"
                      style={{ borderColor: currentTheme.hex }}
                    >
                      <p className="text-gray-300 text-[11px] uppercase tracking-wider italic leading-relaxed">
                        {cat.protocol}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.links.map((link, j) => (
                      <a
                        key={j}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link flex justify-between items-center bg-[#0d0d0d] border border-white/5 p-5 hover:bg-[#151515] transition-all relative"
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 w-0 group-hover/link:w-0.75 transition-all duration-300"
                          style={{ backgroundColor: currentTheme.hex }}
                        ></div>
                        <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest group-hover/link:text-white transition-colors">
                          {link.title}
                        </span>
                        <div className="flex items-center gap-3">
                          {link.hot && (
                            <div
                              className="flex items-center gap-1 px-2 py-0.5 animate-pulse"
                              style={{ backgroundColor: currentTheme.hex }}
                            >
                              <Zap size={8} className="text-black" fill="currentColor" />
                              <span className="text-[7px] text-black font-black uppercase">HOT</span>
                            </div>
                          )}
                          <ExternalLink
                            size={12}
                            className="text-gray-700 group-hover/link:text-white transition-colors"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}