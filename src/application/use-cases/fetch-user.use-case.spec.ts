import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repository'
import { makeUser } from 'test/factories/make-user'
import { FetchUserUseCase } from './fetch-user.use-case'
import { r } from '@faker-js/faker/dist/airline-BUL6NtOJ'

let inMemoryUserRepository: InMemoryUserRepository

let sut: FetchUserUseCase

describe('get user use case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchUserUseCase(inMemoryUserRepository)
  })

  it('Should be able to create user ', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({ page: 1, currentId: user.id })

    expect(result.isRight()).toBe(true)
  })
})
