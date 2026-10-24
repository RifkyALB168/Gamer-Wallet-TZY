import { useBudget } from "../../hooks/useBudget";
import { formatRupiah, formatRupiahCompact } from "../../utils/formatRupiah";

const PILIHAN_NOMINAL = [50_000, 100_000, 150_000, 250_000];

/**
 * Hitung cepat berapa bulan menabung untuk satu game.
 * Nominal tabungan memakai useBudget, jadi sama dengan isian di Budget Planner.
 *
 * @param {object} props
 * @param {number} props.hargaIdr harga game termurah dalam rupiah
 */
export function MiniBudgetCard({ hargaIdr }) {
  const { nominalBulanan, setNominalBulanan, jumlahBulan } = useBudget({
    totalWishlist: hargaIdr,
  });

  const adaNominal = nominalBulanan > 0 && Number.isFinite(jumlahBulan);
  const persenPerBulan =
    hargaIdr > 0 ? Math.min(100, Math.round((nominalBulanan / hargaIdr) * 100)) : 0;

  return (
    <section
      aria-labelledby="judul-mini-budget"
      className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="judul-mini-budget" className="text-base font-semibold">
          Mini Budget Planner
        </h2>
        <span className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-[10px] text-stone-400">
          SIMULATOR
        </span>
      </div>
      <p className="mt-1 text-xs text-stone-500">
        Pilih alokasi uang jajan game per bulan untuk melihat estimasi waktu menabung.
      </p>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-stone-950/60 px-3 py-2">
        <span className="text-xs text-stone-400">Alokasi Tabungan Game / Bulan</span>
        <span className="font-mono text-sm font-bold text-emerald-300">
          {formatRupiah(nominalBulanan)}
        </span>
      </div>

      <div role="group" aria-label="Pilih nominal tabungan per bulan" className="mt-3 grid grid-cols-4 gap-1.5">
        {PILIHAN_NOMINAL.map((nominal) => {
          const aktif = nominal === nominalBulanan;
          return (
            <button
              key={nominal}
              type="button"
              aria-pressed={aktif}
              onClick={() => setNominalBulanan(nominal)}
              className={`rounded-lg px-1 py-1.5 font-mono text-[11px] transition focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                aktif
                  ? "bg-emerald-400 font-bold text-stone-950"
                  : "bg-stone-800 text-stone-300 hover:bg-stone-700"
              }`}
            >
              {formatRupiahCompact(nominal)}
            </button>
          );
        })}
      </div>

      <div role="status" className="mt-4 rounded-xl border border-stone-800 bg-stone-950/40 p-3">
        {adaNominal ? (
          <>
            <p className="text-[11px] text-stone-500">Estimasi Waktu Menabung</p>
            <p className="font-mono text-2xl font-bold text-gray-100">{jumlahBulan} Bulan</p>
            <p className="mt-1 text-xs text-stone-400">
              Dengan nabung {formatRupiah(nominalBulanan)}/bulan, kamu butuh{" "}
              <span className="font-semibold text-emerald-300">{jumlahBulan} bulan</span> untuk
              membeli game ini.
            </p>
          </>
        ) : (
          <p className="text-xs text-stone-400">
            Pilih nominal di atas untuk melihat estimasi bulan menabung.
          </p>
        )}
      </div>

      {adaNominal && (
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-stone-500">
            <span>Progres per bulan</span>
            <span className="font-mono">{persenPerBulan}% / bln</span>
          </div>
          <div
            role="progressbar"
            aria-label="Persen harga game yang tertutup tabungan satu bulan"
            aria-valuenow={persenPerBulan}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-1 h-2 overflow-hidden rounded-full bg-stone-800"
          >
            <div className="h-full rounded-full bg-emerald-400" style={{ width: `${persenPerBulan}%` }} />
          </div>
        </div>
      )}

      <a
        href="/budget"
        className="mt-4 block rounded-xl bg-stone-800 px-4 py-2.5 text-center text-sm font-semibold text-gray-100 transition hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-emerald-400"
      >
        Buka Budget Planner Lengkap →
      </a>
    </section>
  );
}

export default MiniBudgetCard;
