const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, logout, getUserProfile } = require('../controllers/adminController');
const { authenticateToken, isAdmin, verifyToken, authenticateSession } = require('../middleware/authMiddleware');

// Route to handle admin registration
router.post('/register', registerAdmin);

// Route to handle admin login

router.post('/login', loginAdmin);
router.post('/logout', logout)
router.get('/check-auth', authenticateSession, getUserProfile)
// protected route that only admins can access
router.get('/protected', authenticateSession, isAdmin, (req, res) => {
  res.status(200).json({ message: 'This is a protected admin route.' });
});


module.exports = router;
