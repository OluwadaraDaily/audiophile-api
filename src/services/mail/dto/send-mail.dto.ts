import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class SendMailDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  template_name: string;

  @IsObject()
  data: object;
}