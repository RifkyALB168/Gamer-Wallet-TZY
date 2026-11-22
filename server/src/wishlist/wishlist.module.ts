import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { CheapSharkService } from "./cheapshark.service";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [WishlistController],
  providers: [WishlistService, CheapSharkService],
})
export class WishlistModule {}
