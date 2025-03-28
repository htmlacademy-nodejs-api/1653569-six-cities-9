import { Request } from 'express';
import { CreateCommentDTO } from '../dto/create-comment.dto.js';
import { ParamOfferId } from '../../offer/types/param-offerid.type.js';

export type CreateCommentRequest = Request<ParamOfferId, unknown, CreateCommentDTO>
