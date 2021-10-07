import { StatusCodes } from 'http-status-codes';

export default class ApiError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = StatusCodes.BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
