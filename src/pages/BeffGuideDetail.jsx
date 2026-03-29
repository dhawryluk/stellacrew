import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import GUIDES from "../data/beff/guides.json";
import {
  buildComponentCall,
  imgPath,
  placeholderImg,
  SLOT_ENUM,
} from "../components/beff/useBeff";

const DIFFICULTY_STYLE = {
  easy: { color: "#4ade80", label: "Easy" },
  medium: { color: "#D4AF37", label: "Medium" },
  hard: { color: "#f87171", label: "Hard" },
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

  const diff = DIFFICULTY_STYLE[guide.difficulty] || DIFFICULTY_STYLE.easy;

  const copy = (label, value) => {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    const calls = guide.components
      .map((c) => buildComponentCall(c.slot, c.drawable, c.texture))
      .join("\n");
    copy("all", calls);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <SEO
        title={guide.name}
        description={`GTA Online BEFF guide for ${guide.name}. ${guide.components.length} components, ${guide.steps.length} steps.`}
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

        {/* Blacklist warning */}
        {guide.blacklisted && (
          <div className="border border-red-500/40 bg-red-500/8 px-5 py-3 mb-6 flex items-center gap-3">
            <span className="text-red-400 text-lg">⚠</span>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-red-400">
                Blacklisted BEFF
              </div>
              <div className="text-[10px] text-red-400/60 mt-0.5">
                This outfit combination is known to be blacklisted. Use at your
                own risk.
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT — preview + meta */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Preview image */}
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

            {/* Meta */}
            <div className="border border-white/8 bg-[#0d0d0d] divide-y divide-white/5">
              {[
                {
                  label: "Gender",
                  value: guide.gender === "m" ? "Male" : "Female",
                },
                { label: "Difficulty", value: diff.label, color: diff.color },
                { label: "Components", value: guide.components.length },
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

          {/* RIGHT — components + steps */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-1">
                {guide.name}
              </h1>
              <div className="text-[9px] uppercase tracking-[.15em] text-white/20">
                {guide.gender === "m" ? "Male" : "Female"} ·{" "}
                {guide.components.length} Components
              </div>
            </div>

            {/* Components table */}
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
                  const call = buildComponentCall(
                    comp.slot,
                    comp.drawable,
                    comp.texture,
                  );
                  const copyId = `comp_${i}`;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="w-12 h-12 flex-shrink-0 bg-[#181818] border border-white/8 overflow-hidden">
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

                      {/* Slot + values */}
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

                      {/* Actions */}
                      <div className="flex gap-1.5 flex-shrink-0">
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

            {/* Steps */}
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
                    <div className="w-5 h-5 flex-shrink-0 border border-yellow-500/30 flex items-center justify-center text-[9px] font-black text-yellow-500/60 mt-0.5">
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
