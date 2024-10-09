const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const winston = require("winston");

const JWT_SECRET = process.env.JWT_SECRET || "Encripted_Secret";

// Set up logging
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

/*

*/
function generateToken(user) {
  if (!JWT_SECRET) {
    logger.error(
      "JWT_SECRET is not defined. Please check your environment variables."
    );
    throw new Error("JWT_SECRET is not defined.");
  }
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
}

// Consistent response format
const sendResponse = (res, status, message, data = null) => {
  res.status(status).json({ success: status < 400, message, data });
};

/**
 * User Registration Controller
 * Handles user registration.
 */
exports.registerUser = [
  // Validation middleware
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Validation failed", errors.array());
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return sendResponse(res, 400, "User already exists.");
      }

      const user = new User({ firstName, lastName, email, password });
      await user.save();

      const token = generateToken(user);
      sendResponse(res, 201, "User registered successfully.", { token });
    } catch (error) {
      logger.error("Register user error: ", error.message);
      sendResponse(res, 500, "An error occurred while registering the user.");
    }
  },
];

/**
 * User Login Controller
 * Handles user login.
 */

exports.loginUser = [
  // Validation middleware
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Validation failed", errors.array());
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return sendResponse(res, 400, "User not found.");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return sendResponse(res, 400, "Invalid email or password.");
      }

      const token = generateToken(user);

      // Set the JWT token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      sendResponse(res, 200, "Login successful.", { token });
    } catch (error) {
      logger.error("Login user error: ", error.message);
      sendResponse(res, 500, "An error occurred while logging in.");
    }
  },
];

/**
 * Get User Profile Controller
 * Retrieves the logged-in user's profile.
 */
exports.getUserProfile = async (req, res) => {  
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return sendResponse(res, 404, "User not found.");
    }
    sendResponse(res, 200, "User profile retrieved successfully.", user);
  } catch (error) {
    logger.error("Fetch user profile error: ", error.message);
    sendResponse(
      res,
      500,
      "An error occurred while fetching the user profile."
    );
  }
};

/**
 * Update User Profile Controller
 * Updates the user's profile.
 */
exports.updateUserProfile = [
  // Validation middleware
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email."),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Validation failed", errors.array());
    }

    try {
      const { email, password, firstName, lastName } = req.body;
      const updateData = {};

      if (email) updateData.email = email;
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const user = await User.findByIdAndUpdate(req.userId, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");

      if (!user) {
        return sendResponse(res, 404, "User not found.");
      }

      sendResponse(res, 200, "User profile updated successfully.", user);
    } catch (error) {
      logger.error("Update user profile error: ", error.message);
      sendResponse(res, 500, "An error occurred while updating the profile.");
    }
  },
];

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return sendResponse(res, 404, "User not found.");
    }
    res.clearCookie("token");
    sendResponse(res, 200, "User account deleted successfully.");
  } catch (error) {
    logger.error("Delete user error: ", error.message);
    sendResponse(
      res,
      500,
      "An error occurred while deleting the user account."
    );
  }
};
