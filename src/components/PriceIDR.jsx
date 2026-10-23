import { formatRupiah, usdKeRupiah } from "../utils/formatRupiah";

export function PriceIDR({ usd, rate, className = "", tampilkanAsal = false }) {
  if (!Number.isFinite(Number(rate)) || Number(rate) <= 0) {
    return (
      <span className={`text-slate-500 ${className}`} title="Kurs belum tersedia">
        -
      </span>
    );
  }

  const rupiah = usdKeRupiah(usd, rate);

  return (
    <span className={className}>
      {formatRupiah(rupiah)}
      {tampilkanAsal && Number.isFinite(Number(usd)) && ( // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
        <span className="ml-1 text-xs text-slate-500">(${Number(usd).toFixed(2)})</span>
      )}
    </span>
  );
}

export default PriceIDR;
