import { createHash } from 'node:crypto';

export const createSHA256 = (line: string, salt: string): string =>
  createHash('sha256').update(`${line}${salt}`).digest('hex');
