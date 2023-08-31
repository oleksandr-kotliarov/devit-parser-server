import logger from '../lib/logging';
import { config } from '../config';
import mongoose from 'mongoose';

export default function connectDb() {
  mongoose
    .connect(config.mongo.url, { w: 'majority', retryWrites: true })
    .then(() => {
      logger.info('Connected to MongoDB.');
    })
    .catch((error) => {
      logger.error(error);
    });
}
