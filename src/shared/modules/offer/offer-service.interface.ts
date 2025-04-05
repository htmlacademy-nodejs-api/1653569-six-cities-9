import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDTO } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDTO } from './dto/update-offer.dto.js';
import { DocumentExists } from '../../libs/rest/index.js';
import { Nullable } from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  find(count: number, userId: string): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string, userId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
  findFavoritesByUserId(userId: string): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
  updateById(offerId: string, dto: UpdateOfferDTO): Promise<Nullable<DocumentType<OfferEntity>>>;
  findPremiumByCity(city: string, userId: string): Promise<DocumentType<OfferEntity>[]>;
  isOfferAuthor(offerId: string, userId: string): Promise<boolean>;
  incCommentCount(offerId: string): Promise<Nullable<DocumentType<OfferEntity>>>;
  updateRating(offerId: string, rating: number): Promise<Nullable<DocumentType<OfferEntity>>>;
  exists(documentId: string): Promise<boolean>;
}
