import { resolve } from 'node:path';
import { injectable } from 'inversify';
import { Logger as PinoInstance, pino, transport } from 'pino';

import { Logger } from './logger.interface.js';

const LOG_FILE_PATH = 'logs/rest.log';

const TRANSPORT_OPTION = {
  FILE: 'pino/file',
  LEVEL: {
    DEBUG: 'debug',
    INFO: 'info',
  }
} as const;

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const destination = resolve(LOG_FILE_PATH);
    const multiTransport = transport({
      targets: [
        {
          target: TRANSPORT_OPTION.FILE,
          options: { destination },
          level: TRANSPORT_OPTION.LEVEL.DEBUG,
        },
        {
          target: TRANSPORT_OPTION.FILE,
          options: {},
          level: TRANSPORT_OPTION.LEVEL.INFO,
        }
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created...');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
