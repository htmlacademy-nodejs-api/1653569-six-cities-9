import chalk from 'chalk';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from './command.interface.js';

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = 'package.json'
  ) {}

  private isPackageJSONConfig(value: unknown): value is {version: string} {
    return (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.hasOwn(value, 'version')
    );
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), {encoding: 'utf-8'});
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!this.isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.green(version));
    } catch (error) {
      console.error(chalk.red(`Failed to read version from ${this.filePath}`));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
