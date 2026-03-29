import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import GUIDES from "../data/beff/guides.json";

const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 };

const DIFFICULTY_STYLE = {
  easy: { color: "#4ade80", label: "Easy" },
  medium: { color: "#D4AF37", label: "Medium" },
  hard: { color: "#f87171", label: "Hard" },
};

export default function BeffGuides() {
  const [gender, setGender] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [search, setSearch] = useState("");
  const [showBlacklisted, setShowBlacklisted] = useState(false);

  const filtered = useMemo(() => {
    return GUIDES.filter((g) => gender === "all" || g.gender === gender)
      .filter((g) => difficulty === "all" || g.difficulty === difficulty)
      .filter((g) => (showBlacklisted ? true : !g.blacklisted))
      .filter(
        (g) =>
          !search.trim() ||
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.tags?.some((t) => t.includes(search.toLowerCase())),
      )
      .sort(
        (a, b) =>
          DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty],
      );
  }, [gender, difficulty, search, showBlacklisted]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <SEO
        title="BEFF Guides"
        description="Named GTA Online BEFF outfit guides with step-by-step instructions and component references."
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
          <p className="text-white/25 text-[10px] uppercase tracking-widest mt-2">
            Step-by-step guides for named BEFFs. Click any guide to view
            components and instructions.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides..."
            className="bg-[#111] border border-white/8 px-4 py-2 text-[12px] text-white placeholder-white/20 outline-none focus:border-yellow-500/30 transition-colors rounded-none w-48"
          />

          {/* Gender */}
          <div className="flex gap-1.5">
            {["all", "m", "f"].map((g) => (
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

          {/* Difficulty */}
          <div className="flex gap-1.5">
            {["all", "easy", "medium", "hard"].map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] border transition-all ${
                  difficulty === d
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"
                }`}
              >
                {d === "all" ? "All" : d}
              </button>
            ))}
          </div>

          {/* Blacklisted toggle */}
          <button
            onClick={() => setShowBlacklisted((v) => !v)}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] border transition-all ${
              showBlacklisted
                ? "bg-red-500/20 text-red-400 border-red-500/40"
                : "border-white/10 text-white/25 hover:border-white/25"
            }`}
          >
            {showBlacklisted ? "⚠ Blacklisted Shown" : "Blacklisted Hidden"}
          </button>

          <span className="text-[9px] text-white/20 uppercase tracking-widest ml-auto">
            {filtered.length} guide{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-white/20 text-[11px] uppercase tracking-widest">
            No guides match your filters
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GuideCard({ guide }) {
  const diff = DIFFICULTY_STYLE[guide.difficulty] || DIFFICULTY_STYLE.easy;

  return (
    <Link
      to={`/beff/guides/${guide.id}`}
      className="group block border border-white/8 bg-[#0d0d0d] hover:border-yellow-500/30 transition-all duration-200 overflow-hidden"
    >
      {/* Preview image */}
      <div className="relative aspect-video bg-[#111] overflow-hidden">
        <img
          src={guide.preview}
          alt={guide.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback */}
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

        {/* Blacklisted banner */}
        {guide.blacklisted && (
          <div className="absolute top-0 left-0 right-0 bg-red-500/80 text-white text-[8px] font-black uppercase tracking-[.2em] text-center py-1">
            ⚠ Blacklisted
          </div>
        )}

        {/* Gender badge */}
        <div className="absolute top-2 right-2 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-black/70 border border-white/10 text-white/50">
          {guide.gender === "m" ? "Male" : "Female"}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-[13px] font-black uppercase tracking-tight text-white group-hover:text-yellow-500 transition-colors leading-tight">
            {guide.name}
          </h3>
          {/* Difficulty */}
          <span
            className="text-[8px] font-black uppercase tracking-wider flex-shrink-0 mt-0.5"
            style={{ color: diff.color }}
          >
            {diff.label}
          </span>
        </div>

        {/* Stats row */}
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

        {/* Slots used */}
        <div className="flex flex-wrap gap-1 mb-3">
          {[...new Set(guide.components.map((c) => c.slot.toUpperCase()))].map(
            (slot) => (
              <span
                key={slot}
                className="text-[8px] font-black px-1.5 py-0.5 border border-white/10 text-white/30 uppercase tracking-wider"
              >
                {slot}
              </span>
            ),
          )}
        </div>

        {/* Tags */}
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

      {/* Footer */}
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
