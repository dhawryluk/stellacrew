export default function WheelHud({ wheelStyle }) {
  if (!wheelStyle) return null;
  const hasImg = wheelStyle.img && wheelStyle.img !== "/no-stock.png";
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 18px 12px",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        pointerEvents: "none",
      }}
    >
      {hasImg && (
        <img
          src={wheelStyle.img}
          alt={wheelStyle.name}
          referrerPolicy="no-referrer"
          style={{
            width: 54,
            height: 54,
            objectFit: "contain",
            flexShrink: 0,
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.95))",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 900,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          {wheelStyle.name}
        </span>
        {wheelStyle.category && (
          <span
            style={{
              fontSize: 8.5,
              fontWeight: 700,
              color: "rgba(234,179,8,0.6)",
              letterSpacing: "0.14em",
            }}
          >
            {wheelStyle.category.replace(/_/g, " ").toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
