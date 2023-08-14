import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCartProductDto {

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}