//import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mockGames from "../data/mockGames";
import SearchBar from "../components/search/SearchBar";
import { formatRupiah, usdKeRupiah } from "../utils/formatRupiah";

export default function Home() {
  const KURS_USD = 16250; // 1 USD = Rp 16.250

  // mengambil data dari mockGames
  const featuredGame = mockGames[0];
  const cheapDealsList = mockGames.slice(1, 5);

  return (
    <div className="min-h-screen bg-[#14151B] text-white">
      {/* Navigasi Atas */}
      <Navbar />

      {/* Konten Utama Home */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003822]/40 border border-[#00E292]/30 text-[#00E292] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00E292] animate-pulse"></span>
              Solusi Hemat Gamers Mahasiswa
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Cari Diskon Game PC, <br />
              <span className="text-[#00E292]">Sesuai Dompet Mahasiswa.</span>
            </h1>

            <p className="text-[#9CA3AF] text-base max-w-xl">
              Pantau potongan harga resmi dari Steam, Epic Games, & GOG secara
              real-time. Hitung alokasi uang jajan bulanan secara praktis dan
              rasional tanpa takut boncos.
            </p>

            {/* Search Bar */}
            <SearchBar />

            {/* Tren Pencarian */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#9CA3AF]">Tren:</span>
              {[
                "Black Myth: Wukong",
                "Helldivers 2",
                "Hollow Knight",
                "Hades II",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#1A1B22] border border-[#2D2E36] rounded-lg text-[#9CA3AF] hover:text-white cursor-pointer transition"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#2D2E36]">
              <div className="bg-[#1A1B22] p-4 rounded-xl border border-[#2D2E36]">
                <p className="text-xs text-[#9CA3AF]">Diskon Aktif</p>
                <p className="text-xl font-bold text-white mt-1">1.480+</p>
              </div>
              <div className="bg-[#1A1B22] p-4 rounded-xl border border-[#2D2E36]">
                <p className="text-xs text-[#9CA3AF]">Gratis Legal</p>
                <p className="text-xl font-bold text-[#00E292] mt-1">3 Game</p>
              </div>
              <div className="bg-[#1A1B22] p-4 rounded-xl border border-[#2D2E36]">
                <p className="text-xs text-[#9CA3AF]">Hemat Hingga</p>
                <p className="text-xl font-bold text-white mt-1">85% OFF</p>
              </div>
            </div>
          </div>

          {/* Banner Pilihan Hari Ini (Menggunakan mockGames[0])[cite: 5] */}
          <div className="lg:col-span-5 bg-[#1A1B22] border border-[#2D2E36] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#00E292] font-semibold uppercase tracking-wider">
                Pilihan Hari Ini
              </span>
              <span className="text-[#9CA3AF]">
                {featuredGame.toko} • DRM-Free
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-video bg-[#23242C]">
              <div className="absolute top-3 right-3 bg-[#00E292] text-[#14151B] font-bold text-xs px-2.5 py-1 rounded-md">
                -{featuredGame.diskonPersen}%
              </div>
              <img
                src={featuredGame.cover}
                alt={featuredGame.judul}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold">{featuredGame.judul}</h3>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                Platform Resmi • RPG Petualangan
              </p>
            </div>

            <div className="flex items-end justify-between pt-2 border-t border-[#2D2E36]">
              <div>
                <span className="text-xs text-[#9CA3AF] line-through">
                  {formatRupiah(
                    usdKeRupiah(featuredGame.hargaAsliUsd, KURS_USD),
                  )}
                </span>
                <p className="text-lg font-extrabold text-[#00E292]">
                  {formatRupiah(usdKeRupiah(featuredGame.hargaUsd, KURS_USD))}
                </p>
              </div>
              <span className="text-xs text-[#9CA3AF] bg-[#23242C] px-2.5 py-1 rounded-md">
                {featuredGame.toko} Store
              </span>
            </div>

            <Link
              to="/budget"
              className="w-full py-3 bg-[#00E292] hover:bg-[#00c982] text-[#14151B] font-bold rounded-xl flex items-center justify-center gap-2 transition text-sm"
            >
              <span>Hitung Tabungan</span>
              <span>🧮</span>
            </Link>
          </div>
        </div>

        {/* SECTION: DEAL TERMURAH HARI INI (Mapping dari mockGames)[cite: 5] */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-xs text-[#00E292] font-semibold uppercase tracking-wider">
                CHEAPSHARK • FEED
              </p>
              <h2 className="text-2xl font-bold">Deal Termurah Hari Ini</h2>
              <p className="text-xs text-[#9CA3AF]">
                Diskon resmi terverifikasi, otomatis dikonversi ke Rupiah.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 bg-[#1A1B22] p-1.5 rounded-xl border border-[#2D2E36]">
              {["Semua", "Steam", "Epic Games", "Diskon >70%"].map(
                (tab, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${idx === 0 ? "bg-[#00E292] text-[#14151B]" : "text-[#9CA3AF] hover:text-white"}`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cheapDealsList.map((game) => (
              <div
                key={game.id}
                className="bg-[#1A1B22] border border-[#2D2E36] rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-[#00E292]/50 transition"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video bg-[#23242C] rounded-xl overflow-hidden flex items-center justify-center text-xs text-[#9CA3AF]">
                    <span className="absolute top-2 right-2 bg-[#00E292] text-[#14151B] font-bold text-[10px] px-2 py-0.5 rounded">
                      -{game.diskonPersen}%
                    </span>
                    <img
                      src={game.cover}
                      alt={game.judul}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#9CA3AF]">
                    <span>{game.toko} Store</span>
                    <span>Official</span>
                  </div>
                  <h4 className="font-bold text-sm line-clamp-1">
                    {game.judul}
                  </h4>
                </div>

                <div className="pt-3 border-t border-[#2D2E36] space-y-3">
                  <div>
                    <span className="text-[11px] text-[#9CA3AF] line-through">
                      {formatRupiah(usdKeRupiah(game.hargaAsliUsd, KURS_USD))}
                    </span>
                    <p className="text-base font-extrabold text-[#00E292]">
                      {formatRupiah(usdKeRupiah(game.hargaUsd, KURS_USD))}
                    </p>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <button className="col-span-4 py-2 bg-[#23242C] hover:bg-[#2D2E36] rounded-xl text-xs font-semibold transition">
                      Cek Toko Lain
                    </button>
                    <button className="col-span-1 py-2 bg-[#23242C] hover:bg-[#2D2E36] rounded-xl text-xs flex items-center justify-center transition">
                      🔖
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: GAME GRATIS & ESTIMATOR TABUNGAN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-[#00E292] font-semibold uppercase tracking-wider">
                  GAMERPOWER • FEED
                </p>
                <h2 className="text-2xl font-bold">Game Gratis Resmi</h2>
                <p className="text-xs text-[#9CA3AF]">
                  Klaim dan simpan permanen ke library tanpa bayar sepeser pun.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#003822] text-[#00E292] border border-[#00E292]/30 text-xs font-bold rounded-full">
                100% Legal
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Chivalry 2",
                  platform: "Epic Games Store",
                  time: "Sisa 2 hari",
                  price: 280000,
                },
                {
                  title: "Ghostrunner",
                  platform: "GOG + Prime Gaming",
                  time: "Sisa 4 hari",
                  price: 540000,
                },
                {
                  title: "Warhammer 40k: Gladius",
                  platform: "Steam Store",
                  time: "Sisa 24 jam",
                  price: 249000,
                },
              ].map((free, i) => (
                <div
                  key={i}
                  className="bg-[#1A1B22] border border-[#2D2E36] p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 bg-[#23242C] rounded-xl flex items-center justify-center text-[10px] text-[#9CA3AF] shrink-0">
                      Thumb
                    </div>
                    <div>
                      <span className="px-2 py-0.5 bg-[#00E292]/20 text-[#00E292] text-[10px] font-bold rounded">
                        Gratis
                      </span>
                      <h4 className="font-bold text-sm mt-1">{free.title}</h4>
                      <p className="text-xs text-[#9CA3AF]">
                        Platform : {free.platform}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                    <span className="text-[11px] bg-[#23242C] text-[#9CA3AF] px-2.5 py-1 rounded-lg">
                      {free.time}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-[#9CA3AF] line-through mr-2">
                        {formatRupiah(free.price)}
                      </span>
                      <span className="text-sm font-extrabold text-[#00E292]">
                        {formatRupiah(0)}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-[#00E292] hover:bg-[#00c982] text-[#14151B] font-bold text-xs rounded-xl transition">
                      Klaim Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#1A1B22] border border-[#2D2E36] rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>🧮</span>
                  <h3 className="font-bold text-base">Estimator Tabungan</h3>
                </div>
                <div className="bg-[#23242C] p-1 rounded-lg flex text-xs">
                  <button className="px-3 py-1 bg-[#1A1B22] rounded-md font-semibold text-white">
                    Kalkulator
                  </button>
                  <button className="px-3 py-1 text-[#9CA3AF]">Saksi</button>
                </div>
              </div>

              <p className="text-xs text-[#9CA3AF]">
                Rencanakan alokasi uang jajan agar game impian bisa terbeli
                tanpa mengorbankan pengeluaran pokok perkuliahan.
              </p>

              <div className="bg-[#23242C] p-4 rounded-xl border border-[#2D2E36] flex justify-between items-center">
                <div>
                  <p className="text-[11px] text-[#9CA3AF]">
                    Target Wishlist Total:
                  </p>
                  <p className="text-xl font-extrabold text-white mt-0.5">
                    {formatRupiah(554450)}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-[#003822] text-[#00E292] text-xs font-semibold rounded-lg border border-[#00E292]/30">
                  3 Game Terpilih
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#9CA3AF]">Tabungan per Bulan:</span>
                  <span className="font-bold text-[#00E292]">
                    {formatRupiah(100000)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {["Rp 20rb", "Rp 100rb", "Rp 250rb", "Rp 500rb"].map(
                    (nominal, idx) => (
                      <button
                        key={idx}
                        className={`py-2 text-xs font-semibold rounded-xl border transition ${nominal === "Rp 100rb" ? "bg-[#00E292] text-[#14151B] border-[#00E292]" : "bg-[#23242C] text-[#9CA3AF] border-[#2D2E36] hover:text-white"}`}
                      >
                        {nominal}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="bg-[#23242C] p-4 rounded-xl border border-[#2D2E36] flex justify-between items-center">
                <span className="text-xs text-[#9CA3AF]">
                  Estimasi Waktu Tercapai:
                </span>
                <span className="text-xl font-extrabold text-[#00E292]">
                  5.5{" "}
                  <span className="text-xs text-white font-normal">Bulan</span>
                </span>
              </div>

              <p className="text-[11px] text-[#9CA3AF] italic text-center">
                💡 Ideal! Cukup sisihkan setara 2 gelas es kopi per minggu.
              </p>
            </div>

            <Link
              to="/budget"
              className="w-full py-3 bg-[#23242C] hover:bg-[#2D2E36] border border-[#2D2E36] rounded-xl text-xs font-semibold text-center block transition"
            >
              Buka Budget Planner Lengkap →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Bawah */}
      <Footer />
    </div>
  );
}
