import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserService } from './user-service.interface.js';
import { COMPONENT } from '../../constant/index.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity } from './user.entity.js';
import { UserController } from './user.controller.js';
import { Controller } from '../../libs/rest/index.js';
import { UserModel } from '../index.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserService>(COMPONENT.USER_SERVICE).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(COMPONENT.USER_MODEL).toConstantValue(UserModel);
  userContainer.bind<Controller>(COMPONENT.USER_CONTROLLER).to(UserController).inSingletonScope();

  return userContainer;
}
