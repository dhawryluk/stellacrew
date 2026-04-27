export default function Donation() {
  return (
    <section className="max-w-7xl mx-auto bg-transparent py-6 px-4 border-t border-white/5">
      <div className="border border-border-subtle bg-panel px-6 py-5 flex items-center justify-between">
        <div>
          <div className="text-[9px] font-black uppercase tracking-[.2em] text-accent/60 mb-1">
            Support the Project
          </div>
          <p className="text-[11px] text-white/30 max-w-lg">
            Maintaining the BEFF database and guides takes serious time. If you
            find this useful, consider buying us a coffee.
          </p>
        </div>
        <a
          href="https://ko-fi.com/stellacrew"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 ml-6 text-[10px] font-black uppercase tracking-[.2em] text-accent/70 hover:text-accent border border-accent/30 hover:border-accent/60 hover:bg-accent/5 px-5 py-3 transition-all"
        >
          Buy us a Coffee
        </a>
      </div>
    </section>
  );
}
