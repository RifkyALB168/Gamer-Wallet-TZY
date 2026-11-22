import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Prisma, type WishlistItem } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CheapSharkService } from "./cheapshark.service";

function serializeItem({ userId: _userId, priceUsd, ...item }: WishlistItem) {
  return { ...item, priceUsd: priceUsd.toNumber() };
}

@Injectable()
export class WishlistService {
  constructor(
    private readonly db: PrismaService,
    private readonly catalog: CheapSharkService,
  ) {}

  async create(userId: string, gameId: string, note = "") {
    const key = { userId, gameId };
    const existing = await this.db.wishlistItem.findUnique({
      where: { userId_gameId: key },
      select: { id: true },
    });
    if (existing) throw new ConflictException("Game sudah ada di wishlist.");

    const game = await this.catalog.getGameSnapshot(gameId);
    try {
      const item = await this.db.wishlistItem.create({ data: { ...key, ...game, note } });
      return serializeItem(item);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") throw new ConflictException("Game sudah ada di wishlist.");
        if (error.code === "P2003") throw new UnauthorizedException("Akun tidak ditemukan.");
      }
      throw error;
    }
  }

  async list(userId: string) {
    const items = await this.db.wishlistItem.findMany({
      where: { userId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });
    return items.map(serializeItem);
  }

  async find(userId: string, id: string) {
    const item = await this.db.wishlistItem.findUnique({ where: { id, userId } });
    if (!item) throw new NotFoundException("Item wishlist tidak ditemukan.");
    return serializeItem(item);
  }

  async update(userId: string, id: string, note: string) {
    const item = await this.db.wishlistItem.update({
      where: { id, userId },
      data: { note },
    }).catch(this.handleMissing);
    return serializeItem(item);
  }

  async remove(userId: string, id: string) {
    await this.db.wishlistItem.delete({ where: { id, userId } }).catch(this.handleMissing);
  }

  private handleMissing(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new NotFoundException("Item wishlist tidak ditemukan.");
    }
    throw error;
  }
}
