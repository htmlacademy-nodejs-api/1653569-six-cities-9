import { createWriteStream, WriteStream } from 'node:fs';
import { FileWriter } from './file-writer.interface.js';
import { ENCODING_DEFAULT } from '../../constant/index.js';

const FLAG_OPTION = 'w';
const EVENT_NAME = 'drain';

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: FLAG_OPTION,
      encoding: ENCODING_DEFAULT,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${row}\n`);

    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once(EVENT_NAME, () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
