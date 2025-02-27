import mongoose, * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';

const Retry = {
  COUNT: 5,
  TIMEOUT: 1000
} as const;

const States = {
  CONNECTED: 1,
  DISCONNECTED: 0
} as const;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private dbState: mongoose.ConnectionStates;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.dbState = States.DISCONNECTED;
  }

  public get isConnectedToDatabase() {
    return this.dbState === States.CONNECTED;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;
    while (attempt < Retry.COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.dbState = States.CONNECTED;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(Retry.TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${Retry.COUNT} attempts.`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect();
    this.dbState = States.DISCONNECTED;
    this.logger.info('Database connection closed.');
  }
}
