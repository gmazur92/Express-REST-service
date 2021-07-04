import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import authRouter from './resources/auth/auth.router';
import { errorHandler } from './middleware/handleError.middleware';
import { BaseError } from './error/BaseError';
import { logger } from './logger/logger';
import { loggerRequestManager } from './middleware/loggerRequestManager.middleware';
import { HTTP404Error } from './error/NotFoundError';
import authMiddleware from './middleware/auth.middleware';
import { AUTH_MODE } from './common/config';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(loggerRequestManager);
app.use('/', (req: Request, res: Response, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', authRouter);

if (AUTH_MODE) app.use(authMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use('*', (_req: Request, _res: Response) => {
  throw new HTTP404Error();
});

app.use(async (err: BaseError, req: Request, res: Response, next: NextFunction) => errorHandler.handleError(err, req, res, next));

process.on('uncaughtException', (error: Error) => {
  logger.error('uncaughtException', {stack: JSON.stringify(error.stack)});
  setTimeout(() => process.exit(1), 1000);
}).on('unhandledRejection', (error: Error) => {
  logger.error('unhandledRejection', {stack: JSON.stringify(error.stack)});
  setTimeout(() => process.exit(1), 1000);
});

export default app;
