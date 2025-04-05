import {
  defaultClasses,
  modelOptions,
  prop,
  Ref,
  Severity
} from '@typegoose/typegoose';

import { City, Goods, Location, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ type: () => [String], required: true })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ type: () => String, enum: OfferType, required: true })
  public type!: OfferType;

  @prop({ required: true })
  public bedrooms!: number;

  @prop({ required: true })
  public maxAdults!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({ default: null })
  public rating!: number;

  @prop({ type: () => String, enum: Goods, required: true })
  public goods!: Goods[];

  @prop({ ref: () => UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  @prop({ required: true })
  public location!: Location;
}
