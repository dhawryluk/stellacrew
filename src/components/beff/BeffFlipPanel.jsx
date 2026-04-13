import { useState, useEffect } from "react";
import {
  buildCall,
  imgPath,
  placeholderImg,
  getFlipType,
  getBaselines,
  getFlipCompanion,
} from "./useBeff";

export default function BeffFlipPanel({ gender, slot, item, onClose }) {
  const flipType = getFlipType(slot);
  const c1Drives = flipType === "c1_drives";
  const baselines = getBaselines(gender, slot);
  const companion = getFlipCompanion(slot);
  const companionCall = companion
    ? buildCall(companion.slot, companion.drawable, companion.texture)
    : null;

  const [c1BaseIdx, setC1BaseIdx] = useState(0);
  const [c1Texture, setC1Texture] = useState(item?.texture ?? 0);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (c1Drives) setC1Texture(item?.texture ?? 0);
  }, [item, c1Drives]);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!item) return null;

  const { drawable: itemDraw, texture: itemTex, flip, label, dlc } = item;

  // ── C1 / C2 resolution ───────────────────────────────────────────────────
  //
  // c1_drives (jbib / task / p_head):
  //   C1 = palette drawable + texture you pick → sets color
  //   C2 = your piece + texture 0 ("any texture works")
  //   Result = your piece in C1's color
  //
  // c2_drives (everything else):
  //   C1 = your item at tex 0 (fixed)
  //   C2 = flip piece at the texture you selected from the grid (itemTex)
  //   Result = your item at that texture
  //
  let c1Slot, c1Draw, c1TexFinal, c2Draw, c2Tex, resultDraw, resultTex;

  if (c1Drives) {
    c1Slot     = slot;
    c1Draw     = baselines[c1BaseIdx]?.drawable ?? 190;
    c1TexFinal = c1Texture;
    c2Draw     = flip?.c2_drawable ?? itemDraw;
    c2Tex      = 0;
    resultDraw = c2Draw;
    resultTex  = c1Texture;
  } else {
    c1Slot     = slot;
    c1Draw     = itemDraw;
    c1TexFinal = 0;
    c2Draw     = flip?.c2_drawable ?? baselines[c1BaseIdx]?.drawable ?? 137;
    c2Tex      = itemTex;
    resultDraw = itemDraw;
    resultTex  = itemTex;
  }

  const resultImg = flip?.result_img ?? imgPath(gender, slot, resultDraw, resultTex);

  const c1Call = buildCall(c1Slot, c1Draw, c1TexFinal);
  const c2Call = buildCall(slot, c2Draw, c2Tex);

  const copy = (id, value) => {
    navigator.clipboard?.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const totalTextures = baselines[c1BaseIdx]?.textures ?? 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20">
        <div className="bg-bg border border-border-subtle overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-panel">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[.15em] text-accent">
                {slot.toUpperCase()}
              </span>
              <span className="text-white/20 text-[9px]">·</span>
              <span className="text-[13px] font-black text-white/80 font-mono">
                {label || `Drawable ${itemDraw}`}
              </span>
              <span className="text-[11px] font-black text-accent/60 font-mono">
                tex {itemTex}
              </span>
              {dlc && (
                <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 border border-border-subtle text-white/25">
                  {dlc}
                </span>
              )}
              <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border ${
                c1Drives
                  ? "border-accent/30 text-accent/60 bg-accent/5"
                  : "border-border-subtle text-white/30"
              }`}>
                {c1Drives ? "C1 Drives Color" : "C2 Drives Color"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[10px] font-black text-white/25 hover:text-white/60 uppercase tracking-widest transition-colors px-3 py-1 border border-border-subtle hover:border-white/20"
            >
              ✕ Close
            </button>
          </div>

          {/* Baseline selector */}
          {baselines.length > 0 && (
            <div className="px-6 py-3 border-b border-border-subtle/60 bg-black/20 flex flex-wrap items-center gap-2">
              <span className="text-[8px] uppercase tracking-[.15em] text-white/25 font-bold mr-1">
                {c1Drives ? "C1 Palette" : "C2 Flip Piece"}
              </span>
              {baselines.map((b, i) => (
                <button
                  key={i}
                  onClick={() => setC1BaseIdx(i)}
                  className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 border transition-all ${
                    c1BaseIdx === i
                      ? "border-accent text-accent bg-accent/8"
                      : "border-border-subtle text-white/30 hover:border-white/25 hover:text-white/60"
                  }`}
                >
                  {b.label}
                  {b.textures && <span className="ml-1.5 text-[7px] opacity-60">×{b.textures}</span>}
                </button>
              ))}
              {baselines[c1BaseIdx]?.note && (
                <span className="text-[8px] text-white/20 italic ml-1">
                  {baselines[c1BaseIdx].note}
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          <div className={`grid divide-x divide-border-subtle ${companion ? "grid-cols-4" : "grid-cols-3"}`}>

            {/* C1 */}
            <div className="flex flex-col items-center p-5 gap-3">
              <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                {c1Drives ? "Step 1 — C1 (Color)" : "Step 1 — C1 (Your Item)"}
              </div>
              <div className="w-full aspect-square bg-panel border border-border-subtle overflow-hidden relative max-w-40">
                <img
                  src={imgPath(gender, c1Slot, c1Draw, c1TexFinal)}
                  alt="C1"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = placeholderImg(c1Slot, c1Draw, c1TexFinal); }}
                />
                <div className="absolute top-1 left-1 text-[7px] font-black bg-black/70 text-accent/70 px-1.5 py-0.5 uppercase tracking-wider">
                  {c1Slot.toUpperCase()}
                </div>
              </div>
              <div className="text-center w-full">
                <div className="text-[11px] font-black font-mono text-accent">
                  {c1Slot.toUpperCase()} {c1Draw} / {c1TexFinal}
                </div>
                {c1Drives ? (
                  <div className="text-[8px] text-white/30 mt-1">Texture sets the color</div>
                ) : (
                  <div className="text-[8px] text-white/30 mt-1">Any texture works</div>
                )}
              </div>

              {/* c1_drives texture swatch picker */}
              {c1Drives && totalTextures > 1 && (
                <div className="w-full">
                  <div className="text-[7px] uppercase tracking-[.12em] text-white/20 font-bold mb-1.5">
                    Pick texture (color)
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: totalTextures }).map((_, t) => (
                      <button
                        key={t}
                        onClick={() => setC1Texture(t)}
                        title={`Texture ${t}`}
                        className={`w-6 h-6 overflow-hidden border transition-all ${
                          c1Texture === t
                            ? "border-accent ring-1 ring-accent/40"
                            : "border-border-subtle hover:border-white/30"
                        }`}
                      >
                        <img
                          src={imgPath(gender, c1Slot, c1Draw, t)}
                          alt={`tex ${t}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.opacity = "0.15"; }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => copy("c1", c1Call)}
                className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent/60 hover:text-accent transition-all w-full text-center"
              >
                {copied === "c1" ? "✓ Copied" : "Copy Call"}
              </button>
            </div>

            {/* C2 */}
            <div className="flex flex-col items-center p-5 gap-3">
              <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                {c1Drives ? "Step 2 — C2 (Piece)" : "Step 2 — C2 (Flip Piece)"}
              </div>
              <div className="w-full aspect-square bg-panel border border-accent/30 overflow-hidden relative max-w-[160px]">
                <img
                  src={imgPath(gender, slot, c2Draw, c2Tex)}
                  alt="C2"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = placeholderImg(slot, c2Draw, c2Tex); }}
                />
                <div className="absolute top-1 left-1 text-[7px] font-black bg-black/70 text-accent px-1.5 py-0.5 uppercase tracking-wider">
                  {slot.toUpperCase()}
                </div>
              </div>
              <div className="text-center w-full">
                <div className="text-[11px] font-black font-mono text-accent">
                  {slot.toUpperCase()} {c2Draw} / {c2Tex}
                </div>
                {c1Drives ? (
                  <div className="text-[8px] text-white/25 mt-1 italic">Any texture works here</div>
                ) : (
                  <div className="text-[8px] text-white/30 mt-1">Same texture as C1</div>
                )}
              </div>
              <button
                onClick={() => copy("c2", c2Call)}
                className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent/60 hover:text-accent transition-all w-full text-center"
              >
                {copied === "c2" ? "✓ Copied" : "Copy Call"}
              </button>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center p-5 gap-3">
              <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                Result
              </div>
              <div className="w-full aspect-square bg-panel border border-border-subtle overflow-hidden relative max-w-40">
                <img
                  src={resultImg}
                  alt="Result"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 items-center justify-center flex-col gap-1 bg-panel" style={{ display: "none" }}>
                  <span className="text-accent/10 text-3xl font-black italic">SC</span>
                  <span className="text-white/15 text-[8px] uppercase tracking-widest text-center px-3">No image</span>
                </div>
              </div>
              <div className="text-center w-full">
                <div className="text-[11px] font-black font-mono text-accent">
                  {slot.toUpperCase()} {resultDraw} / {resultTex}
                </div>
                <div className="text-[9px] text-white/20 mt-1">Your final look</div>
              </div>
              <button
                onClick={() => copy("both", [c1Call, c2Call, companionCall].filter(Boolean).join("\n"))}
                className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-accent/40 bg-accent/8 hover:bg-accent/15 text-accent/80 hover:text-accent transition-all w-full text-center"
              >
                {copied === "both" ? "✓ Copied Both" : "Copy Both Calls"}
              </button>
            </div>

            {/* Companion */}
            {companion && (
              <div className="flex flex-col items-center p-5 gap-3">
                <div className="text-[8px] font-black uppercase tracking-[.2em] text-blue-400/50 mb-1">
                  Also Equip
                </div>
                <div className="w-full aspect-square bg-panel border border-blue-400/20 overflow-hidden relative max-w-40">
                  <img
                    src={imgPath(gender, companion.slot, companion.drawable, companion.texture)}
                    alt={companion.label}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = placeholderImg(companion.slot, companion.drawable, companion.texture); }}
                  />
                  <div className="absolute top-1 left-1 text-[7px] font-black bg-black/70 text-blue-400/70 px-1.5 py-0.5 uppercase tracking-wider">
                    {companion.slot.toUpperCase()}
                  </div>
                </div>
                <div className="text-center w-full">
                  <div className="text-[11px] font-black text-blue-400/80">{companion.label}</div>
                  <div className="text-[9px] font-mono text-white/30 mt-0.5">
                    {companion.slot.toUpperCase()} {companion.drawable} / {companion.texture}
                  </div>
                  <div className="text-[8px] text-white/20 mt-1 italic">Required to activate flip</div>
                </div>
                <button
                  onClick={() => copy("companion", companionCall)}
                  className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-blue-400/20 bg-blue-400/5 hover:bg-blue-400/10 text-blue-400/50 hover:text-blue-400 transition-all w-full text-center"
                >
                  {copied === "companion" ? "✓ Copied" : "Copy Call"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}