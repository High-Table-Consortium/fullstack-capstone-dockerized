const mongoose = require("mongoose");

// Define the schema for Review model
const reviewSchema = new mongoose.Schema({
  // Reference to the user who created the review
  // - Stores the ObjectId from the User model
  // - Required field
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },

  // Reference to the tourist attraction being reviewed
  // - Stores the ObjectId from the TouristAttraction model
  // - Required field
  attraction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TouristAttraction", // Reference to the TouristAttraction model
    required: true,
  },

  // Comment or review text provided by the user
  // - Required field
  comment: { 
    type: String, 
    required: true 
  },
});

// Create the Review model using the schema
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
