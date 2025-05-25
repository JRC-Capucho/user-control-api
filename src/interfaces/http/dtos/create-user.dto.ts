import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator'
import type { IUserProps } from 'src/domain/entities/user.entity'
import { Role } from 'src/domain/enum/roles.enum'

export class CreateUserDto
  implements Omit<IUserProps, 'createdAt' | 'updatedAt'>
{
  @ApiProperty({ example: 'Jhon Doe' })
  @IsString()
  name: string

  @ApiProperty({ example: 'johndoe@mail.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Password123!' })
  @IsStrongPassword({
    minLength: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string
  @ApiProperty({ enum: Role, example: Role.ADMIN })
  @IsEnum(Role)
  role: Role
}
