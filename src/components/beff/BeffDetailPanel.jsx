import { useState } from "react";
import {
  buildCall,
  imgPath,
  placeholderImg,
  getFlipType,
  getFlipCompanion,
} from "./useBeff";

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

  const call = buildCall(slot, drawable, activeTex);
  const flipType = getFlipType(slot);
  const companion = getFlipCompanion(slot);
  const companionCall = companion
    ? buildCall(companion.slot, companion.drawable, companion.texture)
    : null;

  return (
    <div className="border border-white/8 bg-[#0d0d0d] overflow-hidden">
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
          {currentItem?.featured && (
            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border border-yellow-500/30 text-yellow-500/60 bg-yellow-500/5">
              Featured
            </span>
          )}
          {currentItem?.dlc && (
            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/25">
              {currentItem.dlc}
            </span>
          )}
          {/* Flip type badge */}
          <span
            className={
              "text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border " +
              (flipType === "c1_drives"
                ? "border-yellow-500/30 text-yellow-500/60 bg-yellow-500/5"
                : "border-white/15 text-white/20")
            }
          >
            {flipType === "c1_drives" ? "C1 Drives Color" : "C2 Drives Color"}
          </span>
          {/* Companion badge */}
          {companion && (
            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border border-blue-400/30 text-blue-400/60 bg-blue-400/5">
              + {companion.label}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-[10px] font-black text-white/30 hover:text-white/70 uppercase tracking-widest transition-colors"
        >
          ✕ Close
        </button>
      </div>

      {/* Body: texture strip | big image | info */}
      <div className="flex">
        {/* Texture strip */}
        <div className="w-16 flex-shrink-0 border-r border-white/5 flex flex-col overflow-y-auto max-h-[520px]">
          <div className="px-2 pt-2 pb-1 text-[7px] uppercase tracking-[.12em] text-white/25 font-bold sticky top-0 bg-[#0d0d0d]">
            Tex
          </div>
          {textures.map((_, t) => (
            <button
              key={t}
              onClick={() => setActiveTex(t)}
              className={`relative flex-shrink-0 w-full aspect-square border-b border-white/5 overflow-hidden transition-all ${
                activeTex === t
                  ? "ring-1 ring-inset ring-yellow-500/70"
                  : "opacity-40 hover:opacity-75"
              }`}
            >
              <img
                src={imgPath(gender, slot, drawable, t)}
                alt={`tex ${t}`}
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
                <span className="text-[7px] text-white/20 font-mono">{t}</span>
              </div>
              <div className="absolute bottom-0.5 left-0.5 text-[6px] font-black text-yellow-500/60">
                {t}
              </div>
            </button>
          ))}
        </div>

        {/* Big center image */}
        <div className="flex-1 relative bg-[#0a0a0a] min-h-[320px] flex items-center justify-center overflow-hidden">
          <img
            src={imgPath(gender, slot, drawable, activeTex)}
            alt={`${slot} ${drawable}_${activeTex}`}
            className="w-full h-full object-contain max-h-[520px]"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div
            className="absolute inset-0 items-center justify-center flex-col gap-2"
            style={{ display: "none" }}
          >
            <span className="text-white/10 text-[10px] uppercase tracking-widest">
              No image
            </span>
            <span className="text-white/8 text-[9px] font-mono">
              {drawable}_{activeTex}.jpg
            </span>
          </div>

          {/* Label + texture overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="text-[9px] font-black font-mono text-white/30 bg-black/60 px-2 py-1">
              tex {activeTex}
            </span>
            {currentItem?.label && (
              <span className="text-[9px] font-black text-yellow-500/50 bg-black/60 px-2 py-1 max-w-[200px] truncate">
                {currentItem.label}
              </span>
            )}
          </div>
        </div>

        {/* Info — right column */}
        <div className="w-60 flex-shrink-0 border-l border-white/5 flex flex-col divide-y divide-white/5">
          {/* Stat boxes */}
          {[
            {
              label: "Slot",
              value: slot.toUpperCase(),
              copyId: null,
              mono: false,
            },
            {
              label: "Drawable",
              value: String(drawable),
              copyId: "draw",
              mono: true,
            },
            {
              label: "Texture",
              value: String(activeTex),
              copyId: "tex",
              mono: true,
            },
          ].map(({ label, value, copyId, mono }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3.5"
            >
              <span className="text-[8px] uppercase tracking-[.15em] text-white/25 font-bold">
                {label}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[16px] font-black text-yellow-500 ${mono ? "font-mono" : ""}`}
                >
                  {value}
                </span>
                {copyId && (
                  <button
                    onClick={() => copy(copyId, value)}
                    className="text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/50 hover:text-yellow-500 transition-all"
                  >
                    {copied === copyId ? "✓" : "Copy"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Component call */}
          <div className="px-4 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[8px] uppercase tracking-[.15em] text-white/25 font-bold">
                Call
              </span>
              <button
                onClick={() => copy("call", call)}
                className="text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/50 hover:text-yellow-500 transition-all"
              >
                {copied === "call" ? "✓ Copied" : "Copy"}
              </button>
            </div>
            <div className="bg-black/50 border border-white/5 px-2.5 py-2 font-mono text-[9px] text-white/40 break-all leading-relaxed">
              {call}
            </div>
          </div>

          {/* How to get this */}
          {onFlip && currentItem && (
            <div className="px-4 py-3">
              <button
                onClick={() =>
                  onFlip({ ...currentItem, slot, drawable, texture: activeTex })
                }
                className="w-full text-[9px] font-black uppercase tracking-wider py-2.5 border border-yellow-500/40 bg-yellow-500/8 hover:bg-yellow-500/15 text-yellow-500 transition-all"
              >
                How to get this →
              </button>
            </div>
          )}

          {/* Companion item required */}
          {companion && (
            <div className="px-4 py-3 flex flex-col gap-2">
              <span className="text-[8px] uppercase tracking-[.15em] text-white/25 font-bold">
                Also Equip
              </span>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 flex-shrink-0 bg-[#111] border border-white/8 overflow-hidden">
                  <img
                    src={imgPath(
                      gender,
                      companion.slot,
                      companion.drawable,
                      companion.texture,
                    )}
                    alt={companion.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = placeholderImg(
                        companion.slot,
                        companion.drawable,
                        companion.texture,
                      );
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-black text-blue-400/80 truncate">
                    {companion.label}
                  </div>
                  <div className="text-[8px] font-mono text-white/30">
                    {companion.slot.toUpperCase()} {companion.drawable} /{" "}
                    {companion.texture}
                  </div>
                </div>
              </div>
              <button
                onClick={() => copy("companion", companionCall)}
                className="text-[7px] font-black uppercase tracking-wider px-2 py-1 border border-blue-400/20 bg-blue-400/5 hover:bg-blue-400/10 text-blue-400/50 hover:text-blue-400 transition-all w-full text-center"
              >
                {copied === "companion" ? "✓ Copied" : "Copy Companion Call"}
              </button>
            </div>
          )}

          {/* Used in BEFFs */}
          {currentItem?.usedIn?.length > 0 && (
            <div className="px-4 py-3 flex flex-col gap-2">
              <span className="text-[8px] uppercase tracking-[.15em] text-white/25 font-bold">
                Used in BEFFs
              </span>
              <div className="flex flex-wrap gap-1">
                {currentItem.usedIn.map((beff) => (
                  <span
                    key={beff}
                    className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/35 hover:border-yellow-500/40 hover:text-yellow-500/70 cursor-pointer transition-all"
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
  );
}
