import { useCallback, useEffect, useState } from "react";
import { fetchDeals } from "../services/cheapshark";

// Ambil daftar deal setiap `filter` berubah.
// `filter` harus stabil (dibuat dengan useMemo) supaya tidak fetch berulang.
export function useDeals(filter) {
  // Naik satu setiap tombol "Coba lagi" ditekan
  const [percobaan, setPercobaan] = useState(0);
  const [hasil, setHasil] = useState({
    filter: null,
    percobaan: -1,
    games: [],
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let aktif = true;

    fetchDeals(filter, controller.signal).then(
      (games) => aktif && setHasil({ filter, percobaan, games, error: null }),
      (err) =>
        aktif &&
        setHasil({
          filter,
          percobaan,
          games: [],
          error: err?.message ?? "Data game tidak dapat dimuat.",
        }),
    );

    // Filter berubah: batalkan permintaan lama dan abaikan hasilnya
    return () => {
      aktif = false;
      controller.abort();
    };
  }, [filter, percobaan]);

  const cobaLagi = useCallback(() => setPercobaan((n) => n + 1), []);

  // Masih loading selama hasil yang tersimpan belum untuk filter ini
  const loading = hasil.filter !== filter || hasil.percobaan !== percobaan;

  return {
    games: loading ? [] : hasil.games,
    loading,
    error: loading ? null : hasil.error,
    cobaLagi,
  };
}

export default useDeals;
