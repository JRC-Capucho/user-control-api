import { Injectable, NotFoundException } from "@nestjs/common";
import type { User } from "src/domain/entities/user.entity";
import type { UserRepository } from "src/domain/interfaces/user.repository.interface";

interface GetUserUseCaseRequest {
	id: string;
}

interface GetUserUseCaseResponse {
	user: User;
}

@Injectable()
export class GetUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute({
		id,
	}: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new NotFoundException();
		}

		return { user };
	}
}
