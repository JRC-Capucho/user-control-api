import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { UserNotFoundError } from 'src/application/use-cases/errors/user-not-found-error'
import { GetUserUseCase } from 'src/application/use-cases/get-user.use-case'
import { UserPresenter } from '../presenters/user.presenter'
import { PoliciesGuard } from '../decorators/casl/guard/policies.guard'
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'
import { User } from 'src/domain/entities/user.entity'
import { CheckPolicies } from '../decorators/casl/guard/check-policies'
import { Action, AppAbility } from '../decorators/casl/casl-ability.factory'

@ApiBearerAuth()
@UseGuards(PoliciesGuard)
@Controller('users')
export class GetUserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @CheckPolicies((ability: AppAbility) => ability.can(Action.DELETE, User))
  @ApiOkResponse({ type: User })
  @Get(':id')
  async handle(@Param('id') id: string) {
    const result = await this.getUserUseCase.execute({ id })

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
