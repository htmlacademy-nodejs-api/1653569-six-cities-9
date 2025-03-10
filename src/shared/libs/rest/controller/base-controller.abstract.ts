import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import { Controller } from './controller.interface.js';
import { Logger } from '../../logger/index.js';
import { Route } from '../types/route.interface.js';


@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  protected readonly baseRouter: Router;

  constructor(
    protected readonly logger: Logger,
  ) {
    this.baseRouter = Router();
    this.logger.info(`Create ${this.constructor.name}:`);
  }

  public get router() {
    return this.baseRouter;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map((item) => asyncHandler(item.execute.bind(item)));
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;
    this.baseRouter[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res
      .type(this.DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public notFound<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NOT_FOUND, data);
  }

  public notAllow<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.FORBIDDEN, data);
  }
}
