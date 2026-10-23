import { useState } from "react";
import { formatRupiah, formatRupiahCompact } from "../../utils/formatRupiah";

const MIN_NOMINAL = 50_000;
const MAX_NOMINAL = 2_000_000;
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
 */
export function SavingsInputCard({ nominal, onChange, onReset, onHitung }) {
  const [teks, setTeks] = useState(formatRupiah(nominal, { withPrefix: false }));
  const [nominalTerakhir, setNominalTerakhir] = useState(nominal);

  // Sync input saat nominal diubah dari luar (preset, reset, slider).
  // Menyesuakan state saat render, bukan di dalam effect.
  if (nominal !== nominalTerakhir) {
    setNominalTerakhir(nominal);
    setTeks(formatRupiah(nominal, { withPrefix: false }));
  }

  const persenSlider = ((Math.min(Math.max(nominal, MIN_NOMINAL), MAX_NOMINAL) - MIN_NOMINAL) / (MAX_NOMINAL - MIN_NOMINAL)) * 100;

  return (
    <section className="rounded-2xl border border-grey-800 bg-grey-900/60 p-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
              <path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M16 12h3" />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-semibold text-grey-100">Uang Jajan Bulanan</h2>
            <p className="text-sm text-grey-400">Alokasikan batas aman jajan game</p>
          </div>
        </div>
        <span className="rounded-md border border-grey-700 px-2 py-1 text-xs font-medium text-grey-400">IDR</span>
      </header>

      <label
        htmlFor="nominal-tabungan"
        className="mt-6 block text-xs font-semibold tracking-widest text-grey-400"
      >
        NOMINAL TABUNGAN PER BULAN
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-grey-700 bg-grey-950 px-4 py-3 focus-within:border-emerald-500">
        <span className="text-lg font-semibold text-emerald-400">Rp</span>
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
          className="w-full bg-transparent text-2xl font-bold tracking-wide text-grey-100 outline-none"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-grey-400">
          <span>{formatRupiahCompact(MIN_NOMINAL)}</span>
          <span className="font-semibold text-emerald-400">{formatRupiah(nominal)}</span>
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
          style={{ backgroundSize: `${persenSlider}% 100%` }}
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-grey-700 accent-emerald-500"
        />
      </div>

      <p className="mt-6 text-xs font-semibold tracking-widest text-grey-400">PRESET NOMINAL CEPAT</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {PRESET_NOMINAL.map((nilai) => {
          const aktif = nilai === nominal;
          return (
            <button
              key={nilai}
              type="button"
              onClick={() => onChange(nilai)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${aktif
                ? "border-emerald-500 bg-emerald-500/15 text-emerald-300"
                : "border-grey-700 text-grey-300 hover:border-grey-500"
                }`}
            >
              {formatRupiahCompact(nilai)}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onHitung}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-grey-950 transition hover:bg-emerald-400"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
          <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
        </svg>
        Hitung Estimasi Waktu
      </button>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span />
        <button type="button" onClick={onReset} className="text-grey-400 underline hover:text-grey-200">
          Reset
        </button>
      </div>
    </section>
  );
}

export default SavingsInputCard;
