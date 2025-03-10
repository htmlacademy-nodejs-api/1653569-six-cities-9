import { CityName, Goods, OfferType } from '../../../types/index.js';
import { OfferValidation } from '../offer.constant.js';

export const OfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${OfferValidation.title.minLength}`,
    maxLength: `Maximum title length must be ${OfferValidation.title.maxLength}`,
  },
  description: {
    minLength: `Minimum description length must be ${OfferValidation.description.minLength}`,
    maxLength: `Maximum description length must be ${OfferValidation.description.maxLength}`,
  },
  createdDate: {
    invalidFormat: 'Field createdDate must be a valid ISO date',
  },
  city: {
    invalidFormat: `Field city must be an one of ${Object.values(CityName).join(', ')}`,
  },
  previewImage: {
    invalidFormat: 'Field previewImage must be valid url',
  },
  images: {
    invalidFormat: 'Field images must be an array',
    invalidArrayCount: `Field images must be an array of ${OfferValidation.images.count} items`,
    invalidFormatItem: 'Each item images must be a valid url'
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be a boolean',
  },
  type: {
    invalidFormat: 'Field goods must be an array',
    invalidFormatItem: `Field type must be an one of ${Object.values(OfferType).join(', ')}`
  },
  bedrooms: {
    minValue: `Minimum quantity bedrooms is ${OfferValidation.bedrooms.min}`,
    maxValue: `Maximum quantity bedrooms is ${OfferValidation.bedrooms.max}`,
    invalidFormat: 'Field bedrooms must be an integer',
  },
  maxAdults: {
    minValue: `Minimum quantity adults is ${OfferValidation.maxAdults.min}`,
    maxValue: `Maximum quantity adults is ${OfferValidation.maxAdults.max}`,
    invalidFormat: 'Field maxAdults must be an integer',
  },
  price: {
    minValue: `Minimum price is ${OfferValidation.price.min}`,
    maxValue: `Maximum price is ${OfferValidation.price.max}`,
    invalidFormat: 'Field price must be an integer',
  },
  goods: {
    invalidFormat: 'Field goods must be an array',
    invalidFormatItem: `Field goods must be an one of ${Object.values(Goods).join(', ')}`
  },
  userId: {
    invalidId: 'Field userId must be a valid id',
  },
  commentCount: {
    invalidFormat: 'Field commentCount must be an integer',
  },
  location: {
    invalidFormat: 'Field location must be an object {latitude: number, longitude: number}',
  },
  rating: {
    minValue: 'Minimum rating is 1', //temp
    maxValue: 'Maximum rating is 5', //temp
    invalidFormat: 'Field rating must be an integer', //temp
  },
} as const;
