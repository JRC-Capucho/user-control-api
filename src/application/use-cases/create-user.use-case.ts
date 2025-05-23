import { BadRequestException, Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/core/either';
import { User } from 'src/domain/entities/user.entity';
import { Role } from 'src/domain/enum/roles.enum';
import { HashService } from 'src/domain/interfaces/hash.service.interface';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';
import { EmailAlreadyInUseError } from './errors/email-already-in-use-error';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

type CreateUserUseCaseResponse = Either<EmailAlreadyInUseError, { user: User }>;

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async execute({
    email,
    name,
    password,
    role,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const emailAlreadyInUse = await this.userRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      return left(new EmailAlreadyInUseError(email));
    }

    const passwordHashed = await this.hashService.hash(password);

    const user = User.create({
      email,
      name,
      password: passwordHashed,
      role,
      createdAt: new Date(),
    });

    await this.userRepository.create(user);

    return right({ user });
  }
}
