const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator'); // Import express-validator for validation
const { createReview, getReviews, getReviewById, updateReview, deleteReview } = require('../../server/controllers/reviewController');
const { authenticateToken } = require('../../server/middleware/authMiddleware');
const handleValidationErrors = require('../../server/middleware/validationMiddleware');

// Route to create a new review with validation
router.post(
  '/',
  authenticateToken, // Ensures the user is authenticated
  [
    body('content').isLength({ min: 5 }).withMessage('Review content must be at least 5 characters long'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
  ],
  handleValidationErrors, // Middleware to handle validation errors
  createReview // Controller to create a review
);

// Route to get all reviews (no validation needed)
router.get('/', getReviews);

// Route to get a single review by its ID with validation
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid review ID format'), // Validates that the ID is a MongoDB ObjectId
  ],
  handleValidationErrors, // Middleware to handle validation errors
  getReviewById // Controller to get review by ID
);

// Route to update a review with validation
router.put(
  '/:id',
  authenticateToken, // Ensures the user is authenticated
  [
    param('id').isMongoId().withMessage('Invalid review ID format'), // Validates that the ID is a MongoDB ObjectId
    body('content').optional().isLength({ min: 5 }).withMessage('Review content must be at least 5 characters long'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
  ],
  handleValidationErrors, // Middleware to handle validation errors
  updateReview // Controller to update a review
);

// Route to delete a review with validation
router.delete(
  '/:id',
  authenticateToken, // Ensures the user is authenticated
  [
    param('id').isMongoId().withMessage('Invalid review ID format'), // Validates that the ID is a MongoDB ObjectId
  ],
  handleValidationErrors, // Middleware to handle validation errors
  deleteReview // Controller to delete a review
);

module.exports = router;
