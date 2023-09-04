import { Request, Response } from 'express';
import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';
import multer, { Multer } from 'multer';

const mongoURI = 'mongodb://127.0.0.1:27017/trialshop';

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req: Request, file: Express.Multer.File) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload: Multer = multer({ storage });
export default upload;