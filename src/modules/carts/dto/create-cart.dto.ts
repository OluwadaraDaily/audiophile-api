import { IsString } from "class-validator";

export class CreateCartDto {
  @IsString()
  user_id: string;
}
