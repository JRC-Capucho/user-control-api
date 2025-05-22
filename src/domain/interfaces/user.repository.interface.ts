import type { User } from "../entities/user.entity";

export interface UserRepository {
	create(user: User): Promise<void>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	delete(user: User): Promise<void>;
	save(user: User): Promise<void>;
}
