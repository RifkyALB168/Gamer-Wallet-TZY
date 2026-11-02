import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { useWishlist } from "../hooks/useWishlist";
import { formatRupiah, usdKeRupiah } from "../utils/formatRupiah";

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6m4-6v6M5.5 7l.8 13h11.4l.8-13M9 7V4h6v3" />
    </svg>
  );
}

export default function Wishlist() {
  const { items, hapus, totalUsd } = useWishlist();
  const { rate, date } = useExchangeRate();
  const totalIdr = usdKeRupiah(totalUsd, rate);

  return (
    <div className="min-h-screen bg-[#14151B] text-white">
      <Navbar />
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#00E292]">Koleksi game incaranmu</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Wishlist</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#9CA3AF]">
                Simpan game yang ingin dibeli dan pantau perkiraan total harganya.
              </p>
            </div>
            <Link to="/search" className="rounded-xl border border-[#343640] bg-[#1A1B22] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#00E292]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E292]">
              Cari Game
            </Link>
          </div>

          <section aria-labelledby="wishlist-summary" className="mt-7 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-stretch">
            <div className="rounded-2xl border border-[#2D2E36] bg-[#1A1B22] p-5 sm:p-6">
              <p id="wishlist-summary" className="text-sm text-[#9CA3AF]">Total perkiraan harga wishlist</p>
              <p className="mt-2 font-mono text-3xl font-bold text-[#00E292] sm:text-4xl" aria-live="polite">
                {rate ? formatRupiah(totalIdr) : "Menghitung…"}
              </p>
              <p className="mt-2 text-xs text-[#9CA3AF]">
                {items.length} game tersimpan
                {rate && date ? ` · Kurs ECB ${date}` : " · Harga mengikuti kurs USD ke IDR"}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[#2D2E36] bg-[#1A1B22] px-5 py-4 sm:min-w-52 sm:flex-col sm:items-start sm:justify-center">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#003822] text-[#00E292]" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4zM8 9h8M8 13h5" />
                </svg>
              </span>
              <div>
                <p className="text-2xl font-bold">{items.length}</p>
                <p className="text-xs text-[#9CA3AF]">Game di wishlist</p>
              </div>
            </div>
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-[#2D2E36] bg-[#1A1B22]" aria-labelledby="wishlist-list-title">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2E36] px-5 py-4 sm:px-6">
              <div>
                <h2 id="wishlist-list-title" className="font-semibold">Game Pilihan untuk Dihitung</h2>
                <p className="mt-1 text-xs text-[#9CA3AF]">Harga disimpan dalam USD dan dikonversi saat ditampilkan.</p>
              </div>
              <span className="rounded-full border border-[#343640] px-3 py-1 text-xs text-[#9CA3AF]">{items.length} item</span>
            </div>

            {items.length === 0 ? (
              <div className="px-5 py-14 text-center sm:py-20">
                <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#23242C] text-[#9CA3AF]" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 4.75h14v15l-7-3.5-7 3.5v-15Z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">Wishlist masih kosong</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#9CA3AF]">Tambahkan game dari halaman Cari Game untuk mulai menghitung perkiraan totalnya.</p>
                <Link to="/search" className="mt-5 inline-flex rounded-xl bg-[#00E292] px-4 py-2.5 text-sm font-bold text-[#14151B] transition hover:bg-[#36F0AC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E292]">
                  Jelajahi Game
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-[#2D2E36]">
                {items.map((game) => (
                  <li key={game.id} className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6">
                    <span className="grid size-5 shrink-0 place-items-center rounded border border-[#00E292]/70 bg-[#003822] text-[#00E292]" aria-label="Game tersimpan">
                      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3 8 3 3 7-7" />
                      </svg>
                    </span>
                    <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-[#23242C] sm:size-16">
                      {game.cover ? <img src={game.cover} alt={`Sampul ${game.judul}`} loading="lazy" className="size-full object-cover" /> : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold sm:text-base">{game.judul || "Game tanpa judul"}</h3>
                      <p className="mt-1 text-xs text-[#9CA3AF]">Harga terakhir tersimpan</p>
                    </div>
                    <p className="shrink-0 text-right font-mono text-sm font-bold text-[#00E292] sm:text-base">
                      {rate ? formatRupiah(usdKeRupiah(game.hargaUsd, rate)) : "—"}
                    </p>
                    <button type="button" onClick={() => hapus(game.id)} aria-label={`Hapus ${game.judul} dari wishlist`} className="grid size-10 shrink-0 place-items-center rounded-lg text-[#9CA3AF] transition hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E292]">
                      <TrashIcon />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className="mt-4 text-xs leading-5 text-[#9CA3AF]">
            Harga rupiah merupakan perkiraan berdasarkan kurs ECB{date ? ` per ${date}` : ""}, bukan harga final toko. Total akan mengikuti kurs terbaru.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
