import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from './lib/logging';
import { config } from './config';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger/openapi.json';
import routes from './routes';
import errorMiddleware from './middleware/error.middleware';
import ApiError from './utils/ApiError';
import connectDb from './utils/connectDb';

const app = express();

/** Connect to Mongo */
connectDb();

/** Only start the server if Mogno Connects */
const StartServer = () => {
  app.use((req, res, next) => {
    /** Log the Request */
    logger.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      /** Log the Response */
      logger.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(cors({ credentials: true, origin: config.server.client }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  /** Routes */
  routes(app);

  /** Swagger */
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  /** Error handling */
  app.use((req, res, next) => {
    next(ApiError.NotFound());
  });
  app.use(errorMiddleware);

  http
    .createServer(app)
    .listen(config.server.port, () =>
      logger.info(`Server is running on PORT=${config.server.port}`)
    );
};

StartServer();

export default app;
