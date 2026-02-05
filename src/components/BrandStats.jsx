import { Hash } from "lucide-react";

export default function BrandStats() {
  const stats = [
    {
      label: "Outfits Tailored",
      value: "3.5K+",
      detail: "Unique BEFF Designs",
    },
    {
      label: "Accounts Secured",
      value: "180+",
      detail: "Elite Tier Transfers",
    },
    {
      label: "Vehicles Dropped",
      value: "2K+",
      detail: "DMO & Rare Sets",
    },
    {
      label: "Global Followers",
      value: "25K+",
      detail: "Across All Platforms",
    },
  ];

  return (
    <section className="bg-transparent py-12 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative bg-bg border border-white/5 p-6 md:p-8 transition-all duration-500 hover:bg-bg overflow-hidden"
          >
            {/* Top Right Corner Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-0 right-0 w-0.5 h-full bg-accent"></div>
              <div className="absolute top-0 right-0 w-full h-0.5 bg-accent"></div>
            </div>

            {/* Scanning Line Effect on Hover */}
            <div className="absolute inset-x-0 top-0 h-px bg-accent/20 -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
            
            <div className="flex items-center gap-1 mb-4">
              <Hash size={10} className="text-accent/40" />
              <span className="text-text-main/40 font-mono text-[9px] font-bold">
                {(i + 1).toString().padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl md:text-3xl font-black text-text-main group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </div>

              <div className="text-accent text-[9px] font-black uppercase tracking-[0.2em]">
                {stat.label}
              </div>

              {/* Muted detail text using theme variables */}
              <div className="text-text-main/50 text-[8px] uppercase tracking-widest font-medium group-hover:text-text-main/80 transition-colors">
                {stat.detail}
              </div>
            </div>

            {/* Subtle bottom-left decorative dot */}
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/5 group-hover:bg-accent/20 transition-colors"></div>
          </div>
        ))}
      </div>
    </section>
  );
}