import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case'
import { CreateUserDto } from '../dtos/create-user.dto'
import { EmailAlreadyInUseError } from 'src/application/use-cases/errors/email-already-in-use-error'
import { UserPresenter } from '../presenters/user.presenter'
import { Public } from 'src/infrastructure/auth/public'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { User } from 'src/domain/entities/user.entity'

@Public()
@Controller('register')
export class RegisterUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @ApiCreatedResponse({ type: User })
  @Post()
  async handle(@Body() body: CreateUserDto) {
    const { email, name, password, role } = body

    const result = await this.createUserUseCase.execute({
      email,
      name,
      password,
      role,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EmailAlreadyInUseError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      user: UserPresenter.toHTTP(result.value.user),
    }
  }
}
