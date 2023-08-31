import { CreateTokensResponse } from '../types/tokens';
import { AdminInput, CreateAdminInput } from '../schema/admin.schema';
import * as authService from '../service/auth.service';
import { NextFunction, Request, Response } from 'express';
import { TOKENS_AGE } from '../utils/refreshTokenAge';
import { AuthRequest } from 'types/auth';

export const register = async (
  req: Request<{}, {}, CreateAdminInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const authResponse = await authService.registration(req.body);
    setRefreshToken(res, authResponse);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, AdminInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const authResponse = await authService.login(req.body);
    setRefreshToken(res, authResponse);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cookies } = req;
    const refreshToken = cookies.refreshToken || '';

    await authService.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cookies } = req;
    const refreshToken = cookies.refreshToken || '';

    const tokens = await authService.refreshTokens(refreshToken);
    setRefreshToken(res, tokens);
  } catch (error) {
    next(error);
  }
};

const setRefreshToken = (res: Response, data: CreateTokensResponse) => {
  res.cookie('refreshToken', data.refreshToken, {
    httpOnly: true,
    maxAge: TOKENS_AGE.refresh,
  });
  return res.send(data);
};
