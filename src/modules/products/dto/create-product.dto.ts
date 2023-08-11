import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  unit_price: number;

  @IsNumber()
  quantity: number

  @IsString()
  @IsNotEmpty()
  category_id: string;
}
