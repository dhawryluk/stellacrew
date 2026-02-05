export default function ResourceHero() {
  return (
  <div className="relative w-full bg-[#0a0a0a] border border-accent/20 mb-20 overflow-hidden">
    
    {/* RE-ENGINEERED CARBON FIBRE BACKGROUND */}
    <div 
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')`,
        backgroundRepeat: 'repeat',
        backgroundColor: '#050505' // Slightly darker than the main BG to make texture pop
      }}
    ></div>
    
    {/* Subtle Gold Gradient to make the texture visible in the corner */}
    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-accent/5 pointer-events-none"></div>

    <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
      
      {/* LEFT SIDE: CONTENT */}
      <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5 bg-bg/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 bg-accent/40 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)]"></div>
          <span className="text-accent/60 text-[8px] font-bold uppercase tracking-[0.5em]">
            System Module: v.042
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-text-main uppercase tracking-tighter mb-6 italic leading-none">
          Modded Car <br />
          <span className="text-accent/40">Builder</span>
        </h1>
        
        <p className="text-text-main/40 text-[10px] uppercase tracking-widest leading-relaxed mb-10 max-w-sm">
          The ultimate architect tool. Cross-reference unselected paint codes
          with rare wheel combinations. Perfect your build before the
          acquisition protocol begins.
        </p>

        <div className="inline-block border border-white/10 bg-white/[0.02] px-8 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-text-main/20 cursor-not-allowed">
          Initialization Locked
        </div>
      </div>

      {/* RIGHT SIDE: PLACEHOLDER */}
      <div className="w-full lg:w-80 bg-accent/[0.02] flex flex-col items-center justify-center p-12 relative min-h-[250px] backdrop-blur-sm">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-y-0 left-1/2 w-px bg-accent/20"></div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-accent/20"></div>
        </div>
        
        <div className="relative flex flex-col items-center">
          <span className="text-accent/10 text-8xl font-black italic tracking-tighter leading-none select-none">
            SC
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-bg border border-accent/30 px-4 py-2 shadow-2xl transform -rotate-2">
                <span className="text-accent text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap animate-pulse">
                  Coming Soon
                </span>
             </div>
          </div>
        </div>
        
        <span className="mt-8 text-accent/20 text-[8px] font-bold tracking-[0.6em] uppercase">
          Stella Protocol
        </span>
      </div>
    </div>
  </div>
);}