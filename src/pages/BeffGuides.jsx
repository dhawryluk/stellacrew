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
    color: "border-purple-400/70 text-purple-300",
  },
  magic_torso1: {
    label: "Magic Torso 1",
    color: "border-pink-400/70 text-pink-300",
  },
  merge: {
    label: "Merge",
    color: "border-blue-400/70 text-blue-300",
  },
};

const BAG_COLORS = {
  classic: "border-blue-400/30 text-blue-400/70 bg-blue-400/5",
  israel: "border-accent/30 text-accent/70 bg-accent/5",
  both: "border-white/20 text-white/40 bg-white/5",
};
const BAG_LABELS = {
  classic: "Classic Parachute",
  israel: "Israel Parachute",
  both: "Classic or Israel",
};

export default function BeffGuides() {
  const [tab, setTab] = useState("guides");
  const [gender, setGender] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (tab !== "guides") return [];
    return GUIDES.filter((g) => gender === "all" || g.gender === gender)
      .filter((g) => typeFilter === "all" || g.type === typeFilter)
      .filter(
        (g) =>
          !search.trim() ||
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.tags?.some((t) => t.includes(search.toLowerCase())),
      );
  }, [tab, gender, typeFilter, search]);

  const mergeSections = MERGE_DATA[gender === "all" ? "m" : gender] ?? [];

  return (
    <div className="min-h-screen bg-bg text-text-main font-sans">
      <SEO
        title="BEFF Guides & Merging"
        description="GTA Online BEFF outfit guides and component merge combinations."
        image="/og/beff.jpg"
        path="/beff/guides"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Header */}
        <header className="mb-8 border-b border-border-subtle pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 shadow-[0_0_6px_rgba(212,175,55,0.4)]" />
            <span className="text-[8px] font-bold uppercase tracking-[.5em] text-accent/50">
              Operative Tools — BEFF
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              BEFF <span className="text-accent">Guides</span>
            </h1>
            <Link
              to="/beff/components"
              className="text-[9px] font-black uppercase tracking-[.2em] text-white/30 hover:text-accent transition-colors border border-border-subtle hover:border-accent/30 px-4 py-2"
            >
              ← Component Browser
            </Link>
          </div>
        </header>

        {/* Tab bar + filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-border-subtle pb-5">
          {/* Tabs */}
          <div className="flex gap-0 border border-border-subtle overflow-hidden">
            {[
              ["guides", "Guides"],
              ["merging", "Merging"],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setTab(v)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[.2em] transition-all ${
                  tab === v
                    ? "bg-accent text-bg"
                    : "text-white/35 hover:text-white/60 hover:bg-white/5"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-border-subtle mx-1" />

          {/* Gender */}
          <div className="flex gap-1.5">
            {(tab === "guides" ? ["all", "m", "f"] : ["m", "f"]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] border transition-all ${
                  gender === g
                    ? "bg-accent text-bg border-accent"
                    : "border-border-subtle text-white/35 hover:border-white/25 hover:text-white/60"
                }`}
              >
                {g === "all" ? "All" : g === "m" ? "Male" : "Female"}
              </button>
            ))}
          </div>

          {/* Type filter — guides only */}
          {tab === "guides" && (
            <div className="flex gap-1.5">
              {[
                ["all", "All"],
                ["magic_top", "T2 Tops"],
                ["magic_torso1", "T1 Torso"],
              ].map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setTypeFilter(v)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] border transition-all ${
                    typeFilter === v
                      ? "bg-accent text-bg border-accent"
                      : "border-border-subtle text-white/35 hover:border-white/25 hover:text-white/60"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          {tab === "guides" && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides..."
              className="bg-panel border border-border-subtle px-4 py-2 text-[12px] text-text-main placeholder-white/20 outline-none focus:border-accent/30 transition-colors rounded-none w-48"
            />
          )}

          {tab === "guides" && (
            <span className="text-[9px] text-white/20 uppercase tracking-widest ml-auto">
              {filtered.length} guide{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ── GUIDES TAB ─────────────────────────────────────────────────── */}
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

        {/* ── MERGING TAB ────────────────────────────────────────────────── */}
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
      className="group block border border-border-subtle bg-panel hover:border-accent/30 transition-all duration-200 overflow-hidden"
    >
      {/* Preview */}
      <div className="relative bg-panel">
        {isMagic ? (
          <div className="flex">
            <div className="flex-1 relative overflow-hidden">
              <img
                src={imgPath(
                  guide.gender,
                  guide.result.slot,
                  guide.result.drawable,
                  guide.result.texture,
                )}
                alt="Result"
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = placeholderImg(
                    guide.result.slot,
                    guide.result.drawable,
                    guide.result.texture,
                  );
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] font-black text-accent/60 uppercase tracking-wider text-center py-0.5">
                Result
              </div>
            </div>
          </div>
        ) : isTorso1 ? (
          /* Torso1 — show result accs image, placeholder on error */
          <div className="relative overflow-hidden">
            <img
              src={
                guide.result
                  ? imgPath(
                      guide.gender,
                      guide.result.slot,
                      guide.result.drawable,
                      guide.result.texture,
                    )
                  : guide.preview
              }
              alt={guide.name}
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                if (guide.result) {
                  e.target.src = placeholderImg(
                    guide.result.slot,
                    guide.result.drawable,
                    guide.result.texture,
                  );
                } else {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }
              }}
            />
            <div
              className="absolute inset-0 items-center justify-center flex-col gap-1 bg-panel"
              style={{ display: "none" }}
            >
              <span className="text-accent/20 text-3xl font-black italic">
                SC
              </span>
              <span className="text-white/15 text-[9px] uppercase tracking-widest">
                {guide.name}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] font-black text-pink-300/60 uppercase tracking-wider text-center py-0.5">
              Result
            </div>
          </div>
        ) : (
          /* Merge — single preview image */
          <div className="relative overflow-hidden">
            <img
              src={guide.preview}
              alt={guide.name}
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 items-center justify-center flex-col gap-1 bg-panel"
              style={{ display: "none" }}
            >
              <span className="text-accent/20 text-3xl font-black italic">
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
              className={`text-[7px] font-black uppercase tracking-wider px-2 py-0.5 bg-bg/95 border ${typeInfo.color}`}
            >
              {typeInfo.label}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="text-[13px] font-black uppercase tracking-tight text-text-main group-hover:text-accent transition-colors leading-tight mb-3">
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
              <div className="text-accent/40 uppercase tracking-wider mb-0.5">
                Result
              </div>
              <div className="text-accent/70">
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
              <div className="text-[14px] font-black text-accent leading-none">
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
              <div className="text-[14px] font-black text-accent leading-none">
                {guide.components.length}
              </div>
              <div className="text-[8px] text-white/25 uppercase tracking-widest mt-0.5">
                Components
              </div>
            </div>
            <div>
              <div className="text-[14px] font-black text-accent leading-none">
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
                className="text-[8px] text-accent/30 uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-border-subtle bg-black/20 flex items-center justify-between">
        <span className="text-[9px] text-white/20 uppercase tracking-widest">
          View Guide
        </span>
        <span className="text-[10px] text-accent/40 group-hover:text-accent/70 group-hover:translate-x-0.5 transition-all duration-200">
          →
        </span>
      </div>
    </Link>
  );
}

// ─── Merging content ──────────────────────────────────────────────────────────
function MergingContent({ gender, sections }) {
  return (
    <div className="flex flex-col gap-10">
      {/* How merging works */}
      <div className="border border-border-subtle bg-panel px-6 py-5">
        <div className="text-[9px] font-black uppercase tracking-[.2em] text-accent/60 mb-3">
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
            return (
              <div
                key={key}
                className={`flex items-center gap-3 border px-4 py-2.5 ${BAG_COLORS[key]}`}
              >
                <div className="w-10 h-10 shrink-0 bg-bg border border-border-subtle overflow-hidden">
                  <img
                    src={imgPath(gender, bag.slot, bag.drawable, bag.texture)}
                    alt={bag.label}
                    className="w-full h-full object-contain"
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
            className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 border border-border-subtle text-white/30 hover:border-accent/40 hover:text-accent/70 transition-all"
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.id} id={"merge_" + section.id}>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-[13px] font-black uppercase tracking-[.15em] text-text-main">
              {section.label}
            </h2>
            <span
              className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border ${BAG_COLORS[section.bag]}`}
            >
              {BAG_LABELS[section.bag]}
            </span>
            <div className="flex-1 h-px bg-border-subtle" />
          </div>

          {section.note && (
            <p className="text-[10px] text-white/30 leading-relaxed mb-4 max-w-2xl">
              {section.note}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.combos.map((combo, ci) => {
              const bagInfo =
                BAG_INFO[section.bag === "both" ? "classic" : section.bag];

              return (
                <div
                  key={ci}
                  className="border border-border-subtle bg-panel overflow-hidden hover:border-white/15 transition-all"
                >
                  {/* Combo header */}
                  <div className="px-4 py-2.5 border-b border-border-subtle/60 bg-bg">
                    <span className="text-[9px] font-black uppercase tracking-[.15em] text-white/50">
                      {combo.label}
                    </span>
                  </div>

                  {/* C1 + C2 */}
                  <div className="flex divide-x divide-border-subtle">
                    {/* C1 */}
                    <div className="flex-1 flex flex-col items-center p-3 gap-2">
                      <div className="text-[7px] font-black uppercase tracking-[.2em] text-white/25">
                        C1
                      </div>
                      {combo.c1 ? (
                        <>
                          <div className="w-full bg-bg border border-border-subtle overflow-hidden relative">
                            <img
                              src={imgPath(
                                gender,
                                combo.c1.slot,
                                combo.c1.drawable,
                                combo.c1.texture,
                              )}
                              alt={combo.c1.label}
                              className="w-full h-auto object-contain"
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
                        </>
                      ) : (
                        <div className="w-full bg-bg border border-dashed border-border-subtle flex items-center justify-center flex-col gap-1 p-8">
                          <span className="text-[8px] text-white/15 uppercase tracking-widest text-center leading-relaxed">
                            {section.slot === "task"
                              ? "No Armor"
                              : "Not Required"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center w-8 text-white/15 text-lg shrink-0">
                      +
                    </div>

                    {/* C2 */}
                    <div className="flex-1 flex flex-col items-center p-3 gap-2">
                      <div className="text-[7px] font-black uppercase tracking-[.2em] text-accent/50">
                        C2
                      </div>
                      {combo.c2 ? (
                        <>
                          <div className="w-full bg-bg border border-accent/20 overflow-hidden relative">
                            <img
                              src={imgPath(
                                gender,
                                combo.c2.slot,
                                combo.c2.drawable,
                                combo.c2.texture,
                              )}
                              alt={combo.c2.label}
                              className="w-full h-auto object-contain"
                              onError={(e) => {
                                e.target.src = placeholderImg(
                                  combo.c2.slot,
                                  combo.c2.drawable,
                                  combo.c2.texture,
                                );
                              }}
                            />
                            <div className="absolute top-0.5 left-0.5 text-[6px] font-black bg-black/80 text-accent/60 px-1">
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
                        </>
                      ) : (
                        <div className="w-full bg-bg border border-dashed border-border-subtle flex items-center justify-center flex-col gap-1 p-8">
                          <span className="text-[8px] text-white/15 uppercase tracking-widest text-center leading-relaxed">
                            {section.slot === "task"
                              ? "No Armor"
                              : "Not Required"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bag footer */}
                  <div
                    className={`flex items-center justify-between px-4 py-2 border-t border-border-subtle/60 ${section.bag === "israel" ? "bg-accent/3" : "bg-blue-400/3"}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 shrink-0 bg-bg border border-border-subtle overflow-hidden">
                        <img
                          src={imgPath(
                            gender,
                            bagInfo.slot,
                            bagInfo.drawable,
                            bagInfo.texture,
                          )}
                          alt={bagInfo.label}
                          className="w-full h-full object-contain"
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
