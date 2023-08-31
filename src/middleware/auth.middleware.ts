import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import * as tokenService from '../service/token.service';
import { AuthRequest } from 'types/auth';

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(token);

    if (!userData) {
      next(ApiError.UnauthorizedError());
    }
    req.admin = userData;

    next();
  } catch (error) {
    next(ApiError.UnauthorizedError());
  }
}
