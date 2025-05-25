import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class FetchUserDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10)
    return isNaN(parsed) ? 1 : parsed
  })
  @IsNumber()
  page: number = 1

  @ApiPropertyOptional({ example: 'jhon' })
  @IsOptional()
  @IsString()
  search: string = ''
}
