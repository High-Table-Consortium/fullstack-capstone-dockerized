const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../controllers/userController');
const passport = require('passport');

// Route to handle user registration
router.post('/register', registerUser);

// Route to handle user login
router.post('/login', loginUser);

/**
 * handles route to initiate google oauth
 */
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));


/**
 * callback route for google to redirect to
 */
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

/**
 * handles route to log out user
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;