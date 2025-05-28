import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { FetchUserUseCase } from 'src/application/use-cases/fetch-user.use-case'
import { FetchUserDto } from '../dtos/fetch-user.dto'
import { CurrentUser } from 'src/infrastructure/auth/current-user.decorator'
import { IJwtPayload } from 'src/infrastructure/auth/jwt.strategy'
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'
import { PoliciesGuard } from '../decorators/casl/guard/policies.guard'
import { User } from 'src/domain/entities/user.entity'
import { CheckPolicies } from '../decorators/casl/guard/check-policies'
import { Action, AppAbility } from '../decorators/casl/casl-ability.factory'

@UseGuards(PoliciesGuard)
@ApiBearerAuth()
@Controller('users')
export class FetchUserController {
  constructor(private fetchUserUseCase: FetchUserUseCase) {}

  @ApiOkResponse({ type: User, isArray: true })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.LIST, User))
  @Get()
  async handle(
    @CurrentUser() { sub: currentId }: IJwtPayload,
    @Query() params: FetchUserDto,
  ) {
    const { page, search } = params

    const result = await this.fetchUserUseCase.execute({
      currentId,
      page,
      search,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      users: result.value.users,
    }
  }
}
