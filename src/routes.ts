import Router, { Express } from 'express';
import codeRouter from './routes/code.routes';
import authRouter from './routes/auth.routes';
import articleRouter from './routes/article.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/codes', codeRouter);
router.use('/articles', articleRouter)

function routes(app: Express) {
  /** Healthcheck */
  app.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));

  app.use('/api', router);
}

export default routes;
