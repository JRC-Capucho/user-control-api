import { Injectable, NotFoundException } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
import { User } from 'src/domain/entities/user.entity'
import { UserRepository } from 'src/domain/interfaces/user.repository.interface'
import { UserNotFoundError } from './errors/user-not-found-error'

interface DeleteUserUseCaseRequest {
  id: string
}

type DeleteUserUseCaseResponse = Either<UserNotFoundError, null>

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new UserNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}
