import { Injectable, NotFoundException } from "@nestjs/common";
import type { User } from "src/domain/entities/user.entity";
import type { UserRepository } from "src/domain/interfaces/user.repository.interface";

interface DeleteUserUseCaseRequest {
	id: string;
}

@Injectable()
export class DeleteUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new NotFoundException();
		}

		await this.userRepository.delete(user);
	}
}
