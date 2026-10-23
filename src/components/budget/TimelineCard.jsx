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
  const persenProgres = lunas ? 100 : (timeline[timeline.length - 1]?.persen ?? 0);
  const adaTarget = totalWishlist > 0;

  const labelStatus = !adaTarget
    ? "Belum ada game dipilih"
    : lunas
      ? "Target Tercapai"
      : "Perlu Nabung Lebih";

  return (
    <section className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
      <header className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-stone-100">Timeline Tabungan</h2>
        <span
          className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${
            lunas || !adaTarget
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-amber-500/40 bg-amber-500/10 text-amber-300"
          }`}
        >
          {labelStatus}
        </span>
      </header>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-800">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${persenProgres}%` }}
          role="progressbar"
          aria-valuenow={persenProgres}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-stone-400">
        <span>Awal {formatRupiah(0)}</span>
        <span className="font-semibold text-emerald-400">
          {adaTarget && Number.isFinite(jumlahBulan)
            ? `Lunas di bulan ke-${jumlahBulan}`
            : "Belum ada target"}
        </span>
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {timeline.map((item) => (
          <li
            key={item.bulan}
            className={`rounded-xl border p-3 ${
              item.lunas
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-stone-800 bg-stone-950/60"
            }`}
          >
            <p className="text-xs tracking-widest text-stone-400">BULAN {item.bulan}</p>
            <p className="mt-1 font-bold text-stone-100">{formatRupiah(item.terkumpul)}</p>
            <p className="text-xs text-stone-500">
              {item.lunas
                ? `Lunas, sisa ${formatRupiah(Math.max(nominalBulanan - item.nominalBulanIni, 0))}`
                : `Terkumpul ${item.persen}%`}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default TimelineCard;
