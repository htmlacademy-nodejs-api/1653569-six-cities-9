
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { DocumentAuthor } from './document-author.interface.js';

export class DocumentAuthorMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentAuthor,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!await this.service.isAuthorOffer(params.offerId, tokenPayload.id)) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'Only your own offer can be edited',
        'OfferController',
      );
    }

    next();
  }
}
