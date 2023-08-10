import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SendMailDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  recipient: string

  @IsString()
  @IsNotEmpty()
  subject: string

  @IsString()
  @IsNotEmpty()
  text: string
}