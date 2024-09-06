class ApiError extends Error {
  status: number;
  data: any;
  success: boolean;
  errors: any;

  constructor(
    status: number,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.status = status;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
