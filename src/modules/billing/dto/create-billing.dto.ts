import { IsNotEmpty, IsString } from "class-validator";

export class CreateBillingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
