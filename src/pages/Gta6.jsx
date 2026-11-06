import Countdown from "../components/Countdown";
import gta6Logo from "../assets/gta6-logo.png";

// Midnight local time on Nov 19, 2026 (month is 0-indexed)
const LAUNCH = new Date(2026, 10, 19, 0, 0, 0).getTime();

const intel = [
  { label: "Launch", value: "NOV 19, 2026", note: "Midnight local time" },
  { label: "Platforms", value: "PS5 / XBOX SERIES X|S", note: "PC not announced" },
  { label: "Pre-load", value: "NOV 10", note: "Reported ~212 GB" },
];

const prep = [
  "Clear 215+ GB of free space on your console",
  "Pre-order digitally to pre-load from Nov 10",
  "Update your console and test your connection",
  "Follow the R* Newswire for day-one patch news",
];

const sources = [
  {
    title: "R* Newswire",
    desc: "Official announcements, trailers and screenshots straight from Rockstar.",
    href: "https://www.rockstargames.com/newswire",
  },
  {
    title: "Rockstar Games",
    desc: "Official GTA VI hub, pre-order info and platform details.",
    href: "https://www.rockstargames.com/VI",
  },
];

export default function Gta6() {
  return (
    <div className="relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-vice-pink/15 via-transparent to-vice-cyan/10" />

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16 space-y-16">
        {/* HERO */}
        <section className="text-center">
          <img
            src={gta6Logo}
            alt="GTA VI"
            className="mx-auto h-40 sm:h-52 w-auto object-contain drop-shadow-[0_0_30px_var(--color-vice-pink-glow)]"
          />
          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-wide text-accent">
            VICE CITY OPERATIVE BRIEFING
          </h1>
          <p className="mt-2 text-sm sm:text-base tracking-widest text-text-main/80">
            INTEL - PREP - LAUNCH WATCH
          </p>
          <div className="mt-8">
            <Countdown target={LAUNCH} />
          </div>
        </section>

        {/* CONFIRMED INTEL */}
        <section>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-vice-cyan uppercase">
            Confirmed Intel
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {intel.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border-subtle bg-panel p-5"
              >
                <p className="text-xs tracking-widest text-text-main/60 uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-extrabold text-accent">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-text-main/70">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PREP CHECKLIST */}
        <section>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-vice-pink uppercase">
            Launch Prep
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {prep.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border-subtle bg-panel p-4"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rotate-45 bg-accent" />
                <span className="text-text-main/90">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* OFFICIAL SOURCES */}
        <section>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-vice-cyan uppercase">
            Official Sources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {sources.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-vice-cyan/30 bg-panel p-5 transition hover:-translate-y-1 hover:border-vice-cyan hover:shadow-[0_0_25px_var(--color-vice-pink-glow)]"
              >
                <p className="font-extrabold text-text-main group-hover:text-accent-hover">
                  {s.title} <span aria-hidden>↗</span>
                </p>
                <p className="mt-1 text-sm text-text-main/70">{s.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* COMING SOON */}
        <section className="rounded-2xl border border-dashed border-accent/40 bg-locked p-8 text-center">
          <p className="text-lg font-extrabold tracking-wide text-accent">
            OPERATIVE TOOLS FOR GTA VI: INCOMING
          </p>
          <p className="mt-2 text-text-main/70">
            Guides, mods and breakdowns will land here as the game does. Join
            the Discord to be first in.
          </p>
        </section>
      </div>
    </div>
  );
}