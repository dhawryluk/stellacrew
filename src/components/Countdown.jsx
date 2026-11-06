import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export default function Countdown({ target }) {
  const [t, setT] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.done) {
    return (
      <p className="text-3xl sm:text-5xl font-extrabold tracking-widest text-vice-cyan">
        OUT NOW
      </p>
    );
  }

  const units = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Min", t.minutes],
    ["Sec", t.seconds],
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="w-16 sm:w-24 rounded-xl border border-vice-pink/40 bg-panel/80 py-3 sm:py-4"
        >
          <div className="text-2xl sm:text-4xl font-extrabold tabular-nums text-text-main">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] sm:text-xs tracking-widest uppercase text-vice-cyan">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}