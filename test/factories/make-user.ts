import { IUserProps, User } from 'src/domain/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Role } from 'src/domain/enum/roles.enum';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserOrmEntity } from 'src/infrastructure/database/entities/user.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmMapper } from 'src/infrastructure/database/mappers/user.mapper';

export function makeUser(override: Partial<IUserProps> = {}, id?: string) {
  const user = User.create(
    {
      createdAt: new Date(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      role: Role.ADMIN,
      ...override,
    },
    id,
  );

  return user;
}

@Injectable()
export class UserFactory {
  constructor(
    @InjectRepository(UserOrmEntity)
    private repository: Repository<UserOrmEntity>,
  ) {}

  async makeOrmUser(data: Partial<IUserProps> = {}): Promise<User> {
    const user = makeUser(data);

    await this.repository.save(user);

    return UserOrmMapper.toDomain(user);
  }
}
