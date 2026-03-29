import { useState, useEffect } from "react";
import { imgPath, placeholderImg, buildComponentCall } from "./useBeff";

/**
 * BeffFlipPanel
 *
 * Shows when a user clicks a drawable card.
 * Displays the C1 (UPPR) + C2 (JBIB/slot) combination needed
 * to achieve the selected component look, plus the result image.
 *
 * Expects the component item to have an optional `flip` field:
 * {
 *   "flip": {
 *     "c1_slot":     "uppr",
 *     "c1_drawable": 15,
 *     "c1_texture":  2,
 *     "result_img":  "/beff/results/jbib_47_0.jpg"   // optional
 *   }
 * }
 *
 * If no flip data exists, shows a "no flip data yet" state.
 */
export default function BeffFlipPanel({ gender, item, onClose }) {
  const [copied, setCopied] = useState(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!item) return null;

  const { slot, drawable, texture, flip, label, dlc } = item;
  const hasFlip = !!flip;

  const c1Call = hasFlip
    ? buildComponentCall(flip.c1_slot, flip.c1_drawable, flip.c1_texture)
    : null;
  const c2Call = buildComponentCall(slot, drawable, texture);

  const copy = (id, value) => {
    navigator.clipboard?.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyBoth = () => {
    if (!hasFlip) return;
    copy("both", `${c1Call}\n${c2Call}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — centered */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0d0d0d]">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[.15em] text-yellow-500">
                {slot.toUpperCase()}
              </span>
              <span className="text-white/20 text-[9px]">·</span>
              <span className="text-[13px] font-black text-white/80 font-mono">
                {label || `Drawable ${drawable} / Tex ${texture}`}
              </span>
              {dlc && (
                <span className="text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/25">
                  {dlc}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-[10px] font-black text-white/25 hover:text-white/60 uppercase tracking-widest transition-colors px-3 py-1 border border-white/8 hover:border-white/20"
            >
              ✕ Close
            </button>
          </div>

          {hasFlip ? (
            <>
              {/* How to get it — 3 column layout */}
              <div className="grid grid-cols-3 divide-x divide-white/8">
                {/* C1 — what to set UPPR to */}
                <div className="flex flex-col items-center p-5 gap-3">
                  <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                    Step 1 — C1
                  </div>
                  <div className="w-full aspect-square bg-[#111] border border-white/8 overflow-hidden relative max-w-40">
                    <img
                      src={imgPath(
                        gender,
                        flip.c1_slot,
                        flip.c1_drawable,
                        flip.c1_texture,
                      )}
                      alt="C1"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = placeholderImg(
                          flip.c1_slot,
                          flip.c1_drawable,
                          flip.c1_texture,
                        );
                      }}
                    />
                    <div className="absolute top-1 left-1 text-[7px] font-black bg-black/80 text-yellow-500/70 px-1.5 py-0.5 uppercase tracking-wider">
                      {flip.c1_slot.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-black font-mono text-yellow-500">
                      {flip.c1_slot.toUpperCase()} {flip.c1_drawable} /{" "}
                      {flip.c1_texture}
                    </div>
                    <div className="text-[9px] text-white/30 mt-1">
                      Set torso to this
                    </div>
                  </div>
                  <button
                    onClick={() => copy("c1", c1Call)}
                    className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/60 hover:text-yellow-500 transition-all w-full text-center"
                  >
                    {copied === "c1" ? "✓ Copied" : "Copy Call"}
                  </button>
                </div>

                {/* C2 — the selected component */}
                <div className="flex flex-col items-center p-5 gap-3">
                  <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                    Step 2 — C2
                  </div>
                  <div className="w-full aspect-square bg-[#111] border border-yellow-500/30 overflow-hidden relative max-w-40">
                    <img
                      src={imgPath(gender, slot, drawable, texture)}
                      alt="C2"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = placeholderImg(slot, drawable, texture);
                      }}
                    />
                    <div className="absolute top-1 left-1 text-[7px] font-black bg-black/80 text-yellow-500 px-1.5 py-0.5 uppercase tracking-wider">
                      {slot.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-black font-mono text-yellow-500">
                      {slot.toUpperCase()} {drawable} / {texture}
                    </div>
                    <div className="text-[9px] text-white/30 mt-1">
                      Set torso 2 to this
                    </div>
                  </div>
                  <button
                    onClick={() => copy("c2", c2Call)}
                    className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/60 hover:text-yellow-500 transition-all w-full text-center"
                  >
                    {copied === "c2" ? "✓ Copied" : "Copy Call"}
                  </button>
                </div>

                {/* Result */}
                <div className="flex flex-col items-center p-5 gap-3">
                  <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 mb-1">
                    Result
                  </div>
                  <div className="w-full aspect-square bg-[#111] border border-white/8 overflow-hidden relative max-w-40">
                    {flip.result_img ? (
                      <img
                        src={flip.result_img}
                        alt="Result"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 items-center justify-center flex-col gap-1 bg-[#0d0d0d]"
                      style={{ display: flip.result_img ? "none" : "flex" }}
                    >
                      <span className="text-yellow-500/10 text-3xl font-black italic">
                        SC
                      </span>
                      <span className="text-white/15 text-[8px] uppercase tracking-widest text-center px-3">
                        Result image
                        <br />
                        coming soon
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-black text-white/50">
                      Final look
                    </div>
                    <div className="text-[9px] text-white/20 mt-1">
                      After both are applied
                    </div>
                  </div>
                  <button
                    onClick={copyBoth}
                    className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-yellow-500/40 bg-yellow-500/8 hover:bg-yellow-500/15 text-yellow-500/80 hover:text-yellow-500 transition-all w-full text-center"
                  >
                    {copied === "both" ? "✓ Copied Both" : "Copy Both Calls"}
                  </button>
                </div>
              </div>

              {/* Component calls strip */}
              <div className="border-t border-white/8 bg-black/30 px-6 py-3 flex flex-col gap-1.5">
                <div className="text-[8px] uppercase tracking-[.15em] text-white/20 font-bold mb-1">
                  Full sequence
                </div>
                <div className="font-mono text-[10px] text-white/40 bg-black/40 border border-white/5 px-4 py-2">
                  {c1Call}
                </div>
                <div className="font-mono text-[10px] text-yellow-500/50 bg-black/40 border border-yellow-500/10 px-4 py-2">
                  {c2Call}
                </div>
              </div>
            </>
          ) : (
            /* No flip data state */
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="text-[10px] font-black uppercase tracking-[.2em] text-white/20">
                No flip data for this component yet
              </div>
              <div className="text-[9px] text-white/15 uppercase tracking-widest text-center max-w-xs">
                C1 + C2 combination data hasn't been added for this drawable.
                The component call below is still available.
              </div>
              <div className="font-mono text-[11px] text-yellow-500/50 bg-black/40 border border-yellow-500/10 px-5 py-3 mt-2">
                {c2Call}
              </div>
              <button
                onClick={() => copy("c2", c2Call)}
                className="text-[9px] font-black uppercase tracking-wider px-5 py-2 border border-yellow-500/25 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/60 hover:text-yellow-500 transition-all"
              >
                {copied === "c2" ? "✓ Copied" : "Copy Call"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
