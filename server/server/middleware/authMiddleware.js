const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  // Use an environment variable in production

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied, token missing!' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);  // Bearer <token>
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
}

// Middleware to ensure user is an admin
function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied, admin only!' });
  }
  next();
}

module.exports = { authenticateToken, isAdmin };
