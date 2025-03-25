import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { Nullable } from '../../types/index.js';

export interface CommentService {
  create(dto: CreateCommentDTO, offerId: string): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<Nullable<DocumentType<CommentEntity>>[]>;
  deleteByOfferId(offerId: string): Promise<Nullable<number>>;
}
