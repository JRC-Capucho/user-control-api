import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { EditUserDto } from '../dtos/edit-user.dto'
import { EditUserUseCase } from 'src/application/use-cases/edit-user.use-case'
import { UserNotFoundError } from 'src/application/use-cases/errors/user-not-found-error'
import { UserPresenter } from '../presenters/user.presenter'

@Controller('users')
export class EditUserController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  @Put(':id')
  async handle(@Body() body: EditUserDto, @Param('id') id: string) {
    const { email, name, role } = body

    const result = await this.editUserUseCase.execute({
      email,
      name,
      role,
      id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { user: UserPresenter.toHTTP(result.value.user) }
  }
}
