import { useState, useEffect } from "react";
import { imgPath, placeholderImg } from "./useBeff";

export default function BeffGenderSwapPanel({
  gender,
  slot,
  drawable,
  texture,
  onClose,
}) {
  const [status, setStatus] = useState("loading"); // "loading" | "found" | "none" | "error"
  const [items, setItems] = useState([]); // opposite gender textures for this drawable
  const [sourceItems, setSourceItems] = useState([]); // source gender textures for this drawable
  const [activeTex, setActiveTex] = useState(texture); // selected texture — drives BOTH sides

  const oppositeGender = gender === "m" ? "f" : "m";
  const oppositeLabel = gender === "m" ? "Female" : "Male";
  const sourceLabel = gender === "m" ? "Male" : "Female";

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    setStatus("loading");
    setItems([]);
    setSourceItems([]);
    setActiveTex(texture);

    // Fetch both genders in parallel
    Promise.all([
      fetch(`/data/beff/${oppositeGender}/${oppositeGender}_${slot}.json`).then(
        (r) => {
          if (!r.ok) throw new Error(r.status);
          return r.json();
        },
      ),
      fetch(`/data/beff/${gender}/${gender}_${slot}.json`).then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      }),
    ])
      .then(([oppositeData, sourceData]) => {
        const oppositeMatches = oppositeData.filter(
          (i) => i.drawable === drawable,
        );
        const sourceMatches = sourceData.filter((i) => i.drawable === drawable);
        setSourceItems(sourceMatches);
        if (oppositeMatches.length) {
          setItems(oppositeMatches);
          setActiveTex(texture);
          setStatus("found");
        } else {
          setStatus("none");
        }
      })
      .catch(() => setStatus("error"));
  }, [gender, oppositeGender, slot, drawable, texture]);

  // Exact matches at the selected texture — null if that texture doesn't exist on that gender
  const oppositeItem = items.find((i) => i.texture === activeTex) ?? null;
  const sourceItem = sourceItems.find((i) => i.texture === activeTex) ?? null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20">
        <div className="bg-bg border border-border-subtle w-full max-w-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-panel">
            <div className="flex items-center gap-3">
              <span className="text-accent text-[14px]">⇄</span>
              <div>
                <div className="text-[12px] font-black uppercase tracking-wider text-text-main">
                  Gender Transfer
                </div>
                <div className="text-[8px] text-white/30 uppercase tracking-wider mt-0.5">
                  {slot.toUpperCase()} {drawable} / {activeTex} — {sourceLabel}{" "}
                  → {oppositeLabel}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[10px] font-black text-white/25 hover:text-white/60 uppercase tracking-widest transition-colors px-3 py-1 border border-border-subtle hover:border-white/20"
            >
              ✕ Close
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Loading */}
            {status === "loading" && (
              <div className="flex items-center justify-center h-48">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20 animate-pulse">
                  Checking {oppositeLabel} data…
                </span>
              </div>
            )}

            {/* Drawable doesn't exist at all on opposite gender */}
            {(status === "none" || status === "error") && (
              <div className="flex flex-col items-center justify-center gap-3 h-48 border border-dashed border-border-subtle bg-panel">
                <span className="text-2xl text-white/10">⊘</span>
                <div className="text-center">
                  <div className="text-[11px] font-black uppercase tracking-widest text-white/25">
                    No {oppositeLabel} Component
                  </div>
                  <div className="text-[9px] text-white/15 mt-1">
                    {slot.toUpperCase()} {drawable} does not exist in the{" "}
                    {oppositeLabel.toLowerCase()} wardrobe
                  </div>
                </div>
              </div>
            )}

            {/* Drawable exists — show side by side */}
            {status === "found" && (
              <div className="flex flex-col gap-5">
                {/* Side-by-side */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Source — only shows image if that texture exists */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/30 text-center">
                      {sourceLabel}
                    </div>
                    {sourceItem ? (
                      <div className="aspect-square bg-panel border border-border-subtle overflow-hidden relative">
                        <img
                          src={imgPath(gender, slot, drawable, activeTex)}
                          alt={`${sourceLabel} ${slot} ${drawable} ${activeTex}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = placeholderImg(
                              slot,
                              drawable,
                              activeTex,
                            );
                          }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 text-[8px] font-mono text-white/50">
                          {drawable} / {activeTex}
                        </div>
                        {sourceItem.label && (
                          <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 text-[7px] font-black text-white/40 max-w-[90%] truncate">
                            {sourceItem.label}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square bg-panel border border-dashed border-border-subtle flex flex-col items-center justify-center gap-2">
                        <span className="text-xl text-white/10">⊘</span>
                        <div className="text-center px-4">
                          <div className="text-[8px] font-black uppercase tracking-widest text-white/20">
                            No drawable or texture available
                          </div>
                          <div className="text-[7px] text-white/15 mt-1">
                            Tex {activeTex} not in {sourceLabel.toLowerCase()}{" "}
                            wardrobe
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Opposite — exact texture match or empty */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[8px] font-black uppercase tracking-[.2em] text-accent/60 text-center">
                      {oppositeLabel}
                    </div>
                    {oppositeItem ? (
                      <div className="aspect-square bg-panel border border-accent/20 overflow-hidden relative">
                        <img
                          src={imgPath(
                            oppositeGender,
                            slot,
                            drawable,
                            oppositeItem.texture,
                          )}
                          alt={`${oppositeLabel} ${slot} ${drawable} ${oppositeItem.texture}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = placeholderImg(
                              slot,
                              drawable,
                              oppositeItem.texture,
                            );
                          }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-0.5 text-[8px] font-mono text-accent/60">
                          {drawable} / {oppositeItem.texture}
                        </div>
                        {oppositeItem.label && (
                          <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 text-[7px] font-black text-white/40 max-w-[90%] truncate">
                            {oppositeItem.label}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square bg-panel border border-dashed border-border-subtle flex flex-col items-center justify-center gap-2">
                        <span className="text-xl text-white/10">⊘</span>
                        <div className="text-center px-4">
                          <div className="text-[8px] font-black uppercase tracking-widest text-white/20">
                            No drawable or texture available
                          </div>
                          <div className="text-[7px] text-white/15 mt-1">
                            Tex {activeTex} not in {oppositeLabel.toLowerCase()}{" "}
                            wardrobe
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Texture strip — only shown if opposite has multiple textures */}
                {items.length > 1 && (
                  <div className="border-t border-border-subtle pt-4">
                    <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/25 mb-2">
                      {oppositeLabel} available textures — select to compare
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <button
                          key={item.texture}
                          onClick={() => setActiveTex(item.texture)}
                          title={`Texture ${item.texture}${item.label ? ` — ${item.label}` : ""}`}
                          className={`relative w-10 h-10 overflow-hidden border transition-all flex-shrink-0 ${
                            activeTex === item.texture
                              ? "border-accent ring-1 ring-accent/40"
                              : "border-border-subtle opacity-50 hover:opacity-80"
                          }`}
                        >
                          <img
                            src={imgPath(
                              oppositeGender,
                              slot,
                              drawable,
                              item.texture,
                            )}
                            alt={`tex ${item.texture}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.opacity = "0.15";
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 text-center text-[6px] font-black text-white/60 bg-black/60">
                            {item.texture}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
