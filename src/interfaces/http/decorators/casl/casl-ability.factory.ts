import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities/user.entity'
import { Role } from 'src/domain/enum/roles.enum'
import { IJwtPayload } from 'src/infrastructure/auth/jwt.strategy'

export enum Action {
  MANAGE = 'MANAGE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  READ = 'READ',
  LIST = 'LIST',
  DELETE = 'DELETE',
}

type Subjects = InferSubjects<typeof User> | 'all'

export type AppAbility = PureAbility<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: IJwtPayload) {
    const { can, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>,
    )

    switch (user.role) {
      case Role.ADMIN:
        can(Action.MANAGE, 'all')
        break

      case Role.GUEST:
        can(Action.READ, User)
        can(Action.UPDATE, User)
        break

      case Role.MANAGER:
        can(Action.LIST, User)
        can(Action.UPDATE, User)
        break
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    })
  }
}
