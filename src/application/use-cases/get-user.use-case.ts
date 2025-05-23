import { Injectable, NotFoundException } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';
import { UserNotFoundError } from './errors/user-not-found-error';

interface GetUserUseCaseRequest {
  id: string;
}

type GetUserUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new UserNotFoundError());
    }

    return right({ user });
  }
}
