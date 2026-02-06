import { useState } from "react";
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

  const getCharStyles = (char) => {
    if (char === "Michael") return "text-text-main/90 font-black border-l-2 border-text-main/20 pl-2";
    if (char === "Franklin") return "text-accent2 font-black border-l-2 border-accent2/20 pl-2";
    if (char === "Trevor") return "text-accent font-black border-l-2 border-accent/20 pl-2";
    return "text-text-main/40 pl-2";
  };

  return (
    <div className="mb-24 px-4 max-w-7xl mx-auto font-sans">
      {/* SECTION HEADER - SYNCED WITH REPOSITORY */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex flex-col">
          <span className="text-accent text-[8px] font-black tracking-[0.5em] mb-1">
            INDEXING_PROTOCOL
          </span>
          <h2 className="text-text-main text-2xl font-black uppercase tracking-tighter italic leading-none">
            Vehicle <span className="text-accent/50">Manifest</span>
          </h2>
        </div>
        <div className="h-px grow bg-gradient-to-r from-accent/40 via-white/5 to-transparent"></div>
      </div>

      {/* ACCORDION BOX */}
      <div className="border border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md shadow-2xl overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-10 hover:bg-white/[0.02] transition-all group"
        >
          <div className="flex items-center gap-8">
            <div className={`relative transition-all duration-500 ${
              isOpen ? "text-accent scale-110" : "text-text-main/20"
            }`}>
              <LayoutGrid size={24} strokeWidth={1.5} />
              {isOpen && <div className="absolute inset-0 blur-lg bg-accent/30 animate-pulse"></div>}
            </div>
            
            <div className="text-left">
              <h3 className="text-text-main text-[11px] font-black uppercase tracking-[0.6em] leading-tight mb-2">
                DM Garage Slot Manifest <span className="text-accent/40 text-[9px]">v1.0</span>
              </h3>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-accent/30"></span>
                <p className="text-text-main/30 text-[9px] uppercase tracking-widest font-bold italic">
                   Status: {isOpen ? "Manifest Decrypted" : "Sequential Standby"}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`p-2 border border-white/5 transition-all duration-300 ${
            isOpen ? "bg-accent border-transparent rotate-180" : "bg-transparent"
          }`}>
            <ChevronDown className={isOpen ? "text-bg" : "text-text-main/40"} size={16} />
          </div>
        </button>

        {isOpen && (
          <div className="p-10 pt-0 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="border-t border-white/5 pt-10">
              
              {/* INSTRUCTION BOX */}
              <div className="mb-10 p-6 bg-accent/[0.03] border border-accent/20 relative">
                <div className="absolute top-0 right-0 w-2 h-2 bg-accent/20"></div>
                <div className="flex items-start gap-5">
                  <Terminal size={14} className="text-accent mt-0.5 shrink-0" />
                  <p className="text-text-main/60 text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                    <span className="text-accent font-black mr-2">[INDEX PROTOCOL]:</span>
                    Drop vehicles in sequential order. <span className="text-text-main">Slot #01</span> represents the menu apex. 
                    Verified sequence prevents cross-character parity errors.
                  </p>
                </div>
              </div>

              {/* TABLE CONTAINER */}
              <div className="bg-[#070707] border border-white/5">
                {/* Table Header */}
                <div className="grid grid-cols-4 bg-white/[0.02] py-5 px-8 text-[9px] font-black uppercase tracking-[0.4em] text-accent/60 border-b border-white/5">
                  <span>DM_SLOT</span>
                  <span>CHAR_ID</span>
                  <span>ZONE_LOC</span>
                  <span className="text-right">POS_IDENT</span>
                </div>

                {/* Rows */}
                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                  {data.map((item, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-4 py-5 px-8 bg-transparent border-b border-white/[0.02] items-center hover:bg-accent/[0.02] transition-all group/row"
                    >
                      {/* DM Slot */}
                      <div className="flex items-center gap-3">
                        <Hash size={10} className="text-white/10 group-hover/row:text-accent transition-colors" />
                        <span className="font-mono text-text-main text-xs font-bold tracking-tighter">
                          {item.dm.padStart(2, "0")}
                        </span>
                      </div>

                      {/* Character Name */}
                      <div className="flex">
                        <span className={`text-[10px] uppercase tracking-wider transition-all ${getCharStyles(item.char)}`}>
                          {item.char}
                        </span>
                      </div>

                      {/* Location */}
                      <span className="text-text-main/30 text-[9px] uppercase tracking-[0.2em] font-bold group-hover/row:text-text-main/60 transition-colors">
                        {item.loc}
                      </span>

                      {/* Garage Position */}
                      <div className="text-right">
                        <span className="inline-block bg-bg border border-white/10 px-4 py-1.5 font-mono text-accent/80 text-[10px] font-black group-hover/row:border-accent group-hover/row:text-accent group-hover/row:shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-all">
                          [{item.slot}]
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TERMINAL FOOTER */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-20">
                <span className="text-[8px] text-text-main font-mono uppercase tracking-[0.3em]">Manifest_End_Stream</span>
                <span className="text-[8px] text-accent font-mono">STELLE_SYNC_LOCKED</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}