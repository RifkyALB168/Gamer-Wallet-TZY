import { formatRupiah, usdKeRupiah } from "../utils/formatRupiah";

/**
 * Tampilkan harga game dalam rupiah hasil konversi dari dolar.
 * Bila kurs belum tersedia, tampilkan tanda hubung supaya layout tidak melompat.
 *
 * @param {object} props
 * @param {number} props.usd harga asli dalam dolar
 * @param {number|null} props.rate kurs 1 USD dalam rupiah
 * @param {string} [props.className] kelas tambahan untuk angka harga
 */
export function PriceIDR({ usd, rate, className = "" }) {
  const kurs = Number(rate);

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
  if (!(Number.isFinite(kurs) && kurs > 0)) {
    return (
      <span className={`text-stone-500 ${className}`} title="Kurs belum tersedia">
        -
      </span>
    );
  }

  return <span className={className}>{formatRupiah(usdKeRupiah(usd, kurs))}</span>;
}

export default PriceIDR;
