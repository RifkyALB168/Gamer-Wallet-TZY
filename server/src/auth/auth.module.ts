import { Module } from "@nestjs/common";
import { JwtModule, type JwtModuleOptions } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtAuthGuard } from "./jwt-auth.guard";

const issuer = "gamer-wallet-tzy-api";
const audience = "gamer-wallet-tzy-web";
const accessTokenLifetime = "15m";

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (): JwtModuleOptions => {
        const secret = process.env.JWT_SECRET;
        if (!secret || Buffer.byteLength(secret) < 32) {
          throw new Error("JWT_SECRET wajib memiliki minimal 32 byte.");
        }
        return {
          secret,
          signOptions: { algorithm: "HS256", issuer, audience, expiresIn: accessTokenLifetime },
          verifyOptions: { algorithms: ["HS256"], issuer, audience, maxAge: accessTokenLifetime },
        };
      },
    }),
  ],
  providers: [JwtAuthGuard],
  exports: [JwtModule, JwtAuthGuard, PrismaModule],
})
export class AuthModule {}
