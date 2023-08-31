import codeModel from '../models/code.model';
import ApiError from '../utils/ApiError';
import { v4 as uuidv4 } from 'uuid';

export const createCode = (createdBy: string) => {
  return codeModel.create({ createdBy, code: uuidv4() });
};

export const removeCode = (code: string) => {
  return codeModel.deleteOne({ code });
};

export const useCode = async (code: string) => {
  const codeFromDb = await codeModel.findOne({ code });

  if (!codeFromDb) {
    throw ApiError.BadRequest('Registration code is not valid');
  }

  await codeModel.deleteOne({ _id: codeFromDb._id });
  return true;
};
