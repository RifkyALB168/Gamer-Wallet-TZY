import DiscountBadge from "../DiscountBadge";
import PriceIDR from "../PriceIDR";

/**
 * Daftar harga game di setiap toko, sudah diurutkan dari termurah oleh urutkanDeal.
 * Toko pertama ditandai sebagai deal terbaik.
 *
 * @param {object} props
 * @param {Array<{ tokoId: string, toko: string, label?: string, catatan: string, hargaUsd: number, hargaAsliUsd: number, diskonPersen: number, url: string }>} props.deals
 * @param {number|null} props.rate kurs 1 USD dalam rupiah
 * @param {string} props.judulGame dipakai untuk label tombol beli
 */
export function StorePriceTable({ deals, rate, judulGame }) {
  return (
    <section
      aria-labelledby="judul-banding-harga"
      className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
    >
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 id="judul-banding-harga" className="text-lg font-semibold">
            Perbandingan Harga Antar Toko
            <span className="ml-2 rounded bg-sky-400/10 px-1.5 py-0.5 align-middle font-mono text-[10px] text-sky-300">
              {deals.length} TOKO
            </span>
          </h2>
          <p className="text-xs text-stone-500">
            Harga rupiah adalah perkiraan dari kurs ECB, bukan kurs toko.
          </p>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-stone-400">
          <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400" />
          Diurutkan: Termurah ke Termahal
        </p>
      </header>

      <ol className="mt-4 space-y-2.5">
        {deals.map((deal, i) => {
          const terbaik = i === 0;
          return (
            <li
              key={deal.tokoId}
              className={`flex flex-wrap items-center gap-3 rounded-xl border px-3 py-3 sm:flex-nowrap ${
                terbaik
                  ? "border-emerald-400/50 bg-emerald-400/5"
                  : "border-stone-800 bg-stone-950/40"
              }`}
            >
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-stone-800 font-mono text-sm font-bold text-stone-300"
              >
                {deal.toko.charAt(0)}
              </span>

              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-1.5 font-semibold">
                  {deal.toko}
                  {terbaik && (
                    <span className="rounded bg-emerald-400 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-stone-950">
                      Best Deal
                    </span>
                  )}
                  {deal.label && (
                    <span className="rounded bg-sky-400/15 px-1.5 py-0.5 font-mono text-[10px] uppercase text-sky-300">
                      {deal.label}
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-stone-500">{deal.catatan}</p>
              </div>

              <div className="ml-auto text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <DiscountBadge persen={deal.diskonPersen} className="text-[10px]" />
                  {deal.diskonPersen > 0 && (
                    <PriceIDR
                      usd={deal.hargaAsliUsd}
                      rate={rate}
                      className="text-xs text-stone-500 line-through"
                    />
                  )}
                </div>
                <PriceIDR
                  usd={deal.hargaUsd}
                  rate={rate}
                  className={`font-mono text-lg font-bold ${terbaik ? "text-emerald-300" : "text-gray-100"}`}
                />
              </div>

              <a
                href={deal.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Beli ${judulGame} di ${deal.toko} (buka tab baru)`}
                className={`w-full rounded-lg px-4 py-2 text-center text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:w-auto ${
                  terbaik
                    ? "bg-emerald-400 text-stone-950 hover:bg-emerald-300"
                    : "bg-stone-800 text-gray-100 hover:bg-stone-700"
                }`}
              >
                Beli di {deal.toko.split(" ")[0]}
              </a>
            </li>
          );
        })}
      </ol>

      <p className="mt-4 flex items-center gap-1.5 text-[11px] text-stone-500">
        <span aria-hidden="true" className="text-emerald-400">✓</span>
        Hanya menampilkan toko resmi berlisensi (No Grey Market)
      </p>
    </section>
  );
}

export default StorePriceTable;
