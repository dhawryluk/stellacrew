export default function SupportBanner() {
  return (
    <section className="max-w-7xl mx-auto bg-transparent py-6 px-4 border-t border-white/5">
      <div className="border border-border-subtle bg-panel px-6 py-5 flex flex-col md:flex-row md:items-center gap-6">
        {/* Pillars */}
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          {/* No Ads */}
          <div className="flex items-start gap-3">
            <span className="text-red-500/70 text-base font-black leading-none mt-0.5">
              ✕
            </span>
            <div>
              <div className="text-[9px] font-black uppercase tracking-[.2em] text-white/50 mb-0.5">
                No Ads. Ever.
              </div>
              <p className="text-[10px] text-white/25 leading-relaxed">
                No banners, no pop-ups, no sponsored content. Clean tools only.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-white/5 self-stretch" />

          {/* Free */}
          <div className="flex items-start gap-3">
            <span className="text-accent/60 text-base font-black leading-none mt-0.5">
              ◈
            </span>
            <div>
              <div className="text-[9px] font-black uppercase tracking-[.2em] text-white/50 mb-0.5">
                Always Free.
              </div>
              <p className="text-[10px] text-white/25 leading-relaxed">
                Every tool, guide and reference on this site is free. No
                accounts, no paywalls.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-white/5 self-stretch" />

          {/* Donation ask */}
          <div className="flex items-start gap-3 flex-1">
            <span className="text-accent/60 text-base font-black leading-none mt-0.5">
              ♦
            </span>
            <div>
              <div className="text-[9px] font-black uppercase tracking-[.2em] text-accent/60 mb-0.5">
                Support the Project
              </div>
              <p className="text-[10px] text-white/25 leading-relaxed">
                Maintaining the BEFF database and guides takes serious time. If
                you find this useful, consider buying us a coffee.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href="https://ko-fi.com/stellacrew"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[10px] font-black uppercase tracking-[.2em] text-accent/70 hover:text-accent border border-accent/30 hover:border-accent/60 hover:bg-accent/5 px-5 py-3 transition-all text-center"
        >
          Buy us a Coffee
        </a>
      </div>
    </section>
  );
}
