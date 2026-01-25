import Star from "../assets/StellaStar.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center min-h-[60vh] pt-40 pb-12 px-6 text-center border-b border-accent/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 mb-6 lg:mt-8 transition-transform duration-700 hover:scale-105">
        <img
          src={Star}
          alt="StellaCrew Logo"
          className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-contain brightness-110 drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]"
        />
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.3em] text-accent uppercase mb-2 leading-[1.2] md:leading-normal">
          <span className="block md:inline">STELLA</span>
          <span className="block md:inline">CREW</span>
        </h1>
        <p className="text-accent/60 text-[10px] md:text-xs tracking-[0.6em] uppercase mb-8 ml-[0.6em]">
          Architects of Excellence
        </p>
      </div>

      <NavLink
        to="/vault"
        className="relative z-10 border border-accent text-accent px-10 py-3 text-[10px] md:text-xs tracking-[0.4em] uppercase hover:bg-accent hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
      >
        Enter the Vault
      </NavLink>
    </header>
  );
}
