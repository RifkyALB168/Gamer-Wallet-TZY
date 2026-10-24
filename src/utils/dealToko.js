/** Persen hemat dari harga normal, dibulatkan. Harga normal 0 dianggap tanpa diskon. */
export function hitungDiskon(hargaUsd, hargaAsliUsd) {
  const harga = Number(hargaUsd);
  const asli = Number(hargaAsliUsd);
  if (!Number.isFinite(harga) || !Number.isFinite(asli) || asli <= 0) return 0;
  return Math.max(0, Math.round((1 - harga / asli) * 100));
}

/**
 * Lengkapi deal tiap toko dengan persen diskon, lalu urutkan dari termurah.
 * Harga sama diurutkan berdasarkan diskon terbesar, lalu nama toko.
 *
 * @param {Array<{ toko: string, hargaUsd: number, hargaAsliUsd: number }>} deals
 */
export function urutkanDeal(deals = []) {
  return deals
    .map((deal) => ({ ...deal, diskonPersen: hitungDiskon(deal.hargaUsd, deal.hargaAsliUsd) }))
    .sort(
      (a, b) =>
        a.hargaUsd - b.hargaUsd ||
        b.diskonPersen - a.diskonPersen ||
        a.toko.localeCompare(b.toko),
    );
}
