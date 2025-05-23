import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repository';
import { FakeHasher } from 'test/service/fake-hasher';
import { CreateUserUseCase } from './create-user.use-case';
import { Role } from 'src/domain/enum/roles.enum';

let inMemoryUserRepository: InMemoryUserRepository;
let fakeHasher: FakeHasher;

let sut: CreateUserUseCase;

describe('create user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    fakeHasher = new FakeHasher();

    sut = new CreateUserUseCase(inMemoryUserRepository, fakeHasher);
  });

  it('Should be able to create user ', async () => {
    const result = await sut.execute({
      email: 'johndoe@mail.com',
      name: 'john doe',
      password: 'Password123!',
      role: Role.GUEST,
    });

    expect(result.isRight()).toBe(true);
  });

  it('Should be hash password', async () => {
    const result = await sut.execute({
      email: 'johndoe@mail.com',
      name: 'john doe',
      password: 'Password123!',
      role: Role.GUEST,
    });

    const passwordHashed = await fakeHasher.hash('Password123!');

    expect(result.isRight()).toBe(true);
  });
});
