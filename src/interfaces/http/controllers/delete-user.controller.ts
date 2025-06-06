import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiNoContentResponse } from '@nestjs/swagger'
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user.use-case'
import { UserNotFoundError } from 'src/application/use-cases/errors/user-not-found-error'
import { PoliciesGuard } from '../decorators/casl/guard/policies.guard'
import { CheckPolicies } from '../decorators/casl/guard/check-policies'
import { Action, AppAbility } from '../decorators/casl/casl-ability.factory'
import { User } from 'src/domain/entities/user.entity'

@UseGuards(PoliciesGuard)
@ApiBearerAuth()
@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @CheckPolicies((ability: AppAbility) => ability.can(Action.DELETE, User))
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async handle(@Param('id') id: string) {
    const result = await this.deleteUserUseCase.execute({ id })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
