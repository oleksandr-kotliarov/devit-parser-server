import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from '../config';

export interface AdminDocument extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AdminSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

AdminSchema.pre('save', async function (next) {
  let admin = this as AdminDocument;

  if (!admin.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.auth.salt);
  const hash = bcrypt.hashSync(admin.password, salt);

  admin.password = hash;
  return next();
});

export default mongoose.model<AdminDocument>('Admin', AdminSchema);
