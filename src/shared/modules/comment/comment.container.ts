import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { COMPONENT } from '../../constant/index.js';
import { CommentEntity } from './comment.entity.js';
import { DefaultCommentService } from './default-comment.service.js';
import { Controller } from '../../libs/rest/index.js';
import { CommentController } from './comment.controller.js';
import { CommentModel } from '../index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(COMPONENT.COMMENT_SERVICE).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(COMPONENT.COMMENT_MODEL).toConstantValue(CommentModel);
  commentContainer.bind<Controller>(COMPONENT.COMMENT_CONTROLLER).to(CommentController).inSingletonScope();

  return commentContainer;
}
