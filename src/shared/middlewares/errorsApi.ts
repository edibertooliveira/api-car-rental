import ApiError from '@shared/errors/ApiError';
import { logger } from '@config/loggerConfig';
import { NextFunction, Request, Response } from 'express';

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

  logger.error(err.message);
  return res.status(500).json({
    error: {
      name: 'Error',
      message: 'Internal server error',
    },
  });
};
