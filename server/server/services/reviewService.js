const Review = require('../../server/models/reviewModel');

/**
 * Create a new review
 * @param {String} content - The content of the review
 * @param {Number} rating - The rating of the review
 * @param {String} userId - The ID of the user creating the review
 * @param {String} attractionId - The ID of the attraction being reviewed
 * @returns {Object} The created review
 */
const createReview = async (content, rating, userId, attractionId) => {
  const review = new Review({
    content,
    rating,
    user_id: userId,
    attraction_id: attractionId,
  });
  return await review.save();
};

/**
 * Get all reviews
 * @returns {Array} List of all reviews
 */
const getAllReviews = async () => {
  return await Review.find().populate('user_id').populate('attraction_id');
};

/**
 * Get a review by ID
 * @param {String} reviewId - The ID of the review to fetch
 * @returns {Object} The fetched review
 */
const getReviewById = async (reviewId) => {
  return await Review.findById(reviewId).populate('user_id').populate('attraction_id');
};

/**
 * Update a review
 * @param {Object} review - The review object to update
 * @param {String} content - The new content of the review
 * @param {Number} rating - The new rating of the review
 * @returns {Object} The updated review
 */
const updateReview = async (review, content, rating) => {
  review.content = content;
  review.rating = rating;
  return await review.save();
};

/**
 * Delete a review
 * @param {Object} review - The review object to delete
 */
const deleteReview = async (review) => {
  await review.remove();
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
