import { useState, useEffect } from "react";
import { X, ShoppingCart, AlertCircle, Cpu, PackageCheck, CheckCircle2 } from "lucide-react";

export default function ServiceModal({ item, isOpen, onClose }) {
  const [hasAcknowledged, setHasAcknowledged] = useState(false);

  useEffect(() => {
    setHasAcknowledged(false);
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-[#d4af37]/20 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden">
        
        <div className="h-1 w-full bg-linear-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-[#d4af37] z-50 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/5 h-64 lg:h-auto bg-[#080808] relative border-r border-white/5">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center gap-2 bg-[#d4af37] px-3 py-1 mb-4 w-fit">
                <Cpu size={12} className="text-black" />
                <span className="text-[9px] font-black text-black uppercase tracking-widest">
                  Hardware_Verified
                </span>
              </div>
              <h2 className="text-white text-5xl font-black uppercase italic tracking-tighter leading-[0.8]">
                {item.name.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={i === 1 ? "text-[#d4af37]" : "text-white"}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          <div className="p-10 lg:w-3/5 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
            
            <div className="space-y-3">
              <span className="text-accent/50 text-[9px] font-black uppercase tracking-[0.4em]">
                // Asset_Description
              </span>
              <p className="text-gray-300 text-xs leading-relaxed uppercase tracking-widest font-bold italic">
                {item.detail}
              </p>
            </div>

            {item.included && item.included.length > 0 && (
              <div className="space-y-4 bg-white/2 border border-white/5 p-6">
                <div className="flex items-center gap-2 text-accent">
                  <PackageCheck size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Deployment_Manifest
                  </span>
                </div>
                <ul className="grid grid-cols-1 gap-2">
                  {item.included.map((vehicle, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[10px] text-white/70 uppercase tracking-widest font-bold italic">
                      <div className="w-1 h-1 bg-accent rotate-45 shrink-0"></div>
                      {vehicle}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 border-l-2 border-white/5 pl-6">
              <div className="flex items-center gap-2 text-gray-500">
                <AlertCircle size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Operational_Requirements
                </span>
              </div>
              <ul className="space-y-2">
                {item.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-px bg-gray-700 mt-2 shrink-0"></div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest leading-tight font-medium">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {item.warning && (
              <div className={`transition-all duration-500 border p-4 flex gap-4 items-start ${hasAcknowledged ? 'bg-accent/5 border-accent/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <label className="flex items-start gap-4 cursor-pointer w-full">
                   <div className="relative flex items-center mt-1">
                    <input 
                      type="checkbox" 
                      checked={hasAcknowledged}
                      onChange={() => setHasAcknowledged(!hasAcknowledged)}
                      className="peer appearance-none w-5 h-5 border-2 border-red-500/40 checked:bg-accent checked:border-accent transition-all duration-300"
                    />
                    <CheckCircle2 className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 left-1 pointer-events-none" strokeWidth={4} />
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] block ${hasAcknowledged ? 'text-accent' : 'text-red-500'}`}>
                      {hasAcknowledged ? 'Protocol_Accepted' : 'Critical_Protocol_Notice'}
                    </span>
                    <p className="text-gray-400 text-[9px] uppercase tracking-widest leading-relaxed font-bold">
                      {item.warning}
                    </p>
                  </div>
                </label>
              </div>
            )}

            <div className="pt-6 flex items-center justify-between border-t border-white/5">
              <div>
                <span className="text-accent/40 text-[8px] uppercase font-black block tracking-widest mb-1">
                  Authorization_Fee
                </span>
                <span className="text-4xl font-black text-white tracking-tighter italic">
                  {item.price}
                </span>
              </div>

              <a
                href={hasAcknowledged ? item.stripeLink : "#"}
                target={hasAcknowledged ? "_blank" : "_self"}
                rel="noreferrer"
                className={`group/btn relative px-10 py-5 transition-all duration-500 overflow-hidden ${
                  hasAcknowledged 
                  ? "bg-[#d4af37] text-black cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
                  : "bg-white/5 text-white/20 cursor-not-allowed opacity-50"
                }`}
                onClick={(e) => !hasAcknowledged && e.preventDefault()}
              >
                <div className="relative z-10 flex items-center gap-3 font-black uppercase text-xs tracking-tighter group-hover/btn:scale-105 transition-transform">
                  {hasAcknowledged ? "Initialize Access" : "Acknowledge Protocol"} <ShoppingCart size={16} />
                </div>
                {hasAcknowledged && <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>}
              </a>
            </div>

            <p className="text-[8px] text-center text-white/20 uppercase tracking-[0.3em]">
              Handled by StellaCrew Experts // Secure Signal Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}