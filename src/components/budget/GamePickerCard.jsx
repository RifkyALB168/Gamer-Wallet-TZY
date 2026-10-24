import { useState } from "react";
import PriceIDR from "../PriceIDR";

/** Cover game dengan backup alt bila gambar gagal dimuat. */
function Cover({ game }) {
  const [gagal, setGagal] = useState(false);

  if (gagal || !game.cover) {
    return (
      <span className="flex h-8 w-14 shrink-0 items-center justify-center rounded bg-stone-800 text-xs font-bold text-stone-400">
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
      className="h-8 w-14 shrink-0 rounded object-cover"
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
    <section className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-stone-100">Game untuk Dihitung</h2>
        <span className="text-xs text-stone-500">Centang untuk sertakan</span>
      </div>

      {games.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-stone-700 p-4 text-center text-sm text-stone-400">
          Belum ada game. Tambahkan dari halaman Cari Game atau Wishlist.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {games.map((game) => (
            <li
              key={game.id}
              className="flex items-center gap-3 rounded-xl border border-stone-800 bg-stone-950/50 p-2"
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
                <p className="truncate text-sm font-medium text-stone-100">{game.judul}</p>
                <p className="truncate text-xs text-stone-500">
                  {[game.toko, game.diskonPersen && `Diskon -${game.diskonPersen}%`, game.catatan]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
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
                className="shrink-0 rounded-md px-2 py-1 text-xs text-stone-500 transition hover:bg-stone-800 hover:text-rose-400"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default GamePickerCard;
