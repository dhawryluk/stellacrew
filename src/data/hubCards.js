import gta5Logo from "../assets/gta5-logo.png";
import gta6Logo from "../assets/gta6-logo.png";

export const hubCards = [
  {
    to: "/resources",
    logo: gta5Logo,
    alt: "GTA V",
    title: "OPERATIVE TOOLS",
    subtitle: "GUIDES - BEFF - MODS",
    frame:
      "linear-gradient(135deg, var(--color-accent-hover), var(--color-accent-dark) 50%, var(--color-accent-hover))",
    glow: "var(--color-accent-glow)",
    line: "var(--color-accent)",
    badge: "var(--color-accent)",
  },
  {
    to: "/gta6",
    logo: gta6Logo,
    alt: "GTA VI",
    title: "OPERATIVE BRIEFING",
    subtitle: "INTEL - LEAKS - PREP",
    frame:
      "linear-gradient(135deg, var(--color-vice-pink), var(--color-border-subtle) 40%, var(--color-border-subtle) 60%, var(--color-vice-cyan))",
    glow: "var(--color-vice-pink-glow)",
    line: "var(--color-vice-pink)",
    badge: "var(--color-accent)",
  },
];