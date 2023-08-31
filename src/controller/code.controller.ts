import { Request, Response, NextFunction } from 'express';
import * as codeService from '../service/code.service';
import { AuthRequest } from '../types/auth';

export const createCode = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { admin } = req;
    const code = await codeService.createCode(admin.email);
    res.send(code);
  } catch (error) {
    next(error);
  }
};
