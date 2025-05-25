import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repository'
import { makeUser } from 'test/factories/make-user'
import { DeleteUserUseCase } from './delete-user.use-case'

let inMemoryUserRepository: InMemoryUserRepository

let sut: DeleteUserUseCase

describe('delete user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()

    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to create user ', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    await sut.execute({ id: user.id })

    expect(inMemoryUserRepository.items).toHaveLength(0)
  })
})
