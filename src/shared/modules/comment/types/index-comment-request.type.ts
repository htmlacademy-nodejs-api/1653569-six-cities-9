import { Request } from 'express';
import { ParamOfferId } from '../../offer/types/param-offerid.type.js';

export type IndexCommentRequest = Request<ParamOfferId>;
