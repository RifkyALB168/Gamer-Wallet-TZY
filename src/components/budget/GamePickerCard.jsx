import { useState } from "react";
import PriceIDR from "../PriceIDR";

/** Cover game dengan backup alt bila gambar gagal dimuat. */
function Cover({ game }) {
  const [gagal, setGagal] = useState(false);

  if (gagal || !game.cover) {
    return (
      <span className="flex h-9 w-16 shrink-0 items-center justify-center rounded-md bg-stone-800 text-xs font-bold text-stone-400">
        {game.judul?.slice(0, 2).toUpperCase() ?? "??"}
      </span>
    );
  }

  return (
    <img
      src={game.cover}
      alt=""
      loading="lazy"
      onError={() => setGagal(true)}
      className="h-9 w-16 shrink-0 rounded-md object-cover"
    />
  );
}

/**
 * Daftar game yang ikut dihitung ke dalam target tabungan.
 *
 * @param {object} props
 * @param {Array<object>} props.games
 * @param {(id: string) => void} props.onToggle centang / lepas centang game
 * @param {(id: string) => void} props.onHapus hapus game dari daftar
 * @param {number|null} props.rate kurs USD ke IDR
 * @param {boolean} [props.loadingKurs] kurs masih diambil
 */
export function GamePickerCard({ games, onToggle, onHapus, rate, loadingKurs = false }) {
  return (
    <section className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg font-semibold text-stone-100">Game Pilihan untuk Dihitung</h2>
            <p className="text-sm text-stone-400">Pilih game mana saja yang ingin dimasukkan ke kalkulator</p>
          </div>
        </div>
      </header>

      {games.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-stone-700 p-6 text-center text-sm text-stone-400">
          Belum ada game di daftar. Tambahkan dari halaman Cari Game atau Wishlist.
        </p>
      ) : (
        <ul className="mt-5 space-y-2">
          {games.map((game) => (
            <li
              key={game.id}
              className="flex items-center gap-3 rounded-xl border border-stone-800 bg-stone-950/50 p-3"
            >
              <input
                type="checkbox"
                checked={Boolean(game.dipilih)}
                onChange={() => onToggle(game.id)}
                aria-label={`Sertakan ${game.judul}`}
                className="h-4 w-4 shrink-0 accent-blue-500"
              />
              <Cover game={game} />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-stone-100">{game.judul}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                  {game.toko && (
                    <span className="rounded border border-stone-700 px-1.5 py-0.5 text-stone-400">
                      {game.toko}
                    </span>
                  )}
                  {Boolean(game.diskonPersen) && (
                    <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-300">
                      Diskon -{game.diskonPersen}%
                    </span>
                  )}
                  {game.catatan && <span className="text-stone-500">{game.catatan}</span>}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <PriceIDR
                  usd={game.hargaUsd}
                  rate={loadingKurs ? null : rate}
                  className="text-sm font-semibold text-stone-100"
                />
                {Number.isFinite(game.hargaAsliUsd) && game.hargaAsliUsd > game.hargaUsd && (
                  <PriceIDR
                    usd={game.hargaAsliUsd}
                    rate={rate}
                    className="block text-xs text-stone-500 line-through"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() => onHapus(game.id)}
                aria-label={`Hapus ${game.judul}`}
                className="shrink-0 rounded-md p-1 text-stone-500 transition hover:bg-stone-800 hover:text-rose-400"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 7h16" />
                  <path d="M9 7V5h6v2" />
                  <path d="M6 7l1 13h10l1-13" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default GamePickerCard;
