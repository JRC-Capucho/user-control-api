import { Injectable } from '@nestjs/common'
import { Either, right } from 'src/core/either'
import { User } from 'src/domain/entities/user.entity'
import { UserRepository } from 'src/domain/interfaces/user.repository.interface'

interface FetchUserUseCaseRequest {
  search?: string
  page: number
  currentId: string
}

type FetchUserUseCaseResponse = Either<
  null,
  {
    users: User[] | null
  }
>

@Injectable()
export class FetchUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    page,
    search,
    currentId,
  }: FetchUserUseCaseRequest): Promise<FetchUserUseCaseResponse> {
    const users = await this.userRepository.fetchAll({
      currentId,
      page,
      search,
    })

    return right({ users })
  }
}
