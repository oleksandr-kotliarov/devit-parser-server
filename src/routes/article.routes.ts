import Router from 'express';
import validate from '../middleware/validateResource';
import authMiddleware from '../middleware/auth.middleware';
import * as articleController from '../controller/article.controller';
import {
  createArticleSchema,
  deleteArticleSchema,
  updateArticleSchema,
} from '../schema/article.schema';
import { parseLinkSchema } from '../schema/parseLink.schema';

const articleRouter = Router();

articleRouter.get('/', articleController.getArticles);
articleRouter.post(
  '/',
  validate(createArticleSchema),
  authMiddleware,
  articleController.createArticle
);
articleRouter.patch(
  '/',
  validate(updateArticleSchema),
  authMiddleware,
  articleController.updateArtiicle
);
articleRouter.delete(
  '/',
  validate(deleteArticleSchema),
  authMiddleware,
  articleController.deleteArticle
);
articleRouter.post(
  '/parse',
  validate(parseLinkSchema),
  authMiddleware,
  articleController.parseRss
);

export default articleRouter;
