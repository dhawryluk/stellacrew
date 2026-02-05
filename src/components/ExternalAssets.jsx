import { useState } from "react";
import {
  ChevronDown,
  Database,
  Globe,
  Cpu,
  Shirt,
  Palette,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { assetGroups } from "../data/externalAssets";

const getGroupIcon = (type) => {
  switch (type) {
    case "software": return <Cpu size={12} />;
    case "community": return <Globe size={12} />;
    case "outfits": return <Shirt size={12} />;
    case "technical": return <Palette size={12} />;
    default: return <Database size={12} />;
  }
};

export default function ExternalAssets() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-24 px-4 max-w-7xl mx-auto font-sans">
      <div className="flex items-center gap-6 mb-8">
        <div className="flex flex-col">
          <span className="text-accent text-[8px] font-black tracking-[0.5em] mb-1">
            EXTERNAL_INTEL
          </span>
          <h2 className="text-text-main text-2xl font-black uppercase tracking-tighter italic leading-none">
            Asset <span className="text-accent/50">Repository</span>
          </h2>
        </div>
        <div className="h-px grow bg-gradient-to-r from-accent/40 via-white/5 to-transparent"></div>
      </div>

      <div className="border border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md shadow-2xl overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-10 hover:bg-white/2 transition-all group"
        >
          <div className="flex items-center gap-8">
            <div className={`relative transition-all duration-500 ${
              isOpen ? "text-accent scale-110" : "text-text-main/20"
            }`}>
              <Database size={24} strokeWidth={1.5} />
              {isOpen && <div className="absolute inset-0 blur-lg bg-accent/30 animate-pulse"></div>}
            </div>
            
            <div className="text-left">
              <h3 className="text-text-main text-[11px] font-black uppercase tracking-[0.6em] leading-tight mb-2">
                Decrypted Database <span className="text-accent/40 text-[9px]">v2.6</span>
              </h3>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-accent/30"></span>
                <p className="text-text-main/30 text-[9px] uppercase tracking-widest font-bold italic">
                   Status: {isOpen ? "Access Granted" : "Standby Mode"}
                </p>
              </div>
            </div>
          </div>
          
          <div className={`p-2 border border-white/5 transition-all duration-300 ${isOpen ? "bg-accent border-transparent rotate-180" : "bg-transparent"}`}>
            <ChevronDown className={isOpen ? "text-bg" : "text-text-main/40"} size={16} />
          </div>
        </button>

        {/* CONTENT GRID */}
        {isOpen && (
          <div className="p-10 pt-0 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 border-t border-white/5 pt-10">
              {assetGroups.map((group, i) => (
                <div key={group.id} className="space-y-6">
                  <div className="flex items-center gap-4 border-l-2 border-accent/40 pl-4 py-1">
                    <span className="text-accent/60 bg-accent/5 p-1.5">{getGroupIcon(group.type)}</span>
                    <h4 className="text-text-main text-[10px] font-black uppercase tracking-[0.4em]">
                      {group.title}
                    </h4>
                    <span className="text-[9px] font-mono text-text-main/10 ml-auto">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="grid gap-2">
                    {group.items.map((item, j) => (
                      <div key={j} className="group/item relative bg-[#0d0d0d] border border-white/5 p-4 hover:border-accent/40 transition-all duration-300">
                        {/* THE MODDED "CORNER" ACCENT */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-4 border-r-4 border-transparent group-hover/item:border-accent transition-all"></div>

                        {item.links ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Terminal size={10} className="text-accent/40" />
                              <p className="text-text-main/80 text-[10px] uppercase font-black tracking-[0.2em]">
                                {item.name}
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-8 gap-y-3 pl-5 border-l border-white/5">
                              {item.links.map((link, k) => (
                                <a key={k} href={link.url} target="_blank" rel="noreferrer"
                                  className="flex items-center gap-2 text-[9px] text-text-main/40 hover:text-accent transition-colors uppercase font-black tracking-tighter">
                                  <ExternalLink size={9} /> {link.label}
                                </a>
                              ))}
                            </div>

                            {item.note && (
                              <div className="bg-accent/5 p-3 flex items-start gap-3">
                                <span className="text-[7px] text-accent font-black uppercase tracking-widest pt-0.5">Note:</span>
                                <p className="text-[9px] text-text-main/50 font-medium tracking-wide leading-relaxed italic">
                                  {item.note}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <a href={item.url} target="_blank" rel="noreferrer"
                            className="flex items-center justify-between group-hover/item:pl-2 transition-all duration-300">
                            <span className="text-[10px] text-text-main/40 group-hover/item:text-text-main uppercase tracking-[0.2em] font-black italic">
                              {item.name}
                            </span>
                            <div className="flex items-center gap-4">
                              <div className="w-4 h-px bg-white/5 group-hover/item:w-12 group-hover/item:bg-accent/50 transition-all duration-500"></div>
                              <ExternalLink size={10} className="text-text-main/10 group-hover/item:text-accent" />
                            </div>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center opacity-20">
              <span className="text-[8px] text-text-main font-mono uppercase">Directory_Listing_End</span>
              <span className="text-[8px] text-accent font-mono">SC_REP_SECURED</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}