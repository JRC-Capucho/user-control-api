import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repository'
import { makeUser } from 'test/factories/make-user'
import { GetUserUseCase } from './get-user.use-case'

let inMemoryUserRepository: InMemoryUserRepository

let sut: GetUserUseCase

describe('get user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to create user ', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({ id: user.id })

    expect(result.isRight()).toBe(true)
  })
})
