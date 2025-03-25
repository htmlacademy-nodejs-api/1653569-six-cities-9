import { IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { COMMENT_VALIDATION_MESSAGES } from './comment-validation.messages.js';
import { COMMENT } from '../comment.constant.js';

export class CreateCommentDTO {
  @IsString()
  @MinLength(COMMENT.TEXT_LENGHT.MIN, { message: COMMENT_VALIDATION_MESSAGES.TEXT.MIN_LENGTH })
  @MaxLength(COMMENT.TEXT_LENGHT.MAX, { message: COMMENT_VALIDATION_MESSAGES.TEXT.MAX_LENGTH })
  public comment!: string;

  @Min(COMMENT.RATING.MIN, { message: COMMENT_VALIDATION_MESSAGES.RATING.MIN_VALUE })
  @Max(COMMENT.RATING.MAX, { message: COMMENT_VALIDATION_MESSAGES.RATING.MAX_VALUE})
  @IsInt({ message: COMMENT_VALIDATION_MESSAGES.RATING.INVALID_FORMAT })
  public rating!: number;

  public userId!: string;
}
