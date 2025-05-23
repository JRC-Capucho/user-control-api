import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserNotFoundError } from 'src/application/use-cases/errors/user-not-found-error';
import { GetUserUseCase } from 'src/application/use-cases/get-user.use-case';
import { UserPresenter } from '../presenters/user.presenter';

@Controller('users')
export class GetUserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const result = await this.getUserUseCase.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return { user: UserPresenter.toHTTP(result.value.user) };
  }
}
