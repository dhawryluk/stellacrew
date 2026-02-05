import { Youtube, Instagram, Twitch } from "lucide-react";
import Star from "../assets/branding/StellaStar.png";

export default function Footer() {
  return (
    <footer className="w-full bg-bg px-6 py-12 border-t border-accent/10 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        {/* Left Side: Logo & Desktop Copyright */}
        <div className="flex items-center gap-6 order-1">
          <div className="flex items-center gap-3">
            <img
              src={Star}
              alt="StellaStar"
              className="w-6 h-6 object-contain opacity-80"
            />
            <span className="text-accent font-bold text-xs md:text-sm tracking-[0.3em] uppercase">
              STELLACREW
            </span>
          </div>
          <span className="hidden md:block text-gray-600 text-[10px] uppercase tracking-widest border-l border-gray-800 pl-6">
            © 2026
          </span>
        </div>

        {/* Center: Legal Link & Tagline (Always Visible) */}
        <div className="flex flex-col items-center gap-3 order-2">
          <p className="text-[8px] md:text-[9px] tracking-[0.4em] text-gray-500/40 uppercase italic">
            Architects of Excellence
          </p>
          <a
            href="/terms"
            className="text-[9px] md:text-[10px] tracking-[0.5em] text-gray-500 uppercase hover:text-accent transition-all duration-300 border-b border-transparent hover:border-accent/30 pb-1"
          >
            Terms & Protocols
          </a>
        </div>

        {/* Right Side: Socials */}
        <div className="flex gap-6 items-center order-3">
          <a href="#" className="group transition-all duration-300">
            <Youtube
              size={18}
              strokeWidth={1.5}
              className="text-gray-500 group-hover:text-accent transition-colors"
            />
          </a>
          <a href="#" className="group transition-all duration-300">
            <Instagram
              size={18}
              strokeWidth={1.5}
              className="text-gray-500 group-hover:text-accent transition-colors"
            />
          </a>
          <a href="#" className="group transition-all duration-300">
            <Twitch
              size={18}
              strokeWidth={1.5}
              className="text-gray-500 group-hover:text-accent transition-colors"
            />
          </a>
          {/* TikTok Icon */}
          <a href="#" className="group transition-all duration-300">
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] fill-gray-500 group-hover:fill-accent transition-colors"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.1-3.44-3.37-3.42-5.72-.03-1.44.35-2.89 1.07-4.14 1.23-2.14 3.63-3.5 6.08-3.35.1.02.2.06.29.08v4.2c-.4-.06-.81-.07-1.21-.03-1.1.13-2.15.69-2.78 1.61-.55.82-.75 1.88-.5 2.84.28.98 1.04 1.81 2.01 2.12.89.26 1.89.13 2.69-.37.76-.46 1.23-1.28 1.34-2.15.02-3.53.01-7.06.01-10.59z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile-only Copyright */}
      <div className="md:hidden text-center mt-8 pt-8 border-t border-white/5">
        <span className="text-gray-700 text-[10px] uppercase tracking-widest">
          © 2026 StellaCrew Gaming
        </span>
      </div>
    </footer>
  );
}
