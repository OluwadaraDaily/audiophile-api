import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreatePaymentProviderDto } from './create-payment-provider.dto';
export class UpdatePaymentProviderDto extends PartialType(CreatePaymentProviderDto) {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsBoolean()
  @IsNotEmpty()
  is_enabled?: boolean;
}