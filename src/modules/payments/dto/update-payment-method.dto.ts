import { IsBoolean, IsDate, IsJSON, IsNotEmpty, IsString } from "class-validator";
import { PaymentStatus } from "src/entities/payment_method.entity";
import { CreatePaymentProviderDto } from "./create-payment-provider.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentProviderDto) {

  @IsString()
  @IsNotEmpty()
  payment_provider_id?: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsJSON()
  @IsNotEmpty()
  account_details?: JSON;

  @IsString()
  @IsNotEmpty()
  currency_code?: string;

  @IsString()
  @IsNotEmpty()
  external_id?: string;

  @IsJSON()
  @IsNotEmpty()
  meta_data?: JSON;

  @IsDate()
  @IsNotEmpty()
  expires_at?: Date;

  @IsDate()
  last_used_at?: Date | null;
}
