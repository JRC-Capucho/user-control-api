import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from './repositories/user.repository.impl';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './entities/user.orm-entity';
import { EnvironmentModule } from '../config/environment.module';
import { EnvironmentService } from '../config/environment.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (env: EnvironmentService) => ({
        type: 'postgres',
        host: env.get('DATABASE_HOST'),
        port: env.get('DATABASE_PORT'),
        schema: env.get('DATABASE_SCHEMA'),
        username: env.get('DATABASE_USERNAME'),
        password: env.get('DATABASE_PASSWORD'),
        database: env.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: env.get('NODE_ENV') === 'Prod' ? false : true,
      }),
    }),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
