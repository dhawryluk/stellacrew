import React, { useState } from "react";
import {
  ChevronDown,
  LayoutGrid,
  Terminal,
  Hash,
} from "lucide-react";

export default function GarageManifest() {
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    { char: "Michael", loc: "Vinewood", slot: "4", dm: "1" },
    { char: "Franklin", loc: "Grove Street", slot: "4", dm: "2" },
    { char: "Trevor", loc: "Pillbox", slot: "4", dm: "3" },
    { char: "Michael", loc: "Vinewood", slot: "3", dm: "4" },
    { char: "Michael", loc: "Vinewood", slot: "2", dm: "5" },
    { char: "Michael", loc: "Vinewood", slot: "1", dm: "6" },
    { char: "Franklin", loc: "Grove Street", slot: "3", dm: "7" },
    { char: "Franklin", loc: "Grove Street", slot: "2", dm: "8" },
    { char: "Franklin", loc: "Grove Street", slot: "1", dm: "9" },
    { char: "Trevor", loc: "Pillbox", slot: "3", dm: "10" },
    { char: "Trevor", loc: "Pillbox", slot: "2", dm: "11" },
    { char: "Trevor", loc: "Pillbox", slot: "1", dm: "12" },
    { char: "Franklin", loc: "Hangar", slot: "1", dm: "13" },
    { char: "Michael", loc: "Hangar", slot: "1", dm: "14" },
    { char: "Trevor", loc: "Hangar", slot: "1", dm: "15" },
    { char: "Franklin", loc: "Helipad", slot: "1", dm: "16" },
    { char: "Michael", loc: "Helipad", slot: "1", dm: "17" },
    { char: "Trevor", loc: "Helipad", slot: "1", dm: "18" },
    { char: "Franklin", loc: "Marina", slot: "1", dm: "19" },
    { char: "Michael", loc: "Marina", slot: "1", dm: "20" },
    { char: "Trevor", loc: "Marina", slot: "1", dm: "21" },
  ];

  // Refined palette-sync character logic
  const getCharStyles = (char) => {
    if (char === "Michael") return "text-text-main/90 font-black border-l-2 border-text-main/20 pl-2";
    if (char === "Franklin") return "text-accent2 font-black border-l-2 border-accent2/20 pl-2";
    if (char === "Trevor") return "text-accent font-black border-l-2 border-accent/20 pl-2";
    return "text-text-main/40 pl-2";
  };

  return (
    <div className="mb-24 px-4 max-w-7xl mx-auto">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex flex-col">
          <span className="text-accent text-[8px] font-bold tracking-[0.4em] mb-1">
            INDEXING
          </span>
          <h2 className="text-text-main text-lg font-black uppercase tracking-[0.3em] whitespace-nowrap">
            Vehicle Manifest
          </h2>
        </div>
        <div className="h-px grow bg-linear-to-r from-accent/40 via-text-main/5 to-transparent"></div>
      </div>

      {/* ACCORDION BOX */}
      <div className="border border-white/5 bg-bg/80 backdrop-blur-sm shadow-2xl overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-8 hover:bg-white/2 transition-all group border-b border-white/5"
        >
          <div className="flex items-center gap-6">
            <div
              className={`p-3 rounded-full transition-all duration-500 ${
                isOpen ? "bg-accent text-bg" : "bg-white/5 text-accent"
              }`}
            >
              <LayoutGrid size={18} />
            </div>
            <div className="text-left">
              <h3 className="text-text-main text-sm font-black uppercase tracking-[0.5em]">
                DM Garage Slot Manifest
              </h3>
              <p className="text-text-main/40 text-[9px] uppercase tracking-widest mt-1">
                Sequential Slot Verification Active
              </p>
            </div>
          </div>
          <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
            <ChevronDown className={isOpen ? "text-accent" : "text-text-main/20"} size={20} />
          </div>
        </button>

        {isOpen && (
          <div className="p-8 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* INSTRUCTION BOX */}
            <div className="mb-8 p-5 bg-accent/5 border-l-4 border-accent relative">
              <div className="flex items-start gap-4">
                <Terminal size={16} className="text-accent mt-1 shrink-0" />
                <p className="text-text-main/70 text-[11px] uppercase tracking-widest leading-relaxed">
                  <span className="text-accent font-black mr-2">INDEX PROTOCOL:</span>
                  Drop vehicles in the following order.{" "}
                  <span className="text-text-main font-bold">Slot #01</span> represents the top of the menu. 
                  Follow sequence to avoid parity errors.
                </p>
              </div>
            </div>

            {/* TABLE CONTAINER */}
            <div className="bg-[#0a0a0a] border border-white/5 shadow-inner">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-white/3 py-4 px-6 text-[9px] font-black uppercase tracking-[0.3em] text-accent/80 border-b border-white/5">
                <span>DM Slot</span>
                <span>Character</span>
                <span>Location</span>
                <span className="text-right">Pos. ID</span>
              </div>

              {/* Rows */}
              <div className="max-h-125 overflow-y-auto custom-scrollbar">
                {data.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 py-4 px-6 bg-transparent border-b border-white/3 items-center hover:bg-white/2 transition-all group"
                  >
                    {/* DM Slot */}
                    <div className="flex items-center gap-2">
                      <Hash size={10} className="text-accent/20 group-hover:text-accent transition-colors" />
                      <span className="font-mono text-text-main text-xs font-bold tracking-tighter">
                        {item.dm.padStart(2, "0")}
                      </span>
                    </div>

                    {/* Character Name */}
                    <span className={`text-[10px] uppercase tracking-wider transition-all ${getCharStyles(item.char)}`}>
                      {item.char}
                    </span>

                    {/* Location */}
                    <span className="text-text-main/40 text-[10px] uppercase tracking-widest font-medium group-hover:text-text-main/80 transition-colors">
                      {item.loc}
                    </span>

                    {/* Garage Position */}
                    <div className="text-right">
                      <span className="inline-block bg-bg border border-accent/20 px-3 py-1 font-mono text-accent text-[11px] font-black group-hover:border-accent group-hover:shadow-[0_0_10px_rgba(212,175,55,0.1)] transition-all">
                        [{item.slot}]
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};