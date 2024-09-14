const mongoose = require("mongoose");

// Define the schema for Tourist Attraction model
const touristAttractionSchema = new mongoose.Schema({
  // Name of the tourist attraction
  // - Required field
  name: { 
    type: String, 
    required: true,
    trim: true, // Trim any extra spaces
    minlength: [3, 'Name must be at least 3 characters long'], // Minimum length validation
  },

  // Location of the tourist attraction
  // - Required field
  location: { 
    type: String, 
    required: true,
    trim: true, // Trim extra spaces
    minlength: [3, 'Location must be at least 3 characters long'], // Minimum length validation
  },

  // Description of the tourist attraction
  // - Required field
  description: { 
    type: String, 
    required: true,
    minlength: [10, 'Description must be at least 10 characters long'], // Minimum length validation
  },

  // Average rating of the tourist attraction (e.g., 4.5 out of 5)
  // - Optional field
  // - Must be a number between 1 and 5 if provided
  rating: { 
    type: Number,
    min: [1, 'Rating must be at least 1'], // Minimum value
    max: [5, 'Rating cannot be more than 5'], // Maximum value
    validate: {
      validator: Number.isInteger, // Ensure the rating is an integer
      message: "Rating must be an integer.",
    },
  },

  // Category of the tourist attraction (e.g., Museum, Park, Landmark)
  // - Required field
  category: { 
    type: String, 
    required: true,
    trim: true, // Trim extra spaces
  },

  // URL of the image representing the tourist attraction
  // - Optional field
  // - String validation to ensure it's a valid URL format
  image: { 
    type: String,
    default: 'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg', // Default image URL if not provided

    validate: {
      validator: function(value) {
        // Regex for validating URLs
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/.test(value);
      },
      message: "Image must be a valid URL ending with .png, .jpg, .jpeg, or .gif",
    },
  }
});

// Create the TouristAttraction model using the schema
const TouristAttraction = mongoose.model('TouristAttraction', touristAttractionSchema);

module.exports = TouristAttraction;
