import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  cart_id: string;
}
