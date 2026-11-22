import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WishlistItem from "../components/wishlist/WishlistItem";
import WishlistStatus from "../components/wishlist/WishlistStatus";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { useWishlist } from "../hooks/useWishlist";
import { formatRupiah, usdKeRupiah } from "../utils/formatRupiah";
import { readLegacyWishlist } from "../utils/legacyWishlist";

export default function Wishlist() {
  const wishlist = useWishlist();
  const { items, status, busy, totalUsd, importResult, imporWishlist } = wishlist;
  const { rate, date } = useExchangeRate();
  const totalIdr = usdKeRupiah(totalUsd, rate);
  const legacy = status === "ready" ? readLegacyWishlist() : { ids: [], unsupported: 0 };
  const toImport = legacy.ids.filter((id) => !wishlist.ada(id)).length;

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

          <div className="mt-7">
            <WishlistStatus {...wishlist} />
            {busy && <p role="status" className="mb-4 text-sm text-[#9CA3AF]">{busy === "import" ? "Mengimpor game…" : "Menyimpan perubahan…"}</p>}
          </div>

          {status === "ready" && (
            <>
              <section aria-labelledby="wishlist-summary" className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-stretch">
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

              {(toImport > 0 || legacy.unsupported > 0 || importResult) && (
                <section aria-labelledby="wishlist-import-title" className="mt-6 rounded-2xl border border-[#2D2E36] bg-[#1A1B22] px-5 py-4">
                  <h2 id="wishlist-import-title" className="font-semibold">Wishlist lama di perangkat ini</h2>
                  {toImport > 0 && (
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-[#9CA3AF]">{toImport} game dapat ditambahkan ke akun ini.</p>
                      <button
                        type="button"
                        disabled={Boolean(busy)}
                        onClick={() => imporWishlist(legacy.ids)}
                        className="rounded-xl bg-[#00E292] px-4 py-2 text-sm font-bold text-[#14151B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E292] disabled:opacity-60"
                      >
                        Impor {toImport} game
                      </button>
                    </div>
                  )}
                  {legacy.unsupported > 0 && (
                    <p className="mt-2 text-sm text-[#9CA3AF]">{legacy.unsupported} entri lama tidak memiliki ID CheapShark yang valid.</p>
                  )}
                  {importResult && (
                    <p role="status" className="mt-2 text-sm text-[#9CA3AF]">
                      {importResult.imported} diimpor, {importResult.skipped} sudah tersimpan, {importResult.failed} gagal.
                      {importResult.failed > 0 && " Coba impor lagi untuk game yang belum tersimpan."}
                    </p>
                  )}
                </section>
              )}

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
                    {items.map((item) => (
                      <WishlistItem
                        key={item.id}
                        item={item}
                        rate={rate}
                        busy={Boolean(busy)}
                        onRemove={wishlist.hapus}
                        onSaveNote={wishlist.ubahCatatan}
                      />
                    ))}
                  </ul>
                )}
              </section>

              <p className="mt-4 text-xs leading-5 text-[#9CA3AF]">
                Total memakai harga yang tersimpan dan kurs ECB{date ? ` per ${date}` : ""}. Harga di toko dapat berubah.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
