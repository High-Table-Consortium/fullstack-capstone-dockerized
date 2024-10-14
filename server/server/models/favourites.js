const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Define the schema for Favourite model
const favouriteSchema = new mongoose.Schema({
  // Reference to the user who added the favourite
  // - Stores the ObjectId from the User model
  // - Required field
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },

  // Reference to the tourist attraction that is a favourite
  // - Stores the ObjectId from the TouristAttraction model
  // - Required field
  attraction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TouristAttraction", // Reference to the TouristAttraction model
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


// Create the Favourite model using the schema
const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;