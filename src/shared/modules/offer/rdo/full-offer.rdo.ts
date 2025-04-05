import { Expose, Transform, Type } from 'class-transformer';
import { OfferType, Goods, Location, City } from '../../../types/index.js';
import { UserRDO } from '../../user/rdo/user.rdo.js';

export class FullOfferRDO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt' })
  public createdDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: Goods[];

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => UserRDO)
  public user!: UserRDO;

  @Expose()
  public location!: Location;
}
