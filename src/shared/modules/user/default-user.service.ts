import { Types } from 'mongoose';
import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { UserService } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { Nullable } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity, OfferService } from '../offer/index.js';
import { COMPONENT } from '../../constant/index.js';
import { USER } from './user.constant.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT.USER_MODEL) private readonly userModel: types.ModelType<UserEntity>,
    @inject(COMPONENT.OFFER_SERVICE) private readonly offerService: OfferService
  ) {}

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({ ...dto, avatarPath: USER.DEFAULT.AVATAR }, salt);
    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result as DocumentType<UserEntity>;
  }

  public async findByEmail(email: string): Promise<Nullable<DocumentType<UserEntity>>> {
    return this.userModel.findOne({ email });
  }

  public async updateById(userId: string, dto: UpdateUserDTO): Promise<Nullable<DocumentType<UserEntity>>> {
    const result = await this.userModel.findByIdAndUpdate(userId, dto, { new: true });
    this.logger.info(`User updated: ${dto.name}`);

    return result as DocumentType<UserEntity>;
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);
    return existedUser ?? this.create(dto, salt);
  }

  public async getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerService.findFavoritesByUserId(userId);
  }

  public async addFavorite(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    const result = this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: new Types.ObjectId(offerId) } },
      { new: true }
    ).exec();

    return result as unknown as DocumentType<UserEntity>;
  }

  public async deleteFavorite(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>> {
    const result = this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favorites: new Types.ObjectId(offerId) } },
      { new: true }
    ).exec();

    return result as unknown as DocumentType<UserEntity>;
  }
}
