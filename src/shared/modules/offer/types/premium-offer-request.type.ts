import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import { CityName } from '../../../types/index.js';

export type PremiumOfferRequest = Request<unknown, unknown, unknown, { city: CityName} | Query>

