import { Request } from 'express';
import { QueryCount } from './query-count.type.js';

export type IndexOfferRequest = Request<unknown, unknown, unknown, QueryCount>;
