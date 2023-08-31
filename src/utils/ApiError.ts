export default class ApiError extends Error {
  status: number;
  errors: any;

  constructor(status: number, message: string, errors?: any) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Not authorized');
  }

  static BadRequest(message: string, errors?: any) {
    return new ApiError(400, message, errors);
  }

  static NotFound() {
    return new ApiError(404, 'Not found');
  }
}
