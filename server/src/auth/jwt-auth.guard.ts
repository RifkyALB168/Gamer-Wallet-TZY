import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isUUID } from "class-validator";
import { PrismaService } from "../prisma/prisma.service";

export type AuthenticatedRequest = {
  headers: { authorization?: string };
  user: { id: string };
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService, private readonly db: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.headers.authorization?.match(/^Bearer (\S+)$/i)?.[1];
    if (!token) throw new UnauthorizedException("Token akses wajib dikirim.");

    const claims = await this.jwt.verifyAsync<{ sub?: string; exp?: number }>(token).catch(() => {
      throw new UnauthorizedException("Token akses tidak valid atau kedaluwarsa.");
    });

    if (typeof claims.sub !== "string" || !isUUID(claims.sub, "4") || !Number.isSafeInteger(claims.exp)) {
      throw new UnauthorizedException("Token akses tidak valid.");
    }

    const account = await this.db.user.findUnique({
      where: { id: claims.sub },
      select: { id: true },
    });
    if (!account) throw new UnauthorizedException("Akun tidak ditemukan.");

    request.user = account;
    return true;
  }
}
