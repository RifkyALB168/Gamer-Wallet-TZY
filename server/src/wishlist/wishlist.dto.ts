import { Transform } from "class-transformer";
import { IsString, Matches, MaxLength, ValidateIf } from "class-validator";

export class CreateWishlistItemDto {
  @IsString()
  @Matches(/^[1-9]\d{0,15}$/, { message: "gameId harus berupa ID game CheapShark." })
  gameId!: string;

  @ValidateIf((_, value) => value !== undefined)
  @Transform(({ value }) => typeof value === "string" ? value.trim() : value)
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class UpdateWishlistItemDto {
  @Transform(({ value }) => typeof value === "string" ? value.trim() : value)
  @IsString()
  @MaxLength(500)
  note!: string;
}
