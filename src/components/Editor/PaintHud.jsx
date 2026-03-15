import { isGradient } from "./paintUtils.js";

// ─── PAINT HUD ────────────────────────────────────────────────────────────────
const TYPE_BADGE = {
  Chrome: { bg: "#0c1c26", border: "#3a7a9a", text: "#78b8d8", icon: "✦" },
  Matte: { bg: "#141414", border: "#383838", text: "#787878", icon: "◼" },
  Chameleon: { bg: "#10081e", border: "#6a4aaa", text: "#b890f4", icon: "◈" },
  Metals: { bg: "#181208", border: "#7a5018", text: "#c09030", icon: "⬡" },
  Metallic: { bg: "#08101e", border: "#2a4880", text: "#70a0d0", icon: "◇" },
  Worn: { bg: "#141010", border: "#4a3028", text: "#886050", icon: "◧" },
};

export default function PaintHud({ config, crewVisible, crewTarget }) {
  const getBg = (c) => {
    if (!c?.hex || c.hex === "transparent") return "#1a1a1a";
    if (isGradient(c.hex)) return c.hex;
    return `#${c.hex.replace("#", "")}`;
  };
  const slots = [
    { label: "PRI", c: config.primary },
    { label: "SEC", c: config.secondary },
    {
      label: "PRL",
      c: config.pearl?.hex !== "transparent" ? config.pearl : null,
    },
    { label: "RIM", c: config.rim },
  ].filter((s) => s.c);
  const badge = TYPE_BADGE[config.primary?.type];
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 30,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {slots.map(({ label, c }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 3 }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 3,
                background: getBg(c),
                border: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,0.28)",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {config.primary && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 900,
            }}
          >
            {config.primary.name}
          </span>
          {badge && (
            <span
              style={{
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                borderRadius: 3,
                padding: "1px 5px",
                fontSize: 7.5,
                color: badge.text,
                fontWeight: 900,
              }}
            >
              {badge.icon} {config.primary.type?.toUpperCase()}
            </span>
          )}
        </div>
      )}
      {crewVisible && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: config.crew?.hex || "#ff00ff",
              border: "1px solid rgba(234,179,8,0.5)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 7.5,
              fontWeight: 900,
              letterSpacing: "0.1em",
              color: "rgba(234,179,8,0.75)",
            }}
          >
            CREW · {(crewTarget || "BOTH").toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
