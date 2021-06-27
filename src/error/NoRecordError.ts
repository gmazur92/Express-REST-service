import { StatusCodes,ReasonPhrases } from 'http-status-codes';
import { BaseError } from './BaseError';

export class NoRecordError extends BaseError {
  constructor(description = '') {
    super(StatusCodes.FORBIDDEN, description || ReasonPhrases.FORBIDDEN, true);
  }
}
