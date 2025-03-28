import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class TokenExistsMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (tokenPayload) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'Only an unauthorized user can register',
        'TokenExistsMiddleware'
      );
    }

    return next();
  }
}
