import { config } from '../config';
import { CreateTokensResponse } from '../types/tokens';
import jwt from 'jsonwebtoken';
import tokenModel from '../models/token.model';
import { AdminDto } from '../dtos/admin.dto';

export const generateTokens = (payload: any): CreateTokensResponse => {
  const { accessSecret, refreshSecret } = config.auth;

  const refreshToken = jwt.sign({ ...payload }, refreshSecret, {
    expiresIn: '30d',
  });
  const accessToken = jwt.sign({ ...payload }, accessSecret, {
    expiresIn: '1h',
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const validateRefreshToken = (token: string): AdminDto => {
  const { refreshSecret } = config.auth;

  const adminData = jwt.verify(token, refreshSecret) as AdminDto;
  return adminData;
};

export const validateAccessToken = (token: string) => {
  const { accessSecret } = config.auth;

  const adminData = jwt.verify(token, accessSecret) as AdminDto;
  return adminData;
};

export const saveToken = async (adminId: string, refreshToken: string) => {
  const tokenData = await tokenModel.findOne({ admin: adminId });

  if (tokenData) {
    tokenData.token = refreshToken;
    return tokenData.save();
  }

  const token = await tokenModel.create({
    admin: adminId,
    token: refreshToken,
  });
  return token;
};

export const removeToken = (token: string) => {
  return tokenModel.deleteOne({ token });
};

export const findToken = (token: string) => {
  return tokenModel.findOne({ token });
};
