import { object, string, TypeOf } from 'zod';

export const parseLinkSchema = object({
  body: object({
    href: string({ required_error: 'Href if required' }).url(
      'Must be a valid url'
    ),
  }),
});

export type ParseLinkInput = TypeOf<typeof parseLinkSchema>['body'];
