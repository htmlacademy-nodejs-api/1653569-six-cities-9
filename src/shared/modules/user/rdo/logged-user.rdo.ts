import { Expose } from 'class-transformer';

export class LoggedUserRDO {
  @Expose()
  public email!: string;

  @Expose()
  public token!: string;
}
