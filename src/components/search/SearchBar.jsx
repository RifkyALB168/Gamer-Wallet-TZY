/**
 * @param {object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 */
export function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <label htmlFor="cari-game" className="sr-only">
        Cari judul game
      </label>
      <input
        id="cari-game"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onChange("")}
        placeholder="Cari judul game (misal: Elden Ring, Witcher)..."
        autoComplete="off"
        className="w-full rounded-xl border border-stone-800 bg-stone-950 px-4 py-3 pr-20 text-sm text-gray-100 placeholder:text-stone-500 focus:border-emerald-400 focus:outline-none"
      />
      <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded bg-stone-800 px-2 py-0.5 font-mono text-[11px] text-stone-400 sm:block">
        ESC: Clear
      </kbd>
    </div>
  );
}

export default SearchBar;
