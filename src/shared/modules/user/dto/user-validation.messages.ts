import { UserType } from '../../../types/index.js';
import { USER } from '../user.constant.js';

export const USER_VALIDATION_MESSAGE = {
  NAME: {
    MIN_LENGTH: `Minimum name length must be ${USER.NAME_LENGTH.MIN}}`,
    MAX_LENGTH: `Maximum name length must be ${USER.NAME_LENGTH.MAX}`,
  },
  EMAIL: {
    INVALID_FORMAT: 'Field email must be a valid email address'
  },
  PASSWORD: {
    MIN_LENGTH: `Minimum password length must be ${USER.PASSWORD_LENGTH.MIN}`,
    MAX_LENGTH: `Maximum password length must be ${USER.PASSWORD_LENGTH.MAX}}`,
  },
  AVATAR_PATH: {
    INVALID_FORMAT: 'Field avatarPath must be valid url',
  },
  TYPE: {
    INVALID_FORMAT: `Field type must be an one of: ${Object.values(UserType).join(', ')}`
  },
} as const;
