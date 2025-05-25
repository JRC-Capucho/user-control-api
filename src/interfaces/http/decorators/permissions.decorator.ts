import { SetMetadata } from '@nestjs/common'
import { Action } from 'src/domain/enum/actions.enum'

export interface PermissionMetadata {
  action: Action
  resource: string
}

export const PERMISSIONS_KEY = 'permissions'
export const Permissions = (action: Action, resource: string) =>
  SetMetadata(PERMISSIONS_KEY, { action, resource })
