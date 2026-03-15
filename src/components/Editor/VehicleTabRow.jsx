// ─── VEHICLE TAB ROW ──────────────────────────────────────────────────────────
export default function VehicleTabRow({ vehicles, activeId, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "#060606",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <style>{`.vtabs::-webkit-scrollbar{display:none}`}</style>
      {vehicles.map((v) => {
        const active = v.id === activeId;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            style={{
              flex: "0 0 auto",
              background: active ? "rgba(234,179,8,0.07)" : "transparent",
              border: "none",
              borderBottom: `2px solid ${active ? "#EAB308" : "transparent"}`,
              borderRight: "1px solid rgba(255,255,255,0.04)",
              padding: "10px 18px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              transition: "all 0.15s",
              minWidth: 72,
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{v.icon}</span>
            <span
              style={{
                fontSize: 8,
                fontWeight: 900,
                letterSpacing: "0.1em",
                color: active ? "#EAB308" : "rgba(255,255,255,0.3)",
                transition: "color 0.15s",
              }}
            >
              {v.label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
