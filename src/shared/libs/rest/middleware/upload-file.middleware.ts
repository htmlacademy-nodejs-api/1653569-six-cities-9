import { Request, Response, NextFunction } from 'express';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

const ALLOWED = {
  MIMETYPES: ['image/jpeg', 'image/png'] as string[],
  EXTENSIONS: ['jpg', 'png'] as string[],
} as const;

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

    const fileFilter = (_req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void => {
      const isValidMimetype = ALLOWED.MIMETYPES.includes(file.mimetype);
      const isValidExtension = ALLOWED.EXTENSIONS.includes(file.originalname.split('.').pop() as string);

      if (isValidMimetype && isValidExtension) {
        return callback(null, true);
      }

      return callback(new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid file type, only JPG and PNG are allowed!',
        'UploadFileMiddleware'
      ));
    };

    const uploadSingleFileMiddleware = multer({ storage, fileFilter }).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
