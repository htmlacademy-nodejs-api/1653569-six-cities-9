import { Expose, Transform, Type } from 'class-transformer';
import { City, Location, OfferType } from '../../../types/index.js';
import { UserRDO } from '../../user/index.js';

export class ShortOfferRDO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public title!: string;

  @Expose({ name: 'createdAt' })
  public createdDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => UserRDO)
  public user!: UserRDO;

  @Expose()
  public location!: Location;
}
