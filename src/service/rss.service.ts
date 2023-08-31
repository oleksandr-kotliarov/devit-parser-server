import ApiError from '../utils/ApiError';
import parser from '../lib/rss-parser';
import * as articleService from './article.service';

export const parseRssFeed = async (href: string) => {
  try {
    const feed = await parser.parseURL(href);

    feed.items.forEach((item) => {
      if (!item.title) {
        throw ApiError.BadRequest('Item title is empty in that feed');
      }

      articleService.createArticle(item);
    });
  } catch (error) {
    throw ApiError.BadRequest(
      'An error occurred while parsing your request, try another link'
    );
  }
};
