class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.constructor.name);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

module.exports = ApiError;
