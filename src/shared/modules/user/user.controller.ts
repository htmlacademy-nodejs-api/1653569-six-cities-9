import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  ValidateDTOMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { COMPONENT } from '../../constant/index.js';
import { CreateUserRequest } from './types/create-user-request.type.js';
import { LoginUserRequest } from './types/login-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CreateUserDTO, LoginUserDTO, LoggedUserRDO, UserRDO } from './index.js';
import { UserRoute } from './user.constant.js';
import { AuthService } from '../auth/index.js';
import { ParamOfferId } from '../offer/types/param-offerid.type.js';
import { OfferService, ShortOfferRDO } from '../offer/index.js';
import { TokenExistsMiddleware } from '../../libs/rest/middleware/token-exists.middleware.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(COMPONENT.LOGGER) protected readonly logger: Logger,
    @inject(COMPONENT.CONFIG) private readonly configService: Config<RestSchema>,
    @inject(COMPONENT.USER_SERVICE) private readonly userService: UserService,
    @inject(COMPONENT.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT.AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: UserRoute.LOGIN,
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });

    this.addRoute({
      path: UserRoute.REGISTER,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new TokenExistsMiddleware(),
        new ValidateDTOMiddleware(CreateUserDTO)
      ],
    });

    this.addRoute({
      path: UserRoute.LOGIN,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDTOMiddleware(LoginUserDTO)
      ],
    });

    this.addRoute({
      path: UserRoute.FAVORITES,
      method: HttpMethod.Get,
      handler: this.showFavorites,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });

    this.addRoute({
      path: UserRoute.FAVORITES_ID,
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: UserRoute.FAVORITES_ID,
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: UserRoute.AVATAR,
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRDO, result));
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    this.ok(res, fillDTO(LoggedUserRDO, { email: user.email, token }));
  }

  public async checkAuthenticate({ tokenPayload }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(tokenPayload.email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserRDO, foundedUser));
  }

  public async showFavorites({ tokenPayload }: Request, res: Response): Promise<void> {
    const result = await this.userService.getFavorites(tokenPayload.id);
    this.ok(res, fillDTO(ShortOfferRDO, result));
  }

  public async addFavorite({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const favorites = await this.userService.getFavorites(tokenPayload.id);

    if (favorites.map((item) => item._id.toString()).includes(params.offerId)) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Offer ${params.offerId} is already in favorites`,
        'UserController',
      );
    }

    const result = await this.userService.addFavorite(tokenPayload.id, params.offerId);
    this.ok(res, fillDTO(UserRDO, result));
  }

  public async deleteFavorite({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const result = await this.userService.deleteFavorite(tokenPayload.id, params.offerId);
    this.noContent(res, fillDTO(UserRDO, result));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, { filepath: req.file?.path });
  }
}
