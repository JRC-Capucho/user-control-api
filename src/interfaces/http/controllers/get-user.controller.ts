import { Controller, Get, Param, } from "@nestjs/common";
import type { GetUserUseCase } from "src/application/use-cases/get-user.use-case";

@Controller("users")
export class GetUserController {
	constructor(private readonly getUserUseCase: GetUserUseCase) {}

	@Get(':id')
	async handle(@Param('id') id:string ) {

    const result = await this.getUserUseCase.execute({id})

    return result

  }
}
