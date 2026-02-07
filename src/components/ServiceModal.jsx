import { X, ShoppingCart, ShieldCheck, AlertCircle, Cpu } from "lucide-react";

export default function ServiceModal({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0a0a0a] border border-[#d4af37]/20 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden">
        {/* Top Decorative Scanning Bar */}
        <div className="h-1 w-full bg-linear-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-[#d4af37] z-50 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* IMAGE SIDE */}
          <div className="w-full lg:w-2/5 h-48 lg:h-auto bg-[#080808] relative border-r border-white/5">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent"></div>

            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-2 bg-[#d4af37] px-3 py-1 mb-2">
                <Cpu size={12} className="text-black" />
                <span className="text-[9px] font-black text-black uppercase tracking-widest">
                  Hardware_Verified
                </span>
              </div>
              <h2 className="text-white text-4xl font-black uppercase italic tracking-tighter leading-none">
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

          {/* CONTENT SIDE */}
          <div className="p-10 lg:w-3/5 space-y-8">
            {/* Description */}
            <div className="space-y-3">
              <span className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em]">
                Asset_Description
              </span>
              <p className="text-gray-300 text-xs leading-relaxed uppercase tracking-widest font-medium">
                {item.detail}
              </p>
            </div>

            {/* NEW REQUIREMENTS SECTION */}
            <div className="space-y-4 bg-white/2 border border-white/5 p-6">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <AlertCircle size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Operational_Requirements
                </span>
              </div>

              <ul className="space-y-2">
                {item.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[#d4af37] mt-1.5 shrink-0"></div>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest leading-tight">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-[8px] text-accent2 italic uppercase pt-2 border-t border-white/5">
                *Failure to meet pre-requisites may delay delivery.
              </p>
            </div>

            {/* ACTION BAR */}
            <div className="pt-4 flex items-center justify-between">
              <div>
                <span className="text-gray-600 text-[8px] uppercase font-black block tracking-widest mb-1">
                  Authorization_Fee
                </span>
                <span className="text-3xl font-black text-white tracking-tighter italic">
                  {item.price}
                </span>
              </div>

              <a
                href={item.stripeLink}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative bg-[#d4af37] hover:bg-white text-black px-10 py-5 transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-3 font-black uppercase text-xs tracking-tighter">
                  Initialize Access <ShoppingCart size={16} />
                </div>
                {/* Button Hover Glow */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
