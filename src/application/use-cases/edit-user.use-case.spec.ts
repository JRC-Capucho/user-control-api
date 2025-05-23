import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repository';
import { makeUser } from 'test/factories/make-user';
import { EditUserUseCase } from './edit-user.use-case';

let inMemoryUserRepository: InMemoryUserRepository;

let sut: EditUserUseCase;

describe('edit user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new EditUserUseCase(inMemoryUserRepository);
  });

  it('Should be able to create user ', async () => {
    const user = makeUser();

    await inMemoryUserRepository.create(user);

    const newUser = makeUser();

    await sut.execute({
      email: newUser.email,
      id: user.id,
      name: newUser.name,
      role: newUser.role,
    });

    expect(inMemoryUserRepository.items[0].name).toEqual(newUser.name);
  });
});
