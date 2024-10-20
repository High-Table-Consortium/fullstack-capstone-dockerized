// Import required modules
const Admin = require("../models/adminModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
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

// Utility function to send responses
const sendResponse = (res, status, message, data = null) => {
  const responsePayload = { success: status < 400, message, data };
  logger.info(`Response: ${JSON.stringify(responsePayload)}`); // Log the response
  res.status(status).json(responsePayload);
};

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

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const admin = new Admin({
        email,
        password: hashedPassword,
        isAdmin: true,
      });
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
 * Handles admin login and sets session data.
 */
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !admin.isAdmin) {
      return sendResponse(
        res,
        400,
        "Invalid credentials or not an admin account."
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return sendResponse(res, 400, "Invalid credentials.");
    }

    req.session.adminId = admin._id.toString();
    req.session.isAdmin = true;

    // Log session information
    logger.info(`Admin ${admin.email} logged in successfully. Session ID: ${req.sessionID}`);

    sendResponse(res, 200, "Admin logged in successfully", {
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    logger.error("Admin login error:", error.message);
    sendResponse(res, 500, "An error occurred while logging in.");
  }
};

/**
 * Admin Profile Retrieval
 * Retrieves the logged-in admin's profile using session data.
 */
exports.getUserProfile = async (req, res) => {
  try {
    if (!req.session.adminId) {
      return sendResponse(res, 401, "Not authenticated.");
    }

    const admin = await Admin.findById(req.session.adminId).select("-password");
    if (!admin) {
      return sendResponse(res, 404, "Admin not found.");
    }

    // Log admin profile retrieval
    logger.info(`Admin profile retrieved for ${admin.email}. Session ID: ${req.sessionID}`);

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

/**
 * Admin Logout Controller
 * Logs out the admin by destroying the session.
 */
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      logger.error("Session destruction error: ", err.message);
      return sendResponse(res, 500, "An error occurred while logging out.");
    }
    res.clearCookie("connect.sid"); // Remove the session cookie from client
    
    // Log the logout event
    logger.info(`Admin logged out successfully. Session ID: ${req.sessionID}`);
    
    sendResponse(res, 200, "Logged out successfully.");
  });
};
