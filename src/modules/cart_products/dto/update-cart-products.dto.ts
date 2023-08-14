import { IsNotEmpty, IsNumber } from "class-validator";
import { IsNull } from "typeorm";

export class UpdateCartProductsDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}