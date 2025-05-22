import { Body, Controller, Post } from "@nestjs/common";
import type { CreateUserUseCase } from "src/application/use-cases/create-user.use-case";
import type { CreateUserDto } from "../dtos/create-user.dto";

@Controller("users")
export class CreateUserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	async handle(@Body() body: CreateUserDto) {

    const {email,name,password, role} = body

    const result = await this.createUserUseCase.execute({email,name,password, role})

    return result

  }
}
