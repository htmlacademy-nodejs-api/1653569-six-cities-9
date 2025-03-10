import { UserType } from '../../../types/index.js';
import { UserValidation } from '../user.constant.js';

export const UserValidationMessage = {
  name: {
    minLength: `Minimum name length must be ${UserValidation.name.minLength}`,
    maxLength: `Maximum name length must be ${UserValidation.name.maxLength}`,
  },
  email: {
    invalidFormat: 'Field email must be a valid email address'
  },
  password: {
    minLength: `Minimum password length must be ${UserValidation.password.minLength}`,
    maxLength: `Maximum password length must be ${UserValidation.password.maxLength}`,
  },
  avatarPath: {
    invalidFormat: 'Field avatarPath must be valid url',
  },
  type: {
    invalidFormat: `Field type must be an one of ${Object.values(UserType).join(', ')}`
  },
} as const;
