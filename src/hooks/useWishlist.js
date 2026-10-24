import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "gw:wishlist:v1"; // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

/** Baca daftar wishlist dari localStorage, data rusak dianggap kosong. */
function bacaSimpanan() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Satu sumber data untuk semua komponen, supaya tombol di Detail Game dan
// halaman Wishlist selalu menampilkan isi yang sama.
let daftar = bacaSimpanan();
const pendengar = new Set();

function simpan(berikutnya) {
  daftar = berikutnya;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(daftar));
  } catch {
    /* penyimpanan tidak tersedia: wishlist tetap jalan selama sesi */
  }
  pendengar.forEach((dengar) => dengar());
}

// https://react.dev/reference/react/useSyncExternalStore
function subscribe(dengar) {
  pendengar.add(dengar);

  // Ikut berubah bila wishlist diubah dari tab lain.
  const onStorage = (e) => {
    if (e.key !== STORAGE_KEY) return;
    daftar = bacaSimpanan();
    dengar();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    pendengar.delete(dengar);
    window.removeEventListener("storage", onStorage);
  };
}

const ambilDaftar = () => daftar;

/**
 * Wishlist pengguna yang tersimpan di localStorage.
 * Yang disimpan hanya ID, judul, gambar, dan harga terakhir dalam USD;
 * harga rupiah dihitung saat ditampilkan supaya mengikuti kurs terbaru.
 *
 * @returns {{
 *   items: Array<{ id: string, judul: string, cover: string, hargaUsd: number }>,
 *   ada: (id: string) => boolean,
 *   tambah: (game: object) => void,
 *   hapus: (id: string) => void,
 *   toggle: (game: object) => void,
 *   totalUsd: number
 * }}
 */
export function useWishlist() {
  const items = useSyncExternalStore(subscribe, ambilDaftar);

  const ada = useCallback((id) => items.some((item) => item.id === id), [items]);

  const tambah = useCallback((game) => {
    if (!game?.id || daftar.some((item) => item.id === game.id)) return;
    simpan([
      ...daftar,
      {
        id: game.id,
        judul: game.judul,
        cover: game.cover,
        hargaUsd: Number(game.hargaUsd) || 0,
      },
    ]);
  }, []);

  const hapus = useCallback((id) => {
    simpan(daftar.filter((item) => item.id !== id));
  }, []);

  const toggle = useCallback(
    (game) => {
      if (daftar.some((item) => item.id === game?.id)) hapus(game.id);
      else tambah(game);
    },
    [tambah, hapus],
  );

  const totalUsd = items.reduce((total, item) => total + item.hargaUsd, 0);

  return { items, ada, tambah, hapus, toggle, totalUsd };
}
