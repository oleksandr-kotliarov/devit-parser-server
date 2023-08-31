import { AdminDocument } from 'models/admin.model';

export class AdminDto {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(admin: AdminDocument | AdminDto) {
    this._id = admin._id;
    this.email = admin.email;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
  }
}
