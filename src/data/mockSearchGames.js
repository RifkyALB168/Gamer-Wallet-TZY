// Data contoh khusus tampilan Cari Game. Diganti data CheapShark di bagian 2.
export const KURS_CONTOH = 16250;

export const tokoContoh = [
  { id: "1", nama: "Steam" },
  { id: "25", nama: "Epic Games Store" },
  { id: "7", nama: "GOG" },
  { id: "15", nama: "Fanatical" },
  { id: "3", nama: "GreenManGaming" },
  { id: "11", nama: "Humble Store" },
];

const steam = (appId) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

export const gameContoh = [
  { id: "g1", judul: "Elden Ring: Shadow of the Erdtree", cover: steam(1245620), hargaUsd: 30.7, hargaAsliUsd: 40.9, diskonPersen: 25, ratingPersen: 94, namaToko: "Steam Store" },
  { id: "g2", judul: "Red Dead Redemption 2", cover: steam(1174180), hargaUsd: 13, hargaAsliUsd: 39.4, diskonPersen: 67, ratingPersen: 97, namaToko: "Epic Games" },
  { id: "g3", judul: "Baldur's Gate 3", cover: steam(1086940), hargaUsd: 33.2, hargaAsliUsd: 41.5, diskonPersen: 20, ratingPersen: 96, namaToko: "GOG.com" },
  { id: "g4", judul: "Monster Hunter Wilds", cover: steam(2246340), hargaUsd: 51, hargaAsliUsd: 51, diskonPersen: 0, ratingPersen: null, namaToko: "Steam Store" },
  { id: "g5", judul: "The Witcher 3: Wild Hunt Complete", cover: steam(292030), hargaUsd: 5.5, hargaAsliUsd: 27.6, diskonPersen: 80, ratingPersen: 98, namaToko: "GOG.com" },
  { id: "g6", judul: "Hollow Knight", cover: steam(367520), hargaUsd: 3.5, hargaAsliUsd: 7.1, diskonPersen: 50, ratingPersen: 97, namaToko: "Fanatical" },
];
