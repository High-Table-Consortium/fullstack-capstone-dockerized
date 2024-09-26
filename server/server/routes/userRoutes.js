const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle user login
router.post('/login', loginUser);

// GET route to fetch the logged-in user's profile
router.get('/profile', authenticateToken, getUserProfile);

// PUT route to update the user's profile
router.put('/profile', authenticateToken, updateUserProfile);

// DELETE route to delete the user's account
router.delete('/profile', authenticateToken, deleteUser);

module.exports = router;