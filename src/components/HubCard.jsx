import { Link } from "react-router-dom";

export default function HubCard({
  to,
  logo,
  logoClass = "",
  alt,
  title,
  subtitle,
  frame,
  glow,
  line,
}) {
  return (
    <Link
      to={to}
      className="group block h-full transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
    >
      <div
        className="h-full rounded-2xl p-[2px] transition-shadow duration-300 group-hover:shadow-[0_0_35px_var(--hub-glow)]"
        style={{ background: frame, "--hub-glow": glow }}
      >
        <div className="relative h-full min-h-72 rounded-[14px] bg-linear-to-br from-panel-light via-panel to-bg overflow-hidden flex flex-col items-center justify-start text-center px-8 py-9">
          <div
            className="absolute inset-3 rounded-xl border opacity-60 pointer-events-none"
            style={{ borderColor: line }}
          />
          <div className="h-32 w-full flex items-center justify-center mb-3">
            <img
              src={logo}
              alt={alt}
              className={`h-full w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${logoClass}`}
            />
          </div>

          <h3 className="text-base sm:text-lg font-extrabold tracking-wide text-accent text-balance">
            {title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm tracking-widest text-text-main/80">
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}