import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useBeffSlot, SLOTS, GENDERS } from "../components/beff/useBeff";
import BeffComponentGrid from "../components/beff/BeffComponentGrid";
import BeffDetailPanel from "../components/beff/BeffDetailPanel";
import BeffFlipPanel from "../components/beff/BeffFlipPanel";
import BeffGenderSwapPanel from "../components/beff/BeffGenderSwapPanel";

export default function BeffBrowser() {
  const [gender, setGender] = useState("m");
  const [slot, setSlot] = useState("jbib");
  const [selected, setSelected] = useState(null);
  const [flipItem, setFlipItem] = useState(null);
  const [swapItem, setSwapItem] = useState(null);

  const { items, loading, error } = useBeffSlot(gender, slot);

  const handleSelectDrawable = (drawable, textures) => {
    setSelected((prev) =>
      prev?.drawable === drawable ? null : { drawable, textures },
    );
    setFlipItem(null);
  };

  const handleFlip = (item) => setFlipItem(item);
  const handleGenderSwap = ({ slot, drawable, texture }) =>
    setSwapItem({ slot, drawable, texture });

  const handleSlotChange = (s) => {
    setSlot(s);
    setSelected(null);
    setFlipItem(null);
    setSwapItem(null);
  };

  const handleGenderChange = (g) => {
    setGender(g);
    setSelected(null);
    setFlipItem(null);
    setSwapItem(null);
  };

  return (
    <div className="min-h-screen bg-bg text-text-main font-sans">
      <SEO
        title="BEFF Components"
        description="Browse GTA Online ped components by slot, drawable and texture. Male and female. Copy SetPedComponentVariation values instantly."
        image="/og/beff.jpg"
        path="/beff/components"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-20">
        {/* Page header */}
        <header className="mb-6 border-b border-border-subtle/60 pb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 shadow-[0_0_6px_rgba(212,175,55,0.4)]" />
            <span className="text-[8px] font-bold uppercase tracking-[.5em] text-accent/50">
              Operative Tools — BEFF
            </span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
              Component <span className="text-accent">Browser</span>
            </h1>
            <Link
              to="/beff/guides"
              className="shrink-0 text-[9px] font-black uppercase tracking-[.2em] text-white/30 hover:text-accent transition-colors border border-border-subtle hover:border-accent/30 px-4 py-2"
            >
              Guides & Merging →
            </Link>
          </div>
          <p className="text-white/25 text-[10px] uppercase tracking-widest mt-2">
            Browse drawables and textures by slot. Tap any card to view textures
            and flip instructions.
          </p>
        </header>

        {/* Gender toggle */}
        <div className="flex gap-2 mb-5">
          {GENDERS.map((g) => (
            <button
              key={g.id}
              onClick={() => handleGenderChange(g.id)}
              className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[.2em] border transition-all ${
                gender === g.id
                  ? "bg-accent text-black border-accent"
                  : "bg-transparent text-white/35 border-border-subtle hover:border-white/25 hover:text-white/60"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* ── Slot bar — horizontal scroll on mobile, sidebar on desktop ── */}
        <div className="lg:hidden mb-4">
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {SLOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSlotChange(s.id)}
                  className={`shrink-0 px-3 py-2 text-[9px] font-black uppercase tracking-wider border transition-all ${
                    slot === s.id
                      ? "border-accent/60 bg-accent/5 text-accent"
                      : "border-border-subtle bg-transparent text-white/35"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Slot sidebar — desktop only */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="text-[8px] font-bold uppercase tracking-[.2em] text-white/25 mb-3">
              Slot
            </div>
            <div className="flex flex-col gap-1.5">
              {SLOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSlotChange(s.id)}
                  className={`px-3 py-2 text-left border transition-all ${
                    slot === s.id
                      ? "border-accent/60 bg-accent/5 text-accent"
                      : "border-border-subtle bg-transparent text-white/35 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest">
                    {s.label}
                  </div>
                  <div className="text-[8px] text-white/20 mt-0.5">
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-10 flex flex-col gap-4 min-w-0">
            {/* Detail panel — full width, no overflow clipping */}
            {selected && (
              <div className="w-full overflow-x-auto">
                <BeffDetailPanel
                  gender={gender}
                  slot={slot}
                  drawable={selected.drawable}
                  textures={selected.textures}
                  onClose={() => setSelected(null)}
                  onFlip={handleFlip}
                  onGenderSwap={handleGenderSwap}
                />
              </div>
            )}

            <div className="bg-panel border border-border-subtle p-4 md:p-5">
              <BeffComponentGrid
                gender={gender}
                slot={slot}
                items={items}
                loading={loading}
                error={error}
                selectedDrawable={selected?.drawable ?? null}
                onSelectDrawable={handleSelectDrawable}
              />
            </div>
          </div>
        </div>
        {/* ── DONATE ─────────────────────────────────────────────────────── */}
        <div className="mt-16 border border-border-subtle bg-panel px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[.2em] text-accent/60 mb-1">
              Support the Project
            </div>
            <p className="text-[11px] text-white/30 max-w-lg">
              Maintaining the BEFF database and guides takes serious time. If
              you find this useful, consider buying us a coffee.
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
      </div>

      {/* Gender swap modal */}
      {swapItem && (
        <BeffGenderSwapPanel
          gender={gender}
          slot={swapItem.slot}
          drawable={swapItem.drawable}
          texture={swapItem.texture}
          onClose={() => setSwapItem(null)}
        />
      )}

      {/* Flip panel modal */}
      {flipItem && (
        <BeffFlipPanel
          gender={gender}
          slot={slot}
          item={flipItem}
          onClose={() => setFlipItem(null)}
        />
      )}
    </div>
  );
}
