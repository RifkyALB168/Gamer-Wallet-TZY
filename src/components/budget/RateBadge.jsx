import { formatRupiah } from "../../utils/formatRupiah";

const LABEL_SUMBER = {
  jaringan: "kurs terbaru dari Frankfurter",
  cache: "kurs tersimpan di cache",
  fallback: "kurs cadangan, jaringan gagal",
};

/**
 * Penanda kurs USD ke IDR yang sedang dipakai, plus tombol Update.
 *
 * @param {object} props
 * @param {number|null} props.rate
 * @param {string|null} props.date tanggal kurs dari sumber
 * @param {boolean} props.loading
 * @param {string|null} props.error
 * @param {"jaringan"|"cache"|"fallback"|null} props.source
 * @param {() => void} props.onRefresh
 * @param {boolean} [props.padat] tampilan ringkas untuk header halaman
 */
export function RateBadge({ rate, date, loading, error, source, onRefresh, padat = false }) {
  const keterangan = loading
    ? "Memuat kurs..."
    : `${formatRupiah(rate ?? 0)} / USD · ${LABEL_SUMBER[source] ?? "kurs belum tersedia"}`;

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${source === "fallback" || error
        ? "border-amber-500/40 bg-amber-500/10 text-amber-200"
        : "border-slate-700 bg-slate-900/60 text-slate-300"
        } ${padat ? "" : "mt-4"}`}
    >
      <span>{keterangan}</span>
      {date && <span className="text-slate-500">({date})</span>}
      <button
        type="button"
        onClick={onRefresh}
        className="ml-1 rounded-md border border-slate-700 px-2 py-0.5 font-medium text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
      >
        Update
      </button>
    </div>
  );
}

export default RateBadge;
