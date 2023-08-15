import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingInfoDto } from './create-shipping-info.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShippingInfoDto extends PartialType(CreateShippingInfoDto) {
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsString()
  @IsNotEmpty()
  zip_code?: string

  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsString()
  @IsNotEmpty()
  country?: string;

  @IsString()
  @IsNotEmpty()
  user_id?: string;
}
