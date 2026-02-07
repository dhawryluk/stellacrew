import { Link } from "react-router-dom"; // ✅ Import Link
import Star from "../assets/branding/StellaStar.png";

const SocialIcon = ({ path, href }) => (
  <a href={href} target="_blank" rel="noreferrer" className="group p-2 block">
    <div 
      className="w-[18px] h-[18px] bg-text-main/40 group-hover:bg-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
      style={{
        WebkitMaskImage: `url(${path})`,
        maskImage: `url(${path})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center'
      }}
    />
  </a>
);

export default function Footer() {
  return (
    <footer className="w-full bg-bg px-6 py-12 border-t border-accent/10 mt-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        
        {/* Logo Section */}
        <div className="flex items-center gap-6 order-1">
          <div className="flex items-center gap-3">
            <img src={Star} alt="StellaStar" className="w-6 h-6 object-contain opacity-80" />
            <span className="text-accent font-black text-[10px] tracking-[0.4em] uppercase">
              STELLACREW
            </span>
          </div>
          <span className="hidden md:block text-text-main/10 text-[9px] uppercase tracking-widest border-l border-white/5 pl-6 font-mono">
            © 2026_EST
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 order-2">
          <p className="text-[8px] tracking-[0.5em] text-text-main/20 uppercase font-black italic">
            Architects of Excellence
          </p>
          <Link 
            to="/termsPage" 
            className="text-[9px] md:text-[10px] tracking-[0.6em] text-text-main/40 uppercase font-black hover:text-accent transition-all duration-500 border-b border-transparent hover:border-accent/30 pb-1"
          >
            Terms & Protocols
          </Link>
        </div>

        <div className="flex gap-4 items-center order-3">
          <SocialIcon href="#" path="images/social/youtube.svg" />
          <SocialIcon href="#" path="images/social/instagram.svg" />
          <SocialIcon href="#" path="images/social/twitch.svg" />
          <SocialIcon href="#" path="images/social/tiktok.svg" />
        </div>
      </div>
    </footer>
  );
}