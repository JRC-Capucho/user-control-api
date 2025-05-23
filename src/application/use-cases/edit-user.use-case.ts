import { Injectable, NotFoundException } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { User } from 'src/domain/entities/user.entity';
import { Role } from 'src/domain/enum/roles.enum';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';
import { UserNotFoundError } from './errors/user-not-found-error';

interface EditUserUseCaseRequest {
  id: string;
  name: string;
  email: string;
  role: Role;
}

type EditUserUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class EditUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    id,
    email,
    name,
    role,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new UserNotFoundError());
    }

    user.email = email;
    user.name = name;
    user.role = role;

    await this.userRepository.save(user);

    return right({ user });
  }
}
