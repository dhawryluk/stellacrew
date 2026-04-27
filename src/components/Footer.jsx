import { Link } from "react-router-dom";
import Star from "../assets/branding/StellaStar.png";

const SocialIcon = ({ path, href }) => (
  <a href={href} target="_blank" rel="noreferrer" className="group p-2 block">
    <div
      className="w-4.5 h-4.5 bg-text-main/40 group-hover:bg-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
      style={{
        WebkitMaskImage: `url(${path})`,
        maskImage: `url(${path})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  </a>
);

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Vault", to: "/vault" },
  { label: "Resources", to: "/resources" },
  { label: "Car Builder", to: "/car-builder" },
  { label: "BEFF", to: "/beff/components" },
  { label: "Gallery", to: "/gallery" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-bg border-t border-accent/10 mt-20 font-sans">
      {/* Support strip */}
      <div className="border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-red-500/60 text-xs font-black">✕</span>
              <span className="text-[9px] font-black uppercase tracking-[.2em] text-white/30">
                No Ads. Ever.
              </span>
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-accent/50 text-xs font-black">◈</span>
              <span className="text-[9px] font-black uppercase tracking-[.2em] text-white/30">
                Always Free.
              </span>
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="text-[9px] text-white/20 uppercase tracking-widest">
              Hundreds of hours of work — if it helped, consider a coffee.
            </span>
          </div>
          <a
            href="https://ko-fi.com/stellacrew"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[9px] font-black uppercase tracking-[.2em] text-accent/60 hover:text-accent border border-accent/25 hover:border-accent/50 hover:bg-accent/5 px-4 py-2 transition-all whitespace-nowrap"
          >
            Buy us a Coffee →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={Star}
                alt="StellaStar"
                className="w-6 h-6 object-contain opacity-80"
              />
              <span className="text-accent font-black text-[10px] tracking-[0.4em] uppercase">
                STELLACREW
              </span>
            </div>
            <p className="text-[8px] tracking-[0.4em] text-text-main/20 uppercase font-black italic max-w-45">
              Architects of Excellence
            </p>
            <span className="text-text-main/10 text-[8px] uppercase tracking-widest font-mono">
              StellaCrew© 2014_EST
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            <div className="text-[8px] font-black uppercase tracking-[.3em] text-white/20 mb-2">
              Navigation
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-[10px] font-black uppercase tracking-[.15em] text-white/30 hover:text-accent transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + Terms */}
          <div className="flex flex-col gap-4 items-start lg:items-end">
            <div className="flex gap-1 items-center">
              <SocialIcon
                href="https://www.youtube.com/@StellaCrewGaming"
                path="images/social/youtube.svg"
              />
              <SocialIcon
                href="https://www.instagram.com/stellacrewgaming"
                path="images/social/instagram.svg"
              />
              <SocialIcon
                href="https://www.twitch.tv/stellacrewgaming"
                path="images/social/twitch.svg"
              />
              <SocialIcon
                href="https://www.tiktok.com/@stellacrewgaming"
                path="images/social/tiktok.svg"
              />
            </div>
            <Link
              to="/terms"
              className="text-[9px] tracking-[0.4em] text-text-main/30 uppercase font-black hover:text-accent transition-all duration-300 border-b border-transparent hover:border-accent/30 pb-0.5"
            >
              Terms & Protocols
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
