export function formatRupiah(value, { withPrefix = true } = {}) {
  const angka = Number(value);
  const safe = Number.isFinite(angka) ? Math.round(angka) : 0;
  const teks = safe.toLocaleString("id-ID");
  return withPrefix ? `Rp ${teks}` : teks;
}
