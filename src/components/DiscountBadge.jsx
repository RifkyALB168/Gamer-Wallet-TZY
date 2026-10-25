/**
 * @param {object} props
 * @param {number} props.persen
 * @param {string} [props.className]
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
