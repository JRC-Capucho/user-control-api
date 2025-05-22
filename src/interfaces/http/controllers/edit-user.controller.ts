import { Body, Controller, Param, Put } from "@nestjs/common";
import type { EditUserDto } from "../dtos/edit-user.dto";
import type { EditUserUseCase } from "src/application/use-cases/edit-user.use-case";

@Controller("users")
export class EditUserController {
	constructor(private readonly editUserUseCase: EditUserUseCase) {}

	@Put(':id')
	async handle(
    @Body() body: EditUserDto,
    @Param('id') id:string) {

    const {email,name, role} = body

    const result = await this.editUserUseCase.execute({email,name,role,id})

    return result

  }
}
