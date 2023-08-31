import mongoose, { Schema } from 'mongoose';

interface ArticleDocument extends Document {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  guid: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    link: { type: String },
    pubDate: { type: String },
    creator: { type: String },
    content: { type: String },
    guid: { type: String },
  },
  { timestamps: true }
);

ArticleSchema.index({
  title: 'text',
  description: 'text',
  creator: 'text',
  content: 'text',
});

export default mongoose.model<ArticleDocument>('Article', ArticleSchema);
