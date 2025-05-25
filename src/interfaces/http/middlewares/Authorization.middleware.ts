import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { Reflector } from '@nestjs/core'
import { AuthorizationService } from '../../../domain/interfaces/authorization.service.interface'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from 'src/infrastructure/auth/jwt.strategy'
import {
  PermissionMetadata,
  PERMISSIONS_KEY,
} from '../decorators/permissions.decorator'

@Injectable()
export class CaslAuthorizationMiddleware implements NestMiddleware {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header')
    }

    const token = authHeader.split(' ')[1]

    try {
      const payload: IJwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      const route = req.route?.stack?.find((layer) => layer.route)?.route
      if (!route) {
        throw new ForbiddenException('Unable to determine route')
      }

      const permissions = this.reflector.get<PermissionMetadata>(
        PERMISSIONS_KEY,
        route.handler,
      )

      if (!permissions?.action || !permissions?.resource) {
        throw new ForbiddenException(
          'Action or resource not defined for this route',
        )
      }

      const isAuthorized = await this.authorizationService.can(
        payload.role,
        permissions.action,
        route.resource,
      )
      if (!isAuthorized) {
        throw new ForbiddenException(
          `User with role ${payload.sub} is not authorized to ${permissions.action} ${route.resource}`,
        )
      }
    } catch (err) {
      console.error(err)
    }

    next()
  }
}
