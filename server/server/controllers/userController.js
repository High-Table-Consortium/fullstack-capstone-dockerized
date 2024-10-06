const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const winston = require('winston');

const JWT_SECRET = process.env.JWT_SECRET;

// Set up logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

/*

*/
function generateToken(user) {
    if (!JWT_SECRET) {
        logger.error('JWT_SECRET is not defined. Please check your environment variables.');
        throw new Error('JWT_SECRET is not defined.');
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
    body('email').isEmail().withMessage('Please provide a valid email.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, 'Validation failed', errors.array());
        }

        const { email, password, firstName, lastName, image } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return sendResponse(res, 400, "User already exists.");
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and save the user
            const user = new User({ firstName, lastName, image, email, password: hashedPassword });
            await user.save();

            // Generate token for the user
            const token = generateToken(user);

            // Set the JWT token as a cookie
            res.cookie('token', token, {
                httpOnly: true,  // Prevents access by JavaScript on the client side
                secure: process.env.NODE_ENV === 'production',  // Ensures the cookie is sent only over HTTPS in production
                maxAge: 24 * 60 * 60 * 1000 // Expires in 24 hours
            });

            // Send a successful response
            sendResponse(res, 201, "User registered successfully.", { token });

        } catch (error) {
            // Log the full error stack for better debugging
            logger.error('Registration error: ', error);
            sendResponse(res, 500, "An error occurred during registration.");
        }
    }
];


/**
 * User Login Controller
 * Handles user login.
 */
exports.loginUser = [
    // Validation middleware
    body('email').isEmail().withMessage('Please provide a valid email.'),
    body('password').notEmpty().withMessage('Password is required.'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, 'Validation failed', errors.array());
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return sendResponse(res, 400, "Could not find email");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return sendResponse(res, 400, "Invalid email or password.");
            }

            const token = generateToken(user);
            sendResponse(res, 200, "Login successful.", { token });
        } catch (error) {
            logger.error('Login error: ', error.message);
            sendResponse(res, 500, "An error occurred during login.");
        }
    }
];


/**
 * Get User Profile Controller
 * Retrieves the logged-in user's profile.
 */
exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await User.findById(req.user.id);
        if (!userProfile) {
            return sendResponse(res, 404, "User not found.");
        }
        sendResponse(res, 200, "User profile retrieved successfully.", userProfile);
    } catch (error) {
        logger.error('Fetch user profile error: ', error.message);
        sendResponse(res, 500, "An error occurred while fetching the user profile.");
    }
};

/**
 * Update User Profile Controller
 * Updates the user's profile.
 */
exports.updateUserProfile = [
    // Validation middleware
    body('email').optional().isEmail().withMessage('Please provide a valid email.'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendResponse(res, 400, 'Validation failed', errors.array());
        }

        const { email, password } = req.body;

        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return sendResponse(res, 404, "User not found.");
            }

            if (email) user.email = email;
            if (password) user.password = await bcrypt.hash(password, 10);
            await user.save();

            sendResponse(res, 200, "User profile updated successfully.", user);
        } catch (error) {
            logger.error('Update user profile error: ', error.message);
            sendResponse(res, 500, "An error occurred while updating the profile.");
        }
    }
];

/**
 * Delete User Controller
 * Deletes the user's account.
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return sendResponse(res, 404, "User not found.");
        }
        sendResponse(res, 200, "User account deleted successfully.");
    } catch (error) {
        logger.error('Delete user error: ', error.message);
        sendResponse(res, 500, "An error occurred while deleting the user account.");
    }
};      