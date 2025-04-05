import { UserType } from '../../const';

export default class UserDTO {
  public id!: string;
  public name!: string;
  public email!: string ;
  public password!: string;
  public avatarPath!: string;
  public type!: UserType;
}
