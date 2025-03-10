import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { UserValidationMessage } from './user-validation.messages.js';
import { UserValidation } from '../user.constant.js';

export class LoginUserDto {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @MinLength(UserValidation.password.minLength, { message: UserValidationMessage.password.minLength })
  @MaxLength(UserValidation.password.maxLength, { message: UserValidationMessage.password.maxLength })
  public password: string;
}
