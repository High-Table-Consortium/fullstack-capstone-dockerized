const express = require('express');
const router = express.Router();
const {
  getFavourites,
  getFavouriteById,
  createFavourite,
  updateFavourite,
  removeFavourite,
} = require('../controllers/favourites');
const { authenticateToken } = require('../middleware/authMiddleware');
const { handleValidationErrors } = require('../middleware/handleValidation');

// Get all favourites
router.get('/', getFavourites);

// Get a specific favourite by ID
router.get('/:id', authenticateToken, getFavouriteById);

// Create a new favourite
router.post('/', authenticateToken, createFavourite);

// Update a favourite
router.put('/:id', authenticateToken, updateFavourite);

// Delete a favourite
router.delete('/', authenticateToken, removeFavourite);

module.exports = router;

