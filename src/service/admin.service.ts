import adminModel, { AdminSchema } from '../models/admin.model';
import { CreateAdminInput } from '../schema/admin.schema';

export const createAdmin = (input: CreateAdminInput) => {
  return adminModel.create(input);
};

export const findAdminByEmail = (email: string) => {
  return adminModel.findOne({ email });
};
