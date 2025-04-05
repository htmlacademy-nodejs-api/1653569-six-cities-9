import { UserType } from '../../const';

export default class UserDTO {
  public name!: string;
  public email!: string ;
  public avatarPath!: string;
  public type!: UserType;
}
