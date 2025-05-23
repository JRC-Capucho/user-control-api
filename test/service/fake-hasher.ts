import { HashService } from 'src/domain/interfaces/hash.service.interface';

export class FakeHasher implements HashService {
  async hash(plainText: string): Promise<string> {
    return plainText.concat('-hashed');
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return plainText.concat('-hashed') === hashedText;
  }
}
