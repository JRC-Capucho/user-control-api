import { IsEmail, IsString } from 'class-validator';

export class AuthenticateDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
