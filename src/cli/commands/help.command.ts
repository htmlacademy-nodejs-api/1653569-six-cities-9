import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.bold.redBright('Программа для подготовки данных для REST API сервера.')}
        ${chalk.blue('Примеры:')}
            ${chalk.yellow('cli.js --<command> [--arguments]')}
        ${chalk.blue('Команды:')}
            ${chalk.yellow('--version')}:                    ${chalk.gray('# выводит номер версии (показывает текущую версию проекта)')}
            ${chalk.yellow('--help')}:                       ${chalk.gray('# печатает этот текст (выводит подсказку со списком всех команд)')}
            ${chalk.yellow('--import')} <path>:              ${chalk.gray('# импортирует данные из TSV (по пути path парсит данные из файла tsv для моковых данных)')}
            ${chalk.yellow('--generate')} <n> <path> <url>:  ${chalk.gray('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
