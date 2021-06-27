import { StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class APIError extends BaseError {
  constructor(statusCode = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true, description = 'internal server error') {
    super(statusCode, description, isOperational);
  }
}
