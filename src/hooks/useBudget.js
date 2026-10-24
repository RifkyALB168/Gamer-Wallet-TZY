import { useEffect, useState } from "react";
import {
  buatTimelineTabungan,
  hitungBulanMenabung,
  hitungRingkasanBudget,
} from "../utils/tabungan";

const STORAGE_KEY = "gw:budget:v1"; // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const DEFAULT_NOMINAL = 0;

/** Bulatkan ke rupiah utuh, nilai negatif atau bukan angka jadi 0. */
function keRupiah(nilai) {
  const angka = Math.round(Number(nilai));
  return Number.isFinite(angka) && angka > 0 ? angka : 0;
}

/** Baca simpanan budget dari localStorage. */
function bacaSimpanan() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * State budget bulanan untuk halaman Budget Planner.
 * Menyimpan nominal tabungan di localStorage, lalu menghitung
 * timeline dan ringkasan dari total harga game.
 *
 * @param {object} [options]
 * @param {number} [options.totalWishlist] total harga game yang dipilih
 * @param {number} [options.nominalAwal] nominal tabungan awal, default Rp 0
 * @param {number} [options.maksBulan] batas kartu timeline, default 12
 * @returns {{
 *   nominalBulanan: number,
 *   setNominalBulanan: (value: number) => void,
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
  const [nominalBulanan, setNominalState] = useState(
    () => keRupiah(bacaSimpanan().nominalBulanan) || nominalAwal,
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ nominalBulanan }));
    } catch {
      /* penyimpanan tidak tersedia: state tetap jalan selama sesi */
    }
  }, [nominalBulanan]);

  const setNominalBulanan = (nilai) => setNominalState(keRupiah(nilai));

  const reset = () => setNominalState(nominalAwal);

  // Hitungan murni dan murah (paling banyak 12 kartu), jadi tidak perlu useMemo.
  const jumlahBulan = hitungBulanMenabung(totalWishlist, nominalBulanan);
  const timeline = buatTimelineTabungan({
    totalTarget: totalWishlist,
    tabunganPerBulan: nominalBulanan,
    maksBulan,
  });
  const ringkasan = hitungRingkasanBudget({
    totalTarget: totalWishlist,
    tabunganPerBulan: nominalBulanan,
  });

  return {
    nominalBulanan,
    setNominalBulanan,
    reset,
    jumlahBulan,
    timeline,
    ringkasan,
    targetTercapai: totalWishlist > 0 && Number.isFinite(jumlahBulan),
  };
}
