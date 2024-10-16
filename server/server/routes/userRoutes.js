const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUser } = require('../../server/controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');


// GET route to fetch the logged-in user's profile

router.get('/profile', verifyToken, getUserProfile); 


// PUT route to update the user's profile
router.put('/profile', verifyToken, updateUserProfile);

// DELETE route to delete the user's account
router.delete('/profile', verifyToken, deleteUser);

module.exports = router;