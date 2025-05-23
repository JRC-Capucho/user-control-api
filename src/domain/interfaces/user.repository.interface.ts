import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract delete(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
}
