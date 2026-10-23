import React from 'react';

export default function Footer() {
  const sources = [
    {
      name: 'CheapShark Deals API',
      desc: 'Sinkronisasi harga game multi-store real-time.',
      href: 'https://apidocs.cheapshark.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34e0a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      name: 'GamerPower Giveaways',
      desc: 'Data klaim 100% free games & DLC aktif.',
      href: 'https://www.gamerpower.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12"></polyline>
          <rect x="2" y="7" width="20" height="5"></rect>
          <line x1="12" y1="22" x2="12" y2="7"></line>
        </svg>
      )
    },
    {
      name: 'Frankfurter ECB',
      desc: 'Feed kurs devisa resmi harian USD ke IDR.',
      href: 'https://frankfurter.dev',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#080a0e] border-t border-[#1a202c] text-[#9aa6b5] font-sans px-6 pt-12 pb-6 w-full box-border">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.2fr_1fr] gap-8">
        
        {/* Kolom 1: Brand Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xl font-extrabold text-white mb-3">
            <span>🎮</span>
            <span>Gamer Wallet <span className="text-[#34e0a1]">TZY</span></span>
          </div>
          <p className="text-xs leading-relaxed text-[#718096] mb-4">
            Platform pemantau diskon game global dengan konversi real-time Rupiah dan kalkulator cerdas alokasi dompet mahasiswa.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-[#34e0a1] font-semibold">
            <span className="w-1.5 h-1.5 bg-[#34e0a1] rounded-full shadow-[0_0_6px_#34e0a1]"></span>
            <span>Cuan Maksimal, Gaming Jalan Terus</span>
          </div>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div className="flex flex-col">
          <h4 className="text-white text-xs font-extrabold tracking-wider mb-5 uppercase">NAVIGASI CEPAT</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
            {[
              { label: '› Katalog Diskon Steam & Epic', href: '/' },
              { label: '› Radar Game Gratis Mingguan', href: '/free-games' },
              { label: '› Kalkulator Budget Uang Saku', href: '/budget' },
              { label: '› Daftar Incaran Historis Low', href: '/wishlist' },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-[#a0aec0] no-underline text-xs transition-colors hover:text-[#34e0a1]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Integrasi Sumber Data Interaktif */}
        <div className="flex flex-col">
          <h4 className="text-white text-xs font-extrabold tracking-wider mb-5 uppercase">INTEGRASI SUMBER DATA</h4>
          <div className="flex flex-col gap-3">
            {sources.map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#0f131a] border border-[#1a2230] rounded-lg p-3 flex items-start gap-3 no-underline transition-all duration-200 hover:border-[#34e0a1] hover:bg-[#141a24] hover:-translate-y-0.5 group"
              >
                <div className="bg-[#18202c] p-1.5 rounded-md flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h5 className="text-[#e2e8f0] text-xs font-bold m-0 mb-1 group-hover:text-[#34e0a1] transition-colors">
                    {item.name} ↗
                  </h5>
                  <p className="text-[#718096] text-[11px] leading-snug m-0">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Kolom 4: Informasi Akademik */}
        <div className="flex flex-col">
          <h4 className="text-white text-xs font-extrabold tracking-wider mb-5 uppercase">INFORMASI AKADEMIK</h4>
          <div className="bg-[#0f131a] border border-[#1a2230] rounded-lg p-4">
            <span className="bg-[#34e0a1]/10 text-[#34e0a1] border border-[#34e0a1]/25 text-[10px] font-bold px-2 py-0.5 rounded inline-block">
              TUGAS BESAR PEMROGRAMAN WEB
            </span>
            <h5 className="text-white text-xs font-bold mt-2.5 mb-1">Tugas Besar Pemrograman Web 2026</h5>
            <p className="text-[#718096] text-xs m-0 mb-4">S1 REKAYASA PERANGKAT LUNAK • Fakultas Informatika</p>
            <div className="flex justify-between items-center text-xs border-t border-[#1a2230] pt-2.5">
              <span>Versi Rilis</span>
              <code className="text-[#34e0a1] font-mono">v2.4 Production</code>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Bottom Meta */}
      <div className="max-w-[1200px] mx-auto mt-8 pt-6 border-t border-[#121722] flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#4a5568]">
        <p className="m-0">© 2026 Gamer Wallet TZY. Dirancang untuk mahasiswa gamer Indonesia.</p>
        <p className="m-0">
          Data Giveaway didukung oleh GamerPower API • <span className="text-[#34e0a1]">● Sistem Normal (Latency 42ms)</span>
        </p>
      </div>
    </footer>
  );
}