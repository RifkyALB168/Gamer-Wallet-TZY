import { formatRupiah } from "../../utils/formatRupiah";

/**
 * Ringkasan singkat hasil kalkulasi: total wishlist, lama menabung, sisa uang bulan terakhir.
 *
 * @param {object} props
 * @param {{ totalWishlist: number, jumlahBulan: number, sisaTabungan: number }} props.ringkasan
 */
export function QuickSummaryCard({ ringkasan }) {
  const bulan = ringkasan.jumlahBulan;

  const item = [
    { label: "Wishlist", nilai: formatRupiah(ringkasan.totalWishlist) },
    {
      label: "Target",
      nilai: Number.isFinite(bulan) ? `${bulan} Bulan` : "Belum bisa dihitung",
    },
    { label: "Sisa Tabungan", nilai: formatRupiah(ringkasan.sisaTabungan) },
  ];

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <p className="text-xs font-semibold tracking-widest text-slate-400">RINGKASAN</p>
      <dl className="mt-4 grid grid-cols-3 divide-x divide-slate-800 text-center">
        {item.map(({ label, nilai }) => (
          <div key={label} className="px-2">
            <dt className="text-xs text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">{nilai}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default QuickSummaryCard;
