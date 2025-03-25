import { Request } from 'express';
import { QueryCity } from './query-city.type.js';

export type PremiumOfferRequest = Request<unknown, unknown, unknown, QueryCity>

