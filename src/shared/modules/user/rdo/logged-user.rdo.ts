import { Expose } from 'class-transformer';
import { UserType } from '../../../types/index.js';

export class LoggedUserRDO {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string ;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public type!: UserType;

  @Expose()
  public token!: string;
}
