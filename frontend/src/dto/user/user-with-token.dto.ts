import { UserType } from '../../const';

export default class UserWithTokenDTO {
  public name!: string;
  public email!: string ;
  public avatarPath!: string;
  public type!: UserType;
  public token!: string;
}
