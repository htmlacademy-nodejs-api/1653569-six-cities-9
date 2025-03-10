export const OfferRoute = {
  ROOT: '/',
  ID: '/:offerId',
  COMMENTS: '/:offerId/comments',
} as const;

export const OfferCount = {
  DEFAULT: 60,
  PREMIUM: 3
} as const;

export const OfferValidation = {
  title: {
    minLength: 10,
    maxLength: 100
  },
  description: {
    minLength: 20,
    maxLength: 1024
  },
  images: {
    count: 6
  },
  bedrooms: {
    min: 1,
    max: 8,
  },
  maxAdults: {
    min: 1,
    max: 10,
  },
  price: {
    min: 100,
    max: 100000,
  }
};
