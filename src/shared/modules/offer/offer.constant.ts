export const OfferRoute = {
  ROOT: '/',
  ID: '/:offerId',
  COMMENTS: '/comments/:offerId',
  PREMIUM: '/premium',
  FAVORITES: '/favorites',
} as const;

export const OFFER = {
  TITLE_LENGTH: {
    MIN: 10,
    MAX: 100
  },
  DESCRIPTION_LENGTH: {
    MIN: 20,
    MAX: 1024
  },
  BEDROOMS: {
    MIN: 1,
    MAX: 8,
  },
  MAX_ADULTS: {
    MIN: 1,
    MAX: 10,
  },
  PRICE: {
    MIN: 100,
    MAX: 100000,
  },
  RATING: {
    MIN: 1,
    MAX: 5,
    DECIMAL_PRECISION: 1,
  },
  COUNT: {
    DEFAULT: 60,
    PREMIUM: 3,
    IMAGES: 6,
    MIN: 1,
  }
} as const;

