import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.tujrr2r.mongodb.net/?retryWrites=true&w=majority`;
const CLIENT_URL = process.env.CLIENT_URL;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3000;

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR
  ? Number(process.env.SALT_WORK_FACTOR)
  : 6;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
    client: CLIENT_URL,
  },
  auth: {
    salt: SALT_WORK_FACTOR,
    refreshSecret: REFRESH_SECRET,
    accessSecret: ACCESS_SECRET,
  },
};
