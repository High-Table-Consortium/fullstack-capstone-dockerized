// Import the review service module
const reviewService = require('../services/reviewService');

// Centralized error handling function for consistency
const handleServerError = (res, error, message = 'Server error') => {
  console.error(message, error);
  return res.status(500).json({ error: message });
};

/**
 * Review Creation Controller
 * Handles the creation of a new review.
 */
exports.createReview = async (req, res) => {
  try {
    const { user_id, attraction_id, comment, rating } = req.body;
    console.log('Received review data:', { user_id, attraction_id, comment, rating });

    if (!user_id || !attraction_id || !comment || rating === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newReview = await reviewService.createReview(user_id, attraction_id, comment, rating);
    console.log('New review created:', newReview);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};

/**
 * Review Fetching Controller
 * Fetches all reviews.
 */
exports.getReviews = async (req, res) => {
  try {
    // Call service to fetch all reviews
    const reviews = await reviewService.getAllReviews();
    // Return success response with all reviews
    res.status(200).json(reviews);
  } catch (error) {
    // Return error response if fetching reviews fails
    return handleServerError(res, error, 'Error while fetching reviews');
  }
};

/**
 * Review Fetching by Destination Controller
 * Fetches all reviews associated with a specific destination (attractionId).
 */
exports.getReviewByDestination = async (req, res) => {
  try {
    const { attractionId } = req.params;  // Extract attractionId from route params
    
    // Call the review service to get reviews by destination
    const reviews = await reviewService.getReviewsByDestination(attractionId);
    
    // Check if reviews exist for the provided destination
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this destination.' });
    }

    // Return success response with the reviews
    res.status(200).json(reviews);
  } catch (error) {
    // Return error response if fetching reviews fails
    return handleServerError(res, error, 'Error while fetching reviews by destination');
  }
};

/**
 * Single Review Fetching Controller
 * Fetches a single review by ID.
 */
exports.getReviewById = async (req, res) => {
  try {
    // Call service to fetch review by ID
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      // Return 404 if review not found
      return res.status(404).json({ message: 'Review not found.' });
    }
    // Return success response with the found review
    res.status(200).json(review);
  } catch (error) {
    // Return error response if fetching review fails
    return handleServerError(res, error, 'Error while fetching review');
  }
};

/**
 * Review Update Controller
 * Handles updating an existing review.
 */
exports.updateReview = async (req, res) => {
  const { content, rating } = req.body; // Extract content and rating from request body

  try {
    // Authorization check: Ensure the review belongs to the authenticated user
    if (req.review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this review.' });
    }

    // Call service to update the review
    const updatedReview = await reviewService.updateReview(req.review, content, rating);
    // Return success response with the updated review
    res.status(200).json(updatedReview);
  } catch (error) {
    // Return error response if review update fails
    return handleServerError(res, error, 'Error while updating review');
  }
};

/**
 * Review Deletion Controller
 * Handles deleting a review.
 */
exports.deleteReview = async (req, res) => {
  try {
    // Authorization check: Ensure the review belongs to the authenticated user
    if (req.review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this review.' });
    }

    // Call service to delete the review
    await reviewService.deleteReview(req.review);
    // Return success response with no content
    res.status(204).json({ message: 'Review deleted successfully.' });
  } catch (error) {
    // Return error response if review deletion fails
    return handleServerError(res, error, 'Error while deleting review');
  }
};

/**
 * Middleware: Fetch review by ID
 * Attaches the found review to the request object for further processing.
 */
exports.findReviewById = async (req, res, next) => {
  try {
    // Call service to fetch review by ID
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      // Return 404 if review not found
      return res.status(404).json({ message: 'Review not found.' });
    }
    req.review = review; // Attach review to request object
    next();
  } catch (error) {
    // Return error response if fetching review fails
    return handleServerError(res, error, 'Error while fetching review');
  }
};
