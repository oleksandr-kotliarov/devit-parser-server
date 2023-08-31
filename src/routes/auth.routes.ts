import Router from 'express';
import validate from '../middleware/validateResource';
import { adminSchema, createAdminSchema } from '../schema/admin.schema';
import * as authController from '../controller/auth.controller';
import authMiddleware from '../middleware/auth.middleware';

const authRouter = Router();

authRouter.post(
  '/register',
  validate(createAdminSchema),
  authController.register
);

authRouter.post(
  '/login',
  validate(adminSchema),
  authController.login
)

authRouter.post(
  '/logout',
  authMiddleware,
  authController.logout
)

authRouter.post(
  '/refresh',
  authController.refreshTokens
)

export default authRouter;
