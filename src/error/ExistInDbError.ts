import { StatusCodes,ReasonPhrases } from 'http-status-codes';
import { BaseError } from './BaseError';

export class ExistInDbError extends BaseError {
  constructor(description = '') {
    super(StatusCodes.CONFLICT, description || ReasonPhrases.CONFLICT, true);
  }
}
