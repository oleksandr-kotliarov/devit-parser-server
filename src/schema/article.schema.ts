import { object, string, TypeOf, optional } from 'zod';

const articleFields = {
  description: optional(string()),
  link: optional(string()),
  pubDate: optional(string()),
  creator: optional(string()),
  content: optional(string()),
  guid: optional(string()),
};

export const createArticleSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    ...articleFields,
  }),
});

export const updateArticleSchema = object({
  body: object({
    _id: string({ required_error: 'Article Id is required' }),
    title: optional(string()),
    ...articleFields,
  }),
});

export const deleteArticleSchema = object({
  body: object({
    _id: string({ required_error: 'Article Id is required' }),
  }),
});

export type CreateArticleInput = TypeOf<typeof createArticleSchema>['body'];
export type UpdateArticleInput = CreateArticleInput & { _id: string };
export type DeleteArticleInput = { _id: string };
