import { useCallback, useEffect, useState } from "react";
import { FALLBACK_USD_IDR, fetchLatestRate } from "../services/frankfurter";

// Permintaan yang sedang berjalan, dibagi antar komponen. Tanpa ini 5 kartu game akan memanggil API lima kali.
const inflight = new Map();

/**
 * Ambil kurs USD ke IDR dengan cache.
 *
 * Sumber kurs yang dilaporkan dari `source`:
 * - "jaringan" saat data baru diambil dari Frankfurter
 * - "cache" saat data diambil dari localStorage
 * - "fallback" saat jaringan gagal dan kurs cadangan dipakai
 *
 * @param {object} [options]
 * @param {string} [options.from] mata uang asal, default "USD"
 * @param {string} [options.to] mata uang tujuan, default "IDR"
 * @param {number} [options.ttl] masa berlaku cache dalam milidetik
 * @param {number} [options.fallbackRate] kurs cadangan saat gagal, default FALLBACK_USD_IDR
 * @returns {{
 *   rate: number | null,
 *   date: string | null,
 *   loading: boolean,
 *   error: string | null,
 *   source: "jaringan" | "cache" | "fallback" | null,
 *   refresh: () => void
 * }}
 */
export function useExchangeRate({
  from = "USD",
  to = "IDR",
  ttl,
  fallbackRate = FALLBACK_USD_IDR,
} = {}) {
  const [state, setState] = useState({
    rate: null,
    date: null,
    loading: true,
    error: null,
    source: null,
  });

  // Naik satu tiap tombol "Perbarui" ditekan, supaya kurs diambil ulang dari jaringan.
  const [paksa, setPaksa] = useState(0);

  useEffect(() => {
    const key = `${from}:${to}:${paksa}`;

    if (!inflight.has(key)) {
      inflight.set(
        key,
        fetchLatestRate({ from, to, ttl, force: paksa > 0 }).finally(() => {
          inflight.delete(key);
        }),
      );
    }

    inflight.get(key).then(
      (hasil) =>
        setState({
          rate: hasil.rate,
          date: hasil.date,
          loading: false,
          error: null,
          source: hasil.cached ? "cache" : "jaringan",
        }),
      (error) =>
        setState({
          rate: fallbackRate,
          date: null,
          loading: false,
          error: error?.message ?? "Kurs tidak dapat diambil",
          source: "fallback",
        }),
    );
  }, [from, to, ttl, fallbackRate, paksa]);

  const refresh = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    setPaksa((n) => n + 1);
  }, []);

  return { ...state, refresh };
}
