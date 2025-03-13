import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { UserEntity } from '../user/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferCount } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OfferCount.DEFAULT;

    return this.offerModel
      .find({}, {}, { limit })
      .sort({ createAt: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('userId')
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    this.logger.info(`Offer updated: ${dto.title}`);
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[] | null> {
    const cityName = city.toLowerCase().replace(city[0], city[0].toUpperCase());
    this.logger.info(`Get premium offers by city: ${cityName}`);
    return this.offerModel
      .find({ city: cityName, isPremium: true }, {}, { limit: OfferCount.PREMIUM })
      .sort({ createAt: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[] | null> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      return null;
    }

    return this.offerModel
      .find({ _id: { $in: user.favorites } })
      .sort({ createAt: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': { commentCount: 1 }})
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
