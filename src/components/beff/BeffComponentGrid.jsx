import { useMemo, useState } from "react";
import { groupByDrawable, imgPath, placeholderImg } from "./useBeff";

const PER_PAGE = 24;

export default function BeffComponentGrid({
  gender,
  slot,
  items,
  loading,
  error,
  selectedDrawable,
  onSelectDrawable,
}) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [dlcFilter, setDlcFilter] = useState("all");

  const drawableMap = useMemo(() => groupByDrawable(items), [items]);

  const dlcOptions = useMemo(() => {
    const set = new Set(items.map((i) => i.dlc).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [items]);

  const drawables = useMemo(() => {
    let keys = Array.from(drawableMap.keys()).sort((a, b) => a - b);
    if (search.trim()) {
      const n = parseInt(search, 10);
      if (!isNaN(n))
        keys = keys.filter((k) => String(k).startsWith(search.trim()));
    }
    if (dlcFilter !== "all") {
      keys = keys.filter((k) =>
        drawableMap.get(k)?.some((i) => i.dlc === dlcFilter),
      );
    }
    return keys;
  }, [drawableMap, search, dlcFilter]);

  const totalPages = Math.ceil(drawables.length / PER_PAGE);
  const pageKeys = drawables.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleSearch = (v) => {
    setSearch(v);
    setPage(0);
  };
  const handleDlc = (v) => {
    setDlcFilter(v);
    setPage(0);
  };

  if (error)
    return (
      <div className="py-16 text-center text-white/20 text-[11px] uppercase tracking-widest">
        Failed to load {gender}_{slot}.json — {error}
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {/* Search + DLC row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Jump to drawable #..."
          className="flex-1 bg-panel border border-border-subtle px-4 py-2.5 text-[12px] text-text-main placeholder-white/20 outline-none focus:border-accent/30 transition-colors rounded-none"
        />
        <select
          value={dlcFilter}
          onChange={(e) => handleDlc(e.target.value)}
          className="bg-panel border border-border-subtle px-3 py-2.5 text-[11px] text-white/50 outline-none focus:border-accent/30 rounded-none"
        >
          {dlcOptions.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All DLC" : d}
            </option>
          ))}
        </select>
      </div>

      {/* Count line */}
      <div className="text-[9px] uppercase tracking-[.15em] text-white/20 font-bold">
        {loading
          ? "Loading..."
          : `${drawables.length} drawables · ${items.length} total items · showing ${page * PER_PAGE + 1}–${Math.min((page + 1) * PER_PAGE, drawables.length)}`}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: PER_PAGE }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-panel animate-pulse rounded-none"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-3">
          {pageKeys.map((drawable) => {
            const textures = drawableMap.get(drawable) || [];
            const firstItem = textures[0];
            const isSelected = selectedDrawable === drawable;
            const hasMultipleTex = textures.length > 1;

            return (
              <button
                key={drawable}
                onClick={() => onSelectDrawable(drawable, textures)}
                className={`relative group aspect-square border overflow-hidden transition-all ${
                  isSelected
                    ? "border-accent ring-1 ring-accent/50"
                    : "border-border-subtle hover:border-white/25"
                }`}
              >
                <img
                  src={imgPath(gender, slot, drawable, 0)}
                  alt={`${slot} ${drawable}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = placeholderImg(slot, drawable, 0);
                  }}
                />

                <div className="absolute inset-0 bg-panel -z-10" />

                <div
                  className={`absolute bottom-0.5 left-1 text-[8px] font-black font-mono transition-colors ${
                    isSelected
                      ? "text-accent"
                      : "text-white/30 group-hover:text-white/60"
                  }`}
                >
                  {drawable}
                </div>

                {hasMultipleTex && (
                  <div className="absolute top-0.5 right-0.5 text-[7px] font-black bg-black/60 text-accent/70 px-1 leading-tight">
                    ×{textures.length}
                  </div>
                )}

                {firstItem?.usedIn?.length > 0 && (
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                )}

                {firstItem?.featured && !firstItem?.usedIn?.length && (
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-accent/50" />
                )}

                {isSelected && (
                  <div className="absolute inset-0 bg-accent/8 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-2 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1.5 border border-border-subtle text-[10px] text-white/30 disabled:opacity-20 hover:border-white/25 hover:text-white/60 transition-all"
          >
            ←
          </button>

          {(() => {
            // Sliding window: always show first, last, current ±2, with ellipsis gaps
            const pages = new Set([0, totalPages - 1]);
            for (
              let i = Math.max(0, page - 2);
              i <= Math.min(totalPages - 1, page + 2);
              i++
            )
              pages.add(i);
            const sorted = Array.from(pages).sort((a, b) => a - b);
            const buttons = [];
            sorted.forEach((pg, idx) => {
              // Insert ellipsis if there is a gap
              if (idx > 0 && pg > sorted[idx - 1] + 1) {
                buttons.push(
                  <span
                    key={"ellipsis-" + pg}
                    className="text-white/20 text-[10px] px-1"
                  >
                    …
                  </span>,
                );
              }
              buttons.push(
                <button
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-7 h-7 text-[10px] font-black border transition-all ${
                    page === pg
                      ? "bg-accent text-black border-accent"
                      : "border-border-subtle text-white/30 hover:border-white/25 hover:text-white/60"
                  }`}
                >
                  {pg + 1}
                </button>,
              );
            });
            return buttons;
          })()}

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-3 py-1.5 border border-border-subtle text-[10px] text-white/30 disabled:opacity-20 hover:border-white/25 hover:text-white/60 transition-all"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
