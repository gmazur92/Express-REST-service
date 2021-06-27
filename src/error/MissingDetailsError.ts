import { StatusCodes,ReasonPhrases } from 'http-status-codes';
import { BaseError } from './BaseError';

export class MissingDetailsError extends BaseError {
  constructor(description = '') {
    super(StatusCodes.BAD_REQUEST, description || ReasonPhrases.BAD_REQUEST, true);
  }
}
