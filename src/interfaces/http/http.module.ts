import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { GetUserController } from './controllers/get-user.controller'
import { CreateUserController } from './controllers/create-user.controller'
import { EditUserController } from './controllers/edit-user.controller'
import { DeleteUserController } from './controllers/delete-user.controller'
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case'
import { EditUserUseCase } from 'src/application/use-cases/edit-user.use-case'
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user.use-case'
import { DatabaseModule } from 'src/infrastructure/database/database.module'
import { ServiceModule } from 'src/infrastructure/services/service.module'
import { GetUserUseCase } from 'src/application/use-cases/get-user.use-case'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUserUseCase } from 'src/application/use-cases/authenticate-user.use-case'
import { FetchUserUseCase } from 'src/application/use-cases/fetch-user.use-case'
import { CaslAuthorizationMiddleware } from './middlewares/Authorization.middleware'
import { RegisterUserController } from './controllers/register-user.controller'
import { FetchUserController } from './controllers/fetch-user.controller'

@Module({
  imports: [DatabaseModule, ServiceModule],
  controllers: [
    GetUserController,
    CreateUserController,
    EditUserController,
    DeleteUserController,
    AuthenticateController,
    RegisterUserController,
    FetchUserController,
  ],
  providers: [
    GetUserUseCase,
    CreateUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
    AuthenticateUserUseCase,
    FetchUserUseCase,
  ],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CaslAuthorizationMiddleware)
      .forRoutes(
        GetUserController,
        CreateUserController,
        EditUserController,
        DeleteUserController,
        FetchUserController,
      )
  }
}
