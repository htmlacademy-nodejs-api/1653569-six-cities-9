import { IsEmail, IsEnum, IsUrl, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../../types/index.js';
import { UserValidation } from '../user.constant.js';
import { UserValidationMessage } from './user-validation.messages.js';

export class CreateUserDto {
  @MinLength(UserValidation.name.minLength, { message: UserValidationMessage.name.minLength })
  @MaxLength(UserValidation.name.maxLength, { message: UserValidationMessage.name.maxLength })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @MinLength(UserValidation.password.minLength, { message: UserValidationMessage.password.minLength })
  @MaxLength(UserValidation.password.maxLength, { message: UserValidationMessage.password.maxLength })
  public password: string;

  @IsUrl({}, { message: UserValidationMessage.avatarPath.invalidFormat })
  public avatarPath: string;

  @IsEnum(UserType, { message: UserValidationMessage.type.invalidFormat })
  public type: UserType;
}
