import { IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CommentValidationMessages } from './comment-validation.messages.js';
import { CommentValidation } from '../comment.constant.js';

export class CreateCommentDto {
  @MinLength(CommentValidation.comment.minLength, { message: CommentValidationMessages.comment.minLength })
  @MaxLength(CommentValidation.comment.maxLength, { message: CommentValidationMessages.comment.maxLength })
  public comment: string;

  @Min(CommentValidation.rating.min, { message: CommentValidationMessages.rating.minValue })
  @Max(CommentValidation.rating.max, { message: CommentValidationMessages.rating.maxValue })
  @IsInt({ message: CommentValidationMessages.rating.invalidFormat })
  public rating: number;

  @IsMongoId({ message: CommentValidationMessages.offerId.invalidId })
  public offerId: string;

  @IsMongoId({ message: CommentValidationMessages.userId.invalidId })
  public userId: string;
}
