const SATU_HARI = 24 * 60 * 60 * 1000;

/** Tanggal gaya Indonesia, mis. "5 Des 2023". Tanggal tidak valid jadi "-". */
export function formatTanggal(nilai, opsi = { day: "numeric", month: "short", year: "numeric" }) {
  const tanggal = new Date(nilai);
  if (Number.isNaN(tanggal.getTime())) return "-";
  return tanggal.toLocaleDateString("id-ID", opsi);
}

/** Sisa hari sampai tanggal tertentu, dibulatkan ke atas. Tanggal lewat jadi 0. */
export function sisaHari(nilai, sekarang = Date.now()) {
  const selisih = new Date(nilai).getTime() - sekarang;
  if (!Number.isFinite(selisih) || selisih <= 0) return 0;
  return Math.ceil(selisih / SATU_HARI);
}
