import { Expose } from 'class-transformer';
import { CityName, OfferType } from '../../../types/index.js';

export class ShortOfferRDO {
  @Expose()
  public title!: string;

  @Expose({ name: 'createdAt' })
  public createdDate!: Date;

  @Expose()
  public city!: CityName;

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
}
