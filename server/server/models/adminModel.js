const mongoose = require("mongoose");

// Define the schema for Admin model
const adminSchema = new mongoose.Schema({
  // Admin email address
  // - Required field
  // - Must be unique
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  // Boolean flag to indicate if the user is an admin
  // I set default value to false for security reasons, this can be changed to true when user is created
  isAdmin: { 
    type: Boolean, 
    default: false 
  },

  // Password field
  // - Required field
  // - Custom validation to ensure the password length is at least 6 characters
  password: {
    type: String,
    required: true,
    validate: {
      // Validator function to enforce password length
      validator: (value) => value.length >= 6,
      message: "Password must be at least 6 characters long.", // Custom error message
    },
  },

  // Array to store user preferences (strings)
  // - This field is optional and can store multiple preferences
  preferences: [String],
});

// Create the Admin model using the schema
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
