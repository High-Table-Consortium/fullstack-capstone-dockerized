// Import required modules
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

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
exports.registerAdmin = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Check if admin with given email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      // Return error if admin already exists
      return res.status(400).json({ message: "Admin already exists." });
    }

    // Create new admin
    const admin = new Admin({ email, password, isAdmin: true });
    // Save admin to database
    await admin.save();


    // Generate JWT token for new admin
    const token = generateToken(admin);
    // Return success response with JWT token
    res.status(201).json({ token, message: "Admin registered successfully." });
  } catch (error) {
    // Return error response if registration fails
    res.status(500).json({ error: error.message });
  }
};

/** 
 * Admin Login Controller
 * Handles admin login.
*/
exports.loginAdmin = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Find admin with given email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      // Return error if admin not found
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare provided password with stored password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      // Return error if passwords do not match
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token for admin
    const token = generateToken(admin);
    // Return success response with JWT token
    res.status(200).json({ token, message: "Login successful." });
  } catch (error) {
    // Return error response if login fails
    res.status(500).json({ error: error.message });
  }
};
