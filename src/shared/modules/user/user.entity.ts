import {
  defaultClasses,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { CreateUserDTO } from './dto/create-user.dto.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public name!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ required: true })
  private password: string;

  @prop({ required: false })
  public avatarPath!: string;

  @prop({ type: () => String, enum: UserType, required: true })
  public type!: UserType;

  @prop({ ref: () => OfferEntity, default: [] })
  public favorites!: Ref<OfferEntity>[];

  constructor(userData: CreateUserDTO, salt: string) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.type = userData.type;
    this.password = createSHA256(userData.password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}
