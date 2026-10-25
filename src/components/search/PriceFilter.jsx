import { RENTANG_HARGA } from "../../utils/searchFilters";

/**
 * @param {object} props
 * @param {string} props.value
 * @param {(id: string) => void} props.onChange
 */
export function PriceFilter({ value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 font-mono text-xs uppercase tracking-wide text-stone-400">
        Batas dompet mahasiswa (filter harga)
      </legend>
      <div className="flex flex-wrap gap-2">
        {RENTANG_HARGA.map((rentang) => (
          <button
            key={rentang.id}
            type="button"
            aria-pressed={value === rentang.id}
            onClick={() => onChange(rentang.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-emerald-400 ${
              value === rentang.id
                ? "bg-emerald-400 text-stone-950"
                : "bg-stone-800 text-stone-200 hover:bg-stone-700"
            }`}
          >
            {rentang.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default PriceFilter;
