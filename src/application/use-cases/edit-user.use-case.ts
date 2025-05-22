import { Injectable, NotFoundException } from "@nestjs/common";
import type { User } from "src/domain/entities/user.entity";
import type { Role } from "src/domain/enum/roles.enum";
import type { UserRepository } from "src/domain/interfaces/user.repository.interface";

interface EditUserUseCaseRequest {
	id: string;
	name: string;
	email: string;
	role: Role;
}

interface EditUserUseCaseResponse {
	user: User;
}

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
			throw new NotFoundException();
		}

		user.email = email;
		user.name = name;
		user.role = role;

		await this.userRepository.save(user);

		return { user };
	}
}
