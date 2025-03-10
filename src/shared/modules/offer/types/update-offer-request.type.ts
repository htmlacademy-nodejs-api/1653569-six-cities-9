import { Request } from 'express';

import { ParamOfferId } from './param-offerid.type.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';

export type UpdateOfferRequest = Request<ParamOfferId, unknown, UpdateOfferDto>;

