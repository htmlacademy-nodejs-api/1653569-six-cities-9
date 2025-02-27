import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public password: string;
  public avatarPath: string;
  public type: UserType;
}
