const Review = require('../models/reviewModel');

/**
 * Create a new review
 * @param {String} content - The content of the review
 * @param {Number} rating - The rating of the review
 * @param {String} userId - The ID of the user creating the review
 * @param {String} attractionId - The ID of the attraction being reviewed
 * @returns {Object} The created review
 */
const createReview = async (comment, rating, userId, attractionId) => {
  try {
    const review = new Review({
      comment,
      rating,
      user_id: userId,
      attraction_id: attractionId,
    });

    // Save the new review and return it
    return await review.save();
  } catch (error) {
    console.error('Error creating review:', error);
    throw new Error('Unable to create review');
  }
};

/**
 * Get all reviews
 * @returns {Array} List of all reviews
 */
const getAllReviews = async () => {
  try {
    // Populate user_id and attraction_id fields to get details about the user and attraction
    return await Review.find()
      .populate('user_id', 'name avatar') // populate user fields for display
      .populate('attraction_id', 'name location'); // populate attraction fields for display
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Unable to fetch reviews');
  }
};

/**
 * Get a review by ID
 * @param {String} reviewId - The ID of the review to fetch
 * @returns {Object} The fetched review
 */
const getReviewById = async (reviewId) => {
  try {
    const review = await Review.findById(reviewId)
      .populate('user_id', 'name avatar') // populate user fields for display
      .populate('attraction_id', 'name location'); // populate attraction fields for display

    if (!review) {
      throw new Error('Review not found');
    }
    
    return review;
  } catch (error) {
    console.error(`Error fetching review with ID ${reviewId}:`, error);
    throw new Error('Unable to fetch review');
  }
};

/**
 * Update a review
 * @param {String} reviewId - The ID of the review to update
 * @param {String} content - The new content of the review
 * @param {Number} rating - The new rating of the review
 * @returns {Object} The updated review
 */
const updateReview = async (reviewId, content, rating) => {
  try {
    // Find the review by its ID
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error('Review not found');
    }

    // Update fields
    review.content = content;
    review.rating = rating;

    // Save and return the updated review
    return await review.save();
  } catch (error) {
    console.error(`Error updating review with ID ${reviewId}:`, error);
    throw new Error('Unable to update review');
  }
};

/**
 * Delete a review
 * @param {String} reviewId - The ID of the review to delete
 */
const deleteReview = async (reviewId) => {
  try {
    // Find the review by its ID
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error('Review not found');
    }

    // Remove the review
    await review.remove();
  } catch (error) {
    console.error(`Error deleting review with ID ${reviewId}:`, error);
    throw new Error('Unable to delete review');
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
