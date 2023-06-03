import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as multer from 'multer';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
  private upload: multer.Multer;

  constructor() {
    this.upload = multer({
      storage: diskStorage({
        destination: (req, file, callback) => {
          const directoryPath = path.join(__dirname, '..', '..', 'images');
          callback(null, directoryPath);
        },
        filename: (req, file, callback) => {
          const fileName = uuidv4() + path.extname(file.originalname);
          callback(null, fileName);
        },
      }),
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    this.upload.single('photo')(req, res, (err: any) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      // Update req.body.photo with the file path
      req.body.photo = req.file.path;

      next();
    });
  }
}
