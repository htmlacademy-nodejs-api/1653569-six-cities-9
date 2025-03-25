import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDTOMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { CreateOfferDTO,
  OfferCountDTO,
  PremiumOfferDTO,
  FullOfferRDO,
  ShortOfferRDO,
  UpdateOfferDTO
} from './index.js';
import { Logger } from '../../libs/logger/index.js';
import { CityName } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { OfferRoute } from './offer.constant.js';
import { COMPONENT, DECIMAL_RADIX } from '../../constant/index.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { IndexOfferRequest } from './types/index-offer-request.type.js';
import { PremiumOfferRequest } from './types/premium-offer-request.type.js';
import { CommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT.COMMENT_SERVICE) private readonly commentService: CommentService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: OfferRoute.ROOT,
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateDTOMiddleware(OfferCountDTO),
      ],
    });

    this.addRoute({
      path: OfferRoute.ROOT,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDTOMiddleware(CreateOfferDTO)
      ],
    });

    this.addRoute({
      path: OfferRoute.PREMIUM,
      method: HttpMethod.Get,
      handler: this.getPremium,
      middlewares: [
        new ValidateDTOMiddleware(PremiumOfferDTO),
      ],
    });

    this.addRoute({
      path: OfferRoute.ID,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ],
    });

    this.addRoute({
      path: OfferRoute.ID,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ],
    });

    this.addRoute({
      path: OfferRoute.ID,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDTOMiddleware(UpdateOfferDTO),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ],
    });
  }

  public async index({ query, tokenPayload }: IndexOfferRequest, res: Response): Promise<void> {
    const count = Number.parseInt(query.count as string, DECIMAL_RADIX);
    const offers = await this.offerService.find(count, tokenPayload?.id);

    if (!offers.length) {
      throw new HttpError(
        StatusCodes.OK,
        'The offers was not found.',
        'OfferController',
      );
    }

    this.ok(res, fillDTO(ShortOfferRDO, offers));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.create({ ...body, userId: tokenPayload.id });
    const result = await this.offerService.findById(offer._id.toString(), tokenPayload.id);
    this.created(res, fillDTO(FullOfferRDO, result));
  }

  public async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const result = await this.offerService.findById(params.offerId, tokenPayload?.id);
    this.ok(res, fillDTO(FullOfferRDO, result));
  }

  public async update({ body, params, tokenPayload }: Request, res: Response): Promise<void> {
    if (!(await this.offerService.isOwnOffer(params.offerId, tokenPayload.id))) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'OfferController',
      );
    }

    await this.offerService.updateById(params.offerId, body);
    const result = await this.offerService.findById(params.offerId, tokenPayload.id);
    this.ok(res, fillDTO(FullOfferRDO, result));
  }

  public async delete({ params, tokenPayload }: Request, res: Response): Promise<void> {
    if (!(await this.offerService.isOwnOffer(params.offerId, tokenPayload.id))) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Forbidden',
        'OfferController',
      );
    }
    const result = await this.offerService.deleteById(params.offerId);
    await this.commentService.deleteByOfferId(params.offerId);
    this.noContent(res, result);
  }

  public async getPremium({ query, tokenPayload }: PremiumOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.findPremiumByCity(query.city as CityName, tokenPayload?.id);

    if (!result.length) {
      throw new HttpError(
        StatusCodes.OK,
        `No premium offers found in the city: ${query.city}`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(ShortOfferRDO, result));
  }
}
