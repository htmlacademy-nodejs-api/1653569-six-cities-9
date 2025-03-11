import { Request, Response, NextFunction } from 'express';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';

import { Middleware } from './middleware.interface.js';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const filename = nanoid();
        const fileExtention = extension(file.mimetype);
        callback(null, `${filename}.${fileExtention}`);
      }
    });

    const uploadSingleFileMiddleware = multer({ storage }).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
