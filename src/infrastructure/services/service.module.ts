import { Module } from '@nestjs/common'
import { HashService } from 'src/domain/interfaces/hash.service.interface'
import { BcryptHashService } from './bcrypt-hash.service'
import { EncrypterService } from 'src/domain/interfaces/encrypter.service.interface'
import { JwtEncrypterService } from './jwt-encrypter.service'
import {
  AuthorizationService,
  Permissions,
} from 'src/domain/interfaces/authorization.service.interface'
import { CaslAuthorizationService } from './casl-authorization.service'
import { Action } from 'src/domain/enum/actions.enum'
import { Role } from 'src/domain/enum/roles.enum'
import { EnvironmentService } from '../config/environment.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  providers: [
    {
      provide: HashService,
      useClass: BcryptHashService,
    },
    {
      provide: EncrypterService,
      useClass: JwtEncrypterService,
    },
    {
      provide: AuthorizationService,
      useClass: CaslAuthorizationService,
    },
    {
      provide: 'PermissionsInitializer',
      useFactory: (authService: AuthorizationService) => {
        const adminPermissions: Permissions[] = [
          { action: Action.CREATE, resource: 'user' },
          { action: Action.LIST, resource: 'user' },
          { action: Action.READ, resource: 'user' },
          { action: Action.DELETE, resource: 'user' },
          { action: Action.UPDATE, resource: 'user' },
        ]

        const managerPermisssions: Permissions[] = [
          { action: Action.LIST, resource: 'user' },
          { action: Action.READ, resource: 'user' },
          { action: Action.DELETE, resource: 'user' },
          { action: Action.UPDATE, resource: 'user' },
        ]

        const guestPermisssions: Permissions[] = [
          { action: Action.READ, resource: 'user' },
          { action: Action.DELETE, resource: 'user' },
        ]

        authService.definePermissionForRole(Role.ADMIN, adminPermissions)
        authService.definePermissionForRole(Role.MANAGER, managerPermisssions)
        authService.definePermissionForRole(Role.GUEST, guestPermisssions)
      },
      inject: [AuthorizationService],
    },
  ],
  exports: [HashService, EncrypterService, AuthorizationService],
})
export class ServiceModule {}
