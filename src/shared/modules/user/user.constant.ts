export const UserRoute = {
  REGISTER: '/register',
  LOGIN: '/login',
  AVATAR: '/:userId/avatar',
} as const;

export const UserValidation = {
  name: {
    minLength: 1,
    maxLength: 15
  },
  password: {
    minLength: 6,
    maxLength: 12
  }
};
