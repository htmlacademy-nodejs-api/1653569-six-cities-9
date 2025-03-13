export const Component = {
  RestApplication: Symbol(),
  Logger: Symbol(),
  Config: Symbol(),
  DatabaseClient: Symbol(),
  ExceptionFilter: Symbol(),

  UserModel: Symbol(),
  UserService: Symbol(),
  UserController: Symbol(),

  OfferModel: Symbol(),
  OfferService: Symbol(),
  OfferController: Symbol(),

  CommentModel: Symbol(),
  CommentService: Symbol(),
  CommentController: Symbol(),

  AuthService: Symbol(),
  AuthExceptionFilter: Symbol(),
} as const;
