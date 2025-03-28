import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from 'jose';
import { StatusCodes } from 'http-status-codes';
import { createSecretKey } from 'node:crypto';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { TokenPayload } from '../../../modules/auth/index.js';
import { ENCODING_DEFAULT } from '../../../constant/index.js';

const VALID_TOKEN = {
  LENGHT: 2,
  PREFIX: 'Bearer',
} as const;

function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('id' in payload && typeof payload.id === 'string') &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('email' in payload && typeof payload.email === 'string')
  );
}

export class ParseTokenMiddleware implements Middleware {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');

    if (authorizationHeader?.length !== VALID_TOKEN.LENGHT || authorizationHeader[0] !== VALID_TOKEN.PREFIX) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, ENCODING_DEFAULT));

      if (isTokenPayload(payload)) {
        req.tokenPayload = { ...payload };
        return next();
      } else {
        throw new Error('Token is invalid or expired');
      }
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware')
      );
    }
  }
}
