import { AdminDto } from '../../dtos/admin.dto';
import { Request } from 'express';

export type AuthRequest = Request & { admin: AdminDto };
