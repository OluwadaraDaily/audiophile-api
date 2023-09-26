import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber()
  @IsNotEmpty()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  cart_id: string;
}
