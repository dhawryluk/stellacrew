import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import GUIDES from "../data/beff/guides.json";
import { buildCall, imgPath, placeholderImg } from "../components/beff/useBeff";

const STANDARD_OUTFIT = {
  m: {
    name: "The Effortless",
    note: "Male standard outfit from the in-game clothing counter",
  },
  f: {
    name: "The Chica",
    note: "Female standard outfit from the in-game clothing counter",
  },
};

const C2_INFO = {
  m: {
    label: "Purple Fade SN Parka",
    note: "Casino → Overcoats. Set hood to Tucked in interaction menu → Hood Style.",
  },
  f: { label: "Black Stealth Shirt", note: "Clothing store → Service Shirts." },
};

export default function BeffGuideDetail() {
  const { id } = useParams();
  const guide = GUIDES.find((g) => g.id === id);
  const [copied, setCopied] = useState(null);

  if (!guide)
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-500/20 text-6xl font-black italic mb-4">
            404
          </div>
          <div className="text-white/30 text-[11px] uppercase tracking-widest mb-6">
            Guide not found
          </div>
          <Link
            to="/beff/guides"
            className="text-[10px] font-black uppercase tracking-[.2em] text-yellow-500 border border-yellow-500/30 px-5 py-2.5 hover:bg-yellow-500/5 transition-all"
          >
            ← Back to Guides
          </Link>
        </div>
      </div>
    );

  const isMagic = guide.type === "magic_top";
  const isTorso1 = guide.type === "magic_torso1";
  const isAnyMagic = isMagic || isTorso1;
  const stdOutfit = STANDARD_OUTFIT[guide.gender];
  const c2Info = C2_INFO[guide.gender];

  const copy = (label, value) => {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    const calls = guide.components
      .map((c) => buildCall(c.slot, c.drawable, c.texture))
      .join("\n");
    copy("all", calls);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <SEO
        title={guide.name}
        description={`GTA Online BEFF guide for ${guide.name}.`}
        image={guide.preview || "/og/beff.jpg"}
        path={`/beff/guides/${guide.id}`}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-[9px] uppercase tracking-widest">
          <Link
            to="/beff/guides"
            className="text-white/25 hover:text-yellow-500 transition-colors font-bold"
          >
            BEFF Guides
          </Link>
          <span className="text-white/15">›</span>
          <span className="text-yellow-500/60 font-bold">{guide.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT — meta sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* For magic tops: show result image large */}
            {isMagic ? (
              <div className="relative aspect-square bg-[#111] border border-white/8 overflow-hidden">
                <img
                  src={imgPath(
                    guide.gender,
                    guide.result.slot,
                    guide.result.drawable,
                    guide.result.texture,
                  )}
                  alt={guide.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 items-center justify-center flex-col gap-2 bg-[#111]"
                  style={{ display: "none" }}
                >
                  <span className="text-yellow-500/15 text-5xl font-black italic">
                    SC
                  </span>
                  <span className="text-white/10 text-[9px] uppercase tracking-widest">
                    No Preview
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2">
                  <div className="text-[8px] font-black uppercase tracking-wider text-yellow-500/60">
                    Result
                  </div>
                  <div className="text-[10px] font-mono text-white/40">
                    JBIB {guide.result.drawable} / {guide.result.texture}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video bg-[#111] border border-white/8 overflow-hidden">
                <img
                  src={guide.preview}
                  alt={guide.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="absolute inset-0 items-center justify-center flex-col gap-2 bg-[#111]"
                  style={{ display: "none" }}
                >
                  <span className="text-yellow-500/15 text-5xl font-black italic">
                    SC
                  </span>
                  <span className="text-white/10 text-[9px] uppercase tracking-widest">
                    No Preview
                  </span>
                </div>
              </div>
            )}

            {/* Meta boxes */}
            <div className="border border-white/8 bg-[#0d0d0d] divide-y divide-white/5">
              {[
                {
                  label: "Gender",
                  value: guide.gender === "m" ? "Male" : "Female",
                },
                {
                  label: "Type",
                  value: isMagic
                    ? "Magic Top"
                    : isTorso1
                      ? "Magic Torso 1"
                      : "Merge",
                  color: isMagic ? "#c084fc" : isTorso1 ? "#f9a8d4" : "#60a5fa",
                },
                { label: "Steps", value: guide.steps.length },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <span className="text-[9px] uppercase tracking-[.12em] text-white/30 font-bold">
                    {label}
                  </span>
                  <span
                    className="text-[12px] font-black"
                    style={{ color: color || "#D4AF37" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {guide.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-black px-2 py-1 border border-white/8 text-yellow-500/40 uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — main content */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-1">
                {guide.name}
              </h1>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/20">
                {guide.gender === "m" ? "Male" : "Female"} ·{" "}
                {isMagic
                  ? "Magic Top (2-Console NetCut)"
                  : isTorso1
                    ? "Magic Torso 1 (2-Console NetCut)"
                    : "Merge"}
              </div>
            </div>

            {/* ── MAGIC TOP LAYOUT ────────────────────────────────────────────── */}
            {isMagic && (
              <>
                {/* Standard outfit callout */}
                <div className="border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 flex items-start gap-3">
                  <span className="text-yellow-500/60 text-lg mt-0.5">★</span>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-yellow-500/80">
                      Start with "{stdOutfit.name}"
                    </div>
                    <div className="text-[9px] text-white/30 mt-0.5">
                      {stdOutfit.note}
                    </div>
                  </div>
                </div>

                {/* C1 / C2 / Result cards */}
                <div>
                  <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                    Outfit Setup
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {/* C1 */}
                    <div className="border border-white/8 bg-[#0d0d0d] overflow-hidden">
                      <div className="px-3 py-2 bg-[#0a0a0a] border-b border-white/5">
                        <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/40">
                          C1 Outfit
                        </div>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <div className="aspect-square bg-[#111] border border-white/8 overflow-hidden">
                          <img
                            src={imgPath(
                              guide.gender,
                              guide.c1.slot,
                              guide.c1.drawable,
                              guide.c1.texture,
                            )}
                            alt="C1"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = placeholderImg(
                                guide.c1.slot,
                                guide.c1.drawable,
                                guide.c1.texture,
                              );
                            }}
                          />
                        </div>
                        <div className="text-[9px] font-mono text-white/40 text-center">
                          JBIB {guide.c1.drawable} / {guide.c1.texture}
                        </div>
                        <button
                          onClick={() =>
                            copy(
                              "c1",
                              buildCall(
                                guide.c1.slot,
                                guide.c1.drawable,
                                guide.c1.texture,
                              ),
                            )
                          }
                          className="w-full text-[7px] font-black uppercase tracking-wider py-1 border border-white/10 text-white/25 hover:border-white/25 hover:text-white/50 transition-all"
                        >
                          {copied === "c1" ? "✓ Copied" : "Copy Call"}
                        </button>
                      </div>
                    </div>

                    {/* C2 */}
                    <div className="border border-white/8 bg-[#0d0d0d] overflow-hidden">
                      <div className="px-3 py-2 bg-[#0a0a0a] border-b border-white/5">
                        <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/40">
                          C2 Outfit
                        </div>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <div className="aspect-square bg-[#111] border border-white/8 overflow-hidden">
                          <img
                            src={imgPath(
                              guide.gender,
                              guide.c2.slot,
                              guide.c2.drawable,
                              guide.c2.texture,
                            )}
                            alt="C2"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = placeholderImg(
                                guide.c2.slot,
                                guide.c2.drawable,
                                guide.c2.texture,
                              );
                            }}
                          />
                        </div>
                        <div className="text-[9px] font-mono text-white/40 text-center">
                          JBIB {guide.c2.drawable} / {guide.c2.texture}
                        </div>
                        <div className="text-[8px] text-white/25 text-center leading-tight">
                          {c2Info.label}
                        </div>
                        <button
                          onClick={() =>
                            copy(
                              "c2",
                              buildCall(
                                guide.c2.slot,
                                guide.c2.drawable,
                                guide.c2.texture,
                              ),
                            )
                          }
                          className="w-full text-[7px] font-black uppercase tracking-wider py-1 border border-white/10 text-white/25 hover:border-white/25 hover:text-white/50 transition-all"
                        >
                          {copied === "c2" ? "✓ Copied" : "Copy Call"}
                        </button>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="border border-yellow-500/20 bg-[#0d0d0d] overflow-hidden">
                      <div className="px-3 py-2 bg-[#0a0a0a] border-b border-yellow-500/10">
                        <div className="text-[8px] font-black uppercase tracking-[.2em] text-yellow-500/60">
                          Result
                        </div>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <div className="aspect-square bg-[#111] border border-yellow-500/20 overflow-hidden">
                          <img
                            src={imgPath(
                              guide.gender,
                              guide.result.slot,
                              guide.result.drawable,
                              guide.result.texture,
                            )}
                            alt="Result"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = placeholderImg(
                                guide.result.slot,
                                guide.result.drawable,
                                guide.result.texture,
                              );
                            }}
                          />
                        </div>
                        <div className="text-[9px] font-mono text-yellow-500/50 text-center">
                          JBIB {guide.result.drawable} / {guide.result.texture}
                        </div>
                        <button
                          onClick={() =>
                            copy(
                              "result",
                              buildCall(
                                guide.result.slot,
                                guide.result.drawable,
                                guide.result.texture,
                              ),
                            )
                          }
                          className="w-full text-[7px] font-black uppercase tracking-wider py-1 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/50 hover:text-yellow-500 transition-all"
                        >
                          {copied === "result" ? "✓ Copied" : "Copy Call"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* C2 note */}
                  <div className="mt-2 text-[9px] text-white/20 italic">
                    {c2Info.note}
                  </div>
                </div>
              </>
            )}

            {/* ── MAGIC TORSO 1 LAYOUT ───────────────────────────────────────── */}
            {isTorso1 && (
              <>
                <div className="border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 flex items-start gap-3">
                  <span className="text-yellow-500/60 text-lg mt-0.5">★</span>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-yellow-500/80">
                      Start with "{stdOutfit.name}"
                    </div>
                    <div className="text-[9px] text-white/30 mt-0.5">
                      {stdOutfit.note}
                    </div>
                  </div>
                </div>

                {/* C2 is always the same — show once at top */}
                <div>
                  <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                    C2 Outfit — Same for All Stages
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {guide.c2.map((comp, i) => (
                      <div
                        key={i}
                        className="border border-white/8 bg-[#0d0d0d] overflow-hidden"
                      >
                        <div className="px-3 py-2 bg-[#0a0a0a] border-b border-white/5">
                          <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/40">
                            {comp.slot.toUpperCase()}
                          </div>
                        </div>
                        <div className="p-3 flex flex-col gap-2">
                          <div className="aspect-square bg-[#111] border border-yellow-500/20 overflow-hidden">
                            <img
                              src={imgPath(
                                guide.gender,
                                comp.slot,
                                comp.drawable,
                                comp.texture,
                              )}
                              alt={comp.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = placeholderImg(
                                  comp.slot,
                                  comp.drawable,
                                  comp.texture,
                                );
                              }}
                            />
                          </div>
                          <div className="text-[9px] font-mono text-yellow-500/50 text-center">
                            {comp.slot.toUpperCase()} {comp.drawable} /{" "}
                            {comp.texture}
                          </div>
                          <div className="text-[8px] text-white/25 text-center leading-tight">
                            {comp.label}
                          </div>
                          <button
                            onClick={() =>
                              copy(
                                "c2_" + i,
                                buildCall(
                                  comp.slot,
                                  comp.drawable,
                                  comp.texture,
                                ),
                              )
                            }
                            className="w-full text-[7px] font-black uppercase tracking-wider py-1 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/50 hover:text-yellow-500 transition-all"
                          >
                            {copied === "c2_" + i ? "✓ Copied" : "Copy Call"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stages or single C1 */}
                {guide.stages ? (
                  <div className="flex flex-col gap-5">
                    {guide.stages.map((stage, si) => (
                      <div key={si}>
                        <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                          {stage.label} — C1 Outfit
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {stage.c1.map((comp, ci) => (
                            <div
                              key={ci}
                              className="border border-white/8 bg-[#0d0d0d] overflow-hidden"
                            >
                              <div className="px-3 py-2 bg-[#0a0a0a] border-b border-white/5">
                                <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/40">
                                  {comp.slot.toUpperCase()}
                                </div>
                              </div>
                              <div className="p-3 flex flex-col gap-2">
                                <div className="aspect-square bg-[#111] border border-white/8 overflow-hidden">
                                  <img
                                    src={imgPath(
                                      guide.gender,
                                      comp.slot,
                                      comp.drawable,
                                      comp.texture,
                                    )}
                                    alt={comp.label}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = placeholderImg(
                                        comp.slot,
                                        comp.drawable,
                                        comp.texture,
                                      );
                                    }}
                                  />
                                </div>
                                <div className="text-[9px] font-mono text-white/40 text-center">
                                  {comp.slot.toUpperCase()} {comp.drawable} /{" "}
                                  {comp.texture}
                                </div>
                                <div className="text-[8px] text-white/25 text-center leading-tight">
                                  {comp.label}
                                </div>
                                <button
                                  onClick={() =>
                                    copy(
                                      "s" + si + "_c1_" + ci,
                                      buildCall(
                                        comp.slot,
                                        comp.drawable,
                                        comp.texture,
                                      ),
                                    )
                                  }
                                  className="w-full text-[7px] font-black uppercase tracking-wider py-1 border border-white/10 text-white/25 hover:border-white/25 hover:text-white/50 transition-all"
                                >
                                  {copied === "s" + si + "_c1_" + ci
                                    ? "✓ Copied"
                                    : "Copy Call"}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                      C1 Outfit
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {guide.c1.map((comp, i) => (
                        <div
                          key={i}
                          className="border border-white/8 bg-[#0d0d0d] overflow-hidden"
                        >
                          <div className="px-3 py-2 bg-[#0a0a0a] border-b border-white/5">
                            <div className="text-[8px] font-black uppercase tracking-[.2em] text-white/40">
                              {comp.slot.toUpperCase()}
                            </div>
                          </div>
                          <div className="p-3 flex flex-col gap-2">
                            <div className="aspect-square bg-[#111] border border-white/8 overflow-hidden">
                              <img
                                src={imgPath(
                                  guide.gender,
                                  comp.slot,
                                  comp.drawable,
                                  comp.texture,
                                )}
                                alt={comp.label}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = placeholderImg(
                                    comp.slot,
                                    comp.drawable,
                                    comp.texture,
                                  );
                                }}
                              />
                            </div>
                            <div className="text-[9px] font-mono text-white/40 text-center">
                              {comp.slot.toUpperCase()} {comp.drawable} /{" "}
                              {comp.texture}
                            </div>
                            <div className="text-[8px] text-white/25 text-center leading-tight">
                              {comp.label}
                            </div>
                            <button
                              onClick={() =>
                                copy(
                                  "c1_" + i,
                                  buildCall(
                                    comp.slot,
                                    comp.drawable,
                                    comp.texture,
                                  ),
                                )
                              }
                              className="w-full text-[7px] font-black uppercase tracking-wider py-1 border border-white/10 text-white/25 hover:border-white/25 hover:text-white/50 transition-all"
                            >
                              {copied === "c1_" + i ? "✓ Copied" : "Copy Call"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── MERGE LAYOUT — components table ─────────────────────────────── */}
            {!isMagic && !isTorso1 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold">
                    Components
                  </div>
                  <button
                    onClick={copyAll}
                    className="text-[8px] font-black uppercase tracking-wider px-3 py-1.5 border border-yellow-500/25 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/70 hover:text-yellow-500 transition-all"
                  >
                    {copied === "all" ? "✓ Copied All" : "Copy All Calls"}
                  </button>
                </div>
                <div className="border border-white/8 bg-[#0d0d0d] overflow-hidden">
                  {guide.components.map((comp, i) => {
                    const call = buildCall(
                      comp.slot,
                      comp.drawable,
                      comp.texture,
                    );
                    const copyId = `comp_${i}`;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors"
                      >
                        <div className="w-12 h-12 shrink-0 bg-[#181818] border border-white/8 overflow-hidden">
                          <img
                            src={imgPath(
                              guide.gender,
                              comp.slot,
                              comp.drawable,
                              comp.texture,
                            )}
                            alt={`${comp.slot} ${comp.drawable}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = placeholderImg(
                                comp.slot,
                                comp.drawable,
                                comp.texture,
                              );
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-[.1em] text-yellow-500">
                              {comp.slot.toUpperCase()}
                            </span>
                            <span className="text-white/20 text-[9px]">·</span>
                            <span className="text-[10px] font-mono text-white/60">
                              Draw {comp.drawable} / Tex {comp.texture}
                            </span>
                          </div>
                          <div className="text-[9px] font-mono text-white/20 truncate">
                            {call}
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={() => copy(copyId, call)}
                            className="text-[8px] font-black uppercase tracking-wider px-2 py-1 border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-500/50 hover:text-yellow-500 transition-all"
                          >
                            {copied === copyId ? "✓" : "Copy"}
                          </button>
                          <Link
                            to={`/beff/components?slot=${comp.slot}&drawable=${comp.drawable}`}
                            className="text-[8px] font-black uppercase tracking-wider px-2 py-1 border border-white/10 text-white/25 hover:border-white/30 hover:text-white/50 transition-all"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Steps — both types */}
            <div>
              <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                Steps
              </div>
              <div className="flex flex-col gap-2">
                {guide.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start px-4 py-3 border border-white/5 bg-[#0d0d0d]"
                  >
                    <div className="w-5 h-5 shrink-0 border border-yellow-500/30 flex items-center justify-center text-[9px] font-black text-yellow-500/60 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
