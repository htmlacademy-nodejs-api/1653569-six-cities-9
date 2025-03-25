export const UserRoute = {
  REGISTER: '/register',
  LOGIN: '/login',
  AVATAR: '/avatar/:userId',
  FAVORITES: '/favorites',
  FAVORITES_ID: '/favorites/:offerId',
} as const;

export const USER = {
  NAME_LENGTH: {
    MIN: 1,
    MAX: 15
  },
  PASSWORD_LENGTH:{
    MIN: 6,
    MAX: 12
  },
  DEFAULT: {
    AVATAR: 'default-avatar.png'
  }
} as const;
