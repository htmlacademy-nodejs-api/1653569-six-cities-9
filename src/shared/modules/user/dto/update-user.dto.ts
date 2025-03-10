import { MinLength, MaxLength, IsUrl, IsEnum } from 'class-validator';
import { UserType } from '../../../types/index.js';
import { UserValidation } from '../user.constant.js';
import { UserValidationMessage } from './user-validation.messages.js';

export class UpdateUserDto {
  @MinLength(UserValidation.name.minLength, { message: UserValidationMessage.name.minLength })
  @MaxLength(UserValidation.name.maxLength, { message: UserValidationMessage.name.maxLength })
  public name: string;

  @IsUrl({}, { message: UserValidationMessage.avatarPath.invalidFormat })
  public avatarPath?: string;

  @IsEnum(UserType, { message: UserValidationMessage.type.invalidFormat })
  public type: UserType;
}
