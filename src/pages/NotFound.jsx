import React, { useState } from 'react';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?q=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      window.location.href = '/';
    }
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <main className="min-h-[85vh] bg-[#0d1015] text-[#e8edf3] flex flex-col items-center justify-center px-4 py-12 font-sans w-full box-border">
      <div className="max-w-[900px] w-full flex flex-col items-center text-center">
        
        {/* 1. Badge Status Atas */}
        <div className="inline-flex items-center gap-2 bg-[#14181f] border border-[#202732] text-xs font-mono px-4 py-2 rounded-full mb-8 shadow-md">
          <span className="w-2 h-2 bg-[#34e0a1] rounded-full shadow-[0_0_8px_#34e0a1] animate-pulse"></span>
          <span className="text-[#e8edf3] font-bold">GAME OVER</span>
          <span className="text-[#6b7c93]">•</span>
          <span className="text-[#34e0a1] font-bold">ERROR 404</span>
          <span className="text-[#6b7c93]">|</span>
          <span>💔 0 HP</span>
        </div>

        {/* 2. Hero Icon 404 */}
        <div className="relative flex items-center justify-center mb-6 w-full">
          <span className="text-8xl sm:text-9xl font-black font-mono text-[#14181f] select-none tracking-widest">
            404
          </span>
          <div className="absolute bg-[#14181f] border border-[#202732] p-4 rounded-2xl shadow-xl flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#34e0a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="2" x2="22" y2="22"></line>
              <path d="M6.2 6.2A6 6 0 0 0 6 8v4a2 2 0 0 0 2 2h8a2 2 0 0 0 1.8-1.1"></path>
              <path d="M18 12V8a6 6 0 0 0-8.7-5.3"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
        </div>

        {/* 3. Judul & Deskripsi Utama */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
          Ups!
        </h1>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Quest ini Tidak Ditemukan di Map
        </h1>
        <p className="text-[#8a99ad] text-sm max-w-[580px] leading-relaxed mb-8">
          Halaman yang kamu tuju mungkin sudah pindah toko, diskon telah kedaluwarsa, atau URL salah ketik. Tenang, dompetmu tetap aman!
        </p>

        {/* 4. Search Bar Interaktif */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-[540px] flex flex-col sm:flex-row gap-2.5 mb-10">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7c93" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Atau cari langsung game incaranmu di sini..." 
              className="w-full bg-[#14181f] border border-[#202732] focus:border-[#34e0a1] rounded-lg pl-10 pr-4 py-3 text-white text-sm outline-none box-border transition-colors"
            />
          </div>
          <button 
            type="submit" 
            className="bg-[#34e0a1] text-[#05261a] font-extrabold text-sm border-none rounded-lg px-6 py-3 cursor-pointer transition-opacity hover:opacity-90 shrink-0"
          >
            Cari &rarr;
          </button>
        </form>

        {/* 5. Grid 3 Card Pilihan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8 text-left">
          <div className="bg-[#14181f] border border-[#202732] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#34e0a1] hover:-translate-y-1 group">
            <div>
              <div className="bg-[#34e0a1]/10 border border-[#34e0a1]/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34e0a1" strokeWidth="2">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/>
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">Beranda Diskon</h3>
              <p className="text-[#8a99ad] text-xs leading-relaxed mb-4">
                Kembali ke katalog deal termurah hari ini. Pantau diskon historis terendah se-Indonesia.
              </p>
            </div>
            <button onClick={() => navigateTo('/')} className="text-[#34e0a1] text-xs font-bold no-underline group-hover:underline text-left bg-transparent border-none cursor-pointer p-0">
              Buka Home &rsaquo;
            </button>
          </div>

          <div className="bg-[#14181f] border border-[#202732] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#38bdf8] hover:-translate-y-1 group">
            <div>
              <div className="bg-[#38bdf8]/10 border border-[#38bdf8]/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">Cari Game PC</h3>
              <p className="text-[#8a99ad] text-xs leading-relaxed mb-4">
                Cari judul game impian di puluhan toko resmi (Steam, Epic, GOG) dengan kurs real-time.
              </p>
            </div>
            <button onClick={() => navigateTo('/')} className="text-[#38bdf8] text-xs font-bold no-underline group-hover:underline text-left bg-transparent border-none cursor-pointer p-0">
              Cari Game &rsaquo;
            </button>
          </div>

          <div className="bg-[#14181f] border border-[#202732] rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#c084fc] hover:-translate-y-1 group">
            <div>
              <div className="bg-[#c084fc]/10 border border-[#c084fc]/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2">
                  <polyline points="20 12 20 22 4 22 4 12"></polyline>
                  <rect x="2" y="7" width="20" height="5"></rect>
                  <line x1="12" y1="22" x2="12" y2="7"></line>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                </svg>
              </div>
              <h3 className="text-white text-base font-bold mb-2">Klaim Game Gratis</h3>
              <p className="text-[#8a99ad] text-xs leading-relaxed mb-4">
                Cek giveaway 100% free aktif sebelum batas klaim berakhir. Hemat dompet mahasiswa!
              </p>
            </div>
            <button onClick={() => navigateTo('/free-games')} className="text-[#c084fc] text-xs font-bold no-underline group-hover:underline text-left bg-transparent border-none cursor-pointer p-0">
              Cek Game Gratis &rsaquo;
            </button>
          </div>
        </div>

        {/* 6. Banner Bawah */}
        <div className="w-full bg-[#14181f] border border-[#202732] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 text-xs">
          <div className="flex items-center gap-2 text-white font-medium">
            <span>🧮</span>
            <span>Butuh menghitung alokasi jajan game bulan ini?</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('/budget')} className="text-[#34e0a1] font-bold no-underline hover:underline bg-transparent border-none cursor-pointer p-0">
              Buka Budget Planner ↗
            </button>
            <span className="text-[#6b7c93]">•</span>
            <button onClick={() => navigateTo('/about')} className="text-[#8a99ad] no-underline hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0">
              Hubungi Tim
            </button>
          </div>
        </div>

        {/* 7. Footer Version Text */}
        <div className="text-xs text-[#6b7c93] font-mono">
          📋 Error Code: <code className="text-[#34e0a1] bg-[#14181f] px-1.5 py-0.5 rounded border border-[#202732] mr-1.5">404_PAGE_NOT_FOUND</code> 
          Gamer Wallet TZY v2.4 (SPA Vite Router)
        </div>

      </div>
    </main>
  );
}