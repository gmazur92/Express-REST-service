import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from '../logger/logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let req = context.switchToHttp().getRequest();
    let res = context.switchToHttp().getResponse();

    const { url, method, query, body } = req;
    const queryParams = JSON.stringify(query);
    const payload = JSON.stringify(body);
    const start = Date.now();
    return next
      .handle()
      .pipe(tap(() => {
        logger.info(`REQUEST: ${method} URL: ${url}, QUERY: ${queryParams}, BODY: ${payload}`);
        const { statusCode } = res;
        const ms = Date.now() - start;
        logger.info(`RESPONSE: ${method} URL: ${url} STATUS: ${statusCode} - ${ms}ms`);
      }));
  }
}