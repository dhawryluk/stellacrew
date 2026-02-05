import { Terminal, Lock, Zap, ChevronRight } from "lucide-react";

export default function TacticalUtilities({ categories }) {
  return (
    <div className="max-w-7xl mx-auto mb-24 mt-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-8">
            {/* SECTION HEADER */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-accent text-[8px] font-bold tracking-[0.4em] mb-1">
                  UTILITY
                </span>
                <h2 className="text-text-main text-lg font-black uppercase tracking-[0.3em] whitespace-nowrap">
                  {cat.label}
                </h2>
              </div>
              <div className="h-px grow bg-linear-to-r from-accent/40 via-text-main/5 to-transparent"></div>
            </div>

            <div className="grid gap-4">
              {cat.resources.map((res, i) => {
                const isLocked = res.comingSoon;
                return (
                  <div
                    key={i}
                    className={`group relative flex items-center justify-between p-6 transition-all duration-300 overflow-hidden shadow-xl ${
                      isLocked
                        ? "bg-bg/40 border border-white/5 opacity-50 select-none"
                        : "bg-[#0a0a0a] border border-white/10 hover:border-accent/40 hover:bg-[#111] cursor-pointer"
                    }`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 ${
                        isLocked
                          ? "bg-text-main/10"
                          : "bg-accent/10 group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                      }`}
                    ></div>

                    <div className="flex flex-col relative z-10 ml-2">
                      <div className="flex items-center gap-3">
                        {isLocked ? (
                          <Lock size={12} className="text-text-main/20" />
                        ) : (
                          <Terminal size={12} className="text-accent opacity-40 group-hover:opacity-100" />
                        )}
                        <span className={`text-sm font-black uppercase tracking-wider ${isLocked ? "text-text-main/20" : "text-text-main group-hover:text-accent"}`}>
                          {res.name}
                        </span>
                        {res.hot && !isLocked && (
                          <div className="flex items-center gap-1 bg-accent text-bg px-2 py-0.5 rounded-sm animate-pulse">
                            <Zap size={8} fill="currentColor" />
                            <span className="text-[8px] font-black uppercase tracking-tighter">HOT</span>
                          </div>
                        )}
                      </div>
                      <p className={`text-[10px] uppercase tracking-[0.15em] mt-2 font-medium ${isLocked ? "text-text-main/10 italic" : "text-text-main/40 group-hover:text-text-main/70"}`}>
                        {isLocked ? "PROTOCOL PENDING DEPLOYMENT" : res.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 relative z-10">
                      <span className={`text-[9px] font-mono font-black px-3 py-1 border transition-all ${isLocked ? "text-accent/30 border-accent/10 bg-accent/5" : "text-text-main/30 border-white/5 group-hover:border-accent/30 group-hover:text-text-main"}`}>
                        {isLocked ? "ENCRYPTED" : res.type}
                      </span>
                      {!isLocked && <ChevronRight size={14} className="text-text-main/20 group-hover:text-accent transform group-hover:translate-x-1" />}
                    </div>
                    {!isLocked && <a href={res.link} className="absolute inset-0 z-20" />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}