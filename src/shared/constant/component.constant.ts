export const COMPONENT = {
  REST_APPLICATION: Symbol(),
  LOGGER: Symbol(),
  CONFIG: Symbol(),
  DATABASE_CLIENT: Symbol(),
  EXCEPTION_FILTER: Symbol(),

  USER_MODEL: Symbol(),
  USER_SERVICE: Symbol(),
  USER_CONTROLLER: Symbol(),

  OFFER_MODEL: Symbol(),
  OFFER_SERVICE: Symbol(),
  OFFER_CONTROLLER: Symbol(),

  COMMENT_MODEL: Symbol(),
  COMMENT_SERVICE: Symbol(),
  COMMENT_CONTROLLER: Symbol(),

  AUTH_SERVICE: Symbol(),
  AUTH_EXCEPTION_FILTER: Symbol(),
} as const;
