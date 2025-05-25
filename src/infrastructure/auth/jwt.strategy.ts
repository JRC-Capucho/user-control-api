import { PassportStrategy } from '@nestjs/passport'
import { EnvironmentService } from '../config/environment.service'
import { IsEnum, IsString, IsUUID, validateOrReject } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { Role } from 'src/domain/enum/roles.enum'

interface IPayload {
  sub: string
  role: Role
}

export class IJwtPayload {
  @IsString()
  @IsUUID()
  sub: string

  @IsEnum(Role)
  role: Role
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.get('JWT_SECRET'),
    })
  }

  async validate(payload: IPayload) {
    const jwtPayload = plainToClass(IJwtPayload, payload)
    await validateOrReject(jwtPayload)
    return jwtPayload
  }
}
