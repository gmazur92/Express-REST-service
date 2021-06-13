export class BaseError extends Error {
  public readonly name: string;

  public readonly statusCode : number;

  public readonly isOperational: boolean;

  constructor(name: string, httpCode: number, description: string, isOperational: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
