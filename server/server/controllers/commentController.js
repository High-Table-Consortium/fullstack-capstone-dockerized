const { body, param, validationResult } = require('express-validator'); // Import express-validator functions
const Comment = require("../models/commentModel"); // Import the Comment model

/** 
 * Create Comment Controller
 * Handles creating a new comment.
*/
exports.createComment = [
  // Validation middleware
  body('userId').isString().notEmpty(), // Validate userId: must be a non-empty string
  body('attractionSiteId').isString().notEmpty(), // Validate attractionSiteId: must be a non-empty string
  body('content').isString().notEmpty(), // Validate content: must be a non-empty string
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return 400 status code with validation errors if any
    }
    try {
      const { userId, attractionSiteId, content } = req.body; // Extract data from request body
      const comment = new Comment({ userId, attractionSiteId, content }); // Create a new Comment instance
      await comment.save(); // Save the new comment to the database
      res.status(201).json(comment); // Respond with the created comment and a 201 status code
    } catch (error) {
      res.status(500).json({ message: error.message }); // Respond with a 500 status code and the error message if an error occurs
    }
  }
];

/** 
 * Get Comments By Attraction Site Controller
 * Handles getting comments by attraction site.
*/
exports.getCommentsByAttractionSite = [
  // Validation middleware
  param('attractionSiteId').isString().notEmpty(), // Validate attractionSiteId: must be a non-empty string
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return 400 status code with validation errors if any
    }
    try {
      const { attractionSiteId } = req.params; // Extract attractionSiteId from request parameters
      const comments = await Comment.find({ attractionSiteId }); // Find all comments with the given attractionSiteId
      res.status(200).json(comments); // Respond with the found comments and a 200 status code
    } catch (error) {
      res.status(500).json({ message: error.message }); // Respond with a 500 status code and the error message if an error occurs
    }
  }
];

/** 
 * Update Comment Controller
 * Handles updating a comment by its ID.
*/
exports.updateComment = [
  // Validation middleware
  param('commentId').isString().notEmpty(), // Validate commentId: must be a non-empty string
  body('content').isString().notEmpty(), // Validate content: must be a non-empty string
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return 400 status code with validation errors if any
    }
    try {
      const { commentId } = req.params; // Extract commentId from request parameters
      const { content } = req.body; // Extract content from request body
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      ); // Find the comment by its ID and update its content
      res.status(200).json(updatedComment); // Respond with the updated comment and a 200 status code
    } catch (error) {
      res.status(500).json({ message: error.message }); // Respond with a 500 status code and the error message if an error occurs
    }
  }
];

/** 
 * Delete Comment Controller
 * Handles deleting a comment by its ID.
*/
exports.deleteComment = [
  // Validation middleware
  param('commentId').isString().notEmpty(), // Validate commentId: must be a non-empty string
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return 400 status code with validation errors if any
    }
    try {
      const { commentId } = req.params; // Extract commentId from request parameters
      await Comment.findByIdAndDelete(commentId); // Find the comment by its ID and delete it from the database
      res.status(204).send(); // Respond with a 204 status code indicating successful deletion and no content
    } catch (error) {
      res.status(500).json({ message: error.message }); // Respond with a 500 status code and the error message if an error occurs
    }
  }
];

/** 
 * Get Comments By User Controller
 * Handles getting comments by user.
*/
exports.getCommentsByUser = [
  // Validation middleware
  param('userId').isString().notEmpty(), // Validate userId: must be a non-empty string
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return 400 status code with validation errors if any
    }
    try {
      const { userId } = req.params; // Extract userId from request parameters
      const comments = await Comment.find({ userId }); // Find all comments with the given userId
      res.status(200).json(comments); // Respond with the found comments and a 200 status code
    } catch (error) {
      res.status(500).json({ message: error.message }); // Respond with a 500 status code and the error message if an error occurs
    }
  }
];
