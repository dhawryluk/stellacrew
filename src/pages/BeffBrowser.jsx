import { useState } from "react";
import SEO from "../components/SEO";
import { useBeffSlot, SLOTS, GENDERS } from "../components/beff/useBeff";
import BeffComponentGrid from "../components/beff/BeffComponentGrid";
import BeffDetailPanel from "../components/beff/BeffDetailPanel";
import BeffFlipPanel from "../components/beff/BeffFlipPanel";

export default function BeffBrowser() {
  const [gender, setGender] = useState("m");
  const [slot, setSlot] = useState("jbib");
  const [selected, setSelected] = useState(null);
  const [flipItem, setFlipItem] = useState(null);

  const { items, loading, error } = useBeffSlot(gender, slot);

  const handleSelectDrawable = (drawable, textures) => {
    setSelected((prev) =>
      prev?.drawable === drawable ? null : { drawable, textures },
    );
    setFlipItem(null);
  };

  const handleFlip = (item) => setFlipItem(item);

  const handleSlotChange = (s) => {
    setSlot(s);
    setSelected(null);
    setFlipItem(null);
  };

  const handleGenderChange = (g) => {
    setGender(g);
    setSelected(null);
    setFlipItem(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <SEO
        title="BEFF Components"
        description="Browse GTA Online ped components by slot, drawable and texture. Male and female. Copy SetPedComponentVariation values instantly."
        image="/og/beff.jpg"
        path="/beff/components"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Page header */}
        <header className="mb-8 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 shadow-[0_0_6px_rgba(234,179,8,0.4)]" />
            <span className="text-[8px] font-bold uppercase tracking-[.5em] text-yellow-500/50">
              Operative Tools — BEFF
            </span>
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Component <span className="text-yellow-500">Browser</span>
          </h1>
          <p className="text-white/25 text-[10px] uppercase tracking-widest mt-2">
            Browse drawables and textures by slot. Click any card to view
            textures and flip instructions.
          </p>
        </header>

        {/* Gender toggle */}
        <div className="flex gap-2 mb-6">
          {GENDERS.map((g) => (
            <button
              key={g.id}
              onClick={() => handleGenderChange(g.id)}
              className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[.2em] border transition-all ${
                gender === g.id
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-transparent text-white/35 border-white/10 hover:border-white/25 hover:text-white/60"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Slot sidebar */}
          <div className="lg:col-span-2">
            <div className="text-[8px] font-bold uppercase tracking-[.2em] text-white/25 mb-3">
              Slot
            </div>
            <div className="flex flex-row flex-wrap lg:flex-col gap-1.5">
              {SLOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSlotChange(s.id)}
                  className={`px-3 py-2 text-left border transition-all ${
                    slot === s.id
                      ? "border-yellow-500/60 bg-yellow-500/5 text-yellow-500"
                      : "border-white/8 bg-transparent text-white/35 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  <div className="text-[10px] font-black uppercase tracking-[.1em]">
                    {s.label}
                  </div>
                  <div className="text-[8px] text-white/20 mt-0.5 hidden lg:block">
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-10 flex flex-col gap-5">
            {selected && (
              <BeffDetailPanel
                gender={gender}
                slot={slot}
                drawable={selected.drawable}
                textures={selected.textures}
                onClose={() => setSelected(null)}
                onFlip={handleFlip}
              />
            )}

            <div className="bg-[#0d0d0d] border border-white/8 p-5">
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
      </div>

      {/* Flip panel modal — slot is required for flip type + baseline C1 logic */}
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
