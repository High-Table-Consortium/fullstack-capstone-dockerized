const { validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors.
 * Validates the request and sends an error response if validation fails.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const handleValidationErrors = (req, res, next) => {
  // Extract validation errors from the request
  const errors = validationResult(req);
  
  // If there are validation errors, respond with a 400 status code and the errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation errors occurred.',
      errors: errors.array(),
    });
  }
  
  // If no errors, proceed to the next middleware or route handler
  next();
};

module.exports = handleValidationErrors;
