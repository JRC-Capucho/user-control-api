import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { UserOrmMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      return null;
    }

    return UserOrmMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      return null;
    }

    return UserOrmMapper.toDomain(user);
  }

  async delete(user: User): Promise<void> {
    await this.repository.delete(user);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}
