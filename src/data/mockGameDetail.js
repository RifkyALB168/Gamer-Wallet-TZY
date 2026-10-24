// Data contoh khusus halaman Detail Game. Diganti data CheapShark /games?id= setelah services/cheapshark.js siap.
export const ID_GAME_CONTOH = "cyberpunk-2077-ultimate";

const SATU_HARI = 24 * 60 * 60 * 1000;

const steam = (appId, file) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/${file}`;

const detailContoh = {
  id: ID_GAME_CONTOH,
  judul: "Cyberpunk 2077",
  edisi: "Ultimate Edition",
  cover: steam(1091500, "library_600x900.jpg"),
  thumb: steam(1091500, "header.jpg"),
  genre: ["Action", "RPG", "Sci-Fi", "Open World"],
  kategori: "RPG & Open World",
  developer: "CD PROJEKT RED",
  publisher: "CD PROJEKT S.A.",
  tanggalRilis: "2023-12-05",
  platform: "PC • Digital DRM",
  metacritic: 86,
  ratingSteamPersen: 91,
  // Selalu 4 hari dari sekarang supaya status diskon contoh tetap aktif.
  diskonBerakhir: new Date(Date.now() + 4 * SATU_HARI).toISOString(),
  hargaTerendah: { hargaUsd: 17.99, tanggal: "2025-12-18", toko: "GOG.com" },
  deskripsi:
    "Paket lengkap Cyberpunk 2077: game dasar beserta ekspansi Phantom Liberty dan seluruh pembaruan gratis. Jelajahi Night City sebagai V, tentara bayaran yang mengejar implan unik kunci keabadian, lalu ikuti misi mata-mata di distrik Dogtown.",
  sorotan: [
    {
      ikon: "★",
      judul: "Phantom Liberty",
      teks: "Ekspansi cerita spionase dengan distrik baru, Dogtown.",
    },
    {
      ikon: "⟳",
      judul: "Update 2.0 Overhaul",
      teks: "Skill tree baru, polisi yang lebih pintar, dan pertarungan kendaraan.",
    },
    {
      ikon: "◆",
      judul: "RTX & Path Tracing",
      teks: "Grafis generasi baru dengan dukungan DLSS 3 Frame Gen.",
    },
  ],
  deals: [
    {
      tokoId: "1",
      toko: "Steam Store",
      catatan: "Steam Key Langsung • Cloud Sync & Achievements",
      hargaUsd: 24.99,
      hargaAsliUsd: 49.99,
      url: "https://store.steampowered.com/app/1091500/",
    },
    {
      tokoId: "7",
      toko: "GOG.com",
      catatan: "DRM-Free • Tanpa Launcher",
      hargaUsd: 19.99,
      hargaAsliUsd: 49.99,
      url: "https://www.gog.com/en/game/cyberpunk_2077_ultimate_edition",
    },
    {
      tokoId: "15",
      toko: "Fanatical",
      label: "Verified",
      catatan: "Steam Key Resmi • Aktivasi Region Global/ID",
      hargaUsd: 27.49,
      hargaAsliUsd: 49.99,
      url: "https://www.fanatical.com/",
    },
    {
      tokoId: "25",
      toko: "Epic Games Store",
      catatan: "Epic Launcher • Epic Rewards 5% Cashback",
      hargaUsd: 24.99,
      hargaAsliUsd: 49.99,
      url: "https://store.epicgames.com/",
    },
    {
      tokoId: "3",
      toko: "GreenManGaming",
      catatan: "Steam Key • Kode instan dikirim via Email",
      hargaUsd: 29.49,
      hargaAsliUsd: 49.99,
      url: "https://www.greenmangaming.com/",
    },
  ],
  riwayatHarga: [
    { bulan: "Des 2025", hargaUsd: 17.99 },
    { bulan: "Jan 2026", hargaUsd: 39.99 },
    { bulan: "Feb 2026", hargaUsd: 34.99 },
    { bulan: "Mar 2026", hargaUsd: 29.99 },
    { bulan: "Apr 2026", hargaUsd: 39.99 },
    { bulan: "Mei 2026", hargaUsd: 34.99 },
    { bulan: "Jun 2026", hargaUsd: 24.99 },
    { bulan: "Jul 2026", hargaUsd: 29.99 },
    { bulan: "Agu 2026", hargaUsd: 34.99 },
    { bulan: "Sep 2026", hargaUsd: 27.49 },
    { bulan: "Okt 2026", hargaUsd: 19.99 },
  ],
};

const daftarContoh = { [ID_GAME_CONTOH]: detailContoh };

/**
 * Ambil detail game contoh dengan jeda singkat, meniru pemanggilan API.
 *
 * @param {string} id
 * @returns {Promise<typeof detailContoh>}
 */
export function ambilDetailGame(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const game = daftarContoh[id];
      if (game) resolve(game);
      else reject(new Error("Game tidak ditemukan."));
    }, 600);
  });
}
