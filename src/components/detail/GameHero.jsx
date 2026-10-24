import { formatRupiah } from "../../utils/formatRupiah";
import { formatTanggal, sisaHari } from "../../utils/formatTanggal";
import DiscountBadge from "../DiscountBadge";
import PriceIDR from "../PriceIDR";

/**
 * Bagian atas Detail Game: sampul, judul, harga termurah, aksi, dan statistik singkat.
 *
 * @param {object} props
 * @param {object} props.game detail game dari useGameDetail
 * @param {{ toko: string, hargaUsd: number, hargaAsliUsd: number, diskonPersen: number, url: string }} props.dealTermurah
 * @param {number|null} props.rate kurs 1 USD dalam rupiah
 * @param {string|null} props.tanggalKurs tanggal kurs dari sumber
 * @param {boolean} props.inWishlist
 * @param {() => void} props.onToggleWishlist
 */
export function GameHero({ game, dealTermurah, rate, tanggalKurs, inWishlist, onToggleWishlist }) {
  const hari = sisaHari(game.diskonBerakhir);
  const judulLengkap = `${game.judul}: ${game.edisi}`;

  const statistik = [
    {
      label: "Status Diskon",
      nilai: hari > 0 ? `Aktif hingga ${hari} hari` : "Harga normal",
      warna: hari > 0 ? "text-emerald-300" : "text-stone-300",
    },
    {
      label: "All-Time Low (ATL)",
      nilai: <PriceIDR usd={game.hargaTerendah.hargaUsd} rate={rate} />,
    },
    { label: "Steam Rating", nilai: `${game.ratingSteamPersen}% Positif` },
    {
      label: "Konversi Kurs ECB",
      nilai: rate ? `$1 = ${formatRupiah(rate)}` : "Memuat kurs...",
    },
  ];

  return (
    <section aria-labelledby="judul-game" className="grid gap-6 md:grid-cols-[220px_1fr]">
      <div className="relative mx-auto w-full max-w-[220px] overflow-hidden rounded-2xl border border-stone-800 bg-stone-900">
        <img
          src={game.cover}
          alt={`Sampul ${judulLengkap}`}
          className="aspect-[2/3] w-full object-cover"
          onError={(e) => {
            if (game.thumb && e.currentTarget.src !== game.thumb) {
              e.currentTarget.src = game.thumb;
            }
          }}
        />
        {dealTermurah.hargaUsd <= game.hargaTerendah.hargaUsd * 1.15 && (
          <span className="absolute left-2 top-2 rounded-md bg-emerald-400 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-stone-950">
            ★ Best Historic Price
          </span>
        )}
        <p className="absolute inset-x-0 bottom-0 bg-stone-950/85 py-1.5 text-center font-mono text-[11px] text-stone-300">
          {game.platform}
        </p>
      </div>

      <div className="min-w-0">
        <ul className="flex flex-wrap gap-2" aria-label="Genre">
          {game.genre.map((genre) => (
            <li
              key={genre}
              className="rounded border border-stone-700 px-2 py-0.5 font-mono text-[11px] uppercase text-stone-300"
            >
              {genre}
            </li>
          ))}
          <li className="rounded bg-amber-400/10 px-2 py-0.5 font-mono text-[11px] text-amber-300">
            Metacritic {game.metacritic}
          </li>
        </ul>

        <h1 id="judul-game" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {game.judul}: <span className="text-emerald-400">{game.edisi}</span>
        </h1>
        <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-stone-400">
          <div className="flex gap-1">
            <dt>Developer:</dt>
            <dd className="font-semibold text-stone-200">{game.developer}</dd>
          </div>
          <div className="flex gap-1">
            <dt>Penerbit:</dt>
            <dd className="font-semibold text-stone-200">{game.publisher}</dd>
          </div>
          <div className="flex gap-1">
            <dt>Rilis:</dt>
            <dd className="font-semibold text-stone-200">{formatTanggal(game.tanggalRilis)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-800 bg-stone-900/70 p-4">
          <div>
            <p className="font-mono text-[11px] uppercase text-stone-500">Harga termurah hari ini</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <PriceIDR
                usd={dealTermurah.hargaUsd}
                rate={rate}
                className="font-mono text-3xl font-bold text-emerald-300"
              />
              <DiscountBadge persen={dealTermurah.diskonPersen} />
              <PriceIDR
                usd={dealTermurah.hargaAsliUsd}
                rate={rate}
                className="text-sm text-stone-500 line-through"
              />
            </div>
            <p className="mt-1 text-xs text-stone-400">
              Tersedia di toko resmi <span className="text-sky-300">{dealTermurah.toko}</span>
              {" · "}
              Perkiraan dari kurs ECB{tanggalKurs ? ` ${formatTanggal(tanggalKurs)}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={inWishlist}
              onClick={onToggleWishlist}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                inWishlist
                  ? "bg-stone-800 text-emerald-300 hover:bg-stone-700"
                  : "bg-emerald-400 text-stone-950 hover:bg-emerald-300"
              }`}
            >
              {inWishlist ? "✓ Di Wishlist (hapus)" : "+ Tambah ke Wishlist"}
            </button>
            <a
              href={dealTermurah.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-stone-700 px-4 py-2.5 text-sm font-semibold text-gray-100 transition hover:border-stone-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Kunjungi Toko Termurah ↗
              <span className="sr-only"> (buka tab baru)</span>
            </a>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {statistik.map((item) => (
            <div key={item.label} className="rounded-xl border border-stone-800 bg-stone-900/60 px-3 py-2.5">
              <dt className="text-[11px] text-stone-500">{item.label}</dt>
              <dd className={`mt-0.5 font-mono text-sm font-semibold ${item.warna ?? "text-gray-100"}`}>
                {item.nilai}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default GameHero;
