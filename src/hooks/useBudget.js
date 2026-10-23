import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buatTimelineTabungan,
  hitungBulanMenabung,
  hitungRingkasanBudget,
} from "../utils/tabungan";

const STORAGE_KEY = "gw:budget:v1"; // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const DEFAULT_NOMINAL = 0;

/** Baca simpanan budget dari localStorage. */
function bacaSimpanan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * State budget bulanan untuk halaman Budget Planner.
 * Menyimpan nominal tabungan dan uang saku di localStorage, lalu
 * menghitung timeline dan ringkasan dari total harga game.
 *
 * @param {object} [options]
 * @param {number} [options.totalWishlist] total harga game yang dipilih
 * @param {number} [options.nominalAwal] nominal tabungan awal, default Rp 0
 * @param {number} [options.maksBulan] batas kartu timeline, default 12
 * @returns {{
 *   nominalBulanan: number,
 *   uangSaku: number,
 *   setNominalBulanan: (value: number) => void,
 *   setUangSaku: (value: number) => void,
 *   reset: () => void,
 *   jumlahBulan: number,
 *   timeline: Array<object>,
 *   ringkasan: object,
 *   targetTercapai: boolean
 * }}
 */
export function useBudget({
  totalWishlist = 0,
  nominalAwal = DEFAULT_NOMINAL,
  maksBulan = 12,
} = {}) {
  const simpanan = useMemo(() => bacaSimpanan(), []);

  const [nominalBulanan, setNominalState] = useState(
    () => Number(simpanan?.nominalBulanan) || nominalAwal,
  );
  const [uangSaku, setUangSakuState] = useState(
    () => Number(simpanan?.uangSaku) || 0,
  );
  // https://stackoverflow.com/questions/71925654/difference-between-useeffect-and-usememo

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ nominalBulanan, uangSaku }),
      );
    } catch {
      /* penyimpanan tidak tersedia: state tetap jalan selama sesi */
    }
  }, [nominalBulanan, uangSaku]);

  /** Pastikan nominal selalu angka bulat dan tidak negatif. */
  const setNominalBulanan = useCallback((value) => {
    const angka = Math.round(Number(value));
    setNominalState(Number.isFinite(angka) && angka > 0 ? angka : 0);
  }, []);

  const setUangSaku = useCallback((value) => {
    const angka = Math.round(Number(value));
    setUangSakuState(Number.isFinite(angka) && angka > 0 ? angka : 0);
  }, []);

  const reset = useCallback(() => {
    setNominalState(nominalAwal);
    setUangSakuState(0);
  }, [nominalAwal]);

  const jumlahBulan = useMemo(
    () => hitungBulanMenabung(totalWishlist, nominalBulanan),
    [totalWishlist, nominalBulanan],
  );

  const timeline = useMemo(
    () =>
      buatTimelineTabungan({
        totalTarget: totalWishlist,
        tabunganPerBulan: nominalBulanan,
        maksBulan,
      }),
    [totalWishlist, nominalBulanan, maksBulan],
  );

  const ringkasan = useMemo(
    () =>
      hitungRingkasanBudget({
        totalTarget: totalWishlist,
        tabunganPerBulan: nominalBulanan,
      }),
    [totalWishlist, nominalBulanan],
  );

  return {
    nominalBulanan,
    uangSaku,
    setNominalBulanan,
    setUangSaku,
    reset,
    jumlahBulan,
    timeline,
    ringkasan,
    targetTercapai: jumlahBulan !== Infinity && totalWishlist > 0,
  };
}
