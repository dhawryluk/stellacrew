export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 font-sans selection:bg-accent selection:text-bg">
      <div className="max-w-xl w-full border border-accent/20 bg-[#0a0a0a] p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative w-24 h-24 mx-auto mb-10">
          <div className="absolute inset-0 border border-accent/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-2 border border-accent/40 rounded-full"></div>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-accent text-4xl font-black drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
              ✓
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-black text-text-main uppercase tracking-[0.2em] mb-4 italic">
          Access <span className="text-accent">Granted</span>
        </h1>

        <div className="h-px w-20 bg-linear-to-r from-transparent via-accent/50 to-transparent mx-auto mb-8"></div>

        <p className="text-text-main/50 text-[10px] md:text-xs tracking-[0.2em] leading-relaxed mb-12 uppercase font-medium">
          Transaction verified. Asset allocation ready. <br />
          To finalize your <span className="text-text-main">transfer protocol</span>, join the <br />
          HQ below and open a ticket with your receipt.
        </p>

        <div className="flex flex-col gap-5 relative z-10">
          <a
            href="https://discord.gg/FrzJsJXnCz"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-accent text-bg px-10 py-5 font-black uppercase text-[11px] tracking-[0.4em] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-text-main translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 group-hover:text-bg transition-colors">
              Connect to Discord HQ
            </span>
          </a>
          
          <a
            href="/"
            className="text-text-main/30 hover:text-accent transition-all uppercase text-[9px] font-bold tracking-[0.5em] mt-4 flex items-center justify-center gap-2 group"
          >
            <span className="w-4 h-px bg-text-main/10 group-hover:bg-accent/40 transition-all"></span>
            Return to Terminal
            <span className="w-4 h-px bg-text-main/10 group-hover:bg-accent/40 transition-all"></span>
          </a>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex justify-between items-center opacity-30">
          <span className="text-accent font-mono text-[8px] uppercase tracking-widest">
            Protocol: Stella_Asset_V4
          </span>
          <span className="text-accent font-mono text-[8px]">
            AUTH_{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}