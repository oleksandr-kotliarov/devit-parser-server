import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface CodeDocument extends Document {
  code: string;
  createdBy: string;
  createdAt: Date;
}

const CodeSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CodeDocument>('Code', CodeSchema);
