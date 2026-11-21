import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { CHAPTERS, ITEMS } from "../data/gta6Checklist";

const STORAGE_KEY = "scg-gta6-checklist-v1";
// TODO: replace with your real Discord invite
const DISCORD_URL = "https://discord.gg/cTCmRcp";

function loadChecked() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function Badge({ children, tone }) {
  const tones = {
    tested: "border-vice-cyan/60 text-vice-cyan",
    reported: "border-border-subtle text-text-main/60",
    spoiler: "border-vice-pink/50 text-vice-pink",
  };
  return (
    <span
      className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export default function Gta6Checklist() {
  const [checked, setChecked] = useState(loadChecked);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // Storage can be blocked (private mode). The checklist still works for this visit.
    }
  }, [checked]);

  const visible = useMemo(
    () => ITEMS.filter((i) => filter === "all" || i.status === "tested"),
    [filter]
  );

  const doneCount = visible.filter((i) => checked[i.id]).length;
  const percent = visible.length
    ? Math.round((doneCount / visible.length) * 100)
    : 0;

  const toggle = (id) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const reset = () => {
    if (window.confirm("Clear all your checkmarks?")) setChecked({});
  };

  return (
    <div className="relative overflow-hidden">
      <SEO
        title="GTA 6 Chapter Checklist: What You Lose Each Chapter"
        description="A checklist of what carries over, what closes and what you should finish before each chapter ends in GTA 6. Tick things off and your progress is saved in your browser."
        image="/images/share-image-v2.jpg"
        path="/gta6/checklist"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-vice-pink/15 via-transparent to-vice-cyan/10" />

      <div className="relative mx-auto max-w-3xl space-y-10 px-4 py-12 sm:py-16">
        <header>
          <Link
            to="/gta6"
            className="text-sm font-bold text-vice-cyan hover:text-accent-hover"
          >
            ← GTA 6 hub
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-wide text-accent sm:text-4xl">
            CHAPTER CHECKLIST
          </h1>
          <p className="mt-3 text-text-main/80">
            What you lose, what closes and what to finish before each chapter
            ends. Tick things off as you go. Your progress is saved in this
            browser only.
          </p>
          <p className="mt-2 text-sm text-text-main/60">
            Contains light story spoilers. Entries marked{" "}
            <span className="font-bold text-vice-cyan">Tested</span> were
            checked in-game by Stella Crew. Entries marked{" "}
            <span className="font-bold">Reported</span> come from other sites
            and we haven't tested them yet.
          </p>
        </header>

        {/* progress + filter */}
        <section className="rounded-xl border border-border-subtle bg-panel p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-extrabold text-text-main">
              {doneCount} of {visible.length} covered
            </p>
            <p className="font-extrabold text-accent">{percent}%</p>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-border-subtle"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Checklist progress"
          >
            <div
              className="h-full bg-accent transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All entries" },
              { id: "tested", label: "Tested only" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full border px-4 py-1.5 text-sm font-bold transition ${
                  filter === f.id
                    ? "border-accent bg-accent text-black"
                    : "border-border-subtle text-text-main hover:border-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
            <button
              type="button"
              onClick={reset}
              className="ml-auto text-sm font-bold text-text-main/60 hover:text-accent-hover"
            >
              Reset
            </button>
          </div>
        </section>

        {/* chapters */}
        {CHAPTERS.map((chapter) => {
          const items = visible.filter((i) => i.chapter === chapter.id);
          return (
            <section key={chapter.id}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-vice-pink">
                {chapter.title}
              </h2>
              {items.length === 0 ? (
                <p className="rounded-xl border border-dashed border-accent/40 bg-locked p-5 text-sm text-text-main/70">
                  {chapter.note || "Nothing here yet."}
                </p>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className={`rounded-xl border bg-panel p-4 transition ${
                        checked[item.id]
                          ? "border-accent/50"
                          : "border-border-subtle"
                      }`}
                    >
                      <label className="flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={!!checked[item.id]}
                          onChange={() => toggle(item.id)}
                          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block font-extrabold text-text-main ${
                              checked[item.id] ? "line-through opacity-60" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                          <span className="mt-1 block text-sm text-text-main/80">
                            {item.detail}
                          </span>
                        </span>
                      </label>
                      <div className="mt-3 flex flex-wrap items-center gap-2 pl-8">
                        <Badge tone={item.status}>
                          {item.status === "tested" ? "Tested" : "Reported"}
                        </Badge>
                        {item.spoiler === "light" && (
                          <Badge tone="spoiler">Light spoiler</Badge>
                        )}
                        {item.source && (
                          <a
                            href={item.source.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-text-main/60 underline hover:text-accent-hover"
                          >
                            {item.source.label} ↗
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        {/* contribute */}
        <section className="rounded-2xl border border-dashed border-accent/40 bg-locked p-8 text-center">
          <p className="text-lg font-extrabold tracking-wide text-accent">
            FOUND SOMETHING WE MISSED?
          </p>
          <p className="mt-2 text-text-main/70">
            Tell us in the Discord. Things we confirm in-game get added here.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-accent px-5 py-2 font-extrabold text-black transition hover:bg-accent-hover"
          >
            Join the Discord
          </a>
        </section>

        <p className="text-center text-xs leading-relaxed text-text-main/50">
          Unofficial fan page. Not affiliated with Rockstar Games or Take-Two
          Interactive. Grand Theft Auto VI is © Rockstar Games.
        </p>
      </div>
    </div>
  );
}
