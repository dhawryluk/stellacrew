import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import GUIDES from "../data/beff/guides.json";
import { MERGE_DATA, BAG_INFO } from "../data/beff/beffMergeData";
import {
  imgPath,
  placeholderImg,
  buildCall,
  GENDERS,
} from "../components/beff/useBeff";

const TYPE_STYLE = {
  magic_top: {
    label: "Magic Top",
    color: "border-purple-400/40 text-purple-400/70 bg-purple-400/5",
  },
  merge: {
    label: "Merge",
    color: "border-blue-400/40 text-blue-400/70 bg-blue-400/5",
  },
};
const BAG_COLORS = {
  classic: "border-blue-400/30 text-blue-400/70 bg-blue-400/5",
  israel: "border-yellow-500/30 text-yellow-500/70 bg-yellow-500/5",
  both: "border-white/20 text-white/40 bg-white/5",
};
const BAG_LABELS = {
  classic: "Classic Parachute",
  israel: "Israel Parachute",
  both: "Classic or Israel",
};

export default function BeffGuides() {
  const [tab, setTab] = useState("guides"); // "guides" | "merging"
  const [gender, setGender] = useState("all");
  const [search, setSearch] = useState("");

  // ── Guides filters ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (tab !== "guides") return [];
    return GUIDES.filter((g) => gender === "all" || g.gender === gender).filter(
      (g) =>
        !search.trim() ||
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.tags?.some((t) => t.includes(search.toLowerCase())),
    );
  }, [tab, gender, search]);

  // ── Merging sections ────────────────────────────────────────────────────────
  const mergeSections = MERGE_DATA[gender === "all" ? "m" : gender] ?? [];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <SEO
        title="BEFF Guides & Merging"
        description="GTA Online BEFF outfit guides and component merge combinations."
        image="/og/beff.jpg"
        path="/beff/guides"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Header */}
        <header className="mb-8 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 shadow-[0_0_6px_rgba(234,179,8,0.4)]" />
            <span className="text-[8px] font-bold uppercase tracking-[.5em] text-yellow-500/50">
              Operative Tools — BEFF
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              BEFF <span className="text-yellow-500">Guides</span>
            </h1>
            <Link
              to="/beff/components"
              className="text-[9px] font-black uppercase tracking-[.2em] text-white/30 hover:text-yellow-500 transition-colors border border-white/10 hover:border-yellow-500/30 px-4 py-2"
            >
              ← Component Browser
            </Link>
          </div>
        </header>

        {/* Tab bar + filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-white/5 pb-5">
          {/* Tabs */}
          <div className="flex gap-0 border border-white/10 overflow-hidden">
            {[
              ["guides", "Guides"],
              ["merging", "Merging"],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setTab(v)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[.2em] transition-all ${
                  tab === v
                    ? "bg-yellow-500 text-black"
                    : "text-white/35 hover:text-white/60 hover:bg-white/5"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Gender */}
          <div className="flex gap-1.5">
            {(tab === "guides" ? ["all", "m", "f"] : ["m", "f"]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] border transition-all ${
                  gender === g
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
                }`}
              >
                {g === "all" ? "All" : g === "m" ? "Male" : "Female"}
              </button>
            ))}
          </div>

          {/* Search — guides only */}
          {tab === "guides" && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides..."
              className="bg-[#111] border border-white/8 px-4 py-2 text-[12px] text-white placeholder-white/20 outline-none focus:border-yellow-500/30 transition-colors rounded-none w-48"
            />
          )}

          {tab === "guides" && (
            <span className="text-[9px] text-white/20 uppercase tracking-widest ml-auto">
              {filtered.length} guide{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ── GUIDES TAB ──────────────────────────────────────────────────────── */}
        {tab === "guides" &&
          (filtered.length === 0 ? (
            <div className="py-24 text-center text-white/20 text-[11px] uppercase tracking-widest">
              No guides match your filters
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ))}

        {/* ── MERGING TAB ─────────────────────────────────────────────────────── */}
        {tab === "merging" && (
          <MergingContent
            gender={gender === "all" ? "m" : gender}
            sections={mergeSections}
          />
        )}
      </div>
    </div>
  );
}

// ─── Guide card ───────────────────────────────────────────────────────────────
function GuideCard({ guide }) {
  const typeInfo = TYPE_STYLE[guide.type];
  const isMagic = guide.type === "magic_top";
  const isTorso1 = guide.type === "magic_torso1";

  return (
    <Link
      to={`/beff/guides/${guide.id}`}
      className="group block border border-white/8 bg-[#0d0d0d] hover:border-yellow-500/30 transition-all duration-200 overflow-hidden"
    >
      {/* Preview */}
      <div className="relative bg-[#111] overflow-hidden">
        {isMagic ? (
          <div className="flex max-h-72">
            <div className="flex-1 relative overflow-hidden">
              <img
                src={imgPath(
                  guide.gender,
                  guide.result.slot,
                  guide.result.drawable,
                  guide.result.texture,
                )}
                alt="Result"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = placeholderImg(
                    guide.result.slot,
                    guide.result.drawable,
                    guide.result.texture,
                  );
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[7px] font-black text-yellow-500/60 uppercase tracking-wider text-center py-0.5">
                Result
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            <img
              src={guide.preview}
              alt={guide.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 items-center justify-center flex-col gap-1 bg-[#111]"
              style={{ display: "none" }}
            >
              <span className="text-yellow-500/20 text-3xl font-black italic">
                SC
              </span>
              <span className="text-white/15 text-[9px] uppercase tracking-widest">
                {guide.name}
              </span>
            </div>
          </div>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          <div className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-black/70 border border-white/10 text-white/50">
            {guide.gender === "m" ? "Male" : "Female"}
          </div>
          {typeInfo && (
            <div
              className={`text-[7px] font-black uppercase tracking-wider px-2 py-0.5 bg-black/70 border ${typeInfo.color}`}
            >
              {typeInfo.label}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-[13px] font-black uppercase tracking-tight text-white group-hover:text-yellow-500 transition-colors leading-tight mb-3">
          {guide.name}
        </h3>

        {isMagic ? (
          <div className="flex gap-3 mb-3 font-mono text-[9px]">
            <div>
              <div className="text-white/20 uppercase tracking-wider mb-0.5">
                C1
              </div>
              <div className="text-white/50">
                {guide.c1.drawable}-{guide.c1.texture}
              </div>
            </div>
            <div className="text-white/15 self-center">→</div>
            <div>
              <div className="text-white/20 uppercase tracking-wider mb-0.5">
                C2
              </div>
              <div className="text-white/50">
                {guide.c2.drawable}-{guide.c2.texture}
              </div>
            </div>
            <div className="text-white/15 self-center">=</div>
            <div>
              <div className="text-yellow-500/40 uppercase tracking-wider mb-0.5">
                Result
              </div>
              <div className="text-yellow-500/70">
                {guide.result.drawable}-{guide.result.texture}
              </div>
            </div>
          </div>
        ) : isTorso1 ? (
          <div className="flex gap-4 mb-3">
            <div>
              <div className="text-[14px] font-black text-pink-400/80 leading-none">
                {guide.stages ? guide.stages.length : guide.c1.length}
              </div>
              <div className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">
                {guide.stages ? "Stages" : "C1 Parts"}
              </div>
            </div>
            <div>
              <div className="text-[14px] font-black text-yellow-500 leading-none">
                {guide.steps.length}
              </div>
              <div className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">
                Steps
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 mb-3">
            <div>
              <div className="text-[14px] font-black text-yellow-500 leading-none">
                {guide.components.length}
              </div>
              <div className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">
                Components
              </div>
            </div>
            <div>
              <div className="text-[14px] font-black text-yellow-500 leading-none">
                {guide.steps.length}
              </div>
              <div className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">
                Steps
              </div>
            </div>
          </div>
        )}

        {guide.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {guide.tags.map((tag) => (
              <span
                key={tag}
                className="text-[8px] text-yellow-500/30 uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-white/5 bg-black/20 flex items-center justify-between">
        <span className="text-[9px] text-white/20 uppercase tracking-widest">
          View Guide
        </span>
        <span className="text-[10px] text-yellow-500/40 group-hover:text-yellow-500/70 group-hover:translate-x-0.5 transition-all duration-200">
          →
        </span>
      </div>
    </Link>
  );
}

// ─── Merging content ──────────────────────────────────────────────────────────
function MergingContent({ gender, sections }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const copy = (key, value) => {
    navigator.clipboard?.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* How merging works + bag reference */}
      <div className="border border-white/8 bg-[#0d0d0d] px-6 py-5">
        <div className="text-[9px] font-black uppercase tracking-[.2em] text-yellow-500/60 mb-3">
          How Merging Works
        </div>
        <p className="text-[11px] text-white/40 leading-relaxed max-w-3xl mb-4">
          When you BEFF a texture number onto an item that doesn't have that
          texture, the game creates an invisible merge component. Place the{" "}
          <span className="text-white/60">style (drawable)</span> on the correct
          console side and the{" "}
          <span className="text-white/60">color (texture)</span> on the opposite
          side, then equip the right parachute to trigger it.
        </p>
        <div className="flex flex-wrap gap-4">
          {Object.entries(BAG_INFO).map(([key, bag]) => {
            const call = buildCall(bag.slot, bag.drawable, bag.texture);
            const copyKey = "bag_ref_" + key;
            return (
              <div
                key={key}
                className={`flex items-center gap-3 border px-4 py-2.5 ${BAG_COLORS[key]}`}
              >
                <div className="w-10 h-10 flex-shrink-0 bg-[#111] border border-white/8 overflow-hidden">
                  <img
                    src={imgPath(gender, bag.slot, bag.drawable, bag.texture)}
                    alt={bag.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = placeholderImg(
                        bag.slot,
                        bag.drawable,
                        bag.texture,
                      );
                    }}
                  />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider">
                    {bag.label}
                  </div>
                  <div className="text-[8px] font-mono text-white/30 mt-0.5">
                    HAND {bag.drawable} / {bag.texture}
                  </div>
                </div>
                <button
                  onClick={() => copy(copyKey, call)}
                  className="ml-2 text-[7px] font-black uppercase tracking-wider px-2 py-1 border border-white/15 hover:border-white/30 text-white/30 hover:text-white/60 transition-all"
                >
                  {copiedKey === copyKey ? "✓" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Jump links */}
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={"#merge_" + s.id}
            className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border border-white/10 text-white/30 hover:border-yellow-500/40 hover:text-yellow-500/70 transition-all"
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.id} id={"merge_" + section.id}>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-[13px] font-black uppercase tracking-[.15em] text-white">
              {section.label}
            </h2>
            <span
              className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border ${BAG_COLORS[section.bag]}`}
            >
              {BAG_LABELS[section.bag]}
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {section.note && (
            <p className="text-[10px] text-white/30 leading-relaxed mb-4 max-w-2xl">
              {section.note}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {section.combos.map((combo, ci) => {
              const bagInfo =
                BAG_INFO[section.bag === "both" ? "classic" : section.bag];
              const bagCall = buildCall(
                bagInfo.slot,
                bagInfo.drawable,
                bagInfo.texture,
              );
              const c1Call = combo.c1
                ? buildCall(combo.c1.slot, combo.c1.drawable, combo.c1.texture)
                : null;
              const c2Call = combo.c2
                ? buildCall(combo.c2.slot, combo.c2.drawable, combo.c2.texture)
                : null;
              const allCalls = [c1Call, c2Call, bagCall]
                .filter(Boolean)
                .join("\n");
              const copyKey = `combo_${section.id}_${ci}`;
              const c1Key = `c1_${section.id}_${ci}`;
              const c2Key = `c2_${section.id}_${ci}`;

              return (
                <div
                  key={ci}
                  className="border border-white/8 bg-[#0d0d0d] overflow-hidden hover:border-white/15 transition-all"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#0a0a0a]">
                    <span className="text-[9px] font-black uppercase tracking-[.15em] text-white/50">
                      {combo.label}
                    </span>
                    <button
                      onClick={() => copy(copyKey, allCalls)}
                      className="text-[7px] font-black uppercase tracking-wider px-2 py-1 border border-yellow-500/25 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/60 hover:text-yellow-500 transition-all"
                    >
                      {copiedKey === copyKey ? "✓ Copied" : "Copy All"}
                    </button>
                  </div>

                  <div className="flex divide-x divide-white/5">
                    {/* C1 */}
                    <div className="flex-1 flex flex-col items-center p-4 gap-2">
                      <div className="text-[7px] font-black uppercase tracking-[.2em] text-white/25">
                        C1
                      </div>
                      {combo.c1 ? (
                        <>
                          <div className="w-full aspect-square bg-[#111] border border-white/8 overflow-hidden relative max-w-[120px]">
                            <img
                              src={imgPath(
                                gender,
                                combo.c1.slot,
                                combo.c1.drawable,
                                combo.c1.texture,
                              )}
                              alt={combo.c1.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = placeholderImg(
                                  combo.c1.slot,
                                  combo.c1.drawable,
                                  combo.c1.texture,
                                );
                              }}
                            />
                            <div className="absolute top-0.5 left-0.5 text-[6px] font-black bg-black/80 text-white/40 px-1">
                              {combo.c1.slot.toUpperCase()}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[9px] font-black text-white/60 leading-tight">
                              {combo.c1.label}
                            </div>
                            <div className="text-[8px] font-mono text-white/25 mt-0.5">
                              {combo.c1.drawable} / {combo.c1.texture}
                            </div>
                          </div>
                          <button
                            onClick={() => copy(c1Key, c1Call)}
                            className="text-[7px] font-black uppercase tracking-wider px-2 py-1 border border-white/10 text-white/25 hover:border-white/25 hover:text-white/50 transition-all w-full text-center"
                          >
                            {copiedKey === c1Key ? "✓" : "Copy"}
                          </button>
                        </>
                      ) : (
                        <div className="w-full aspect-square bg-[#0a0a0a] border border-dashed border-white/10 max-w-[120px] flex items-center justify-center">
                          <span className="text-[8px] text-white/15 uppercase tracking-widest text-center px-2">
                            Not Required
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center w-8 text-white/15 text-lg flex-shrink-0">
                      +
                    </div>

                    {/* C2 */}
                    <div className="flex-1 flex flex-col items-center p-4 gap-2">
                      <div className="text-[7px] font-black uppercase tracking-[.2em] text-yellow-500/50">
                        C2
                      </div>
                      {combo.c2 ? (
                        <>
                          <div className="w-full aspect-square bg-[#111] border border-yellow-500/20 overflow-hidden relative max-w-[120px]">
                            <img
                              src={imgPath(
                                gender,
                                combo.c2.slot,
                                combo.c2.drawable,
                                combo.c2.texture,
                              )}
                              alt={combo.c2.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = placeholderImg(
                                  combo.c2.slot,
                                  combo.c2.drawable,
                                  combo.c2.texture,
                                );
                              }}
                            />
                            <div className="absolute top-0.5 left-0.5 text-[6px] font-black bg-black/80 text-yellow-500/60 px-1">
                              {combo.c2.slot.toUpperCase()}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-[9px] font-black text-white/60 leading-tight">
                              {combo.c2.label}
                            </div>
                            <div className="text-[8px] font-mono text-white/25 mt-0.5">
                              {combo.c2.drawable} / {combo.c2.texture}
                            </div>
                          </div>
                          <button
                            onClick={() => copy(c2Key, c2Call)}
                            className="text-[7px] font-black uppercase tracking-wider px-2 py-1 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/50 hover:text-yellow-500 transition-all w-full text-center"
                          >
                            {copiedKey === c2Key ? "✓" : "Copy"}
                          </button>
                        </>
                      ) : (
                        <div className="w-full aspect-square bg-[#0a0a0a] border border-dashed border-white/10 max-w-[120px] flex items-center justify-center">
                          <span className="text-[8px] text-white/15 uppercase tracking-widest text-center px-2">
                            Not Required
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bag footer */}
                  <div
                    className={`flex items-center justify-between px-4 py-2 border-t border-white/5 ${section.bag === "israel" ? "bg-yellow-500/3" : "bg-blue-400/3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex-shrink-0 bg-[#111] border border-white/8 overflow-hidden">
                        <img
                          src={imgPath(
                            gender,
                            bagInfo.slot,
                            bagInfo.drawable,
                            bagInfo.texture,
                          )}
                          alt={bagInfo.label}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = placeholderImg(
                              bagInfo.slot,
                              bagInfo.drawable,
                              bagInfo.texture,
                            );
                          }}
                        />
                      </div>
                      <span
                        className={`text-[8px] font-black uppercase tracking-wider ${BAG_COLORS[section.bag === "both" ? "classic" : section.bag].split(" ")[1]}`}
                      >
                        {bagInfo.label}
                      </span>
                      <span className="text-[7px] text-white/20 font-mono">
                        HAND {bagInfo.drawable} / {bagInfo.texture}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        copy("bag_" + section.id + "_" + ci, bagCall)
                      }
                      className="text-[7px] font-black uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/20 hover:border-white/25 hover:text-white/40 transition-all"
                    >
                      {copiedKey === "bag_" + section.id + "_" + ci
                        ? "✓"
                        : "Copy Bag"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
