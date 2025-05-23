import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthenticateDto } from '../dtos/authenticate.dto';
import { AuthenticateUserUseCase } from 'src/application/use-cases/authenticate-user.use-case';
import { WrongCredentialsError } from 'src/application/use-cases/errors/wrong-credentials-error';

@Controller('login')
export class AuthenticateController {
  constructor(private authenticateUseCase: AuthenticateUserUseCase) {}

  @Post()
  async handle(@Body() body: AuthenticateDto) {
    const { email, password } = body;

    const result = await this.authenticateUseCase.execute({ email, password });

    if (result.isLeft()) {
      const erro = result.value;

      switch (erro.constructor) {
        case WrongCredentialsError:
          throw new BadRequestException(erro.message);
        default:
          throw new BadRequestException(erro.message);
      }
    }

    return {
      accessToken: result.value.accessToken,
    };
  }
}
