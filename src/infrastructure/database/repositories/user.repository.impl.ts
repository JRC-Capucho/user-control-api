import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/domain/entities/user.entity'
import {
  fetchAllParams,
  UserRepository,
} from 'src/domain/interfaces/user.repository.interface'
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm'
import { UserOrmEntity } from '../entities/user.orm-entity'
import { UserOrmMapper } from '../mappers/user.mapper'

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<void> {
    await this.repository.save(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id })

    if (!user) {
      return null
    }

    return UserOrmMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email })

    if (!user) {
      return null
    }

    return UserOrmMapper.toDomain(user)
  }

  async delete(user: User): Promise<void> {
    await this.repository.delete(user)
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user)
  }

  async fetchAll(params: fetchAllParams): Promise<User[]> {
    const { currentId, search, page } = params

    let where: FindOptionsWhere<UserOrmEntity>[] = []

    if (search) {
      where = [
        { name: Like(`%${search}%`), id: Not(currentId) },
        { email: Like(`%${search}%`), id: Not(currentId) },
      ]
    }

    const users = await this.repository.find({
      where,
      skip: (page - 1) * page,
      take: 20,
    })

    return users.map((user) => UserOrmMapper.toDomain(user))
  }
}
