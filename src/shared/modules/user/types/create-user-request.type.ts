import { Request } from 'express';
import { RequestParams, RequestBody } from '../../../libs/rest/index.js';
import { CreateUserDTO } from '../dto/create-user.dto.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDTO>;
