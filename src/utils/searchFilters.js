/** Rentang harga dalam rupiah. `min` dan `max` null artinya tanpa batas */
export const RENTANG_HARGA = [
  { id: "semua", label: "Semua Harga", min: null, max: null },
  { id: "murah", label: "< Rp100rb", min: null, max: 100_000 },
  { id: "sedang", label: "Rp100rb - 300rb", min: 100_000, max: 300_000 },
  { id: "mahal", label: "Rp300rb - 600rb", min: 300_000, max: 600_000 },
  { id: "premium", label: "> Rp600rb", min: 600_000, max: null },
];

export const OPSI_URUTAN = [
  { id: "editor", label: "Pilihan Editor", sortBy: "Deal Rating", desc: false },
  { id: "diskon", label: "Diskon Terbesar", sortBy: "Savings", desc: true },
  { id: "murah", label: "Harga Terendah", sortBy: "Price", desc: false },
  { id: "review", label: "Review Terbaik", sortBy: "Reviews", desc: true },
  { id: "judul", label: "Judul A-Z", sortBy: "Title", desc: false },
];

// Toko yang ditampilkan sebagai filter
const TOKO_UTAMA = [
  "Steam",
  "Epic Games Store",
  "GOG",
  "Fanatical",
  "GreenManGaming",
  "Humble Store",
];

// Ambil hanya toko utama dari daftar toko API, urutannya mengikuti TOKO_UTAMA
export function pilihTokoUtama(stores) {
  return TOKO_UTAMA.map((nama) =>
    stores.find((toko) => toko.nama.toLowerCase() === nama.toLowerCase()),
  ).filter(Boolean);
}

// Ubah batas harga rupiah ke dolar untuk dikirim ke CheapShark.
// Dibulatkan ke dolar penuh supaya perubahan kurs kecil tidak memicu fetch ulang.
export function keUsd(rupiah, rate) {
  if (rupiah === null || !rate) return undefined;
  return Math.round(rupiah / rate);
}
