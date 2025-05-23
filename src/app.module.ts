import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { HttpModule } from './interfaces/http/http.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { validate } from './infrastructure/config/environment.validation';
import { EnvironmentService } from './infrastructure/config/environment.service';
import { EnvironmentModule } from './infrastructure/config/environment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
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
    HttpModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
