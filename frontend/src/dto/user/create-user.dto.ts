import { UserType } from '../../const';

export class CreateUserDTO {
  public name!: string;
  public email!: string;
  public password!: string;
  public type!: UserType;
}
