import { useCallback, useEffect, useState } from "react";
import { fetchGameDetail, fetchStores } from "../services/cheapshark";

function tanggalDariUnix(nilai) {
  if (nilai === undefined || nilai === null || nilai === "") return null;
  const angka = Number(nilai);
  const tanggal = Number.isFinite(angka)
    ? new Date(angka < 1e12 ? angka * 1000 : angka)
    : new Date(nilai);
  return Number.isNaN(tanggal.getTime()) ? null : tanggal.toISOString();
}

function bentukGame(detail, daftarToko) {
  const namaToko = new Map(daftarToko.map((toko) => [String(toko.id), toko.nama]));
  const namaHargaTerendah = namaToko.get(String(detail.hargaTerendah?.storeID));

  return {
    id: detail.id,
    judul: detail.judul,
    edisi: "",
    cover: detail.cover,
    thumb: detail.cover,
    genre: [],
    kategori: "Game PC",
    developer: "",
    publisher: "",
    tanggalRilis: null,
    platform: "PC • Digital",
    metacritic: null,
    ratingSteamPersen: null,
    diskonBerakhir: null,
    hargaTerendah: {
      hargaUsd: detail.hargaTerendah?.hargaUsd ?? null,
      tanggal: tanggalDariUnix(detail.hargaTerendah?.tanggal),
      toko: namaHargaTerendah ?? "Harga terendah historis",
    },
    deskripsi: "",
    sorotan: [],
    riwayatHarga: [],
    deals: detail.penawaran.map((deal) => ({
      tokoId: String(deal.storeId),
      toko: namaToko.get(String(deal.storeId)) ?? `Toko ${deal.storeId}`,
      catatan: "Penawaran digital PC",
      hargaUsd: deal.hargaUsd,
      hargaAsliUsd: deal.hargaAsliUsd,
      diskonPersen: deal.diskonPersen,
      url: deal.linkBeli,
    })),
  };
}

/** Muat detail game dari CheapShark dengan status loading, error, dan retry. */
export function useGameDetail(id) {
  const [percobaan, setPercobaan] = useState(0);
  const kunci = `${id}:${percobaan}`;
  const [hasil, setHasil] = useState({ kunci: null, game: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    let aktif = true;

    Promise.all([fetchGameDetail(id, controller.signal), fetchStores(controller.signal)]).then(
      ([detail, daftarToko]) => {
        if (aktif) setHasil({ kunci, game: bentukGame(detail, daftarToko), error: null });
      },
      (error) => {
        if (aktif) {
          setHasil({
            kunci,
            game: null,
            error: error?.message ?? "Detail game tidak dapat dimuat.",
          });
        }
      },
    );

    return () => {
      aktif = false;
      controller.abort();
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
