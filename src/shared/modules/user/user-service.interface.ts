import { DocumentType } from '@typegoose/typegoose';

import { UserEntity } from './user.entity.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { Nullable } from '../../types/index.js';
import { OfferEntity } from '../offer/index.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';

export interface UserService {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<Nullable<DocumentType<UserEntity>>>;
  updateById(userId: string, dto: UpdateUserDTO): Promise<Nullable<DocumentType<UserEntity>>>;
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  isFavoriteExist(userId: string, offerId: string): Promise<boolean>
  getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  addFavorite(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>>;
  deleteFavorite(userId: string, offerId: string): Promise<Nullable<DocumentType<UserEntity>>>;
}
