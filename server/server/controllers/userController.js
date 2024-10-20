const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../mailtrap/emails.js");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");
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

      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const user = new User({
        firstName,
        lastName,
        email,
        password,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });

      await user.save();
      console.log(
        "User saved successfully, attempting to send verification email."
      );

      try {
        await sendVerificationEmail(user.email, verificationToken);
      } catch (emailError) {
        logger.error("Error sending verification email:", emailError.message);
        sendResponse(
          res,
          500,
          "An error occurred while sending the verification email."
        );
        return;
      }

      // const token = generateToken(user); // If needed
      sendResponse(res, 201, "User registered successfully.", {
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } catch (error) {
      logger.error("Register user error: ", error.message);
      sendResponse(res, 500, "An error occurred while registering the user.");
    }
  },
];

exports.verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification code",
        });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    sendResponse(res, 400, "error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * User Login Controller
 * Handles user login.
 */

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create session
    req.session.userId = user._id.toString(); // Store the user ID in the session
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User ${user.email} logged in successfully. Session ID: ${req.sessionID}`);
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Password reset link sent to your email",
      });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.checkAuth = async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId).select("-password");
    if (user) {
      return res.status(200).json({ success: true, user });
    }
  }
  res.status(401).json({ success: false, message: "Not authenticated" });
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // clear session ID cookie
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};
/**
 * Get User Profile Controller
 * Retrieves the logged-in user's profile.
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");
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
