import DiscountBadge from "./DiscountBadge";
import PriceIDR from "./PriceIDR";

/**
 * Kartu game: gambar, judul, harga rupiah (perkiraan), toko termurah, dan aksi.
 * Tidak tahu soal router atau wishlist; semua aksi dikirim lewat props supaya
 * bisa dipakai di Home, Cari Game, dan Wishlist.
 *
 * @param {object} props
 * @param {{ id: string, judul: string, cover: string, hargaUsd: number, hargaAsliUsd: number, diskonPersen: number, ratingPersen?: number|null }} props.game
 * @param {number|null} props.rate kurs 1 USD dalam rupiah
 * @param {string} [props.namaToko] nama toko termurah
 * @param {boolean} [props.inWishlist]
 * @param {(game: object) => void} [props.onDetail]
 * @param {(game: object) => void} [props.onToggleWishlist]
 */
export function GameCard({
  game,
  rate,
  namaToko,
  inWishlist = false,
  onDetail,
  onToggleWishlist,
}) {
  const adaDiskon = game.diskonPersen > 0;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/70 transition hover:border-stone-600">
      <div className="relative aspect-[460/215] bg-stone-800">
        <img
          src={game.cover}
          alt={`Sampul ${game.judul}`}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            if (game.thumb && e.currentTarget.src !== game.thumb) {
              e.currentTarget.src = game.thumb;
            }
          }}
        />
        <DiscountBadge
          persen={game.diskonPersen}
          className="absolute right-3 top-3"
        />
        {game.ratingPersen && (
          <span className="absolute bottom-3 left-3 rounded-md bg-stone-950/80 px-2 py-0.5 font-mono text-xs text-stone-200">
            ★ {game.ratingPersen}% Review
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-12 text-base font-semibold text-gray-100">
          {game.judul}
        </h3>

        <div className="flex items-end justify-between gap-2 rounded-xl bg-stone-950/60 px-3 py-2">
          <div>
            {adaDiskon && (
              <PriceIDR
                usd={game.hargaAsliUsd}
                rate={rate}
                className="block text-xs text-stone-500 line-through"
              />
            )}
            <PriceIDR
              usd={game.hargaUsd}
              rate={rate}
              className="font-mono text-lg font-bold text-emerald-300"
            />
          </div>
          {namaToko && (
            <div className="text-right">
              <span className="block text-[11px] text-stone-500">
                Toko Terbaik
              </span>
              <span className="text-sm font-semibold text-sky-300">
                {namaToko}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onDetail?.(game)}
            className="rounded-lg bg-stone-800 px-3 py-2 text-sm font-medium text-gray-100 transition hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-emerald-400"
          >
            Detail Harga
          </button>
          <button
            type="button"
            aria-pressed={inWishlist}
            onClick={() => onToggleWishlist?.(game)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-emerald-400 ${
              inWishlist
                ? "bg-emerald-400 text-stone-950 hover:bg-emerald-300"
                : "bg-stone-800 text-gray-100 hover:bg-stone-700"
            }`}
          >
            {inWishlist ? "✓ Di Wishlist" : "+ Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
