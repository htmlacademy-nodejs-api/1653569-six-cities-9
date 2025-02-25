import * as crypto from 'node:crypto';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHash('sha256');
  return shaHasher.update(`${line}${salt}`).digest('hex');
};
