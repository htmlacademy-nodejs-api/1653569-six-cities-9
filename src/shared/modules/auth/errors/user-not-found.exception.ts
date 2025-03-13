import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from './base-user.exception.js';
import { ErrorMessage } from '../auth.constant.js';

export class UserNotFoundException extends BaseUserException {
  constructor() {
    super(StatusCodes.NOT_FOUND, ErrorMessage.NOT_FOUND);
  }
}
