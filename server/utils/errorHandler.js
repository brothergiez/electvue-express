
class MyError extends Error {
  constructor(message, code, status) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = status;
    this.error = code;
    this.message = message;
  }
};

module.exports.ForbiddenError = class extends MyError {
  constructor() {
    super('Site access denied.', 'Forbidden', 403);
  }
};

module.exports.InvalidTokenError = class extends MyError {
  constructor() {
    super('Specified token is invalid.', 'InvalidToken', 401);
  }
};

module.exports.ResponseError = class ResponseError extends MyError {
  constructor(message, code, status) {
    super(message);
    // Error.captureStackTrace(this, this.constructor);
    // this.name = this.constructor.name;
    this.code = code;
    this.statusCode = status;
    this.error = code;
    this.message = message;
  }
};