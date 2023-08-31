import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logging';
import ApiError from '../utils/ApiError';

export default function (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);

  if (err.status) {
    return res
    .status(err.status)
    .json({ message: err.message, errors: err.errors });
  }

  return res.status(500)
  .json({ message: err.message, errors: err.errors });
}
