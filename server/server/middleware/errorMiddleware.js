class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }


const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        message: err.message
      });
    }
  
    // Handle mongoose validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation Error',
        errors: Object.values(err.errors).map(error => error.message)
      });
    }
    // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }

  // Handle JWT expiration
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired'
    });
  }

  // Default to 500 server error
  res.status(500).json({
    message: 'Internal Server Error'
  });
  const notFound = (req, res, next) => {
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
  };
  module.exports = { ApiError, errorHandler, notFound }};