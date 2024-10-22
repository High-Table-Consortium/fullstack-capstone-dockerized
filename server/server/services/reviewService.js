const Review = require('../models/reviewModel');
const User = require('../models/usersModel'); // Make sure to require the User model

/**
 * Create a new review
 * @param {String} content - The content of the review
 * @param {Number} rating - The rating of the review
 * @param {String} userId - The ID of the user creating the review
 * @param {String} attractionId - The ID of the attraction being reviewed
 * @returns {Object} The created review
 */
const createReview = async (user_id, attraction_id, comment, rating) => {
  try {
    // First, check if the user exists and get their firstName
    const user = await User.findById(user_id).select('firstName');
    if (!user) {
      throw new Error('User not found');
    }

    const newReview = new Review({
      user_id,
      attraction_id,
      comment,
      rating,
      userFirstName: user.firstName // Add the firstName to the review
    });

    const savedReview = await newReview.save();

    // Populate the user field with only the firstName
    await savedReview.populate('user_id', 'firstName');

    return savedReview;
  } catch (error) {
    console.error('Error in createReview service:', error);
    throw error;
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
 * Get reviews by destination
 * @param {String} attractionId - The ID of the destination
 * @returns {Promise<Array>} - List of reviews for the destination
 */
/**
 * Get reviews by destination
 * @param {String} attractionId - The ID of the destination
 * @returns {Promise<Array>} - List of reviews for the destination, including user and destination details
 */
const getReviewsByDestination = async (attractionId) => {
  try {
    const reviews = await Review.find({ attraction_id: attractionId })
      .populate('attraction_id', 'name location')
      .populate('user_id', 'firstName image')
      .populate('comments.user', 'firstName image');
    
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews by destination:', error);
    throw new Error('Unable to fetch reviews by destination');
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

/**
 * Add a comment to a review
 * @param {String} reviewId - The ID of the review
 * @param {String} userId - The ID of the user adding the comment
 * @param {String} text - The comment text
 * @returns {Object} The updated review
 */
const addCommentToReview = async (reviewId, userId, text) => {
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }

    const user = await User.findById(userId).select('firstName image');
    if (!user) {
      throw new Error('User not found');
    }

    const newComment = {
      user: userId,
      text: text,
      createdAt: new Date()
    };

    review.comments.push(newComment);
    await review.save();

    // Return the new comment with user details
    return {
      ...newComment,
      user: {
        _id: user._id,
        firstName: user.firstName,
        image: user.image
      }
    };
  } catch (error) {
    console.error('Error in addCommentToReview service:', error);
    throw error;
  }
};

/**
 * Get comments for a review
 * @param {String} reviewId - The ID of the review
 * @returns {Array} List of comments for the review
 */
const getCommentsForReview = async (reviewId) => {
  try {
    const review = await Review.findById(reviewId)
      .populate('comments.user', 'firstName image');
    if (!review) {
      throw new Error('Review not found');
    }
    return review.comments;
  } catch (error) {
    console.error('Error in getCommentsForReview service:', error);
    throw error;
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByDestination,
  getReviewById,
  updateReview,
  deleteReview,
  addCommentToReview,
  getCommentsForReview
};
