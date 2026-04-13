import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import GUIDES from "../data/beff/guides.json";
import { imgPath, placeholderImg } from "../components/beff/useBeff";

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

// ── Shared component card (no copy button) ───────────────────────────────────
function CompCard({ gender, comp, accentBorder = false, header, subLabel }) {
  return (
    <div
      className={`border bg-panel overflow-hidden ${accentBorder ? "border-accent/20" : "border-border-subtle"}`}
    >
      <div className="px-3 py-2 bg-bg border-b border-border-subtle/60">
        <div
          className={`text-[8px] font-black uppercase tracking-[.2em] ${accentBorder ? "text-accent/60" : "text-white/40"}`}
        >
          {header}
        </div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div
          className={`aspect-square bg-panel overflow-hidden border ${accentBorder ? "border-accent/20" : "border-border-subtle"}`}
        >
          <img
            src={imgPath(gender, comp.slot, comp.drawable, comp.texture)}
            alt={header}
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
        <div
          className={`text-[9px] font-mono text-center ${accentBorder ? "text-accent/50" : "text-white/40"}`}
        >
          {comp.slot.toUpperCase()} {comp.drawable} / {comp.texture}
        </div>
        {(subLabel || comp.label) && (
          <div className="text-[8px] text-white/25 text-center leading-tight">
            {subLabel ?? comp.label}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sidebar preview image ─────────────────────────────────────────────────────
function SidebarImage({ src, label, sublabel }) {
  return (
    <div className="relative aspect-square bg-panel border border-border-subtle overflow-hidden">
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div
        className="absolute inset-0 items-center justify-center flex-col gap-2 bg-panel"
        style={{ display: "none" }}
      >
        <span className="text-accent/15 text-5xl font-black italic">SC</span>
        <span className="text-white/10 text-[9px] uppercase tracking-widest">
          No Preview
        </span>
      </div>
      {(label || sublabel) && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
          {label && (
            <div className="text-[8px] font-black uppercase tracking-wider text-accent/60">
              {label}
            </div>
          )}
          {sublabel && (
            <div className="text-[10px] font-mono text-white/40">
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BeffGuideDetail() {
  const { id } = useParams();
  const guide = GUIDES.find((g) => g.id === id);

  if (!guide)
    return (
      <div className="min-h-screen bg-bg text-text-main flex items-center justify-center">
        <div className="text-center">
          <div className="text-accent/20 text-6xl font-black italic mb-4">
            404
          </div>
          <div className="text-white/30 text-[11px] uppercase tracking-widest mb-6">
            Guide not found
          </div>
          <Link
            to="/beff/guides"
            className="text-[10px] font-black uppercase tracking-[.2em] text-accent border border-accent/30 px-5 py-2.5 hover:bg-accent/5 transition-all"
          >
            ← Back to Guides
          </Link>
        </div>
      </div>
    );

  const isMagic = guide.type === "magic_top";
  const isTorso1 = guide.type === "magic_torso1";
  const stdOutfit = STANDARD_OUTFIT[guide.gender];
  const c2Info = C2_INFO[guide.gender];

  // Torso1 result = first jbib in c1 (or last stage c1 for multi-stage)
  const torso1ResultComp = isTorso1
    ? guide.stages
      ? (guide.stages[guide.stages.length - 1].c1.find(
          (c) => c.slot === "jbib",
        ) ?? guide.stages[guide.stages.length - 1].c1[0])
      : (guide.c1.find((c) => c.slot === "jbib") ?? guide.c1[0])
    : null;

  return (
    <div className="min-h-screen bg-bg text-text-main font-sans">
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
            className="text-white/25 hover:text-accent transition-colors font-bold"
          >
            BEFF Guides
          </Link>
          <span className="text-white/15">›</span>
          <span className="text-accent/60 font-bold">{guide.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── LEFT sidebar ──────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Preview image */}
            {isMagic && (
              <SidebarImage
                src={imgPath(
                  guide.gender,
                  guide.result.slot,
                  guide.result.drawable,
                  guide.result.texture,
                )}
                label="Result"
                sublabel={`JBIB ${guide.result.drawable} / ${guide.result.texture}`}
              />
            )}
            {isTorso1 && torso1ResultComp && (
              <SidebarImage
                src={imgPath(
                  guide.gender,
                  torso1ResultComp.slot,
                  torso1ResultComp.drawable,
                  torso1ResultComp.texture,
                )}
                label="Result"
                sublabel={`${torso1ResultComp.slot.toUpperCase()} ${torso1ResultComp.drawable} / ${torso1ResultComp.texture}`}
              />
            )}
            {!isMagic && !isTorso1 && (
              <div className="relative aspect-video bg-panel border border-border-subtle overflow-hidden">
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
                  className="absolute inset-0 items-center justify-center flex-col gap-2 bg-panel"
                  style={{ display: "none" }}
                >
                  <span className="text-accent/15 text-5xl font-black italic">
                    SC
                  </span>
                  <span className="text-white/10 text-[9px] uppercase tracking-widest">
                    No Preview
                  </span>
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="border border-border-subtle bg-panel divide-y divide-border-subtle/60">
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
                    className="text-[9px] font-black px-2 py-1 border border-border-subtle text-accent/40 uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT main content ─────────────────────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-text-main mb-1">
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

            {/* ── MAGIC TOP ─────────────────────────────────────────────────── */}
            {isMagic && (
              <>
                <div className="border border-accent/20 bg-accent/5 px-4 py-3 flex items-start gap-3">
                  <span className="text-accent/60 text-lg mt-0.5">★</span>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-accent/80">
                      Start with "{stdOutfit.name}"
                    </div>
                    <div className="text-[9px] text-white/30 mt-0.5">
                      {stdOutfit.note}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                    Outfit Setup
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <CompCard
                      gender={guide.gender}
                      comp={guide.c1}
                      header="C1 Outfit"
                    />
                    <CompCard
                      gender={guide.gender}
                      comp={guide.c2}
                      header="C2 Outfit"
                      subLabel={c2Info.label}
                    />
                    <CompCard
                      gender={guide.gender}
                      comp={guide.result}
                      header="Result"
                      accentBorder
                    />
                  </div>
                  <div className="mt-2 text-[9px] text-white/20 italic">
                    {c2Info.note}
                  </div>
                </div>
              </>
            )}

            {/* ── MAGIC TORSO 1 ─────────────────────────────────────────────── */}
            {isTorso1 && (
              <>
                <div className="border border-accent/20 bg-accent/5 px-4 py-3 flex items-start gap-3">
                  <span className="text-accent/60 text-lg mt-0.5">★</span>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-accent/80">
                      Start with "{stdOutfit.name}"
                    </div>
                    <div className="text-[9px] text-white/30 mt-0.5">
                      {stdOutfit.note}
                    </div>
                  </div>
                </div>

                {/* C2 — always Valentines Onesie */}
                <div>
                  <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                    C2 Outfit — Same for All Stages
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {guide.c2.map((comp, i) => (
                      <CompCard
                        key={i}
                        gender={guide.gender}
                        comp={comp}
                        header={comp.slot.toUpperCase()}
                        accentBorder
                      />
                    ))}
                  </div>
                </div>

                {/* C1 — stages or single */}
                {guide.stages ? (
                  <div className="flex flex-col gap-5">
                    {guide.stages.map((stage, si) => (
                      <div key={si}>
                        <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                          {stage.label} — C1 Outfit
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {stage.c1.map((comp, ci) => (
                            <CompCard
                              key={ci}
                              gender={guide.gender}
                              comp={comp}
                              header={comp.slot.toUpperCase()}
                            />
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
                        <CompCard
                          key={i}
                          gender={guide.gender}
                          comp={comp}
                          header={comp.slot.toUpperCase()}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── MERGE ─────────────────────────────────────────────────────── */}
            {!isMagic && !isTorso1 && (
              <div>
                <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                  Components
                </div>
                <div className="border border-border-subtle bg-panel overflow-hidden">
                  {guide.components.map((comp, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle/60 last:border-b-0"
                    >
                      <div className="w-12 h-12 flex-shrink-0 bg-panel border border-border-subtle overflow-hidden">
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
                          <span className="text-[10px] font-black uppercase tracking-[.1em] text-accent">
                            {comp.slot.toUpperCase()}
                          </span>
                          <span className="text-white/20 text-[9px]">·</span>
                          <span className="text-[10px] font-mono text-white/60">
                            Draw {comp.drawable} / Tex {comp.texture}
                          </span>
                        </div>
                        {comp.label && (
                          <div className="text-[9px] text-white/30">
                            {comp.label}
                          </div>
                        )}
                      </div>
                      <Link
                        to={`/beff/components?slot=${comp.slot}&drawable=${comp.drawable}`}
                        className="text-[8px] font-black uppercase tracking-wider px-2 py-1 border border-border-subtle text-white/25 hover:border-white/30 hover:text-white/50 transition-all flex-shrink-0"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            <div>
              <div className="text-[9px] uppercase tracking-[.2em] text-white/30 font-bold mb-3">
                Steps
              </div>
              <div className="flex flex-col gap-2">
                {guide.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start px-4 py-3 border border-border-subtle/60 bg-panel"
                  >
                    <div className="w-5 h-5 flex-shrink-0 border border-accent/30 flex items-center justify-center text-[9px] font-black text-accent/60 mt-0.5">
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
