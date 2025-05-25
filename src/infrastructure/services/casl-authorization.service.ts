import { PureAbility, AbilityBuilder } from '@casl/ability'
import { ForbiddenException } from '@nestjs/common'
import {
  AuthorizationService,
  Permissions,
} from 'src/domain/interfaces/authorization.service.interface'

export class CaslAuthorizationService implements AuthorizationService {
  private abilites: Map<string, PureAbility> = new Map()

  definePermissionForRole(role: string, permission: Permissions[]): void {
    const { can, build } = new AbilityBuilder<PureAbility>(PureAbility)

    permission.forEach(({ action, resource }) => {
      can(action, resource)
    })

    this.abilites.set(role, build())
  }

  async can(role: string, action: string, resource: string): Promise<boolean> {
    const ability = this.abilites.get(role)

    if (!ability) {
      throw new ForbiddenException()
    }

    return ability.can(action, resource)
  }
}
