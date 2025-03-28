import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { DatabaseClient } from './database-client.interface.js';
import { COMPONENT } from '../../constant/index.js';
import { Logger } from '../logger/index.js';

const STATUS_CONNECTED = 1;

const RETRY = {
  COUNT: 5,
  TIMEOUT: 1000
} as const;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose?: typeof Mongoose;

  constructor(
    @inject(COMPONENT.LOGGER) private readonly logger: Logger
  ) {}

  public get isConnected() {
    return this.mongoose?.connection.readyState === STATUS_CONNECTED;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;
    while (attempt < RETRY.COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(RETRY.TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${RETRY.COUNT} attempts.`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose?.disconnect();
    this.logger.info('Database connection closed.');
  }
}
