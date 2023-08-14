import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsString } from "class-validator";

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsString()
  user_id?: string;
}
