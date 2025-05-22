import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user.entity";
import type { Role } from "src/domain/enum/roles.enum";
import type { HashService } from "src/domain/interfaces/hash.service.interface";
import type { UserRepository } from "src/domain/interfaces/user.repository.interface";

interface CreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
	role: Role;
}

interface CreateUserUseCaseResponse {
	user: User;
}

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
			throw new BadRequestException("Email already in use");
		}

		const passwordHashed = await this.hashService.hash(password);

		const user = User.create({
			email,
			name,
			password: passwordHashed,
			role,
		});

		await this.userRepository.create(user);

		return { user };
	}
}
