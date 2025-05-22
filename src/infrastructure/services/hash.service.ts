import type { HashService } from "src/domain/interfaces/hash.service.interface";
import * as bcrypt from "bcrypt";

export class BcryptHashService implements HashService {
	private readonly saltRounds = 10;

	async hash(plainText: string): Promise<string> {
		return await bcrypt.hash(plainText, this.saltRounds);
	}

	async compare(plainText: string, hashedText: string): Promise<boolean> {
		return await bcrypt.compare(plainText, hashedText);
	}
}
