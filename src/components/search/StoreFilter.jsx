/**
 * Filter toko dengan pilihan ganda. Tanpa pilihan berarti semua toko.
 *
 * @param {object} props
 * @param {{id: string, nama: string}[]} props.stores toko yang bisa dipilih
 * @param {string[]} props.selected ID toko yang dipilih
 * @param {(ids: string[]) => void} props.onChange
 */
export function StoreFilter({ stores, selected, onChange }) {
  const toggle = (id) =>
    onChange(
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : [...selected, id],
    );

  return (
    <fieldset>
      <div className="mb-2 flex items-center justify-between">
        <legend className="font-mono text-xs uppercase tracking-wide text-stone-400">
          Platform toko resmi
        </legend>
        <button
          type="button"
          onClick={() => onChange([])}
          className="text-xs text-stone-400 hover:text-stone-100"
        >
          {selected.length === 0 ? "Semua toko" : "Pilih semua"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {stores.map((toko) => (
          <button
            key={toko.id}
            type="button"
            aria-pressed={selected.includes(toko.id)}
            onClick={() => toggle(toko.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-emerald-400 ${
              selected.includes(toko.id)
                ? "bg-indigo-500 text-white"
                : "bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30"
            }`}
          >
            {toko.nama}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default StoreFilter;
