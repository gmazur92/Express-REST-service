import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { logger } from '../logger/logger';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const clientError = exception instanceof HttpException ? {
      status: exception.getStatus(), message: exception.getResponse()
    } : {
      status: HttpStatus.INTERNAL_SERVER_ERROR, message: exception.message || 'Internal server error'
    };

    logger.error(clientError.message === typeof 'string' ? clientError.message : JSON.stringify(clientError.message));
    response.status(clientError.status).send(clientError);
  }
}