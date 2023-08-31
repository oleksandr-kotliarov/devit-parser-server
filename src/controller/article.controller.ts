import * as articleService from '../service/article.service';
import * as rssService from '../service/rss.service';
import { Request, Response, NextFunction } from 'express';
import {
  CreateArticleInput,
  DeleteArticleInput,
  UpdateArticleInput,
} from '../schema/article.schema';
import { ParseLinkInput } from '../schema/parseLink.schema';

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 1,
      search = '',
    } = req.query;

    const articles = await articleService.getArticles(
      Number(page),
      Number(limit),
      String(sortBy),
      Number(order),
      String(search)
    );
    return res.send(articles);
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (
  req: Request<{}, {}, CreateArticleInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const article = await articleService.createArticle(body);
    return res.send(article);
  } catch (error) {
    next(error);
  }
};

export const updateArtiicle = async (
  req: Request<{}, {}, UpdateArticleInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const article = await articleService.updateArticle(body);
    return res.send(article);
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (
  req: Request<{}, {}, DeleteArticleInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    await articleService.deleteArticle(body._id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const parseRss = async (
  req: Request<{}, {}, ParseLinkInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { href } = req.body;
    await rssService.parseRssFeed(href);
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
