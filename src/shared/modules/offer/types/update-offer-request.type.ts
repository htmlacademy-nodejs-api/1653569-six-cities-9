import { Request } from 'express';
import { ParamOfferId } from './param-offerid.type.js';
import { UpdateOfferDTO } from '../dto/update-offer.dto.js';

export type UpdateOfferRequest = Request<ParamOfferId, unknown, UpdateOfferDTO>;

