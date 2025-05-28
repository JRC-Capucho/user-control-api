import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case'
import { CreateUserDto } from '../dtos/create-user.dto'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common'
import { EmailAlreadyInUseError } from 'src/application/use-cases/errors/email-already-in-use-error'
import { UserPresenter } from '../presenters/user.presenter'
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger'
import { User } from 'src/domain/entities/user.entity'
import { PoliciesGuard } from '../decorators/casl/guard/policies.guard'
import { CheckPolicies } from '../decorators/casl/guard/check-policies'
import { Action, AppAbility } from '../decorators/casl/casl-ability.factory'

@UseGuards(PoliciesGuard)
@ApiBearerAuth()
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @CheckPolicies((ability: AppAbility) => ability.can(Action.CREATE, User))
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
