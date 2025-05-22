import {  Controller, Delete, Param } from "@nestjs/common";
import type { DeleteUserUseCase } from "src/application/use-cases/delete-user.use-case";

@Controller("users")
export class DeleteUserController {
	constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

	@Delete(':id')
	async handle(@Param('id') id:string ) {

    const result = await this.deleteUserUseCase.execute({id})

    return result

  }
}
