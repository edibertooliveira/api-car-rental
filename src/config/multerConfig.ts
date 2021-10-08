import ApiError from '@shared/errors/ApiError';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

interface IUploadConfig {
  directory: string;
  multer: {
    storage: StorageEngine;
  };
}

function fileFilter(req, file, cb) {
  if (!file.originalname.match(/\.(csv)$/)) {
    return cb(new ApiError('Please upload a csv file'), false);
  }
  cb(null, true);
}

export const uploadFolder = path.resolve(__dirname, '..', '..', 'database');

export default {
  directory: uploadFolder,
  multer: {
    limits: { fileSize: '1000000' },
    fileFilter,
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(_req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },
    }),
  },
} as IUploadConfig;
