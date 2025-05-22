import { IsString, IsEmail, IsStrongPassword, IsEnum } from "class-validator";
import type { IUserProps } from "src/domain/entities/user.entity";
import { Role } from "src/domain/enum/roles.enum";

export class EditUserDto
	implements Omit<IUserProps, "password" | "createdAt" | "updatedAt">
{
	@IsString()
	name: string;
	@IsEmail()
	email: string;
	@IsEnum(Role)
	role: Role;
}
