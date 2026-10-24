import React, { useRef, useState } from 'react';
import { LIMITS, validateContact, validateField } from '../utils/validateContact';

const TEAM = [
  { name: 'RIFKY ALBUCHORI', role: 'LEAD', title: 'Koordinator & Lead Dev', desc: 'Detail Game, Wishlist Core' },
  { name: 'AFFAN SALIM YUAN UTOMO', role: 'DATA', title: 'Data Engineer', desc: 'CheapShark & GameCard ETL' },
  { name: 'RAKENDRA AZNIL RAEKHAN DEVARA', role: 'ARCH', title: 'Frontend Architect', desc: 'UI/UX & Layout Foundation' },
  { name: 'IBNU HAFIDZ', role: 'FINTECH', title: 'Financial Logic', desc: 'Frankfurter ECB & Budget Plan' },
  { name: 'KHALIFA FATTAN AHMAD', role: 'DROPS', title: 'Giveaway Lead', desc: 'GamerPower API & Proxy Handler' },
  { name: 'ROSA ARDILA', role: 'QA', title: 'QA & Documentation', desc: 'Kontak, Aksesibilitas & PRD' }
];

const SOURCES = [
  {
    name: 'CheapShark Deals API',
    tag: 'USD Feed',
    desc: 'Harga dan deal game PC dalam USD dari banyak toko digital.',
    href: 'https://apidocs.cheapshark.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34e0a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )
  },
  {
    name: 'Frankfurter API',
    tag: 'ECB Official',
    desc: 'Kurs USD ke IDR dari Bank Sentral Eropa, diperbarui harian.',
    href: 'https://frankfurter.dev',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
    )
  },
  {
    name: 'GamerPower API',
    tag: 'Verified Free',
    desc: 'Daftar giveaway game dan DLC gratis yang sedang aktif.',
    href: 'https://www.gamerpower.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"></polyline>
        <rect x="2" y="7" width="20" height="5"></rect>
        <line x1="12" y1="22" x2="12" y2="7"></line>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
      </svg>
    )
  },
];

const INITIAL = { nama: '', email: '', pesan: '' };
const FIELD_ORDER = ['nama', 'email', 'pesan'];

export default function About() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const refs = { nama: useRef(null), email: useRef(null), pesan: useRef(null) };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxLen = LIMITS?.messageMax || 500;
    if (name === 'pesan' && value.length > maxLen) return;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const message = validateField ? validateField(name, value) : '';
      setErrors((prev) => ({ ...prev, [name]: message }));
    }
    if (status === 'success') setStatus('idle');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (validateField) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateContact ? validateContact(values) : {};
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setValues(INITIAL);
      setErrors({});
    }, 800);
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    ref: refs[name],
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    'aria-required': 'true',
    disabled: status === 'sending',
  });

  const getRoleStyle = (role) => {
    switch (role.toLowerCase()) {
      case 'lead': return 'bg-[#3b2a1a] text-[#f97316]';
      case 'data': return 'bg-[#1a2f3b] text-[#38bdf8]';
      case 'arch': return 'bg-[#2f1a3b] text-[#c084fc]';
      case 'fintech': return 'bg-[#1a3b2b] text-[#34e0a1]';
      case 'drops': return 'bg-[#3b1a20] text-[#f43f5e]';
      case 'qa': return 'bg-[#2b3b1a] text-[#a3e635]';
      default: return 'bg-[#202732] text-[#8a99ad]';
    }
  };

  return (
    <main id="main-content" className="bg-[#0d1015] text-[#e8edf3] max-w-[1200px] mx-auto px-6 py-8 pb-16 font-sans w-full box-border">
      {/* Top Meta System Tag */}
      <div className="flex justify-between items-center font-mono text-xs text-[#34e0a1] mb-4">
        <span>● SYSTEM // REPOSITORY OVERVIEW &amp; FEEDBACK CHANNEL</span>
        <span className="text-[#6b7c93]">IF-PB-2026-TZY</span>
      </div>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Kontak &amp; <span className="text-[#34e0a1]">Tentang Kami</span>
        </h1>
        <p className="text-[#8a99ad] text-sm max-w-[680px] leading-relaxed">
          Gamer Wallet TZY membantu gamer Indonesia membandingkan harga game PC dalam rupiah,
          merencanakan pembelian, dan tidak melewatkan game gratis.
        </p>
      </header>

      {/* GRID 2 KOLOM TAILWIND */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 w-full items-start">
        
        {/* KOLOM KIRI */}
        <div className="flex flex-col gap-6 min-w-0">
          
          {/* Card Tentang App */}
          <section className="bg-[#14181f] border border-[#202732] rounded-xl p-6" aria-labelledby="app-info-title">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#34e0a1]/10 text-[#34e0a1] border border-[#34e0a1]/25 text-[11px] font-bold px-2.5 py-1 rounded-md">
                TUGAS BESAR PEMROGRAMAN WEB
              </span>
              <span className="bg-[#231934] text-[#a78bfa] text-[11px] font-bold px-2.5 py-1 rounded-md">
                FIF - S1 REKAYASA PERANGKAT LUNAK
              </span>
            </div>
            <h2 id="app-info-title" className="text-white text-xl font-bold mb-3">Tentang Gamer Wallet TZY</h2>
            <p className="text-[#8a99ad] text-sm leading-relaxed mb-6">
              Gamer Wallet TZY adalah aplikasi web yang membantu gamer Indonesia memutuskan kapan dan di mana membeli game PC dengan harga terbaik, dengan harga dalam rupiah dan perencanaan budget bulanan. Pengguna mencari game, membandingkan harga antar toko, menyimpan game ke wishlist, lalu melihat berapa bulan uang jajan game dibutuhkan untuk membelinya. Halaman terpisah menampilkan game gratis yang sedang dibagikan, supaya pengguna tidak membeli game yang sebentar lagi gratis.
            </p>
            <div className="grid grid-cols-3 gap-3 bg-[#0d1015] border border-[#202732] rounded-lg p-3.5">
              <div>
                <span className="block text-[11px] text-[#6b7c93] font-bold mb-1">RUNTIME ENV</span>
                <span className="text-sm text-white font-bold">Client-SPA</span>
              </div>
              <div>
                <span className="block text-[11px] text-[#6b7c93] font-bold mb-1">DATA SOURCE</span>
                <span className="text-sm text-white font-bold">3 Live APIs</span>
              </div>
              <div>
                <span className="block text-[11px] text-[#6b7c93] font-bold mb-1">PRIVACY TRACKER</span>
                <span className="text-sm text-white font-bold">01 Telemetry</span>
              </div>
            </div>
          </section>

          {/* Card Tim Kami */}
          <section className="bg-[#14181f] border border-[#202732] rounded-xl p-6" aria-labelledby="tim-title">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#34e0a1] font-mono text-xs font-bold tracking-wider">DEVELOPMENT SQUAD</span>
              <span className="bg-[#202732] text-[#8a99ad] text-xs px-2 py-1 rounded">6/6 PRD Core Roles Active</span>
            </div>
            <h3 id="tim-title" className="text-white text-lg font-bold mb-4">Tim Kami (6 Anggota)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TEAM.map((m) => (
                <div key={m.name} className="bg-[#0d1015] border border-[#202732] rounded-lg p-3.5">
                  <div className="flex justify-between items-center mb-1 gap-2">
                    <span className="text-white font-bold text-[11px] truncate">{m.name}</span>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${getRoleStyle(m.role)}`}>
                      {m.role}
                    </span>
                  </div>
                  <div className="text-[#d1d9e2] text-xs font-semibold">{m.title}</div>
                  <div className="text-[#6b7c93] text-[11px] mt-1">{m.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Card Transparansi API Interaktif */}
          <section className="bg-[#14181f] border border-[#202732] rounded-xl p-6" aria-labelledby="sumber-title">
            <span className="text-[#34e0a1] font-mono text-xs font-bold tracking-wider block mb-1">COMPLIANCE &amp; TRUST</span>
            <h3 id="sumber-title" className="text-white text-lg font-bold mb-4">Transparansi Sumber API</h3>
            
            <div className="flex flex-col gap-4 mb-5">
              {SOURCES.map((s) => (
                <a 
                  key={s.name}
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0d1015] border border-[#202732] rounded-lg p-3.5 flex gap-3.5 items-start no-underline transition-all duration-200 hover:border-[#34e0a1] hover:-translate-y-0.5"
                >
                  <div className="bg-[#14181f] border border-[#232a35] rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-white text-sm font-bold m-0">{s.name} ↗</h4>
                      <span className="bg-[#1d2530] text-[#34e0a1] text-[11px] px-2 py-0.5 rounded">{s.tag}</span>
                    </div>
                    <p className="text-[#7e8c9e] text-xs leading-relaxed m-0">{s.desc}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-[#34e0a1]/5 border border-[#34e0a1]/20 rounded-lg p-3.5 text-xs">
              <div className="text-[#34e0a1] font-bold mb-1">🛡️ Kebijakan Privasi &amp; Penyimpanan Data</div>
              <p className="text-[#8a99ad] m-0 leading-relaxed">
                Harga rupiah adalah perkiraan dari kurs Bank Sentral Eropa, bukan kurs toko, jadi bisa sedikit berbeda dari harga saat checkout.
              </p>
            </div>
          </section>

          {/* Card Repo Link GitHub */}
          <a 
            href="https://github.com/RifkyALB168/Gamer-Wallet-TZY" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[#14181f] border border-[#202732] rounded-xl p-4 flex justify-between items-center no-underline transition-all duration-200 hover:border-[#34e0a1] hover:-translate-y-0.5 cursor-pointer"
          >
            <div>
              <span className="text-white font-bold text-sm block">&lt;/&gt; Repositori Open Source Mahasiswa ↗</span>
              <p className="text-[#6b7c93] text-xs mt-1 mb-0">Arsitektur web statis siap demo penilaian akhir semester.</p>
            </div>
            <span className="bg-[#1a3b2b] text-[#34e0a1] text-xs font-extrabold px-2.5 py-1 rounded-md shrink-0 ml-2">
              PRD STANDARDS VERIFIED
            </span>
          </a>
        </div>

        {/* KOLOM KANAN */}
        <div className="flex flex-col gap-6 min-w-0">
          
          {/* Card Form Kontak */}
          <section className="bg-[#14181f] border border-[#202732] rounded-xl p-6" aria-labelledby="kontak-title">
            <span className="text-[#34e0a1] font-mono text-xs font-bold tracking-wider block mb-1">KOMUNIKASI TERBUKA</span>
            <h3 id="kontak-title" className="text-white text-lg font-bold mb-4">Kirim Pesan ke Tim</h3>

            {status === 'success' && (
              <p className="bg-[#1a3b2b] text-[#34e0a1] p-3 rounded-lg text-sm mb-4 leading-relaxed" role="status">
                Pesan terkirim. Terima kasih, tim akan membacanya segera.
                <span className="text-[#8a99ad] text-xs block mt-1"> (Simulasi: aplikasi ini tidak memakai backend.)</span>
              </p>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="nama" className="text-white text-xs font-semibold">Nama</label>
                  <span className="text-[#34e0a1] text-[11px]">*Wajib</span>
                </div>
                <input 
                  type="text" 
                  autoComplete="name" 
                  placeholder="Contoh: Ahmad Fauzi" 
                  {...fieldProps('nama')} 
                  className="w-full bg-[#0d1015] border border-[#202732] aria-[invalid=true]:border-[#ff8a8a] focus:border-[#34e0a1] rounded-lg p-3 text-white text-sm outline-none box-border"
                />
                {errors.nama ? (
                  <p id="nama-error" className="text-[#ff8a8a] text-xs mt-1.5 font-semibold" role="alert">{errors.nama}</p>
                ) : (
                  <span className="text-[#6b7c93] text-[11px] block mt-1">Gunakan nama panggilan atau nama mahasiswa Anda.</span>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="email" className="text-white text-xs font-semibold">Email</label>
                  <span className="text-[#34e0a1] text-[11px]">*Wajib</span>
                </div>
                <input 
                  type="email" 
                  autoComplete="email" 
                  placeholder="fauzi@mahasiswa.ac.id" 
                  {...fieldProps('email')} 
                  className="w-full bg-[#0d1015] border border-[#202732] aria-[invalid=true]:border-[#ff8a8a] focus:border-[#34e0a1] rounded-lg p-3 text-white text-sm outline-none box-border"
                />
                {errors.email ? (
                  <p id="email-error" className="text-[#ff8a8a] text-xs mt-1.5 font-semibold" role="alert">{errors.email}</p>
                ) : (
                  <span className="text-[#6b7c93] text-[11px] block mt-1">Email aktif untuk konfirmasi balasan jika diperlukan.</span>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="pesan" className="text-white text-xs font-semibold">Pesan</label>
                  <span className="text-[#34e0a1] text-[11px]">*Wajib</span>
                </div>
                <textarea 
                  rows={4} 
                  placeholder="Tuliskan masukan atau pertanyaan Anda di sini..." 
                  {...fieldProps('pesan')} 
                  className="w-full bg-[#0d1015] border border-[#202732] aria-[invalid=true]:border-[#ff8a8a] focus:border-[#34e0a1] rounded-lg p-3 text-white text-sm outline-none box-border resize-none"
                />
                <div className="flex justify-between text-[#6b7c93] text-[11px] mt-1">
                  <span>Maksimal {LIMITS?.messageMax || 500} karakter</span>
                  <span>{values.pesan.trim().length} / {LIMITS?.messageMax || 500}</span>
                </div>
                {errors.pesan && (
                  <p id="pesan-error" className="text-[#ff8a8a] text-xs mt-1.5 font-semibold" role="alert">{errors.pesan}</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="bg-[#34e0a1] text-[#05261a] font-extrabold text-sm border-none rounded-lg p-3.5 mt-2 cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Mengirim...' : '► Kirim pesan'}
              </button>
            </form>

            <div className="text-xs text-[#6b7c93] leading-relaxed mt-4 bg-[#0d1015] p-3 rounded-lg border border-[#202732]">
              ℹ️ Pesanan disimulasikan sukses terkirim sesuai spesifikasi PRD (tanpa backend). Data disimpan sementara di LocalStorage browser untuk demonstrasi UI.
            </div>
          </section>

          {/* Card Fast Links Dokumentasi */}
          <section className="bg-[#14181f] border border-[#202732] rounded-xl p-6" aria-labelledby="docs-title">
            <span className="text-[#34e0a1] font-mono text-xs font-bold tracking-wider block mb-3">FAST LINKS &amp; DOKUMENTASI</span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Dokumen PRD', icon: '📑', href: '/docs/PRD-Gamer-Wallet-TZY.md' },
                { title: 'Rubrik Penilaian', icon: '⭐', href: '/docs/RUBRIK-Penilaian.md' },
                { title: 'API Spec Logs', icon: '⚙️', href: '/docs/API-SPEC.md' },
                { title: 'Panduan Setup', icon: '📖', href: '/README.md' },
              ].map((doc) => (
                <a 
                  key={doc.title}
                  href={doc.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0d1015] border border-[#202732] rounded-lg p-3 text-white no-underline text-xs font-semibold flex justify-between items-center transition-colors hover:border-[#34e0a1] hover:text-[#34e0a1]"
                >
                  <span>{doc.title}</span>
                  <span className="text-sm">{doc.icon}</span>
                </a>
              ))}
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}