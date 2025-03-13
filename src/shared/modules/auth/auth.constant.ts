export const JWT = {
  ALGORITHM: 'HS256',
  EXPIRED_TIME: '2d',
} as const;

export const ErrorMessage = {
  NOT_FOUND: 'User not found',
  UNAUTHORIZED: 'Incorrect user name or password',
} as const;
