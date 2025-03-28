import { IsDefined, IsEmail, IsEnum, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../../types/index.js';
import { USER } from '../user.constant.js';
import { USER_VALIDATION_MESSAGE } from './user-validation.messages.js';

export class CreateUserDTO {
  @IsString()
  @MinLength(USER.NAME_LENGTH.MIN, { message: USER_VALIDATION_MESSAGE.NAME.MAX_LENGTH })
  @MaxLength(USER.NAME_LENGTH.MAX, { message: USER_VALIDATION_MESSAGE.NAME.MAX_LENGTH })
  public name!: string;

  @IsDefined()
  @IsEmail({}, { message: USER_VALIDATION_MESSAGE.EMAIL.INVALID_FORMAT })
  public email!: string;

  @IsString()
  @MinLength(USER.PASSWORD_LENGTH.MIN, { message: USER_VALIDATION_MESSAGE.PASSWORD.MIN_LENGTH })
  @MaxLength(USER.PASSWORD_LENGTH.MAX, { message: USER_VALIDATION_MESSAGE.PASSWORD.MAX_LENGTH })
  public password!: string;

  @IsOptional()
  @IsUrl({}, { message: USER_VALIDATION_MESSAGE.AVATAR_PATH.INVALID_FORMAT })
  public avatarPath!: string;

  @IsEnum(UserType, { message: USER_VALIDATION_MESSAGE.TYPE.INVALID_FORMAT })
  public type!: UserType;
}
