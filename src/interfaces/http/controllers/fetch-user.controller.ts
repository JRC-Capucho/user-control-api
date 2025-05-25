import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchUserUseCase } from 'src/application/use-cases/fetch-user.use-case'
import { FetchUserDto } from '../dtos/fetch-user.dto'
import { CurrentUser } from 'src/infrastructure/auth/current-user.decorator'
import { IJwtPayload } from 'src/infrastructure/auth/jwt.strategy'
import { ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@Controller('users')
export class FetchUserController {
  constructor(private fetchUserUseCase: FetchUserUseCase) {}

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
