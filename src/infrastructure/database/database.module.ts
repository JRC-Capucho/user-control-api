import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './entities/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
