import { Types } from 'mongoose';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { OfferService } from './offer-service.interface.js';
import { CityName, Nullable, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { OFFER } from './offer.constant.js';
import { populateFavorites, POPULATE_USER } from './offer.aggregation.js';
import { CommentService } from '../comment/index.js';
import { COMPONENT } from '../../constant/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(COMPONENT.COMMENT_SERVICE) private readonly commentService: CommentService,
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async find(count: number, userId: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = count || OFFER.COUNT.DEFAULT;
    const result = await this.offerModel
      .aggregate([
        ...populateFavorites(userId),
        { $sort: { createdAt: SortType.Down } },
        { $limit: limit },
      ])
      .exec();

    return result;
  }

  public async findById(offerId: string, userId: string): Promise<Nullable<DocumentType<OfferEntity>>>{
    const result = await this.offerModel
      .aggregate([
        { $match: { '_id': new Types.ObjectId(offerId) } },
        ...POPULATE_USER,
        ...populateFavorites(userId, offerId),
      ])
      .exec();

    return result[0] || null;
  }

  public async findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        ...populateFavorites(userId),
        { $match: { isFavorite: true }},
      ])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDTO): Promise<Nullable<DocumentType<OfferEntity>>> {
    this.logger.info(`Offer updated: ${dto.title}`);

    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate('userId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>> {
    const result = await this.offerModel
      .findByIdAndDelete(offerId)
      .exec();

    await this.commentService.deleteByOfferId(offerId);
    return result;
  }

  public async findPremiumByCity(city: CityName, userId: string): Promise<DocumentType<OfferEntity>[]> {
    this.logger.info(`Get premium offers by city: ${city}`);

    return this.offerModel
      .aggregate([
        { $match: { city, isPremium: true } },
        ...populateFavorites(userId),
        { $sort: { createdAt: SortType.Down } },
        { $limit: OFFER.COUNT.PREMIUM },
      ]);
  }

  public async isAuthorOffer(offerId: string, userId: string): Promise<boolean> {
    const offer = await this.offerModel.findOne({ _id: offerId });

    return offer?.userId?.toString() === userId;
  }

  public async incCommentCount(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { '$inc': { commentCount: 1 } })
      .exec();
  }

  public async updateRating(offerId: string, rating: number): Promise<Nullable<DocumentType<OfferEntity>>> {
    const offer = await this.offerModel.findById(offerId);

    if (!offer) {
      return null;
    }

    const updatedRating = ((offer.rating + rating) / offer.commentCount).toFixed(OFFER.RATING.DECIMAL_PRECISION);
    return offer.updateOne({ rating: updatedRating }, { new: true }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.offerModel
      .exists({_id: documentId})
      .then((resolve) => resolve !== null);
  }
}
