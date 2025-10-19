import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class Environment {
  @IsString()
  DATABASE_HOST: string
  @IsNumber()
  DATABASE_PORT: number
  @IsString()
  DATABASE_USERNAME: string
  @IsString()
  DATABASE_PASSWORD: string
  @IsString()
  DATABASE_NAME: string
  @IsString()
  DATABASE_SCHEMA: string
  @IsOptional()
  @Transform(({ value }) => value ?? 'Prod')
  @IsString()
  NODE_ENV: string
  @IsOptional()
  @IsNumber()
  PORT: number = 3333
  @IsString()
  JWT_SECRET: string
  @IsNumber()
  JWT_EXPIRES_IN: number
}
