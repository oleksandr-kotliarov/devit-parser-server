import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface TokenDocument extends Document {
  token: string;
  createdAt: Date;
  admin: ObjectId;
}

const TokenSchema: Schema = new Schema(
  {
    token: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<TokenDocument>('Token', TokenSchema);
