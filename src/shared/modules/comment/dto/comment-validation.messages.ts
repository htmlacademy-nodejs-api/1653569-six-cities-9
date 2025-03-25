import { COMMENT } from '../comment.constant.js';

export const COMMENT_VALIDATION_MESSAGES = {
  TEXT: {
    MIN_LENGTH: `Minimum comment length must be ${COMMENT.TEXT_LENGHT.MIN}}`,
    MAX_LENGTH: `Maximum comment length must be ${COMMENT.TEXT_LENGHT.MAX}}`
  },
  RATING: {
    MIN_VALUE: `Minimum rating is ${COMMENT.RATING.MIN}`,
    MAX_VALUE: `Maximum rating is ${COMMENT.RATING.MAX}`,
    INVALID_FORMAT: 'Field rating must be an integer',
  },
  OFFER_ID: {
    INVALID_ID: 'Field offerId must be a valid id',
  },
  USER_ID: {
    INVALID_ID: 'Field userId must be a valid id',
  },
} as const;

