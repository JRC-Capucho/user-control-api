import { CustomError } from 'src/shared/custom-error'

export class WrongCredentialsError extends Error implements CustomError {
  constructor() {
    super(`Credentials are not valid.`)
  }
}
