export function hitungBulanMenabung(totalTarget, tabunganPerBulan) {
  const target = Number(totalTarget);
  const perBulan = Number(tabunganPerBulan);

  if (!Number.isFinite(target) || target <= 0) return 0;
  if (!Number.isFinite(perBulan) || perBulan <= 0) return Infinity;

  return Math.ceil(target / perBulan);
}
