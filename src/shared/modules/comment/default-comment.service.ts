import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { Nullable, SortType } from '../../types/index.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { Logger } from '../../libs/logger/index.js';
import { COMPONENT } from '../../constant/index.js';
import { COMMENT } from './comment.constant.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDTO, offerId: string): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create({ ...dto, offerId });
    this.logger.info(`New comment created: ${dto.comment}`);

    return result.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<Nullable<DocumentType<CommentEntity>>[]> {
    return this.commentModel
      .find({ offerId }, {}, { limit: COMMENT.COUNT.DEFAULT })
      .sort({ createdAt: SortType.Down })
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }
}
