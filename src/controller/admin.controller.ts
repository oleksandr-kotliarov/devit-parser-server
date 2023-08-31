import { CreateAdminInput } from '../schema/admin.schema';
import * as AdminService from '../service/admin.service';
import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';

export const createAdmin = async (
  req: Request<{}, {}, CreateAdminInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await AdminService.createAdmin(req.body);
    return res.send(omit(admin.toJSON(), 'password'));
  } catch (error) {
    next(error);
  }
};
