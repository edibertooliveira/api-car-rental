import ApiError from '@shared/errors/ApiError';
import { logger } from '@config/loggerConfig';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        name: 'Error',
        message: err.message,
      },
    });
  }

  if (err instanceof multer.MulterError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        name: 'Error',
        message: err.message,
      },
    });
  }

  logger.error(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      name: 'Error',
      message: 'Internal server error',
    },
  });
};
