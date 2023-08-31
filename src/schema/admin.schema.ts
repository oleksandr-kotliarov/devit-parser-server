import { object, string, TypeOf } from 'zod';

const loginFields = {
  email: string({
    required_error: 'Email is required',
  }).email('Email should be a valid email address'),
  password: string({
    required_error: 'Password is required',
  }).min(6, 'Password should be 6 characters minimum'),
};

export const createAdminSchema = object({
  body: object({
    ...loginFields,
    code: string({ required_error: 'Registration code is required' }),
  }),
});

export const adminSchema = object({
  body: object({
    ...loginFields,
  }),
});

export type CreateAdminInput = TypeOf<typeof createAdminSchema>['body'];
export type AdminInput = Omit<CreateAdminInput, 'code'>;
