import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class Environment {
  @IsString()
  DATABASE_HOST: string;
  @IsNumber()
  DATABASE_PORT: number;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_SCHEMA: string;
  @IsOptional()
  @Transform(({ value }) => value ?? 'Prod')
  @IsString()
  NODE_ENV: string;
  @IsOptional()
  @Transform(({ value }) => value ?? 3333)
  @IsNumber()
  PORT: number;
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRES_IN: string;
}
