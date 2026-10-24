import { useCallback, useEffect, useState } from "react";
import { ambilDetailGame } from "../data/mockGameDetail";

/**
 * Muat detail satu game beserta status loading dan error.
 * Sementara memakai data contoh; sumbernya cukup diganti ke services/cheapshark.js nanti.
 *
 * @param {string} id ID game
 * @returns {{
 *   game: object | null,
 *   loading: boolean,
 *   error: string | null,
 *   cobaLagi: () => void
 * }}
 */
export function useGameDetail(id) {
  // Naik satu tiap tombol "Coba lagi" ditekan, supaya data diambil ulang.
  const [percobaan, setPercobaan] = useState(0);
  const kunci = `${id}:${percobaan}`;

  const [hasil, setHasil] = useState({ kunci: null, game: null, error: null });

  useEffect(() => {
    let aktif = true;

    ambilDetailGame(id).then(
      (game) => aktif && setHasil({ kunci, game, error: null }),
      (error) =>
        aktif &&
        setHasil({
          kunci,
          game: null,
          error: error?.message ?? "Detail game tidak dapat dimuat.",
        }),
    );

    // Abaikan hasil lama bila ID berganti sebelum data selesai dimuat.
    return () => {
      aktif = false;
    };
  }, [id, kunci]);

  const cobaLagi = useCallback(() => setPercobaan((n) => n + 1), []);

  const loading = hasil.kunci !== kunci;

  return {
    game: loading ? null : hasil.game,
    loading,
    error: loading ? null : hasil.error,
    cobaLagi,
  };
}
