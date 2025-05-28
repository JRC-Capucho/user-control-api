import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common'
import { EditUserDto } from '../dtos/edit-user.dto'
import { EditUserUseCase } from 'src/application/use-cases/edit-user.use-case'
import { UserNotFoundError } from 'src/application/use-cases/errors/user-not-found-error'
import { UserPresenter } from '../presenters/user.presenter'
import { CurrentUser } from 'src/infrastructure/auth/current-user.decorator'
import { IJwtPayload } from 'src/infrastructure/auth/jwt.strategy'
import { PoliciesGuard } from '../decorators/casl/guard/policies.guard'
import { CheckPolicies } from '../decorators/casl/guard/check-policies'
import { Action, AppAbility } from '../decorators/casl/casl-ability.factory'
import { User } from 'src/domain/entities/user.entity'
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'

@UseGuards(PoliciesGuard)
@ApiBearerAuth()
@Controller('users')
export class EditCurrentUserController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  @ApiOkResponse({ type: User })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.UPDATE, User))
  @Put('/me')
  async handle(@Body() body: EditUserDto, @CurrentUser() { sub }: IJwtPayload) {
    const { email, name, role } = body

    const result = await this.editUserUseCase.execute({
      email,
      name,
      role,
      id: sub,
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
