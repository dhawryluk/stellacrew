import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Style logic for Active Links
  const navLinkStyles = ({ isActive }) =>
    `text-[10px] uppercase tracking-[0.3em] transition-all duration-300 no-underline ${
      isActive
        ? "text-accent! drop-shadow-[0_0_8px_var(--color-accent)] font-black"
        : "text-gray-400 hover:text-accent"
    }`;

  return (
    <nav
      className="fixed top-0 z-100 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-accent/10"
      style={{
        "--color-accent": "#d4af37", // Force Gold
        "--accent": "#d4af37",
      }}
    >
      {" "}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <NavLink
          to="/"
          className="text-white! text-xl font-black tracking-[0.2em] uppercase group no-underline"
        >
          STELLA
          <span className="text-accent! group-hover:text-white transition-colors">
            CREW
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/" className={navLinkStyles}>
            Home
          </NavLink>
          <NavLink to="/gallery" className={navLinkStyles}>
            Gallery
          </NavLink>
          <NavLink to="/vault" className={navLinkStyles}>
            Vault
          </NavLink>

          {/* New Resource Hub Action Button */}
          <NavLink to="/resources">
            <button className="bg-accent text-black border border-accent px-5 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all">
              Operative Tools
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-accent p-2 focus:outline-none"
          >
            {isOpen ? (
              <X size={24} strokeWidth={2} />
            ) : (
              <Menu size={24} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-accent/20 flex flex-col items-center py-12 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={navLinkStyles}
          >
            Home
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => setIsOpen(false)}
            className={navLinkStyles}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/vault"
            onClick={() => setIsOpen(false)}
            className={navLinkStyles}
          >
            Vault
          </NavLink>

          <NavLink to="/resources" onClick={() => setIsOpen(false)}>
            <button className="bg-accent text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] mt-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Operative Tools
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
