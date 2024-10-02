const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// Route to handle admin registration
router.post('/register', registerAdmin);

// Route to handle admin login
router.post('/login', loginAdmin);

// protected route that only admins can access
router.get('/protected', authenticateToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'This is a protected admin route.' });
});

module.exports = router;
