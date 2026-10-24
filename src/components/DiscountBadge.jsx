/**
 * Lencana persen diskon, mis. "-25% OFF". Tidak tampil bila tidak ada diskon.
 *
 * @param {object} props
 * @param {number} props.persen besar diskon dalam persen
 * @param {string} [props.className] kelas tambahan, mis. untuk posisi
 */
export function DiscountBadge({ persen, className = "" }) {
  const nilai = Math.round(Number(persen));
  if (!Number.isFinite(nilai) || nilai <= 0) return null;

  return (
    <span
      aria-label={`Diskon ${nilai} persen`}
      className={`rounded-md bg-emerald-400 px-2 py-0.5 font-mono text-xs font-bold text-stone-950 ${className}`}
    >
      -{nilai}% OFF
    </span>
  );
}

export default DiscountBadge;
