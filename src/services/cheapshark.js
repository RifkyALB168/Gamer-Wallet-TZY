// Semua pemanggilan ke API CheapShark ada di file ini.
// Dokumentasi: https://apidocs.cheapshark.com
const BASE_URL = "https://www.cheapshark.com/api/1.0";
const SITE_URL = "https://www.cheapshark.com";

// Panggil CheapShark lalu kembalikan datanya sebagai JSON.
// Parameter yang kosong tidak ikut dikirim.
async function ambilData(path, params = {}, signal) {
  const url = new URL(BASE_URL + path);
  Object.entries(params).forEach(([nama, nilai]) => {
    if (nilai !== undefined && nilai !== null && nilai !== "") {
      url.searchParams.set(nama, nilai);
    }
  });

  // Batalkan permintaan yang lebih dari 10 detik
  const batasWaktu = AbortSignal.timeout(10000);

  const response = await fetch(url, {
    signal: signal ? AbortSignal.any([signal, batasWaktu]) : batasWaktu,
  });

  if (!response.ok) {
    throw new Error(`CheapShark gagal merespons (status ${response.status})`);
  }
  return response.json();
}

// Gambar header Steam lebih besar daripada thumb bawaan CheapShark
function ambilCover(item) {
  if (item.steamAppID) {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.steamAppID}/header.jpg`;
  }
  return item.thumb;
}

// Ubah satu deal dari API ke bentuk yang dipakai GameCard
function ubahDeal(deal) {
  return {
    id: deal.gameID,
    dealId: deal.dealID,
    judul: deal.title,
    cover: ambilCover(deal),
    thumb: deal.thumb,
    hargaUsd: Number(deal.salePrice),
    hargaAsliUsd: Number(deal.normalPrice),
    diskonPersen: Math.round(Number(deal.savings)),
    storeId: deal.storeID,
    ratingPersen: Number(deal.steamRatingPercent) || null,
    linkBeli: `${SITE_URL}/redirect?dealID=${deal.dealID}`,
  };
}

// Satu game bisa muncul di banyak toko. Simpan yang termurah saja.
function ambilTermurahPerGame(daftarDeal) {
  const terbaik = new Map();
  daftarDeal.forEach((deal) => {
    const lama = terbaik.get(deal.id);
    if (!lama || deal.hargaUsd < lama.hargaUsd) {
      terbaik.set(deal.id, deal);
    }
  });
  return [...terbaik.values()];
}

// Endpoint /deals: daftar penawaran, satu kartu per game
export async function fetchDeals(filter = {}, signal) {
  const data = await ambilData(
    "/deals",
    {
      title: filter.title,
      storeID: (filter.storeIds ?? []).join(","),
      lowerPrice: filter.lowerPrice,
      upperPrice: filter.upperPrice,
      sortBy: filter.sortBy ?? "Deal Rating",
      desc: filter.desc ? 1 : 0,
      pageSize: 24,
    },
    signal,
  );
  return ambilTermurahPerGame(data.map(ubahDeal));
}

// Endpoint /games?title=: cari game berdasarkan judul
export async function fetchGames(title, signal) {
  const data = await ambilData("/games", { title, limit: 20 }, signal);
  return data.map((game) => ({
    id: game.gameID,
    judul: game.external,
    cover: ambilCover(game),
    hargaTermurahUsd: Number(game.cheapest),
    dealId: game.cheapestDealID,
  }));
}

// Endpoint /games?id=: harga satu game di semua toko, termurah dulu.
// Dipakai halaman Detail Game.
export async function fetchGameDetail(id, signal) {
  const data = await ambilData("/games", { id }, signal);
  return {
    id,
    judul: data.info.title,
    cover: ambilCover(data.info),
    hargaTerendah: data.cheapestPriceEver
      ? {
          hargaUsd: Number(data.cheapestPriceEver.price),
          tanggal: data.cheapestPriceEver.date,
          storeId: data.cheapestPriceEver.storeID,
        }
      : null,
    penawaran: data.deals
      .map((deal) => ({
        dealId: deal.dealID,
        storeId: deal.storeID,
        hargaUsd: Number(deal.price),
        hargaAsliUsd: Number(deal.retailPrice),
        diskonPersen: Math.round(Number(deal.savings)),
        linkBeli: `${SITE_URL}/redirect?dealID=${deal.dealID}`,
      }))
      .sort((a, b) => a.hargaUsd - b.hargaUsd),
  };
}

// Daftar toko jarang berubah, jadi cukup diambil sekali
let daftarTokoTersimpan = null;

// Endpoint /stores: toko yang masih aktif
export async function fetchStores(signal) {
  if (daftarTokoTersimpan) return daftarTokoTersimpan;

  const data = await ambilData("/stores", {}, signal);
  daftarTokoTersimpan = data
    .filter((toko) => Number(toko.isActive) === 1)
    .map((toko) => ({
      id: toko.storeID,
      nama: toko.storeName,
      ikon: SITE_URL + toko.images.icon,
    }));
  return daftarTokoTersimpan;
}
