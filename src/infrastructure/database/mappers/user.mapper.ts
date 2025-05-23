import { User } from 'src/domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserOrmMapper {
  static toDomain(raw: UserOrmEntity): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toOrm(user: User): UserOrmEntity {
    return {
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      name: user.name,
      password: user.password,
      role: user.role,
      updatedAt: user.updatedAt,
    };
  }
}
