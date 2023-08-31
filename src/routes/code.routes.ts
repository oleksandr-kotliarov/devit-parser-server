import Router from 'express';
import * as codeController from '../controller/code.controller';
import authMiddleware from '../middleware/auth.middleware';

const codeRouter = Router();

codeRouter.post('/', authMiddleware, codeController.createCode);

export default codeRouter;
