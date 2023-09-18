import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentProviderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  @IsNotEmpty()
  is_enabled: boolean;
}
