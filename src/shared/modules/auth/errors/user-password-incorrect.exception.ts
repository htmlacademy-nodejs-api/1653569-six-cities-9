import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base-user.exception.js';
import { ErrorMessage } from '../auth.constant.js';

export class UserPasswordIncorrectException extends BaseUserException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, ErrorMessage.UNAUTHORIZED);
  }
}
