const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  // Use an environment variable in production

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }
}
function verifyToken (req, res, next) {
	const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.userId = decoded.userId;
    // console.log('Decoded Token:', decoded); // Log to verify token payload
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};

// Middleware for authentication and admin check
// Middleware for session-based authentication
function authenticateSession(req, res, next) {
  console.log("Session Data:", req.session); // Log session data
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ message: "Access denied. Not authenticated." });
  }
  next();
}

// Middleware for admin authorization
function isAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    return res.status(403).json({ message: "Admin access only." });
  }
  next();
}

// // Middleware to ensure user is an admin
// function isAdmin(req, res, next) {
//   if (!req.user.isAdmin) {
//     return res.status(403).json({ message: 'Access denied, admin only!' });
//   }
//   next();
// }

module.exports = { authenticateToken, isAdmin, verifyToken, authenticateSession };
