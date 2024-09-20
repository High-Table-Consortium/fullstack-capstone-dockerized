const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
} = require('../controllers/userController');
const { validateRegistration, validateLogin, validateProfileUpdate } = require('../validators/userValidator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', validateRegistration, async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
});

// Route for user login
router.post('/login', validateLogin, async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid credentials.' });
    }
});

// Route to get the authenticated user's profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userProfile = await getUserProfile(req.user.id);
        res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user profile.' });
    }
});

// Route to update the authenticated user's profile
router.put('/profile', authMiddleware, validateProfileUpdate, async (req, res) => {
    try {
        const updatedProfile = await updateUserProfile(req.user.id, req.body);
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the profile.' });
    }
});

module.exports = router;
