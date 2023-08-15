import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingDto } from './create-billing.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBillingDto extends PartialType(CreateBillingDto) {
  @IsString()
  name?: string;

  @IsString()
  email?: string;

  @IsString()
  phone_number?: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
