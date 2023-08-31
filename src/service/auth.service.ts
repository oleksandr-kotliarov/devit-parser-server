import { AdminInput, CreateAdminInput } from 'schema/admin.schema';
import * as adminService from './admin.service';
import * as tokenService from './token.service';
import * as codeService from './code.service';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcrypt';
import { AdminDocument } from '../models/admin.model';
import { AdminDto } from '../dtos/admin.dto';

export const saveTokenToDb = async (admin: AdminDocument | AdminDto) => {
  const adminDto = new AdminDto(admin);
  const tokens = tokenService.generateTokens(adminDto);
  await tokenService.saveToken(adminDto._id, tokens.refreshToken);

  return {
    ...tokens,
  };
};

export const registration = async (input: CreateAdminInput) => {
  const candidate = await adminService.findAdminByEmail(input.email);

  if (candidate) {
    throw ApiError.BadRequest('User with this email is already exists');
  }

  await codeService.useCode(input.code);

  const admin = await adminService.createAdmin(input);
  return saveTokenToDb(admin);
};

export const login = async (input: AdminInput) => {
  const adminData = await adminService.findAdminByEmail(input.email);

  if (!adminData) {
    throw ApiError.BadRequest('Email or password is incorrect');
  }

  const comparedPassword = await bcrypt.compare(
    input.password,
    adminData.password
  );

  if (!comparedPassword) {
    throw ApiError.BadRequest('Email or password is incorrect');
  }

  return saveTokenToDb(adminData);
};

export const logout = async (token: string) => {
  await tokenService.removeToken(token);
};

export const refreshTokens = async (token: string) => {
  if (!token) {
    throw ApiError.UnauthorizedError();
  }

  const adminData = tokenService.validateRefreshToken(token);
  const tokenData = await tokenService.findToken(token);

  if (!adminData || !tokenData) {
    throw ApiError.UnauthorizedError();
  }

  return await saveTokenToDb(adminData);
};
