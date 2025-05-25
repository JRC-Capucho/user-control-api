import { permission } from 'node:process'
import { User } from '../entities/user.entity'
import { Action } from '../enum/actions.enum'

export interface Permissions {
  action: Action
  resource: string
}

export abstract class AuthorizationService {
  abstract can(role: string, action: string, resource: string): Promise<boolean>
  abstract definePermissionForRole(
    role: string,
    permission: Permissions[],
  ): void
}
