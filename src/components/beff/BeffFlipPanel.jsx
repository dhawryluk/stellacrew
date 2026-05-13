import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  buildCall,
  imgPath,
  placeholderImg,
  getFlipType,
  getBaselines,
  getFlipCompanion,
} from "./useBeff";

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, meta, onClose }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out"
      onClick={onClose}
    >
      {/* Image */}
      <div
        className="max-w-[80vw] max-h-[75vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[75vh] object-contain border border-white/10 shadow-2xl"
        />
      </div>

      {/* Meta */}
      {meta && (
        <div className="mt-5 flex flex-col items-center gap-1 pointer-events-none">
          <div className="text-[11px] font-black font-mono text-accent tracking-wider">
            {meta.slot} {meta.drawable} / {meta.texture}
          </div>
          {meta.label && (
            <div className="text-[13px] font-black text-white/70">
              {meta.label}
            </div>
          )}
          {meta.caption && (
            <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold">
              {meta.caption}
            </div>
          )}
        </div>
      )}

      {/* Dismiss hint */}
      <div className="absolute bottom-6 text-[8px] uppercase tracking-[.2em] text-white/20 font-bold">
        click anywhere or esc to close
      </div>
    </div>,
    document.body,
  );
}

// ── ZoomableImage ─────────────────────────────────────────────────────────────
function ZoomableImage({
  src,
  alt,
  badge,
  badgeColor = "text-accent/70",
  onError,
  lightboxMeta,
  onZoom,
}) {
  return (
    <div
      className="w-full aspect-square bg-panel border border-border-subtle overflow-hidden relative max-w-40 cursor-zoom-in group"
      onClick={() => onZoom({ src, alt, meta: lightboxMeta })}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        onError={onError}
      />
      {badge && (
        <div
          className={`absolute top-1 left-1 text-[7px] font-black bg-black/70 px-1.5 py-0.5 uppercase tracking-wider ${badgeColor}`}
        >
          {badge}
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-150 flex items-center justify-center">
        <span className="text-white/0 group-hover:text-white/70 text-xl transition-all duration-150 drop-shadow-lg">
          ⊕
        </span>
      </div>
    </div>
  );
}

// ── Main Panel ────────────────────────────────────────────────────────────────
export default function BeffFlipPanel({ gender, slot, item, onClose }) {
  const flipType = getFlipType(slot);
  const c1Drives = flipType === "c1_drives";
  const baselines = getBaselines(gender, slot);
  const companion = getFlipCompanion(slot);

  const [c1BaseIdx, setC1BaseIdx] = useState(0);
  const [c1Texture, setC1Texture] = useState(item?.texture ?? 0);
  const [copied, setCopied] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (c1Drives) setC1Texture(item?.texture ?? 0);
  }, [item, c1Drives]);

  // Escape only closes the panel if the lightbox isn't open
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !lightbox) onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, lightbox]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  if (!item) return null;

  const { drawable: itemDraw, texture: itemTex, flip, label, dlc } = item;

  let c1Slot, c1Draw, c1TexFinal, c2Draw, c2Tex, resultDraw, resultTex;

  if (c1Drives) {
    c1Slot = slot;
    c1Draw = baselines[c1BaseIdx]?.drawable ?? 190;
    c1TexFinal = c1Texture;
    c2Draw = flip?.c2_drawable ?? itemDraw;
    c2Tex = 0;
    resultDraw = c2Draw;
    resultTex = c1Texture;
  } else {
    c1Slot = slot;
    c1Draw = itemDraw;
    c1TexFinal = 0;
    c2Draw = flip?.c2_drawable ?? baselines[c1BaseIdx]?.drawable ?? 137;
    c2Tex = itemTex;
    resultDraw = itemDraw;
    resultTex = itemTex;
  }

  const resultImg =
    flip?.result_img ?? imgPath(gender, slot, resultDraw, resultTex);

  const copy = (id, value) => {
    navigator.clipboard?.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          meta={lightbox.meta}
          onClose={closeLightbox}
        />
      )}

      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

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
              <span
                className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border ${
                  c1Drives
                    ? "border-accent/30 text-accent/60 bg-accent/5"
                    : "border-border-subtle text-white/30"
                }`}
              >
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
                  {b.textures && (
                    <span className="ml-1.5 text-[7px] opacity-60">
                      ×{b.textures}
                    </span>
                  )}
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
          <div
            className={`grid divide-x divide-border-subtle ${companion ? "grid-cols-4" : "grid-cols-3"}`}
          >
            {/* C1 */}
            <div className="flex flex-col items-center p-5 gap-3">
              <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                {c1Drives ? "Step 1 — C1 (Color)" : "Step 1 — C1 (Your Item)"}
              </div>
              <ZoomableImage
                src={imgPath(gender, c1Slot, c1Draw, c1TexFinal)}
                alt="C1"
                badge={c1Slot.toUpperCase()}
                badgeColor="text-accent/70"
                onError={(e) => {
                  e.target.src = placeholderImg(c1Slot, c1Draw, c1TexFinal);
                }}
                lightboxMeta={{
                  slot: c1Slot.toUpperCase(),
                  drawable: c1Draw,
                  texture: c1TexFinal,
                  caption: c1Drives
                    ? "Step 1 — Color Source"
                    : "Step 1 — Your Item",
                }}
                onZoom={setLightbox}
              />
              <div className="text-center w-full">
                <div className="text-[11px] font-black font-mono text-accent">
                  {c1Slot.toUpperCase()} {c1Draw} / {c1TexFinal}
                </div>
                <div className="text-[8px] text-white/30 mt-1">
                  {c1Drives ? "Texture sets the color" : "Any texture works"}
                </div>
              </div>
            </div>

            {/* C2 */}
            <div className="flex flex-col items-center p-5 gap-3">
              <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                {c1Drives ? "Step 2 — C2 (Piece)" : "Step 2 — C2 (Flip Piece)"}
              </div>
              <ZoomableImage
                src={imgPath(gender, slot, c2Draw, c2Tex)}
                alt="C2"
                badge={slot.toUpperCase()}
                badgeColor="text-accent"
                onError={(e) => {
                  e.target.src = placeholderImg(slot, c2Draw, c2Tex);
                }}
                lightboxMeta={{
                  slot: slot.toUpperCase(),
                  drawable: c2Draw,
                  texture: c2Tex,
                  caption: c1Drives ? "Step 2 — Piece" : "Step 2 — Flip Piece",
                }}
                onZoom={setLightbox}
              />
              <div className="text-center w-full">
                <div className="text-[11px] font-black font-mono text-accent">
                  {slot.toUpperCase()} {c2Draw} / {c2Tex}
                </div>
                <div className="text-[8px] text-white/30 mt-1">
                  {c1Drives
                    ? "Any texture works here"
                    : "Texture sets the color"}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center p-5 gap-3">
              <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                Result
              </div>
              <ZoomableImage
                src={resultImg}
                alt="Result"
                badge={null}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
                lightboxMeta={{
                  slot: slot.toUpperCase(),
                  drawable: resultDraw,
                  texture: resultTex,
                  label: label || undefined,
                  caption: "Your Final Look",
                }}
                onZoom={setLightbox}
              />
              <div className="text-center w-full">
                <div className="text-[11px] font-black font-mono text-accent">
                  {slot.toUpperCase()} {resultDraw} / {resultTex}
                </div>
                <div className="text-[9px] text-white/20 mt-1">
                  Your final look
                </div>
              </div>
            </div>

            {/* Companion */}
            {companion && (
              <div className="flex flex-col items-center p-5 gap-3">
                <div className="text-[8px] font-black uppercase tracking-[.2em] text-blue-400/50 mb-1">
                  Also Equip
                </div>
                <ZoomableImage
                  src={imgPath(
                    gender,
                    companion.slot,
                    companion.drawable,
                    companion.texture,
                  )}
                  alt={companion.label}
                  badge={companion.slot.toUpperCase()}
                  badgeColor="text-blue-400/70"
                  onError={(e) => {
                    e.target.src = placeholderImg(
                      companion.slot,
                      companion.drawable,
                      companion.texture,
                    );
                  }}
                  lightboxMeta={{
                    slot: companion.slot.toUpperCase(),
                    drawable: companion.drawable,
                    texture: companion.texture,
                    label: companion.label,
                    caption: "Required to Activate Flip",
                  }}
                  onZoom={setLightbox}
                />
                <div className="text-center w-full">
                  <div className="text-[11px] font-black text-blue-400/80">
                    {companion.label}
                  </div>
                  <div className="text-[9px] font-mono text-white/30 mt-0.5">
                    {companion.slot.toUpperCase()} {companion.drawable} /{" "}
                    {companion.texture}
                  </div>
                  <div className="text-[8px] text-white/20 mt-1 italic">
                    Required to activate flip
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
