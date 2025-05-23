import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user.use-case';
import { UserNotFoundError } from 'src/application/use-cases/errors/user-not-found-error';

@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    const result = await this.deleteUserUseCase.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
