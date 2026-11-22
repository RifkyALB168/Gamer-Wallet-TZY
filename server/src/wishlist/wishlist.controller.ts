import {
  Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseUUIDPipe,
  Patch, Post, Req, UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard, type AuthenticatedRequest } from "../auth/jwt-auth.guard";
import { CreateWishlistItemDto, UpdateWishlistItemDto } from "./wishlist.dto";
import { WishlistService } from "./wishlist.service";

@Controller("wishlist-items")
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlist: WishlistService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() body: CreateWishlistItemDto) {
    return this.wishlist.create(request.user.id, body.gameId, body.note);
  }

  @Get()
  @Header("Cache-Control", "private, no-store")
  list(@Req() request: AuthenticatedRequest) {
    return this.wishlist.list(request.user.id);
  }

  @Get(":id")
  @Header("Cache-Control", "private, no-store")
  find(@Req() request: AuthenticatedRequest, @Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.wishlist.find(request.user.id, id);
  }

  @Patch(":id")
  update(
    @Req() request: AuthenticatedRequest,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() body: UpdateWishlistItemDto,
  ) {
    return this.wishlist.update(request.user.id, id, body.note);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Req() request: AuthenticatedRequest, @Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.wishlist.remove(request.user.id, id);
  }
}
