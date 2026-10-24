/** Rentang harga dalam rupiah. `min` dan `max` null artinya tanpa batas. */
export const RENTANG_HARGA = [
  { id: "semua", label: "Semua Harga", min: null, max: null },
  { id: "murah", label: "< Rp100rb", min: null, max: 100_000 },
  { id: "sedang", label: "Rp100rb - 300rb", min: 100_000, max: 300_000 },
  { id: "mahal", label: "Rp300rb - 600rb", min: 300_000, max: 600_000 },
  { id: "premium", label: "> Rp600rb", min: 600_000, max: null },
];

/** Opsi urutan hasil. `sortBy` dipakai CheapShark di bagian 2. */
export const OPSI_URUTAN = [
  { id: "editor", label: "Pilihan Editor", sortBy: "Deal Rating", desc: false },
  { id: "diskon", label: "Diskon Terbesar", sortBy: "Savings", desc: true },
  { id: "murah", label: "Harga Terendah", sortBy: "Price", desc: false },
  { id: "review", label: "Review Terbaik", sortBy: "Reviews", desc: true },
  { id: "judul", label: "Judul A-Z", sortBy: "Title", desc: false },
];
