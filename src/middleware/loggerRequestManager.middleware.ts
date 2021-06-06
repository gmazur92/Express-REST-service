import express from 'express';
import { finished } from 'stream';
import { logger } from '../logger/logger';

export const loggerRequestManager = (req: express.Request, res: express.Response, next: express.NextFunction): any => {
  const {url, method, query, body} = req;
  const queryParams = JSON.stringify(query);
  const payload = JSON.stringify(body);
  const start = Date.now();
  next();
  finished(res, () => {
    logger.info(`REQUEST: ${method} URL: ${url}, QUERY: ${queryParams}, BODY: ${payload}`);
    const {statusCode} = res;
    const ms = Date.now() - start;
    logger.info(`RESPONSE: ${method} URL: ${url} STATUS: ${statusCode} - ${ms}ms`);
  });
};
