import { Module } from '@nestjs/common';
import { GetUserController } from './controllers/get-user.controller';
import { CreateUserController } from './controllers/create-user.controller';
import { EditUserController } from './controllers/edit-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { EditUserUseCase } from 'src/application/use-cases/edit-user.use-case';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user.use-case';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { ServiceModule } from 'src/infrastructure/services/service.module';
import { GetUserUseCase } from 'src/application/use-cases/get-user.use-case';

@Module({
  imports: [DatabaseModule, ServiceModule],
  controllers: [
    GetUserController,
    CreateUserController,
    EditUserController,
    DeleteUserController,
  ],
  providers: [
    GetUserUseCase,
    CreateUserUseCase,
    EditUserUseCase,
    DeleteUserUseCase,
  ],
})
export class HttpModule {}
