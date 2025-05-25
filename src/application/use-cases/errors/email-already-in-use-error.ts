import { CustomError } from 'src/shared/custom-error'

export class EmailAlreadyInUseError extends Error implements CustomError {
  constructor(email: string) {
    super(`Email already in use ${email}`)
  }
}
