import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { USER_VALIDATION_MESSAGE } from './user-validation.messages.js';
import { USER } from '../user.constant.js';

export class LoginUserDTO {
  @IsEmail({}, { message: USER_VALIDATION_MESSAGE.EMAIL.INVALID_FORMAT })
  public email!: string;

  @IsString()
  @MinLength(USER.NAME_LENGTH.MIN, { message: USER_VALIDATION_MESSAGE.PASSWORD.MIN_LENGTH })
  @MaxLength(USER.NAME_LENGTH.MAX, { message: USER_VALIDATION_MESSAGE.PASSWORD.MAX_LENGTH })
  public password!: string;
}
