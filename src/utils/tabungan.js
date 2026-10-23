export function hitungBulanMenabung(totalTarget, tabunganPerBulan) {
  const target = Number(totalTarget);
  const perBulan = Number(tabunganPerBulan);

  if (!Number.isFinite(target) || target <= 0) return 0;
  if (!Number.isFinite(perBulan) || perBulan <= 0) return Infinity;

  return Math.ceil(target / perBulan);
}

export function buatTimelineTabungan({
  totalTarget,
  tabunganPerBulan,
  maksBulan = 12,
} = {}) {
  const target = Number(totalTarget) || 0;
  const perBulan = Number(tabunganPerBulan) || 0;

  if (target <= 0 || perBulan <= 0) {
    return [
      {
        bulan: 1,
        terkumpul: 0,
        persen: 0,
        lunas: false,
        sisa: target,
        nominalBulanIni: perBulan,
      },
    ];
  }

  const totalBulan = Math.min(
    Math.ceil(target / perBulan),
    Math.max(1, maksBulan),
  );
  const timeline = [];
  let terkumpul = 0;

  for (let bulan = 1; bulan <= totalBulan; bulan += 1) {
    const sisaSebelumnya = Math.max(target - terkumpul, 0);
    const nominalBulanIni = Math.min(perBulan, sisaSebelumnya);
    terkumpul += nominalBulanIni;
    const lunas = terkumpul >= target;

    timeline.push({
      bulan,
      terkumpul,
      persen: target > 0 ? Math.round((terkumpul / target) * 100) : 0,
      lunas,
      sisa: Math.max(target - terkumpul, 0),
      nominalBulanIni,
    });
  }

  return timeline;
}

export function hitungRingkasanBudget({ totalTarget, tabunganPerBulan } = {}) {
  const target = Number(totalTarget) || 0;
  const perBulan = Number(tabunganPerBulan) || 0;
  const jumlahBulan = hitungBulanMenabung(target, perBulan);
  const totalTerkumpul = jumlahBulan === Infinity ? perBulan : target;

  // Sisa uang pada bulan terakhir: selisih dari nominal penuh dikurangi kebutuhan.
  const sisaTabungan =
    jumlahBulan === Infinity ? 0 : Math.max(jumlahBulan * perBulan - target, 0);

  return { totalWishlist: target, jumlahBulan, totalTerkumpul, sisaTabungan };
}

export function totalHargaGameTerpilih(games = [], rate = 0) {
  return games.reduce((total, game) => {
    if (!game || !game.dipilih) return total;
    if (Number.isFinite(game.hargaIdr)) return total + Number(game.hargaIdr);
    if (Number.isFinite(game.hargaUsd)) {
      return total + Math.round(Number(game.hargaUsd) * (Number(rate) || 0));
    }
    return total;
  }, 0);
}
