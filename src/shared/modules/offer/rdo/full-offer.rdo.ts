import { Expose, Type } from 'class-transformer';
import { CityName } from '../../../types/city-name.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { Goods } from '../../../types/goods.enum.js';
import { Location } from '../../../types/location.type.js';
import { UserRDO } from '../../user/rdo/user.rdo.js';

export class FullOfferRDO {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt' })
  public createdDate!: Date;

  @Expose()
  public city!: CityName;

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
