//import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cari Game", path: "/search" },
    { name: "Game Gratis", path: "/free-games" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Budget Planner", path: "/budget" },
    { name: "Kontak", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#14151B]/90 backdrop-blur-md border-b border-[#2D2E36] px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-white text-base">Gamer Wallet</span>
            <span className="bg-[#003822] text-[#00E292] text-xs px-2 py-0.5 rounded font-mono border border-[#00E292]/30">
              TZY
            </span>
          </Link>
          <span className="hidden xl:inline-block text-[11px] text-[#9CA3AF] border-l border-[#2D2E36] pl-3">
            Diskon Game & Finansial Mahasiswa
          </span>
        </div>

        {/* Menu Navigasi Tengah */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#1A1B22] px-2 py-1 rounded-xl border border-[#2D2E36] text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg transition ${
                  isActive
                    ? "bg-[#00E292] text-[#14151B] font-bold"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Info Kurs & Search Cepat */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1A1B22] border border-[#2D2E36] rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00E292]"></span>
            <span className="text-white font-medium">1 USD = Rp 16.250</span>
          </div>

          <div className="hidden md:flex items-center bg-[#1A1B22] border border-[#2D2E36] px-3 py-1.5 rounded-xl text-xs text-[#9CA3AF] gap-4">
            <span>Cari diskon...</span>
            <kbd className="bg-[#23242C] px-1.5 py-0.5 rounded text-[10px] text-white font-mono">
              Ctrl + K
            </kbd>
          </div>

          {/* Avatar Profil */}
          <div className="w-9 h-9 rounded-full bg-[#23242C] border border-[#2D2E36] flex items-center justify-center text-xs font-bold text-[#00E292] cursor-pointer">
            RA
          </div>
        </div>
      </div>
    </header>
  );
}
