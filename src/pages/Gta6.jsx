import { useEffect, useMemo, useState } from "react";
import Countdown from "../components/Countdown";
import gta6Logo from "../assets/gta6-logo.png";

// Midnight local time on Nov 19, 2026 (month is 0-indexed)
const LAUNCH = new Date(2026, 10, 19, 0, 0, 0).getTime();

// TODO: replace with your real links
const DISCORD_URL = "https://discord.gg/YOUR_INVITE";

// TODO: paste YouTube Shorts video IDs here once your clips are live.
// The "Latest Clips" section stays hidden while this list is empty.
const SHORTS = [];

const intel = [
  { label: "Launch", value: "NOV 19, 2026", note: "Midnight local time in each region" },
  { label: "Platforms", value: "PS5 / XBOX SERIES X|S", note: "PC not announced" },
  { label: "Pre-load", value: "LIVE NOW", note: "PS5: Nov 10 at local midnight. Xbox: Nov 9, one global start" },
  { label: "Size", value: "UP TO 212 GB", note: "Per Rockstar's pre-load FAQ" },
];

const prep = [
  "Clear 215+ GB of free space on your console",
  "Pre-load now if you pre-ordered digitally",
  "Update your console and test your connection",
  "Follow the R* Newswire for day-one patch news",
];

// UTC offsets on Nov 19, 2026 (Sydney is on daylight time, northern zones on standard time)
const REGIONS = [
  { name: "New Zealand (first to unlock)", offset: 13 },
  { name: "Sydney", offset: 11 },
  { name: "Tokyo", offset: 9 },
  { name: "Mumbai", offset: 5.5 },
  { name: "Dubai", offset: 4 },
  { name: "Paris / Berlin", offset: 1 },
  { name: "London", offset: 0 },
  { name: "São Paulo", offset: -3 },
  { name: "New York", offset: -5 },
  { name: "Chicago", offset: -6 },
  { name: "Denver", offset: -7 },
  { name: "Los Angeles", offset: -8 },
];

const faq = [
  {
    q: "When can I pre-load?",
    a: "PS5 pre-load opened at midnight local time on Nov 10. Xbox pre-load opened globally at once, which was 4 p.m. PT / 7 p.m. ET on Nov 9. You need a digital pre-order.",
  },
  {
    q: "How much space do I need?",
    a: "Rockstar lists up to 212 GB depending on your device. Free up a little extra so the download and install don't stall.",
  },
  {
    q: "I bought a physical copy. Can I pre-load?",
    a: "Physical copies are code-in-box. The boxed codes were reported to reach shelves from Nov 12. Check Rockstar's pre-load FAQ for how to redeem yours.",
  },
  {
    q: "My download is slow. What can I do?",
    a: "Use a wired connection if you can, pause other downloads and streaming on your network, and restart the download once if it stops progressing.",
  },
  {
    q: "What is the New Zealand trick?",
    a: "GTA VI unlocks at midnight local time in every region, and New Zealand reaches Nov 19 first, roughly 18 hours before the US East Coast. Some players use a New Zealand store region to unlock early. On Xbox that means changing your console location. On PS5 an existing account can't change region, so it means buying on a separate New Zealand PSN account and using Console Sharing. It isn't an official Rockstar feature, it can bring regional pricing, payment and terms-of-service problems, and you can lose access if it doesn't work. Weigh that before you spend money, and don't buy the game twice.",
  },
  {
    q: "Will changing my console's clock time zone unlock it early?",
    a: "No. Unlock times follow the region tied to your store account, not the clock on your console.",
  },
  {
    q: "Is there a pre-order bonus?",
    // TODO: confirm the bonus details and deadline on Rockstar's site before publishing
    a: "Purchases made before Nov 20 were reported to include the Vintage Vice City Pack. Confirm the details on Rockstar's official site.",
  },
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

function useIsLive() {
  const [live, setLive] = useState(() => Date.now() >= LAUNCH);
  useEffect(() => {
    if (live) return;
    const id = setInterval(() => {
      if (Date.now() >= LAUNCH) setLive(true);
    }, 1000);
    return () => clearInterval(id);
  }, [live]);
  return live;
}

function RegionTimes() {
  const rows = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return REGIONS.map((r) => {
      // Midnight Nov 19 in that region, expressed as a UTC instant
      const instant = Date.UTC(2026, 10, 19, 0, 0, 0) - r.offset * 3600000;
      return { ...r, instant, local: fmt.format(new Date(instant)) };
    }).sort((a, b) => a.instant - b.instant);
  }, []);

  const myZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const myLaunch = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(LAUNCH));

  return (
    <div>
      <div className="rounded-xl border border-accent/40 bg-panel p-5">
        <p className="text-xs tracking-widest text-text-main/60 uppercase">
          Your unlock time{myZone ? ` (${myZone})` : ""}
        </p>
        <p className="mt-2 text-lg font-extrabold text-accent">{myLaunch}</p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border-subtle bg-panel">
        <table className="w-full text-left text-sm">
          <thead className="text-xs tracking-widest text-text-main/60 uppercase">
            <tr>
              <th className="px-4 py-3 font-bold">Region</th>
              <th className="px-4 py-3 font-bold">Unlocks at (your time)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-border-subtle">
                <td className="px-4 py-3 font-bold text-text-main">{r.name}</td>
                <td className="px-4 py-3 text-text-main/80">{r.local}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-text-main/60">
        Each region unlocks at its own midnight on Nov 19, so the game rolls out
        east to west.
      </p>
    </div>
  );
}

export default function Gta6() {
  const live = useIsLive();

  // Page title and description (social share image tags belong in index.html)
  useEffect(() => {
    document.title = "GTA 6 Launch Hub: Countdown, Pre-load Times & Prep | StellaCrew";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "GTA 6 launches Nov 19, 2026. Live countdown, unlock times by region, pre-load size and times, and launch prep from StellaCrew."
    );
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-vice-pink/15 via-transparent to-vice-cyan/10" />

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16 space-y-16">
        {/* HERO */}
        <section className="text-center pt-6 sm:pt-0">
          <img
            src={gta6Logo}
            alt="GTA VI"
            className="mx-auto h-32 sm:h-52 w-auto object-contain drop-shadow-[0_0_30px_var(--color-vice-pink-glow)]"
          />
          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-wide text-accent">
            {live ? "VICE CITY IS LIVE" : "VICE CITY OPERATIVE BRIEFING"}
          </h1>
          <p className="mt-2 text-sm sm:text-base tracking-widest text-text-main/80">
            {live ? "GUIDES - TOOLS - COMMUNITY" : "INTEL - PREP - LAUNCH WATCH"}
          </p>
          <div className="mt-8">
            {live ? (
              <div className="mx-auto max-w-md rounded-2xl border border-accent/40 bg-panel p-6">
                <p className="text-lg font-extrabold text-accent">
                  GTA VI is out now
                </p>
                <p className="mt-2 text-text-main/70">
                  Guides and breakdowns are landing here as we play. Join the
                  Discord to get them first.
                </p>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-lg bg-accent px-5 py-2 font-extrabold text-black transition hover:bg-accent-hover"
                >
                  Join the Discord
                </a>
              </div>
            ) : (
              <Countdown target={LAUNCH} />
            )}
          </div>
        </section>

        {/* CONFIRMED INTEL */}
        <section>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-vice-cyan uppercase">
            Confirmed Intel
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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

        {/* LAUNCH PREP */}
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

        {/* UNLOCK TIMES */}
        <section>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-vice-cyan uppercase">
            When Does It Unlock For You?
          </h2>
          <RegionTimes />
        </section>

        {/* PRELOAD FAQ */}
        <section>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-vice-pink uppercase">
            Pre-load FAQ
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border-subtle bg-panel p-4 open:border-accent/40"
              >
                <summary className="cursor-pointer list-none font-extrabold text-text-main marker:hidden focus-visible:outline-2 focus-visible:outline-accent">
                  {item.q}
                </summary>
                <p className="mt-3 text-text-main/80">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* LATEST CLIPS (hidden until SHORTS has IDs) */}
        {SHORTS.length > 0 && (
          <section>
            <h2 className="mb-4 text-sm font-bold tracking-widest text-vice-cyan uppercase">
              Latest Clips
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SHORTS.map((id) => (
                <div
                  key={id}
                  className="aspect-[9/16] overflow-hidden rounded-xl border border-border-subtle bg-panel"
                >
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${id}`}
                    title="StellaCrew GTA 6 short"
                    loading="lazy"
                    allow="accelerometer; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </section>
        )}

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

        {/* COMING SOON + SIGNUPS */}
        <section className="rounded-2xl border border-dashed border-accent/40 bg-locked p-8 text-center">
          <p className="text-lg font-extrabold tracking-wide text-accent">
            OPERATIVE TOOLS FOR VI: INCOMING
          </p>
          <p className="mt-2 text-text-main/70">
            Guides, mods and breakdowns will land here as the game does. Get
            them the moment they go up.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="https://discord.gg/cTCmRcp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-5 py-2 font-extrabold text-black transition hover:bg-accent-hover"
            >
              Join the Discord
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}