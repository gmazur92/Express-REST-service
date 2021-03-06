import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class HTTP404Error extends BaseError {
  constructor(description = '') {
    super(StatusCodes.NOT_FOUND, description || ReasonPhrases.NOT_FOUND, true);
  }
}
