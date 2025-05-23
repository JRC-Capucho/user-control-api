import { CustomError } from 'src/shared/custom-error';

export class UserNotFoundError extends Error implements CustomError {
  constructor() {
    super('User not found');
  }
}
