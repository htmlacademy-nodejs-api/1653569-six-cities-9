import { Types } from 'mongoose';
import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { OfferService } from './offer-service.interface.js';
import { City, CityName, Nullable, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { OFFER } from './offer.constant.js';
import { populateFavorites, POPULATE_USER } from './offer.aggregation.js';
import { CommentService } from '../comment/index.js';
import { COMPONENT } from '../../constant/index.js';
import { CITY_LOCATION } from '../../constant/common.constant.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(COMPONENT.COMMENT_SERVICE) private readonly commentService: CommentService,
  ) {}

  private getCity(cityName: CityName): City {
    return {
      name: cityName,
      location: CITY_LOCATION[cityName]
    };
  }

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(Object.assign(dto, { city: this.getCity(dto.city.name) }));
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async find(count: number, userId: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = count || OFFER.COUNT.DEFAULT;
    const result = await this.offerModel
      .aggregate([
        ...POPULATE_USER,
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
        ...POPULATE_USER,
        ...populateFavorites(userId),
        { $match: { isFavorite: true }},
      ])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDTO): Promise<Nullable<DocumentType<OfferEntity>>> {

    if (!dto.city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'City is required',
        'OfferController',
      );
    }

    const offerDTO = Object.assign(dto, { city: this.getCity(dto.city.name) });
    this.logger.info(`Offer updated: ${dto.title}`);

    return this.offerModel
      .findByIdAndUpdate(offerId, offerDTO, { new: true })
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
        { $match: { 'city.name': city, isPremium: true } },
        ...POPULATE_USER,
        ...populateFavorites(userId),
        { $sort: { createdAt: SortType.Down } },
        { $limit: OFFER.COUNT.PREMIUM },
      ]);
  }

  public async isOfferAuthor(offerId: string, userId: string): Promise<boolean> {
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

    const updatedRating = !offer.rating
      ? rating
      : (((offer.rating * offer.commentCount) + rating) / (offer.commentCount + 1))
        .toFixed(OFFER.RATING.DECIMAL_PRECISION);

    return offer.updateOne({ rating: updatedRating }, { new: true }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return this.offerModel
      .exists({_id: documentId})
      .then((resolve) => resolve !== null);
  }
}
