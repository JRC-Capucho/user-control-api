import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class AuthenticateDto {
  @ApiProperty({ example: 'johndoe@mail.com' })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  password: string
}
