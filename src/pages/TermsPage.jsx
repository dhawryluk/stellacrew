import { useEffect } from "react";
import Star from "../assets/branding/StellaStar.png";

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] pt-40 pb-20 px-6 font-sans selection:bg-accent selection:text-bg">
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto border border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl p-10 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-accent/20"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-accent"></div>

        <div className="relative z-10 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-accent text-[9px] font-black uppercase tracking-[0.5em]">
              Security_Directive_77
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-text-main uppercase tracking-tighter italic leading-none mb-6">
            Legal <span className="text-accent/50">Protocols</span>
          </h1>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-y border-white/5 py-4">
            <p className="text-text-main/30 text-[9px] uppercase tracking-widest font-bold">
              Effective: <span className="text-text-main/60">03.13.2020</span>
            </p>
            <p className="text-text-main/30 text-[9px] uppercase tracking-widest font-bold">
              Origin: <span className="text-text-main/60">STELLA_CREW_GARAGE_HQ</span>
            </p>
            <p className="text-text-main/30 text-[9px] uppercase tracking-widest font-bold">
              Status: <span className="text-accent/60">ENFORCED</span>
            </p>
          </div>
        </div>

        <div className="space-y-16 relative z-10">
          
          <section className="group">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-[11px] mb-6 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
              <span className="w-10 h-px bg-accent"></span> 
              01. Final Acquisition Policy
            </h2>
            <div className="pl-14 border-l border-white/5 space-y-4">
              <p className="text-text-main/50 text-xs md:text-sm leading-relaxed tracking-wide uppercase">
                All digital assets, vehicle builds, and BEFF outfits acquired via the 
                <span className="text-text-main font-bold"> STELLA VAULT</span> are classified as 
                <span className="text-accent font-bold"> FINAL SALE</span>.
              </p>
              <p className="text-text-main/40 text-[11px] leading-relaxed italic">
                Once the acquisition protocol is initiated and the asset transfer is documented, 
                it cannot be reversed, exchanged, or refunded. We maintain 1:1 parity with 
                high-tier build standards.
              </p>
            </div>
          </section>

          <section className="group">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-[11px] mb-6 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
              <span className="w-10 h-px bg-accent"></span> 
              02. Fraud & Account Seizure
            </h2>
            <div className="pl-14 border-l border-white/5 space-y-4">
              <p className="text-text-main/50 text-xs md:text-sm leading-relaxed tracking-wide uppercase">
                Unauthorized chargebacks or attempts to manipulate the acquisition 
                ledger will trigger an immediate <span className="text-accent font-bold">BLACKLIST PROTOCOL</span>.
              </p>
              <div className="bg-accent/5 border border-accent/10 p-4">
                <p className="text-text-main/40 text-[10px] uppercase tracking-widest leading-relaxed font-mono">
                  [SYSTEM_NOTICE]: StellaCrew maintains a Zero-Tolerance policy. 
                  Account seizure includes permanent revocation of access to all 
                  current and future ecosystem updates.
                </p>
              </div>
            </div>
          </section>

          <section className="group">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-[11px] mb-6 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
              <span className="w-10 h-px bg-accent"></span> 
              03. Resolution Protocol
            </h2>
            <div className="pl-14 border-l border-white/5">
              <p className="text-text-main/50 text-xs md:text-sm leading-relaxed tracking-wide uppercase">
                In the event of a technical acquisition error, notify command via 
                Discord or Encrypted Email within <span className="text-text-main">14 Standard Days</span>. 
                We prioritize secure and fair exchanges for all verified architects.
              </p>
            </div>
          </section>

          <div className="pt-12 border-t border-white/5 mt-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-[9px] text-text-main/20 uppercase tracking-[0.4em] font-black">
                  Direct Inquiry Terminal:
                </p>
                <span className="text-accent text-[11px] font-mono hover:text-text-main transition-colors cursor-pointer uppercase">
                  sales@stellacrewgaming.com
                </span>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <img 
                  src={Star} 
                  alt="StellaStar" 
                  className="w-12 h-12 object-contain opacity-20 filter grayscale group-hover:opacity-50 transition-all duration-500" 
                />
                <span className="text-text-main/10 text-[8px] font-bold tracking-[0.8em] uppercase">
                  Stella Protocol
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}