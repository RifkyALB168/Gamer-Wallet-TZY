import { formatRupiah } from "../../utils/formatRupiah";

/**
 * Timeline progres tabungan per bulan.
 *
 * @param {object} props
 * @param {Array<{ bulan: number, terkumpul: number, persen: number, lunas: boolean, nominalBulanIni: number }>} props.timeline
 * @param {number} props.jumlahBulan hasil hitungBulanMenabung, bisa Infinity
 * @param {number} props.nominalBulanan nominal tabungan penuh per bulan
 * @param {boolean} props.targetTercapai
 * @param {number} props.totalWishlist
 */
export function TimelineCard({ timeline, jumlahBulan, nominalBulanan, targetTercapai, totalWishlist }) {
  const lunas = Number.isFinite(jumlahBulan) && targetTercapai;
  const persenProgres = lunas ? 100 : timeline[timeline.length - 1]?.persen ?? 0;
  const adaTarget = totalWishlist > 0;

  const labelStatus = !adaTarget
    ? "Belum ada game dipilih"
    : lunas
      ? "Target Tercapai"
      : "Perlu Nabung Lebih";

  return (
    <section className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-stone-100">Timeline &amp; Progres Tabungan</h2>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${lunas || !adaTarget
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
            : "border-amber-500/40 bg-amber-500/10 text-amber-300"
            }`}
        >
          {labelStatus}
        </span>
      </header>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-stone-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${persenProgres}%` }}
          role="progressbar"
          aria-valuenow={persenProgres}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-stone-400">Awal ({formatRupiah(0)})</span>
        <span className="font-semibold text-emerald-400">
          {adaTarget && Number.isFinite(jumlahBulan)
            ? `Lunas di Bulan ke-${jumlahBulan}`
            : "Belum ada target"}
        </span>
      </div>

      <ol className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {timeline.map((item) => {
          const sisaUangBulanIni = Math.max(nominalBulanan - item.nominalBulanIni, 0);
          return (
            <li
              key={item.bulan}
              className={`rounded-xl border p-4 ${item.lunas ? "border-emerald-500/50 bg-emerald-500/10" : "border-stone-800 bg-stone-950/60"
                }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-widest text-stone-400">
                  BULAN {item.bulan}
                </span>
                {item.lunas && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4 text-emerald-400" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8.5 12.5 2.5 2.5 4.5-5" />
                  </svg>
                )}
              </div>

              {item.lunas ? (
                <>
                  <p className="mt-2 text-sm font-semibold text-emerald-300">Lunas</p>
                  <p className="text-lg font-bold text-stone-100">{formatRupiah(item.terkumpul)}</p>
                  <p className="mt-1 text-xs text-stone-500">
                    Sisa {formatRupiah(sisaUangBulanIni)}
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-2 text-lg font-bold text-stone-100">{formatRupiah(item.terkumpul)}</p>
                  <p className="mt-1 text-xs text-stone-500">Terkumpul {item.persen}%</p>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default TimelineCard;
