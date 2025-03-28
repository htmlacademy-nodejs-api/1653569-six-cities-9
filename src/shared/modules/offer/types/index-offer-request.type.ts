import { Request } from 'express';
import { Query } from 'express-serve-static-core';

export type IndexOfferRequest = Request<unknown, unknown, unknown, { count: number } | Query>;
