// Import required modules
const Admin = require("..//models/adminModel");
const { body, validationResult } = require("express-validator");
const { generateAdminTokenAndSetCookie } = require("../utils/generateTokenAndSetCookie");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "your-session-secret";

const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const sendResponse = (res, status, message, data = null) => {
  res.status(status).json({ success: status < 400, message, data });
};
// Helper function to generate a JWT
/**
 * Generates a JSON Web Token for the given admin.
 * @param {Object} admin - Admin object
 * @returns {String} JWT token
 */
function generateToken(admin) {
  return jwt.sign({ id: admin._id, isAdmin: admin.isAdmin }, JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
}

/**
 * Admin Registration Controller
 * Handles admin registration.
 */
exports.registerAdmin = [
  // Validation middleware
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Validation failed", errors.array());
    }

    const { email, password } = req.body;

    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return sendResponse(res, 400, "Admin already exists.");
      }

      const admin = new Admin({ email, password, isAdmin: true });
      await admin.save();

      logger.info(`Admin ${admin.email} registered successfully.`);
      sendResponse(res, 201, "Admin registered successfully.", {
        admin: {
          id: admin._id,
          email: admin.email,
        },
      });
    } catch (error) {
      logger.error("Register admin error: ", error.message);
      sendResponse(res, 500, "An error occurred while registering the admin.");
    }
  },
];

/** 
 * Admin Login Controller
 * Handles admin login.
*/
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.isAdmin) {
      return sendResponse(res, 400, "Invalid credentials or not an admin account.");
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, "Invalid credentials.");
    }

    const token = generateAdminTokenAndSetCookie(res, admin._id); // Assumes a function to generate token and set it as a cookie

    sendResponse(res, 200, "Admin logged in successfully", {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    sendResponse(res, 500, "An error occurred while logging in.");
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin) {
      return sendResponse(res, 404, "Admin not found.");
    }
    sendResponse(res, 200, "Admin profile retrieved successfully.", admin);
  } catch (error) {
    logger.error("Fetch user profile error: ", error.message);
    sendResponse(
      res,
      500,
      "An error occurred while fetching the user profile."
    );
  }
};

exports.logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};