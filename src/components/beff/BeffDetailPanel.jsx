import { useState } from "react";
import { buildComponentCall, imgPath } from "./useBeff";

export default function BeffDetailPanel({
  gender,
  slot,
  drawable,
  textures,
  onClose,
  onFlip,
}) {
  const [activeTex, setActiveTex] = useState(0);
  const [copied, setCopied] = useState(null);

  const currentItem = textures?.[activeTex];

  const copy = (label, value) => {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  if (!textures?.length) return null;

  const call = buildComponentCall(slot, drawable, activeTex);

  return (
    <div className="border border-white/8 bg-[#0d0d0d] rounded-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-[.15em] text-yellow-500">
            {slot.toUpperCase()}
          </span>
          <span className="text-white/20 text-[9px]">·</span>
          <span className="text-[11px] font-black text-white/70 font-mono">
            Drawable {drawable}
          </span>
          <span className="text-[9px] text-white/25">
            {textures.length} texture{textures.length !== 1 ? "s" : ""}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-[10px] font-black text-white/30 hover:text-white/70 uppercase tracking-widest transition-colors"
        >
          ✕ Close
        </button>
        {onFlip && textures?.[activeTex] && (
          <button
            onClick={() => onFlip(textures[activeTex])}
            className="text-[9px] font-black uppercase tracking-wider px-4 py-1.5 border border-yellow-500/40 bg-yellow-500/8 hover:bg-yellow-500/15 text-yellow-500 transition-all"
          >
            How to get this →
          </button>
        )}
      </div>

      <div className="flex gap-0">
        {/* Texture strip — left column */}
        <div className="w-20 border-r border-white/5 flex flex-col overflow-y-auto max-h-[420px]">
          <div className="px-2 pt-2 pb-1 text-[8px] uppercase tracking-[.12em] text-white/25 font-bold">
            Tex
          </div>
          {textures.map((_, t) => (
            <button
              key={t}
              onClick={() => {
                setActiveTex(t);
                if (textures[t]?.flip && onFlip) onFlip(textures[t]);
              }}
              className={`relative flex-shrink-0 w-full aspect-square border-b border-white/5 overflow-hidden transition-all ${
                activeTex === t
                  ? "ring-1 ring-inset ring-yellow-500/70"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={imgPath(gender, slot, drawable, t)}
                alt={`${slot} ${drawable} tex ${t}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 bg-[#181818] items-center justify-center"
                style={{ display: "none" }}
              >
                <span className="text-[8px] text-white/20 font-mono">{t}</span>
              </div>
              <div className="absolute bottom-0.5 left-1 text-[7px] font-black text-yellow-500/60">
                {t}
              </div>
            </button>
          ))}
        </div>

        {/* Main preview + info */}
        <div className="flex-1 flex flex-col">
          {/* Large preview */}
          <div className="relative bg-[#111] aspect-square max-h-64 overflow-hidden">
            <img
              src={imgPath(gender, slot, drawable, activeTex)}
              alt={`${slot} ${drawable}_${activeTex}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 items-center justify-center flex-col gap-1"
              style={{ display: "none" }}
            >
              <span className="text-white/15 text-[10px] uppercase tracking-widest">
                No image
              </span>
              <span className="text-white/10 text-[9px] font-mono">
                {drawable}_{activeTex}.jpg
              </span>
            </div>
            {/* DLC badge */}
            {currentItem?.dlc && (
              <div className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-black/70 border border-white/10 text-white/40">
                {currentItem.dlc}
              </div>
            )}
          </div>

          {/* Values table */}
          <div className="flex-1 divide-y divide-white/5">
            {[
              { label: "Slot", value: slot.toUpperCase(), copyId: null },
              { label: "Drawable", value: String(drawable), copyId: "draw" },
              { label: "Texture", value: String(activeTex), copyId: "tex" },
            ].map(({ label, value, copyId }) => (
              <div
                key={label}
                className="flex items-center justify-between px-5 py-2.5"
              >
                <span className="text-[9px] uppercase tracking-[.12em] text-white/30 font-bold">
                  {label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-black text-yellow-500 font-mono">
                    {value}
                  </span>
                  {copyId && (
                    <button
                      onClick={() => copy(copyId, value)}
                      className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border border-yellow-500/25 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/70 hover:text-yellow-500 transition-all"
                    >
                      {copied === copyId ? "✓" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Component call */}
            <div className="px-5 py-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] uppercase tracking-[.12em] text-white/30 font-bold">
                  Component call
                </span>
                <button
                  onClick={() => copy("call", call)}
                  className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border border-yellow-500/25 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/70 hover:text-yellow-500 transition-all"
                >
                  {copied === "call" ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div className="bg-black/40 border border-white/5 px-3 py-2 font-mono text-[10px] text-white/50 break-all">
                {call}
              </div>
            </div>

            {/* Used in BEFFs */}
            {currentItem?.usedIn?.length > 0 && (
              <div className="px-5 py-3">
                <div className="text-[9px] uppercase tracking-[.12em] text-white/30 font-bold mb-2">
                  Used in BEFFs
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentItem.usedIn.map((beff) => (
                    <span
                      key={beff}
                      className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/40 hover:border-yellow-500/40 hover:text-yellow-500/70 cursor-pointer transition-all"
                    >
                      {beff.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
