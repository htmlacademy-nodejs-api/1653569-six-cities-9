import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import {
  BaseController,
  HttpMethod,
  ValidateDTOMiddleware,
  PrivateRouteMiddleware,
  DocumentExistsMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';

import { COMPONENT } from '../../constant/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRDO } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { CreateCommentDTO } from './dto/create-comment.dto.js';
import { OfferRoute } from '../offer/offer.constant.js';
import { ParamOfferId } from '../offer/types/param-offerid.type.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT.COMMENT_SERVICE) private readonly commentService: CommentService,
    @inject(COMPONENT.OFFER_SERVICE) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: OfferRoute.ID,
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: OfferRoute.ID,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDTOMiddleware(CreateCommentDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async index({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRDO, comments));
  }

  public async create({ params, body, tokenPayload }: CreateCommentRequest, res: Response): Promise<void> {
    const result = await this.commentService.create({ ...body, userId: tokenPayload.id}, params.offerId);
    await this.offerService.incCommentCount(params.offerId);
    await this.offerService.updateRating(params.offerId, body.rating);
    this.created(res, fillDTO(CommentRDO, result));
  }
}
