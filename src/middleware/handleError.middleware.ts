import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../error/BaseError';
import { logger } from '../logger/logger';

class ErrorHandler {
  public async handleError(err: BaseError, _req: Request, res: Response, _next: NextFunction): Promise<void> {
    const isErrorSafeForClient = this.isTrustedError(err);
    const clientError = isErrorSafeForClient
      ? {
        message: err.name,
        status: err.statusCode,
        data: err.stack,
      }
      : {
      code: 'Internal error',
      message: 'Something went wrong',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: {}
    };

    await logger.error('', clientError);
    clientError.data = {};
    res.status(clientError.status).send({error: clientError});
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
