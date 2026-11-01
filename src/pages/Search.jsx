import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import GameCardSkeleton from "../components/GameCardSkeleton";
import Navbar from "../components/Navbar";
import PriceFilter from "../components/search/PriceFilter";
import SearchBar from "../components/search/SearchBar";
import StoreFilter from "../components/search/StoreFilter";
import { useDebounce } from "../hooks/useDebounce";
import { useDeals } from "../hooks/useDeals";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { useWishlist } from "../hooks/useWishlist";
import { useStores } from "../hooks/useStores";
import { formatRupiah } from "../utils/formatRupiah";
import {
  keUsd,
  OPSI_URUTAN,
  pilihTokoUtama,
  RENTANG_HARGA,
} from "../utils/searchFilters";

export function Search() {
  const navigate = useNavigate();
  const { ada, toggle } = useWishlist();

  // Pilihan pengguna
  const [kataKunci, setKataKunci] = useState("");
  const [rentangId, setRentangId] = useState("semua");
  const [tokoDipilih, setTokoDipilih] = useState([]);
  const [urutanId, setUrutanId] = useState("editor");

  // API baru dipanggil setelah pengguna berhenti mengetik 0,5 detik
  const judul = useDebounce(kataKunci.trim(), 500);

  const { rate, date } = useExchangeRate();
  const stores = useStores();
  const tokoUtama = useMemo(() => pilihTokoUtama(stores), [stores]);

  // Nama toko untuk ditampilkan di kartu, dicari dari storeId
  const namaToko = useMemo(
    () => Object.fromEntries(stores.map((toko) => [toko.id, toko.nama])),
    [stores],
  );

  // Ubah batas harga rupiah menjadi dolar
  const rentang = RENTANG_HARGA.find((r) => r.id === rentangId);
  const batasBawah = keUsd(rentang.min, rate);
  const batasAtas = keUsd(rentang.max, rate);

  // Filter untuk CheapShark. useMemo menjaga isinya stabil sampai ada yang berubah.
  const filter = useMemo(() => {
    const urutan = OPSI_URUTAN.find((o) => o.id === urutanId);
    return {
      title: judul,
      storeIds: tokoDipilih,
      lowerPrice: batasBawah,
      upperPrice: batasAtas,
      sortBy: urutan.sortBy,
      desc: urutan.desc,
    };
  }, [judul, tokoDipilih, batasBawah, batasAtas, urutanId]);

  const { games, loading, error, cobaLagi } = useDeals(filter);

  const reset = () => {
    setKataKunci("");
    setRentangId("semua");
    setTokoDipilih([]);
    setUrutanId("editor");
  };

  return (
    <div className="min-h-screen bg-stone-950 text-gray-100">
      <Navbar />
      <main className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="rounded bg-emerald-400/10 px-2 py-1 font-mono text-[11px] uppercase text-emerald-300">
                Multi-store live deal aggregator
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Cari &amp; Bandingkan{" "}
                <span className="text-emerald-400">Diskon Game</span>
              </h1>
              <p className="mt-2 max-w-xl text-sm text-stone-400">
                Temukan harga termurah lintas platform resmi PC, terkonversi
                otomatis ke Rupiah khusus gamer mahasiswa.
              </p>
            </div>
            <div className="rounded-xl border border-stone-800 bg-stone-900/60 px-4 py-3 text-right">
              <p className="font-mono text-sm text-emerald-300">
                {rate ? `1 USD ≈ ${formatRupiah(rate)}` : "Memuat kurs..."}{" "}
                <span className="text-xs text-stone-500">(ECB Feed)</span>
              </p>
              <p className="text-[11px] text-stone-500">
                Perkiraan, bukan kurs toko{date ? ` • Kurs ${date}` : ""}
              </p>
            </div>
          </header>

          <section
            aria-label="Pencarian dan filter"
            className="mt-6 space-y-5 rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
          >
            <div className="flex flex-wrap gap-3">
              <SearchBar value={kataKunci} onChange={setKataKunci} />
              <label htmlFor="urutan" className="sr-only">
                Urutkan hasil
              </label>
              <select
                id="urutan"
                value={urutanId}
                onChange={(e) => setUrutanId(e.target.value)}
                className="rounded-xl border border-stone-800 bg-stone-950 px-3 py-3 text-sm text-gray-100 focus:border-emerald-400 focus:outline-none"
              >
                {OPSI_URUTAN.map((opsi) => (
                  <option key={opsi.id} value={opsi.id}>
                    {opsi.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-stone-800 px-4 py-3 text-sm text-gray-100 hover:bg-stone-700"
              >
                Reset
              </button>
            </div>
            <PriceFilter value={rentangId} onChange={setRentangId} />
            <StoreFilter
              stores={tokoUtama}
              selected={tokoDipilih}
              onChange={setTokoDipilih}
            />
          </section>

          <section aria-label="Hasil pencarian" className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              Katalog Penawaran Aktif
              {!loading && !error && (
                <span className="ml-3 rounded bg-emerald-400/10 px-2 py-0.5 font-mono text-xs text-emerald-300">
                  {games.length} Game Ditemukan
                </span>
              )}
            </h2>

            <div aria-live="polite">
              {/* 1. Sedang memuat */}
              {loading && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <GameCardSkeleton key={n} />
                  ))}
                </div>
              )}

              {/* 2. Gagal memuat */}
              {error && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-center"
                >
                  <p className="font-semibold text-red-200">
                    Data game gagal dimuat
                  </p>
                  <p className="mt-1 text-sm text-red-200/80">{error}</p>
                  <button
                    type="button"
                    onClick={cobaLagi}
                    className="mt-4 rounded-xl bg-stone-800 px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-stone-700"
                  >
                    Coba lagi
                  </button>
                </div>
              )}

              {/* 3. Hasil kosong */}
              {!loading && !error && games.length === 0 && (
                <div className="rounded-2xl border border-dashed border-stone-700 p-10 text-center">
                  <p className="font-semibold">Tidak ada game yang cocok</p>
                  <p className="mt-1 text-sm text-stone-400">
                    Coba kata kunci lain atau longgarkan filter harga dan toko.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-4 rounded-xl bg-stone-800 px-4 py-2 text-sm hover:bg-stone-700"
                  >
                    Reset filter
                  </button>
                </div>
              )}

              {/* 4. Ada hasil */}
              {!loading && !error && games.length > 0 && (
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {games.map((game) => (
                    <li key={game.id}>
                      <GameCard
                        game={game}
                        rate={rate}
                        namaToko={namaToko[game.storeId]}
                        inWishlist={ada(game.id)}
                        onToggleWishlist={toggle}
                        onDetail={(g) => navigate(`/game/${g.id}`)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <aside className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-800 bg-stone-900/60 px-5 py-4">
            <div>
              <p className="font-semibold">Transparansi Finansial Mahasiswa</p>
              <p className="text-xs text-stone-400">
                Harga rupiah dihitung dari kurs ECB harian. Toko internasional
                mungkin mengenakan biaya konversi bank dan PPN 11%.
              </p>
            </div>
            <span className="rounded bg-emerald-400/10 px-2 py-1 font-mono text-[11px] text-emerald-300">
              SUMBER HARGA: CHEAPSHARK
            </span>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Search;
