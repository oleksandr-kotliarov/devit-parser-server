import articleModel from '../models/article.model';
import {
  CreateArticleInput,
  UpdateArticleInput,
} from '../schema/article.schema';

export const getArticles = async (
  page: number,
  limit: number,
  sortBy: string,
  order: number,
  search: string
) => {
  const searchQuery = search
    ? { $text: { $search: search, $caseSensitive: false } }
    : {};

  const list = await articleModel
    .find(searchQuery)
    .sort({ [sortBy]: order === 1 ? 1 : -1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const total = await articleModel.countDocuments(searchQuery);

  return {
    list,
    total,
    page,
    limit,
  };
};

export const getArticleById = (_id: string) => {
  return articleModel.findOne({ _id });
};

export const createArticle = (input: CreateArticleInput) => {
  return articleModel.create(input);
};

export const updateArticle = async (input: UpdateArticleInput) => {
  const { _id, ...fields } = input;
  await articleModel.updateOne({ _id }, { $set: { ...fields } });

  return getArticleById(_id);
};

export const deleteArticle = (_id: string) => {
  return articleModel.deleteOne({ _id });
};
