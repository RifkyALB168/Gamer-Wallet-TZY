export function formatRupiah(value, { withPrefix = true } = {}) {
  const angka = Number(value);
  const safe = Number.isFinite(angka) ? Math.round(angka) : 0;
  const teks = safe.toLocaleString("id-ID");
  return withPrefix ? `Rp ${teks}` : teks;
}


export function usdKeRupiah(usd, rate) {
  const nilaiUsd = Number(usd);
  const kurs = Number(rate);
  if (!Number.isFinite(nilaiUsd) || !Number.isFinite(kurs) || kurs <= 0)
    return 0;
  return Math.round(nilaiUsd * kurs);
}

function trimZero(nilai) {
  const dibulatkan = Math.round(nilai * 10) / 10;
  return dibulatkan.toLocaleString("id-ID");
}
