import { useState } from "react";
import { formatRupiah, formatRupiahCompact } from "../../utils/formatRupiah";

const MIN_NOMINAL = 50_000;
const MAX_NOMINAL = 5_000_000;
const STEP_NOMINAL = 10_000;
const PRESET_NOMINAL = [50_000, 100_000, 200_000, 300_000];

/** Ubah "200.000" menjadi 200000. */
function parseNominal(teks) {
  const digit = String(teks).replace(/[^\d]/g, "");
  return digit ? Number(digit) : 0;
}

/**
 * Kartu input nominal tabungan per bulan: input teks, slider, preset, dan button hitung.
 *
 * @param {object} props
 * @param {number} props.nominal
 * @param {(value: number) => void} props.onChange
 * @param {() => void} props.onReset
 * @param {() => void} props.onHitung
 * @param {{ totalWishlist: number, jumlahBulan: number, sisaTabungan: number }} props.ringkasan
 */
export function SavingsInputCard({ nominal, onChange, onReset, onHitung, ringkasan }) {
  const [teks, setTeks] = useState(formatRupiah(nominal, { withPrefix: false }));
  const [nominalTerakhir, setNominalTerakhir] = useState(nominal);

  // Sync input saat nominal diubah dari luar (preset, reset, slider).
  // Menyesuakan state saat render, bukan di dalam effect.
  if (nominal !== nominalTerakhir) {
    setNominalTerakhir(nominal);
    setTeks(formatRupiah(nominal, { withPrefix: false }));
  }

  const ringkasanItem = [
    { label: "Wishlist", nilai: formatRupiah(ringkasan.totalWishlist) },
    {
      label: "Target",
      nilai: Number.isFinite(ringkasan.jumlahBulan)
        ? `${ringkasan.jumlahBulan} Bulan`
        : "Belum bisa dihitung",
    },
    { label: "Sisa Tabungan", nilai: formatRupiah(ringkasan.sisaTabungan) },
  ];

  return (
    <section className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
      <header className="flex items-center justify-between">
        <h2 className="font-semibold text-stone-100">Uang Jajan Bulanan</h2>
        <span className="rounded-md border border-stone-700 px-2 py-0.5 text-xs text-stone-400">
          IDR
        </span>
      </header>

      <label
        htmlFor="nominal-tabungan"
        className="mt-4 block text-xs tracking-widest text-stone-400"
      >
        NOMINAL TABUNGAN PER BULAN
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-950 px-4 py-2 focus-within:border-emerald-500">
        <span className="font-semibold text-emerald-400">Rp</span>
        <input
          id="nominal-tabungan"
          type="text"
          inputMode="numeric"
          value={teks}
          onChange={(event) => {
            const angka = parseNominal(event.target.value);
            setTeks(formatRupiah(angka, { withPrefix: false }));
            onChange(angka);
          }}
          onBlur={() => setTeks(formatRupiah(nominal, { withPrefix: false }))}
          className="w-full bg-transparent text-xl font-bold text-stone-100 outline-none"
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
        <span>{formatRupiahCompact(MIN_NOMINAL)}</span>
        <span>{formatRupiahCompact(MAX_NOMINAL)}</span>
      </div>
      <input
        type="range"
        min={MIN_NOMINAL}
        max={MAX_NOMINAL}
        step={STEP_NOMINAL}
        value={Math.min(Math.max(nominal, MIN_NOMINAL), MAX_NOMINAL)}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label="Nominal tabungan per bulan"
        className="mt-1 h-1.5 w-full cursor-pointer accent-emerald-500"
      />

      <dl className="mt-4 grid grid-cols-3 divide-x divide-stone-800 border-t border-stone-800 pt-3 text-center">
        {ringkasanItem.map(({ label, nilai }) => (
          <div key={label} className="px-1">
            <dt className="text-xs text-stone-500">{label}</dt>
            <dd className="text-sm font-semibold text-stone-100">{nilai}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {PRESET_NOMINAL.map((nilai) => {
          const aktif = nilai === nominal;
          return (
            <button
              key={nilai}
              type="button"
              onClick={() => onChange(nilai)}
              className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition ${
                aktif
                  ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                  : "border-stone-700 text-stone-300 hover:border-stone-500"
              }`}
            >
              {formatRupiahCompact(nilai)}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={onHitung}
          className="flex-1 rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-stone-950 transition hover:bg-emerald-400"
        >
          Kalkulasikan
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:border-stone-500"
        >
          Reset
        </button>
      </div>
    </section>
  );
}

export default SavingsInputCard;
