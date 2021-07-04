import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class InvalidError extends BaseError {
  constructor(description = '') {
    super(StatusCodes.UNAUTHORIZED, description || ReasonPhrases.UNAUTHORIZED, true);
  }
}
