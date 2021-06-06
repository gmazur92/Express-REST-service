import { StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class HTTP404Error extends BaseError {
  constructor(description = '') {
    super('PAGE NOT FOUND', StatusCodes.NOT_FOUND, description, true);
  }
}
