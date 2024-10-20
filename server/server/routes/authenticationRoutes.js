const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyEmail, resetPassword, forgotPassword, logout, checkAuth} = require('../controllers/userController');
const passport = require('passport');
const { verifyToken, authenticateToken } = require('../middleware/authMiddleware');


/**
 * handles route to register user
 */
router.post('/register', registerUser);

/**
 * handles route to login user
 */
router.post('/login', loginUser);

/**
 * handles route to initiate google oauth
 */
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));


/**
 * callback route for google to redirect to
 */
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/auth/signin' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  });

/**
 * handles route to log out user
 */
router.get('/logout', logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", authenticateToken, checkAuth);
module.exports = router;
