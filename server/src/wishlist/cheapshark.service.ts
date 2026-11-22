import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";

type GameDetail = {
  info?: { title?: string; steamAppID?: string; thumb?: string };
  deals?: { price?: string }[];
};

function coverFrom(info: NonNullable<GameDetail["info"]>) {
  if (info.steamAppID && /^\d+$/.test(info.steamAppID)) {
    return "https://cdn.cloudflare.steamstatic.com/steam/apps/" + info.steamAppID + "/header.jpg";
  }

  if (typeof info.thumb === "string" && URL.canParse(info.thumb)) {
    const url = new URL(info.thumb);
    if (url.protocol === "https:" && !url.username && !url.password) return url.href;
  }
  return null;
}

@Injectable()
export class CheapSharkService {
  async getGameSnapshot(gameId: string) {
    const url = new URL("https://www.cheapshark.com/api/1.0/games");
    url.searchParams.set("id", gameId);
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: { "User-Agent": "GamerWalletTZY/1.0" },
    }).catch(() => {
      throw new BadGatewayException("CheapShark tidak dapat dihubungi.");
    });

    if (response.status === 404) throw new NotFoundException("Game tidak ditemukan.");
    if (!response.ok) throw new BadGatewayException("CheapShark gagal memuat detail game.");

    const game = await response.json().catch(() => {
      throw new BadGatewayException("Respons CheapShark tidak dapat dibaca.");
    }) as GameDetail | [] | null;

    if (!game || (Array.isArray(game) && game.length === 0)) {
      throw new NotFoundException("Game tidak ditemukan.");
    }
    if (Array.isArray(game) || typeof game.info?.title !== "string" || !Array.isArray(game.deals)) {
      throw new BadGatewayException("Respons detail game tidak lengkap.");
    }

    const title = game.info.title.trim();
    const prices = game.deals.flatMap((deal) => {
      const price = deal?.price;
      return typeof price === "string" && /^\d{1,8}(\.\d{1,2})?$/.test(price)
        ? [Number(price)]
        : [];
    });

    if (!title || title.length > 255) throw new BadGatewayException("Judul game tidak valid.");
    if (game.deals.length === 0) throw new NotFoundException("Game belum memiliki penawaran.");
    if (prices.length === 0) throw new BadGatewayException("Harga game tidak tersedia.");

    return { title, coverUrl: coverFrom(game.info), priceUsd: Math.min(...prices) };
  }
}
