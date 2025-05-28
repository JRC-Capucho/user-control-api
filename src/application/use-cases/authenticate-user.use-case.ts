import { Injectable } from '@nestjs/common'
import { Either, left, right } from 'src/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { UserRepository } from 'src/domain/interfaces/user.repository.interface'
import { HashService } from 'src/domain/interfaces/hash.service.interface'
import { EncrypterService } from 'src/domain/interfaces/encrypter.service.interface'
import { User } from 'src/domain/entities/user.entity'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    user: User
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private encrypter: EncrypterService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const passwordMatched = await this.hashService.compare(
      password,
      user.password,
    )

    if (!passwordMatched) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
      role: user.role,
    })

    return right({ user, accessToken })
  }
}
