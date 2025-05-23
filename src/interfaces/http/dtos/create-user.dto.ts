import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import type { IUserProps } from 'src/domain/entities/user.entity';
import { Role } from 'src/domain/enum/roles.enum';

export class CreateUserDto
  implements Omit<IUserProps, 'createdAt' | 'updatedAt'>
{
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
  @IsEnum(Role)
  role: Role;
}
