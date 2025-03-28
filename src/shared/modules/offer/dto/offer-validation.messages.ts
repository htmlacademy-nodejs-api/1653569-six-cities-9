import { CityName, Goods, OfferType } from '../../../types/index.js';
import { OFFER } from '../offer.constant.js';

export const OFFER_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: `Minimum title length must be ${OFFER.TITLE_LENGTH.MIN}`,
    MAX_LENGTH: `Maximum title length must be ${OFFER.TITLE_LENGTH.MAX}`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `Minimum description length must be ${OFFER.DESCRIPTION_LENGTH.MIN}}`,
    MAX_LENGTH: `Maximum description length must be ${OFFER.DESCRIPTION_LENGTH.MAX}`,
  },
  CREATED_DATE: {
    INVALID_FORMAT: 'Field createdDate must be a valid ISO date',
  },
  CITY: {
    INVALID_FORMAT: `Field city must be an one of: ${Object.values(CityName).join(', ')}`,
  },
  PREVIEW_IMAGE: {
    INVALID_FORMAT: 'Field previewImage must be valid url',
  },
  IMAGES: {
    INVALID_FORMAT: 'Field images must be an array',
    INVALID_ARRAY_COUNT: `Field images must be an array of ${OFFER.COUNT.IMAGES} items`,
    INVALID_FORMAT_ITEM: 'Each item images must be a valid url'
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'Field isPremium must be a boolean',
  },
  TYPE: {
    INVALID_FORMAT: `Field type must be an one of: ${Object.values(OfferType).join(', ')}`
  },
  BEDROOMS: {
    MIN_VALUE: `Minimum quantity bedrooms is ${OFFER.BEDROOMS.MIN}`,
    MAX_VALUE: `Maximum quantity bedrooms is ${OFFER.BEDROOMS.MAX}`,
    INVALID_FORMAT: 'Field bedrooms must be an integer',
  },
  MAX_ADULTS: {
    MIN_VALUE: `Minimum quantity adults is ${OFFER.MAX_ADULTS.MIN}`,
    MAX_VALUE: `Maximum quantity adults is ${OFFER.MAX_ADULTS.MAX}`,
    INVALID_FORMAT: 'Field maxAdults must be an integer',
  },
  PRICE: {
    MIN_VALUE: `Minimum price is ${OFFER.PRICE.MIN}`,
    MAX_VALUE: `Maximum price is ${OFFER.PRICE.MAX}`,
    INVALID_FORMAT: 'Field price must be an integer',
  },
  GOODS: {
    INVALID_FORMAT: 'Field goods must be an array',
    INVALID_FORMAT_ITEM: `Field goods must be an one of: ${Object.values(Goods).join(', ')}`
  },
  USER_ID: {
    INVALID_ID: 'Field userId must be a valid id',
  },
  COMMENT_COUNT: {
    INVALID_FORMAT: 'Field commentCount must be an integer',
  },
  LOCATION: {
    INVALID_FORMAT: 'Field location must be an object {latitude: number, longitude: number}',
  },
  RATING: {
    MIN_VALUE: 'Minimum rating is 1',
    MAX_VALUE: 'Maximum rating is 5',
    INVALID_FORMAT: 'Field rating must be an integer',
  },
} as const;
