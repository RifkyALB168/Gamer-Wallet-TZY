import { useState } from "react";
import GameCard from "../components/GameCard";
import PriceFilter from "../components/search/PriceFilter";
import SearchBar from "../components/search/SearchBar";
import StoreFilter from "../components/search/StoreFilter";
import { gameContoh, KURS_CONTOH, tokoContoh } from "../data/mockSearchGames";
import { OPSI_URUTAN } from "../utils/searchFilters";

export function Search() {
  const [kataKunci, setKataKunci] = useState("");
  const [rentangId, setRentangId] = useState("semua");
  const [tokoDipilih, setTokoDipilih] = useState([]);
  const [urutanId, setUrutanId] = useState("editor");

  const reset = () => {
    setKataKunci("");
    setRentangId("semua");
    setTokoDipilih([]);
    setUrutanId("editor");
  };

  return (
    <main className="min-h-screen bg-stone-950 px-4 py-8 text-gray-100 sm:px-6 lg:px-10">
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
              1 USD ≈ Rp {KURS_CONTOH.toLocaleString("id-ID")}{" "}
              <span className="text-xs text-stone-500">(ECB Feed)</span>
            </p>
            <p className="text-[11px] text-stone-500">
              Update harian otomatis • Perkiraan, bukan kurs toko
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
            stores={tokoContoh}
            selected={tokoDipilih}
            onChange={setTokoDipilih}
          />
        </section>

        <section aria-label="Hasil pencarian" className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">
            Katalog Penawaran Aktif
            <span className="ml-3 rounded bg-emerald-400/10 px-2 py-0.5 font-mono text-xs text-emerald-300">
              {gameContoh.length} Game Ditemukan
            </span>
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gameContoh.map((game) => (
              <li key={game.id}>
                <GameCard
                  game={game}
                  rate={KURS_CONTOH}
                  namaToko={game.namaToko}
                />
              </li>
            ))}
          </ul>
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
            API STATUS: CHEAPSHARK CONNECTED
          </span>
        </aside>
      </div>
    </main>
  );
}

export default Search;
