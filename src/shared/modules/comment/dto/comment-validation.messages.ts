import { CommentValidation } from '../comment.constant.js';

export const CommentValidationMessages = {
  comment: {
    minLength: `Minimum comment length must be ${CommentValidation.comment.minLength}`,
    maxLength: `Maximum comment length must be ${CommentValidation.comment.maxLength}`
  },
  rating: {
    minValue: `Minimum rating is ${CommentValidation.rating.min}`,
    maxValue: `Maximum rating is ${CommentValidation.rating.max}`,
    invalidFormat: 'Field rating must be an integer',
  },
  offerId: {
    invalidId: 'Field offerId must be a valid id',
  },
  userId: {
    invalidId: 'Field userId must be a valid id',
  },
} as const;

