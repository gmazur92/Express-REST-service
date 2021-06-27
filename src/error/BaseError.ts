export class BaseError extends Error {

  public readonly statusCode : number;

  public readonly isOperational: boolean;

  public readonly description: string;

  constructor(httpCode: number, description: string, isOperational: boolean) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = httpCode;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this);
  }
}
